// ============================================================
// rotas/transacoes.ts — CRUD de Transações
// ============================================================

import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function rotasTransacoes(app: FastifyInstance) {

  app.addHook('preHandler', app.autenticar)

  // ── GET /api/v1/transacoes ────────────────────────────────
  app.get('/', async (requisicao, resposta) => {
    const usuario = requisicao.user as { id: string; casalId?: string }

    if (!usuario.casalId) {
      return resposta.status(404).send({ erro: 'Sem casal vinculado' })
    }

    const querySchema = z.object({
      pagina: z.coerce.number().default(1),
      limite: z.coerce.number().default(20),
      tipo: z.enum(['RECEITA', 'DESPESA']).optional(),
      escopo: z.enum(['INDIVIDUAL', 'CONJUNTO']).optional(),
      categoriaId: z.string().uuid().optional(),
      dataInicio: z.string().optional(),
      dataFim: z.string().optional(),
      apenasMinhas: z.coerce.boolean().default(false),
    })

    const filtros = querySchema.parse(requisicao.query)

    const transacoes = await prisma.transacao.findMany({
      where: {
        casalId: usuario.casalId,
        ...(filtros.tipo && { tipo: filtros.tipo }),
        ...(filtros.escopo && { escopo: filtros.escopo }),
        ...(filtros.categoriaId && { categoriaId: filtros.categoriaId }),
        ...(filtros.apenasMinhas && { usuarioId: usuario.id }),
        ...(filtros.dataInicio && filtros.dataFim && {
          data: {
            gte: new Date(filtros.dataInicio),
            lte: new Date(filtros.dataFim),
          },
        }),
      },
      include: {
        categoria: { select: { id: true, nome: true, icone: true, cor: true } },
        usuario: { select: { id: true, nome: true, avatarUrl: true } },
      },
      orderBy: { data: 'desc' },
      skip: (filtros.pagina - 1) * filtros.limite,
      take: filtros.limite,
    })

    const total = await prisma.transacao.count({
      where: { casalId: usuario.casalId },
    })

    return resposta.send({
      transacoes,
      paginacao: {
        pagina: filtros.pagina,
        limite: filtros.limite,
        total,
        totalPaginas: Math.ceil(total / filtros.limite),
      },
    })
  })

  // ── POST /api/v1/transacoes ───────────────────────────────
  app.post('/', async (requisicao, resposta) => {
    const usuario = requisicao.user as { id: string; casalId?: string }

    if (!usuario.casalId) {
      return resposta.status(404).send({ erro: 'Sem casal vinculado' })
    }

    const schema = z.object({
      valor: z.number().positive('Valor deve ser positivo'),
      tipo: z.enum(['RECEITA', 'DESPESA']),
      escopo: z.enum(['INDIVIDUAL', 'CONJUNTO']),
      categoriaId: z.string().uuid('Categoria inválida'),
      descricao: z.string().optional(),
      data: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida (use YYYY-MM-DD)'),
    })

    const resultado = schema.safeParse(requisicao.body)
    if (!resultado.success) {
      return resposta.status(400).send({
        erro: 'Dados inválidos',
        detalhes: resultado.error.flatten().fieldErrors,
      })
    }

    const transacao = await prisma.transacao.create({
      data: {
        ...resultado.data,
        data: new Date(resultado.data.data),
        casalId: usuario.casalId,
        usuarioId: usuario.id,
      },
      include: {
        categoria: { select: { id: true, nome: true, icone: true, cor: true } },
        usuario: { select: { id: true, nome: true, avatarUrl: true } },
      },
    })

    return resposta.status(201).send({
      mensagem: 'Transação criada com sucesso!',
      transacao,
    })
  })

  // ── PUT /api/v1/transacoes/:id ────────────────────────────
  app.put('/:id', async (requisicao, resposta) => {
    const usuario = requisicao.user as { id: string; casalId?: string }
    const { id } = requisicao.params as { id: string }

    const transacao = await prisma.transacao.findUnique({ where: { id } })

    if (!transacao || transacao.casalId !== usuario.casalId) {
      return resposta.status(404).send({ erro: 'Transação não encontrada' })
    }

    // Somente o dono da transação pode editar
    if (transacao.usuarioId !== usuario.id) {
      return resposta.status(403).send({ erro: 'Sem permissão para editar esta transação' })
    }

    const schema = z.object({
      valor: z.number().positive().optional(),
      tipo: z.enum(['RECEITA', 'DESPESA']).optional(),
      escopo: z.enum(['INDIVIDUAL', 'CONJUNTO']).optional(),
      categoriaId: z.string().uuid().optional(),
      descricao: z.string().optional(),
      data: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    })

    const dados = schema.parse(requisicao.body)

    const atualizada = await prisma.transacao.update({
      where: { id },
      data: {
        ...dados,
        ...(dados.data && { data: new Date(dados.data) }),
      },
      include: {
        categoria: { select: { id: true, nome: true, icone: true, cor: true } },
      },
    })

    return resposta.send({ mensagem: 'Transação atualizada!', transacao: atualizada })
  })

  // ── DELETE /api/v1/transacoes/:id ─────────────────────────
  app.delete('/:id', async (requisicao, resposta) => {
    const usuario = requisicao.user as { id: string; casalId?: string }
    const { id } = requisicao.params as { id: string }

    const transacao = await prisma.transacao.findUnique({ where: { id } })

    if (!transacao || transacao.casalId !== usuario.casalId) {
      return resposta.status(404).send({ erro: 'Transação não encontrada' })
    }

    if (transacao.usuarioId !== usuario.id) {
      return resposta.status(403).send({ erro: 'Sem permissão para excluir esta transação' })
    }

    await prisma.transacao.delete({ where: { id } })

    return resposta.send({ mensagem: 'Transação excluída com sucesso.' })
  })
}
