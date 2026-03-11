// ============================================================
// rotas/autenticacao.ts — Registro e Login de Usuários
// ============================================================

import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function rotasAutenticacao(app: FastifyInstance) {

  // ── POST /api/v1/auth/registrar ───────────────────────────
  app.post('/registrar', async (requisicao, resposta) => {
    const schema = z.object({
      nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
      email: z.string().email('E-mail inválido'),
      senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    })

    const resultado = schema.safeParse(requisicao.body)
    if (!resultado.success) {
      return resposta.status(400).send({
        erro: 'Dados inválidos',
        detalhes: resultado.error.flatten().fieldErrors,
      })
    }

    const { nome, email, senha } = resultado.data

    // Verifica se e-mail já está em uso
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email },
    })

    if (usuarioExistente) {
      return resposta.status(409).send({
        erro: 'E-mail já cadastrado',
        mensagem: 'Já existe uma conta com esse e-mail.',
      })
    }

    // Cria hash da senha
    const senhaHash = await bcrypt.hash(senha, 12)

    // Cria o usuário
    const usuario = await prisma.usuario.create({
      data: { nome, email, senhaHash },
      select: { id: true, nome: true, email: true, avatarUrl: true, criadoEm: true },
    })

    // Gera token JWT
    const token = app.jwt.sign({
      id: usuario.id,
      email: usuario.email,
    })

    return resposta.status(201).send({
      mensagem: 'Conta criada com sucesso!',
      usuario,
      token,
    })
  })

  // ── POST /api/v1/auth/login ───────────────────────────────
  app.post('/login', async (requisicao, resposta) => {
    const schema = z.object({
      email: z.string().email('E-mail inválido'),
      senha: z.string().min(1, 'Senha obrigatória'),
    })

    const resultado = schema.safeParse(requisicao.body)
    if (!resultado.success) {
      return resposta.status(400).send({
        erro: 'Dados inválidos',
        detalhes: resultado.error.flatten().fieldErrors,
      })
    }

    const { email, senha } = resultado.data

    // Busca usuário
    const usuario = await prisma.usuario.findUnique({
      where: { email },
      include: {
        membrosDoCasal: {
          include: { casal: true },
        },
      },
    })

    if (!usuario || !usuario.senhaHash) {
      return resposta.status(401).send({
        erro: 'Credenciais inválidas',
        mensagem: 'E-mail ou senha incorretos.',
      })
    }

    // Verifica senha
    const senhaCorreta = await bcrypt.compare(senha, usuario.senhaHash)
    if (!senhaCorreta) {
      return resposta.status(401).send({
        erro: 'Credenciais inválidas',
        mensagem: 'E-mail ou senha incorretos.',
      })
    }

    // Dados do casal (se tiver)
    const membroCasal = usuario.membrosDoCasal[0]

    // Gera token JWT
    const token = app.jwt.sign({
      id: usuario.id,
      email: usuario.email,
      casalId: membroCasal?.casalId,
    })

    return resposta.send({
      mensagem: 'Login realizado com sucesso!',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        avatarUrl: usuario.avatarUrl,
      },
      casal: membroCasal
        ? {
            id: membroCasal.casal.id,
            nome: membroCasal.casal.nome,
            codigoConvite: membroCasal.casal.codigoConvite,
            papel: membroCasal.papel,
          }
        : null,
      token,
    })
  })

  // ── GET /api/v1/auth/perfil ───────────────────────────────
  app.get(
    '/perfil',
    { preHandler: [app.autenticar] },
    async (requisicao, resposta) => {
      const usuario = requisicao.user as { id: string }

      const perfil = await prisma.usuario.findUnique({
        where: { id: usuario.id },
        select: {
          id: true,
          nome: true,
          email: true,
          avatarUrl: true,
          criadoEm: true,
          membrosDoCasal: {
            include: { casal: true },
          },
        },
      })

      if (!perfil) {
        return resposta.status(404).send({ erro: 'Usuário não encontrado' })
      }

      return resposta.send({ usuario: perfil })
    }
  )
}
