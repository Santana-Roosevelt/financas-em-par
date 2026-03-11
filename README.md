# 💑 Finanças em Par

> Plataforma financeira para casais organizarem suas finanças de forma conjunta e individual.

---

## 🗂️ Estrutura do Projeto (Monorepo)

```
financas-em-par/
├── apps/
│   ├── backend/          # API REST com Fastify + Node.js
│   ├── web/              # Frontend React + Vite
│   └── mobile/           # App React Native + Expo
├── packages/
│   ├── shared/           # Tipos e utilitários compartilhados
│   └── ui/               # Componentes de UI reutilizáveis
├── package.json          # Raiz do monorepo (pnpm workspaces)
└── pnpm-workspace.yaml
```

---

## 🛠️ Stack Tecnológica

| Camada       | Tecnologia                        |
|--------------|-----------------------------------|
| Backend      | Node.js + Fastify + TypeScript    |
| Banco de Dados | PostgreSQL + Prisma ORM          |
| Frontend Web | React + Vite + TypeScript         |
| Mobile       | React Native + Expo               |
| Estilização  | Tailwind CSS                      |
| Autenticação | JWT + OAuth Google                |
| Hospedagem   | Vercel (web) + Railway (backend)  |

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js >= 18
- pnpm >= 8 (`npm install -g pnpm`)
- PostgreSQL instalado localmente

### 1. Clone e instale dependências

```bash
git clone https://github.com/seu-usuario/financas-em-par.git
cd financas-em-par
pnpm install
```

### 2. Configure as variáveis de ambiente

```bash
# Backend
cp apps/backend/.env.example apps/backend/.env
# Edite o arquivo .env com suas configurações
```

### 3. Configure o banco de dados

```bash
# Crie o banco no PostgreSQL
createdb financas_em_par

# Execute as migrations
pnpm db:migrate

# (Opcional) Popule com dados de teste
pnpm db:seed
```

### 4. Inicie o desenvolvimento

```bash
# Backend (porta 3333)
pnpm dev:backend

# Frontend Web (porta 5173)
pnpm dev:web

# Mobile (Expo)
pnpm dev:mobile
```

---

## 📡 Endpoints da API

| Método | Endpoint                        | Descrição                    |
|--------|---------------------------------|------------------------------|
| POST   | /api/v1/auth/registrar          | Criar conta                  |
| POST   | /api/v1/auth/login              | Login                        |
| GET    | /api/v1/auth/perfil             | Perfil do usuário logado     |
| POST   | /api/v1/casais/criar            | Criar novo casal             |
| POST   | /api/v1/casais/entrar           | Entrar em casal via código   |
| GET    | /api/v1/casais/dashboard        | Dashboard do casal           |
| GET    | /api/v1/transacoes              | Listar transações            |
| POST   | /api/v1/transacoes              | Criar transação              |
| PUT    | /api/v1/transacoes/:id          | Editar transação             |
| DELETE | /api/v1/transacoes/:id          | Excluir transação            |
| GET    | /api/v1/metas                   | Listar metas                 |
| POST   | /api/v1/metas                   | Criar meta                   |
| POST   | /api/v1/metas/:id/aportar       | Aportar valor em meta        |
| DELETE | /api/v1/metas/:id               | Cancelar meta                |
| GET    | /api/v1/relatorios/mensal       | Relatório mensal             |
| GET    | /api/v1/relatorios/evolucao     | Evolução dos últimos 6 meses |
| GET    | /health                         | Health check da API          |

---

## 📋 Roadmap do MVP

### Sprint 1 — Setup & Auth ✅
- [x] Estrutura do monorepo
- [x] Schema do banco de dados (Prisma)
- [x] API de autenticação (registro/login)
- [ ] Telas de login e cadastro (Web)

### Sprint 2 — Casal & Onboarding
- [ ] API de casal (criar/entrar)
- [ ] Tela de criação de casal
- [ ] Tela de entrada via código de convite
- [ ] Dashboard básico

### Sprint 3 — Transações
- [ ] CRUD de transações
- [ ] Tela de nova transação
- [ ] Lista de transações com filtros

### Sprint 4 — Dashboard & Relatórios
- [ ] Dashboard com saldos
- [ ] Gráficos de gastos por categoria
- [ ] Relatório mensal

### Sprint 5 — Metas
- [ ] CRUD de metas
- [ ] Tela de metas com progresso visual

### Sprint 6 — Mobile + Lançamento
- [ ] Adaptar telas para React Native
- [ ] Testes com usuários reais
- [ ] Deploy em produção

---

## 🤝 Contribuição

Este é um projeto solo em desenvolvimento. Feedbacks são bem-vindos!

---

## 📄 Licença

MIT © Finanças em Par
