// ============================================================
// rotas/casal.ts — Gerenciamento do Casal
// ============================================================

import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { gerarCodigoConvite } from '../utils/codigo'

const prisma = new PrismaClient()

export async function rotasCasal(app: FastifyInstance) {

  // Todas as rotas exigem autenticação
  app.addHook('preHandler', app.autenticar)

  // ── POST /api/v1/casais/criar ─────────────────────────────
  app.post('/criar', async (requisicao, resposta) => {
    const usuario = requisicao.user as { id: string }

    const schema = z.object({
      nome: z.string().min(2, 'Nome do casal deve ter pelo menos 2 caracteres'),
    })

    const resultado = schema.safeParse(requisicao.body)
    if (!resultado.success) {
      return resposta.status(400).send({
        erro: 'Dados inválidos',
        detalhes: resultado.error.flatten().fieldErrors,
      })
    }

    // Verifica se já faz parte de um casal
    const membroExistente = await prisma.membroDoCasal.findFirst({
      where: { usuarioId: usuario.id },
    })

    if (membroExistente) {
      return resposta.status(409).send({
        erro: 'Já em um casal',
        mensagem: 'Você já faz parte de um casal. Saia primeiro para criar outro.',
      })
    }

    // Gera código único de convite (ex: "PAR-3X7K")
    const codigoConvite = await gerarCodigoConvite()

    // Cria casal e adiciona criador como dono
    const casal = await prisma.casal.create({
      data: {
        nome: resultado.data.nome,
        codigoConvite,
        membros: {
          create: {
            usuarioId: usuario.id,
            papel: 'DONO',
          },
        },
      },
      include: {
        membros: {
          include: { usuario: { select: { id: true, nome: true, email: true, avatarUrl: true } } },
        },
      },
    })

    // Cria categorias padrão para o casal
    await criarCategoriasPadrao(casal.id)

    return resposta.status(201).send({
      mensagem: 'Casal criado com sucesso!',
      casal: {
        id: casal.id,
        nome: casal.nome,
        codigoConvite: casal.codigoConvite,
        membros: casal.membros,
      },
    })
  })

  // ── POST /api/v1/casais/entrar ────────────────────────────
  app.post('/entrar', async (requisicao, resposta) => {
    const usuario = requisicao.user as { id: string }

    const schema = z.object({
      codigoConvite: z.string().min(1, 'Código de convite obrigatório'),
    })

    const resultado = schema.safeParse(requisicao.body)
    if (!resultado.success) {
      return resposta.status(400).send({
        erro: 'Dados inválidos',
        detalhes: resultado.error.flatten().fieldErrors,
      })
    }

    // Verifica se já faz parte de um casal
    const membroExistente = await prisma.membroDoCasal.findFirst({
      where: { usuarioId: usuario.id },
    })

    if (membroExistente) {
      return resposta.status(409).send({
        erro: 'Já em um casal',
        mensagem: 'Você já faz parte de um casal.',
      })
    }

    // Busca casal pelo código
    const casal = await prisma.casal.findUnique({
      where: { codigoConvite: resultado.data.codigoConvite },
      include: { membros: true },
    })

    if (!casal) {
      return resposta.status(404).send({
        erro: 'Casal não encontrado',
        mensagem: 'Código de convite inválido ou expirado.',
      })
    }

    if (casal.membros.length >= 2) {
      return resposta.status(409).send({
        erro: 'Casal completo',
        mensagem: 'Este casal já possui dois membros.',
      })
    }

    // Adiciona usuário ao casal como parceiro
    await prisma.membroDoCasal.create({
      data: {
        casalId: casal.id,
        usuarioId: usuario.id,
        papel: 'PARCEIRO',
      },
    })

    return resposta.send({
      mensagem: 'Você entrou no casal com sucesso! 💑',
      casal: {
        id: casal.id,
        nome: casal.nome,
      },
    })
  })

  // ── GET /api/v1/casais/dashboard ──────────────────────────
  app.get('/dashboard', async (requisicao, resposta) => {
    const usuario = requisicao.user as { id: string; casalId?: string }

    if (!usuario.casalId) {
      return resposta.status(404).send({
        erro: 'Sem casal',
        mensagem: 'Você ainda não faz parte de um casal.',
      })
    }

    const agora = new Date()
    const inicioMes = new Date(agora.getFullYear(), agora.getMonth(), 1)
    const fimMes = new Date(agora.getFullYear(), agora.getMonth() + 1, 0)

    // Busca transações do mês atual
    const transacoesMes = await prisma.transacao.findMany({
      where: {
        casalId: usuario.casalId,
        data: { gte: inicioMes, lte: fimMes },
      },
      include: {
        categoria: true,
        usuario: { select: { id: true, nome: true, avatarUrl: true } },
      },
      orderBy: { data: 'desc' },
      take: 10,
    })

    // Calcula totais
    const totais = transacoesMes.reduce(
      (acc, t) => {
        const valor = Number(t.valor)
        if (t.tipo === 'RECEITA') acc.receitas += valor
        else acc.despesas += valor
        return acc
      },
      { receitas: 0, despesas: 0 }
    )

    // Busca metas ativas
    const metas = await prisma.meta.findMany({
      where: { casalId: usuario.casalId, status: 'ATIVA' },
      orderBy: { criadoEm: 'desc' },
      take: 5,
    })

    return resposta.send({
      resumoMes: {
        receitas: totais.receitas,
        despesas: totais.despesas,
        saldo: totais.receitas - totais.despesas,
        mes: agora.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }),
      },
      ultimasTransacoes: transacoesMes,
      metas,
    })
  })
}

// ── Categorias padrão do sistema ──────────────────────────────
async function criarCategoriasPadrao(casalId: string) {
  const categorias = [
    // Despesas
    { nome: 'Moradia', icone: '🏠', cor: '#6366f1', tipo: 'DESPESA' as const },
    { nome: 'Alimentação', icone: '🍔', cor: '#f59e0b', tipo: 'DESPESA' as const },
    { nome: 'Transporte', icone: '🚗', cor: '#3b82f6', tipo: 'DESPESA' as const },
    { nome: 'Saúde', icone: '💊', cor: '#ef4444', tipo: 'DESPESA' as const },
    { nome: 'Lazer', icone: '🎬', cor: '#8b5cf6', tipo: 'DESPESA' as const },
    { nome: 'Educação', icone: '📚', cor: '#06b6d4', tipo: 'DESPESA' as const },
    { nome: 'Roupas', icone: '👗', cor: '#ec4899', tipo: 'DESPESA' as const },
    { nome: 'Outros', icone: '📦', cor: '#6b7280', tipo: 'DESPESA' as const },
    // Receitas
    { nome: 'Salário', icone: '💼', cor: '#10b981', tipo: 'RECEITA' as const },
    { nome: 'Freelance', icone: '💻', cor: '#14b8a6', tipo: 'RECEITA' as const },
    { nome: 'Investimentos', icone: '📈', cor: '#22c55e', tipo: 'RECEITA' as const },
    { nome: 'Outros', icone: '💰', cor: '#84cc16', tipo: 'RECEITA' as const },
  ]

  await prisma.categoria.createMany({
    data: categorias.map((c) => ({ ...c, casalId, padrao: true })),
  })
}
