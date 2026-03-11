// ============================================================
// rotas/relatorios.ts — Relatórios e Análises Financeiras
// ============================================================

import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function rotasRelatorios(app: FastifyInstance) {

  app.addHook('preHandler', app.autenticar)

  // ── GET /api/v1/relatorios/mensal ─────────────────────────
  // Retorna resumo financeiro de um mês específico
  app.get('/mensal', async (requisicao, resposta) => {
    const usuario = requisicao.user as { id: string; casalId?: string }

    if (!usuario.casalId) {
      return resposta.status(404).send({ erro: 'Sem casal vinculado' })
    }

    const querySchema = z.object({
      ano: z.coerce.number().default(new Date().getFullYear()),
      mes: z.coerce.number().min(1).max(12).default(new Date().getMonth() + 1),
    })

    const { ano, mes } = querySchema.parse(requisicao.query)

    const inicioMes = new Date(ano, mes - 1, 1)
    const fimMes = new Date(ano, mes, 0)

    // Todas as transações do mês
    const transacoes = await prisma.transacao.findMany({
      where: {
        casalId: usuario.casalId,
        data: { gte: inicioMes, lte: fimMes },
      },
      include: {
        categoria: true,
        usuario: { select: { id: true, nome: true } },
      },
    })

    // Totais gerais
    const totais = transacoes.reduce(
      (acc, t) => {
        const valor = Number(t.valor)
        if (t.tipo === 'RECEITA') acc.totalReceitas += valor
        else acc.totalDespesas += valor
        return acc
      },
      { totalReceitas: 0, totalDespesas: 0 }
    )

    // Gastos por categoria
    const porCategoria = transacoes
      .filter((t) => t.tipo === 'DESPESA')
      .reduce((acc, t) => {
        const chave = t.categoria.id
        if (!acc[chave]) {
          acc[chave] = {
            categoria: t.categoria,
            total: 0,
            quantidade: 0,
          }
        }
        acc[chave].total += Number(t.valor)
        acc[chave].quantidade++
        return acc
      }, {} as Record<string, { categoria: any; total: number; quantidade: number }>)

    // Gastos por pessoa
    const porPessoa = transacoes.reduce((acc, t) => {
      const chave = t.usuario.id
      if (!acc[chave]) {
        acc[chave] = { usuario: t.usuario, receitas: 0, despesas: 0 }
      }
      if (t.tipo === 'RECEITA') acc[chave].receitas += Number(t.valor)
      else acc[chave].despesas += Number(t.valor)
      return acc
    }, {} as Record<string, any>)

    return resposta.send({
      periodo: {
        ano,
        mes,
        nomeMes: inicioMes.toLocaleDateString('pt-BR', { month: 'long' }),
      },
      totais: {
        ...totais,
        saldo: totais.totalReceitas - totais.totalDespesas,
      },
      porCategoria: Object.values(porCategoria).sort((a, b) => b.total - a.total),
      porPessoa: Object.values(porPessoa),
      totalTransacoes: transacoes.length,
    })
  })

  // ── GET /api/v1/relatorios/evolucao ───────────────────────
  // Retorna evolução dos últimos 6 meses
  app.get('/evolucao', async (requisicao, resposta) => {
    const usuario = requisicao.user as { id: string; casalId?: string }

    if (!usuario.casalId) {
      return resposta.status(404).send({ erro: 'Sem casal vinculado' })
    }

    const hoje = new Date()
    const evolucao = []

    for (let i = 5; i >= 0; i--) {
      const data = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1)
      const inicio = new Date(data.getFullYear(), data.getMonth(), 1)
      const fim = new Date(data.getFullYear(), data.getMonth() + 1, 0)

      const transacoes = await prisma.transacao.findMany({
        where: {
          casalId: usuario.casalId,
          data: { gte: inicio, lte: fim },
        },
        select: { tipo: true, valor: true },
      })

      const totais = transacoes.reduce(
        (acc, t) => {
          if (t.tipo === 'RECEITA') acc.receitas += Number(t.valor)
          else acc.despesas += Number(t.valor)
          return acc
        },
        { receitas: 0, despesas: 0 }
      )

      evolucao.push({
        mes: data.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' }),
        ...totais,
        saldo: totais.receitas - totais.despesas,
      })
    }

    return resposta.send({ evolucao })
  })
}
