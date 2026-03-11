// ============================================================
// middlewares/autenticacao.ts — Verificação de JWT
// ============================================================

import { FastifyRequest, FastifyReply } from 'fastify'

export interface UsuarioToken {
  id: string
  email: string
  casalId?: string
}

export async function autenticarRequisicao(
  requisicao: FastifyRequest,
  resposta: FastifyReply
) {
  try {
    await requisicao.jwtVerify()
  } catch (erro) {
    resposta.status(401).send({
      erro: 'Não autorizado',
      mensagem: 'Token inválido ou expirado. Faça login novamente.',
    })
  }
}
