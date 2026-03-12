import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import Sidebar from '../componentes/Sidebar'
import { estilosGlobais, cores, responsivo } from '../estilos/global'
import { estilos } from '../estilos/paginas/dashboard'

const CORES_CATEGORIAS = [cores.primaria, '#a3be8c', cores.azul, '#e8956d', '#b8a8c8']

const dadosCategorias = [
  { nome: 'Moradia', valor: 2222, percentual: 35 },
  { nome: 'Mercado', valor: 1587, percentual: 25 },
  { nome: 'Transporte', valor: 952, percentual: 15 },
  { nome: 'Lazer', valor: 952, percentual: 15 },
  { nome: 'Outros', valor: 637, percentual: 10 },
]

const proximasContas = [
  { data: '12/04', descricao: 'Cartão Nubank', valor: 850 },
  { data: '15/04', descricao: 'Internet', valor: 120 },
  { data: '20/04', descricao: 'Aluguel', valor: 1200 },
]

const metas = [
  { nome: 'Viagem', atual: 3200, total: 10000 },
  { nome: 'Reserva de emergência', atual: 8000, total: 15000 },
]

const cartoes = [
  { nome: 'Nubank', limite: 5000, usado: 2800 },
  { nome: 'Inter', limite: 3000, usado: 800 },
]

const alertas = [
  { tipo: 'aviso', texto: 'Cartão Nubank perto do limite (56%)' },
  { tipo: 'urgente', texto: 'Conta de Internet vence em 3 dias' },
]

const moeda = (valor: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)

export default function Dashboard() {
  const renda = 9000
  const gastos = 6350
  const saldo = renda - gastos
  const saldoPositivo = saldo >= 0

  return (
    <div style={estilosGlobais.paginaComSidebar}>

      <Sidebar paginaAtiva="dashboard" />

      <main style={estilosGlobais.conteudoPrincipal} className="conteudo-principal">

        {/* Header */}
        <div style={estilos.header}>
          <div>
            <div style={estilos.headerTitulo}>Olá, Roosevelt 👋</div>
            <div style={estilos.headerSubtitulo}>Aqui está o resumo financeiro de abril</div>
          </div>
          <button style={estilos.botaoAdicionar}>+ Adicionar gasto</button>
        </div>

        {/* Cards de saldo */}
        <div style={estilos.gradeCards} className="cards-saldo">
          {[
            { label: 'Renda do mês', valor: renda, cor: cores.texto, icone: '💰' },
            { label: 'Gastos do mês', valor: gastos, cor: cores.vermelho, icone: '💸' },
            { label: 'Saldo restante', valor: saldo, cor: saldoPositivo ? cores.verde : cores.vermelho, icone: saldoPositivo ? '✅' : '⚠️' },
          ].map((card, i) => (
            <div key={i} style={{
              ...estilosGlobais.card,
              border: i === 2 ? `2px solid ${saldoPositivo ? 'rgba(90,158,90,0.2)' : 'rgba(232,93,93,0.2)'}` : '2px solid transparent',
            }}>
              <div style={estilos.cardIcone}>{card.icone}</div>
              <div style={estilos.cardLabel}>{card.label}</div>
              <div style={{ ...estilos.cardValor, color: card.cor }}>{moeda(card.valor)}</div>
            </div>
          ))}
        </div>

        {/* Gráfico + Próximas contas */}
        <div style={estilos.grade2colunas} className="linha-2">

          {/* Gráfico donut */}
          <div style={estilosGlobais.card}>
            <div style={estilosGlobais.secaoTitulo}>Gastos por categoria</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie data={dadosCategorias} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="valor" paddingAngle={3}>
                    {dadosCategorias.map((_, index) => (
                      <Cell key={index} fill={CORES_CATEGORIAS[index]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => moeda(value)} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ flex: 1 }}>
                {dadosCategorias.map((cat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: CORES_CATEGORIAS[i], flexShrink: 0 }}/>
                      <span style={{ fontSize: '0.8rem', color: '#5a4a3a' }}>{cat.nome}</span>
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: cores.texto }}>{cat.percentual}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Próximas contas */}
          <div style={estilosGlobais.card}>
            <div style={estilosGlobais.secaoTitulo}>Próximas contas</div>
            {proximasContas.map((conta, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 0',
                borderBottom: i < proximasContas.length - 1 ? `1px solid ${cores.fundo}` : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', background: cores.fundo, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, color: cores.primaria }}>
                    {conta.data}
                  </div>
                  <span style={{ fontSize: '0.88rem', color: cores.texto, fontWeight: 500 }}>{conta.descricao}</span>
                </div>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: cores.vermelho }}>{moeda(conta.valor)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Metas + Cartões */}
        <div style={estilos.grade2colunas} className="linha-3">

          {/* Metas */}
          <div style={estilosGlobais.card}>
            <div style={estilosGlobais.secaoTitulo}>Metas financeiras</div>
            {metas.map((meta, i) => {
              const pct = Math.round((meta.atual / meta.total) * 100)
              return (
                <div key={i} style={{ marginBottom: i < metas.length - 1 ? '24px' : '0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, color: cores.texto }}>🎯 {meta.nome}</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: cores.primaria }}>{pct}%</span>
                  </div>
                  <div style={estilosGlobais.barraProgresso}>
                    <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${cores.primaria}, #e8956d)`, borderRadius: '99px', transition: 'width 1s ease' }}/>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.75rem', color: cores.textoSuave }}>{moeda(meta.atual)}</span>
                    <span style={{ fontSize: '0.75rem', color: cores.textoSuave }}>{moeda(meta.total)}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Cartões */}
          <div style={estilosGlobais.card}>
            <div style={estilosGlobais.secaoTitulo}>Cartões de crédito</div>
            {cartoes.map((cartao, i) => {
              const pct = Math.round((cartao.usado / cartao.limite) * 100)
              const cor = pct > 70 ? cores.vermelho : pct > 40 ? cores.primaria : cores.verde
              return (
                <div key={i} style={{ marginBottom: i < cartoes.length - 1 ? '24px' : '0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, color: cores.texto }}>💳 {cartao.nome}</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: cor }}>{pct}% usado</span>
                  </div>
                  <div style={estilosGlobais.barraProgresso}>
                    <div style={{ height: '100%', width: `${pct}%`, background: cor, borderRadius: '99px', transition: 'width 1s ease' }}/>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.75rem', color: cores.textoSuave }}>Usado: {moeda(cartao.usado)}</span>
                    <span style={{ fontSize: '0.75rem', color: cores.textoSuave }}>Limite: {moeda(cartao.limite)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Alertas */}
        <div style={estilosGlobais.card}>
          <div style={estilosGlobais.secaoTitulo}>Alertas</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {alertas.map((alerta, i) => (
              <div key={i} style={alerta.tipo === 'urgente' ? estilos.alertaUrgente : estilos.alertaAviso}>
                <span style={{ fontSize: '1rem' }}>{alerta.tipo === 'urgente' ? '🔴' : '⚠️'}</span>
                <span style={{ fontSize: '0.85rem', color: cores.texto, fontWeight: 500 }}>{alerta.texto}</span>
              </div>
            ))}
          </div>
        </div>

      </main>

      <style>{responsivo}</style>
    </div>
  )
}