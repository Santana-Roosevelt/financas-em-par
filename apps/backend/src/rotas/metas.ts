// ============================================================
// rotas/metas.ts — CRUD de Metas Financeiras
// ============================================================

import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function rotasMetas(app: FastifyInstance) {

  app.addHook('preHandler', app.autenticar)

  // ── GET /api/v1/metas ─────────────────────────────────────
  app.get('/', async (requisicao, resposta) => {
    const usuario = requisicao.user as { id: string; casalId?: string }

    if (!usuario.casalId) {
      return resposta.status(404).send({ erro: 'Sem casal vinculado' })
    }

    const metas = await prisma.meta.findMany({
      where: { casalId: usuario.casalId },
      include: {
        usuario: { select: { id: true, nome: true, avatarUrl: true } },
      },
      orderBy: [{ status: 'asc' }, { criadoEm: 'desc' }],
    })

    return resposta.send({ metas })
  })

  // ── POST /api/v1/metas ────────────────────────────────────
  app.post('/', async (requisicao, resposta) => {
    const usuario = requisicao.user as { id: string; casalId?: string }

    if (!usuario.casalId) {
      return resposta.status(404).send({ erro: 'Sem casal vinculado' })
    }

    const schema = z.object({
      titulo: z.string().min(2, 'Título deve ter pelo menos 2 caracteres'),
      valorAlvo: z.number().positive('Valor alvo deve ser positivo'),
      escopo: z.enum(['INDIVIDUAL', 'CONJUNTO']),
      icone: z.string().default('🎯'),
      cor: z.string().default('#10b981'),
      prazo: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    })

    const resultado = schema.safeParse(requisicao.body)
    if (!resultado.success) {
      return resposta.status(400).send({
        erro: 'Dados inválidos',
        detalhes: resultado.error.flatten().fieldErrors,
      })
    }

    const { escopo, prazo, ...resto } = resultado.data

    const meta = await prisma.meta.create({
      data: {
        ...resto,
        escopo,
        casalId: usuario.casalId,
        // Meta individual: vincula ao usuário. Meta conjunta: sem vínculo
        usuarioId: escopo === 'INDIVIDUAL' ? usuario.id : null,
        ...(prazo && { prazo: new Date(prazo) }),
      },
    })

    return resposta.status(201).send({
      mensagem: 'Meta criada com sucesso! 🎯',
      meta,
    })
  })

  // ── POST /api/v1/metas/:id/aportar ───────────────────────
  app.post('/:id/aportar', async (requisicao, resposta) => {
    const usuario = requisicao.user as { id: string; casalId?: string }
    const { id } = requisicao.params as { id: string }

    const schema = z.object({
      valor: z.number().positive('Valor do aporte deve ser positivo'),
    })

    const resultado = schema.safeParse(requisicao.body)
    if (!resultado.success) {
      return resposta.status(400).send({ erro: 'Valor inválido' })
    }

    const meta = await prisma.meta.findUnique({ where: { id } })

    if (!meta || meta.casalId !== usuario.casalId) {
      return resposta.status(404).send({ erro: 'Meta não encontrada' })
    }

    if (meta.status !== 'ATIVA') {
      return resposta.status(400).send({ erro: 'Meta não está ativa' })
    }

    const novoValor = Number(meta.valorAtual) + resultado.data.valor
    const foiConcluida = novoValor >= Number(meta.valorAlvo)

    const metaAtualizada = await prisma.meta.update({
      where: { id },
      data: {
        valorAtual: novoValor,
        ...(foiConcluida && { status: 'CONCLUIDA' }),
      },
    })

    return resposta.send({
      mensagem: foiConcluida ? '🎉 Meta concluída! Parabéns!' : 'Aporte realizado!',
      meta: metaAtualizada,
      concluida: foiConcluida,
    })
  })

  // ── DELETE /api/v1/metas/:id ──────────────────────────────
  app.delete('/:id', async (requisicao, resposta) => {
    const usuario = requisicao.user as { id: string; casalId?: string }
    const { id } = requisicao.params as { id: string }

    const meta = await prisma.meta.findUnique({ where: { id } })

    if (!meta || meta.casalId !== usuario.casalId) {
      return resposta.status(404).send({ erro: 'Meta não encontrada' })
    }

    await prisma.meta.update({
      where: { id },
      data: { status: 'CANCELADA' },
    })

    return resposta.send({ mensagem: 'Meta cancelada.' })
  })
}
