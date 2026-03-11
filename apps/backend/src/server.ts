// ============================================================
// server.ts — Ponto de entrada do servidor Finanças em Par
// ============================================================

import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { rotasAutenticacao } from './rotas/autenticacao'
import { rotasCasal } from './rotas/casal'
import { rotasTransacoes } from './rotas/transacoes'
import { rotasMetas } from './rotas/metas'
import { rotasRelatorios } from './rotas/relatorios'
import { autenticarRequisicao } from './middlewares/autenticacao'

const app = Fastify({
  logger: {
    level: process.env.NODE_ENV === 'development' ? 'info' : 'warn',
  },
})

// ── Plugins ──────────────────────────────────────────────────
app.register(cors, {
  origin: process.env.NODE_ENV === 'development'
    ? ['http://localhost:5173', 'http://localhost:3000']
    : [process.env.FRONTEND_URL ?? ''],
  credentials: true,
})

app.register(jwt, {
  secret: process.env.JWT_SECRET ?? 'chave-padrao-trocar-em-producao',
  sign: {
    expiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  },
})

// ── Decorador de autenticação ─────────────────────────────────
app.decorate('autenticar', autenticarRequisicao)

// ── Rotas públicas ────────────────────────────────────────────
app.register(rotasAutenticacao, { prefix: '/api/v1/auth' })

// ── Rotas protegidas ──────────────────────────────────────────
app.register(rotasCasal, { prefix: '/api/v1/casais' })
app.register(rotasTransacoes, { prefix: '/api/v1/transacoes' })
app.register(rotasMetas, { prefix: '/api/v1/metas' })
app.register(rotasRelatorios, { prefix: '/api/v1/relatorios' })

// ── Health Check ──────────────────────────────────────────────
app.get('/health', async () => {
  return {
    status: 'ok',
    projeto: 'Finanças em Par',
    versao: '1.0.0',
    ambiente: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  }
})

// ── Inicialização ─────────────────────────────────────────────
const iniciar = async () => {
  try {
    const porta = Number(process.env.PORT) || 3333
    await app.listen({ port: porta, host: '0.0.0.0' })
    console.log(`\n🚀 Servidor rodando em http://localhost:${porta}`)
    console.log(`📊 Ambiente: ${process.env.NODE_ENV ?? 'development'}`)
  } catch (erro) {
    app.log.error(erro)
    process.exit(1)
  }
}

iniciar()
