import React, { useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const CORES_CATEGORIAS = ['#c4793a', '#a3be8c', '#8fa8c8', '#e8956d', '#b8a8c8']

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

const menuItems = [
  { icon: '📊', label: 'Dashboard', path: '/dashboard', ativo: true },
  { icon: '💸', label: 'Despesas', path: '/despesas', ativo: false },
  { icon: '💳', label: 'Cartões', path: '/cartoes', ativo: false },
  { icon: '🎯', label: 'Metas', path: '/metas', ativo: false },
  { icon: '📈', label: 'Relatórios', path: '/relatorios', ativo: false },
  { icon: '⚙️', label: 'Perfil', path: '/perfil', ativo: false },
]

export default function Dashboard() {
  const [menuAberto, setMenuAberto] = useState(true)

  const renda = 9000
  const gastos = 6350
  const saldo = renda - gastos
  const saldoPositivo = saldo >= 0

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#f5f0e8',
      fontFamily: "'DM Sans', sans-serif",
    }}>

      {/* ── Sidebar Desktop ── */}
      <aside style={{
        width: menuAberto ? '240px' : '72px',
        background: '#2d1f0e',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 0',
        transition: 'width 0.25s ease',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        height: '100vh',
        zIndex: 10,
      }}
      className="sidebar-desktop"
      >
        {/* Logo */}
        <div style={{
          padding: '0 20px 32px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {menuAberto && (
            <div style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'white',
              whiteSpace: 'nowrap',
            }}>
              Finanças <em style={{ color: '#c4793a', fontStyle: 'italic' }}>em Par</em>
            </div>
          )}
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.4)', fontSize: '1.2rem',
              padding: '4px', marginLeft: menuAberto ? '0' : 'auto',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '32px',
            }}
          >
            {menuAberto ? '←' : '→'}
          </button>
        </div>

        {/* Menu items */}
        <nav style={{ flex: 1, padding: '0 12px' }}>
          {menuItems.map((item, i) => (
            <a key={i} href={item.path} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              borderRadius: '12px',
              marginBottom: '4px',
              textDecoration: 'none',
              background: item.ativo ? 'rgba(196,121,58,0.15)' : 'transparent',
              border: item.ativo ? '1px solid rgba(196,121,58,0.3)' : '1px solid transparent',
              transition: 'all 0.15s',
              overflow: 'hidden',
            }}
            onMouseEnter={e => {
              if (!item.ativo) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
            }}
            onMouseLeave={e => {
              if (!item.ativo) e.currentTarget.style.background = 'transparent'
            }}
            >
              <span style={{ fontSize: '1.1rem', flexShrink: 0, width: '24px', textAlign: 'center' }}>
                {item.icon}
              </span>
              {menuAberto && (
                <span style={{
                  fontSize: '0.88rem',
                  fontWeight: item.ativo ? 700 : 500,
                  color: item.ativo ? '#c4793a' : 'rgba(255,255,255,0.6)',
                  whiteSpace: 'nowrap',
                }}>
                  {item.label}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Usuário */}
        {menuAberto && (
          <div style={{
            padding: '16px 20px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <div style={{
              width: '36px', height: '36px',
              background: 'linear-gradient(135deg, #c4793a, #a85e28)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.85rem', fontWeight: 700, color: 'white',
              flexShrink: 0,
            }}>
              R
            </div>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'white' }}>Roosevelt</div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>Casal Silva</div>
            </div>
          </div>
        )}
      </aside>

      {/* ── Conteúdo principal ── */}
      <main style={{
        flex: 1,
        padding: '32px',
        overflowY: 'auto',
        paddingBottom: '100px',
      }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
        }}>
          <div>
            <div style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '1.6rem',
              fontWeight: 700,
              color: '#2d1f0e',
              marginBottom: '4px',
            }}>
              Olá, Roosevelt 👋
            </div>
            <div style={{ fontSize: '0.85rem', color: '#a89880' }}>
              Aqui está o resumo financeiro de abril
            </div>
          </div>
          <button style={{
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #c4793a, #a85e28)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
            boxShadow: '0 4px 12px rgba(196,121,58,0.3)',
          }}>
            + Adicionar gasto
          </button>
        </div>

        {/* ── Cards de saldo ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '24px',
        }}
        className="cards-saldo"
        >
          {[
            { label: 'Renda do mês', valor: renda, cor: '#2d1f0e', icone: '💰' },
            { label: 'Gastos do mês', valor: gastos, cor: '#e85d5d', icone: '💸' },
            { label: 'Saldo restante', valor: saldo, cor: saldoPositivo ? '#5a9e5a' : '#e85d5d', icone: saldoPositivo ? '✅' : '⚠️' },
          ].map((card, i) => (
            <div key={i} style={{
              background: 'white',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 4px 16px rgba(45,31,14,0.06)',
              border: i === 2 ? `2px solid ${saldoPositivo ? 'rgba(90,158,90,0.2)' : 'rgba(232,93,93,0.2)'}` : '2px solid transparent',
            }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '8px' }}>{card.icone}</div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#a89880', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                {card.label}
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: card.cor, fontFamily: "'Fraunces', serif" }}>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(card.valor)}
              </div>
            </div>
          ))}
        </div>

        {/* ── Linha 2: Gráfico + Próximas contas ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '24px',
        }}
        className="linha-2"
        >

          {/* Gráfico donut */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 4px 16px rgba(45,31,14,0.06)',
          }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2d1f0e', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Gastos por categoria
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie
                    data={dadosCategorias}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    dataKey="valor"
                    paddingAngle={3}
                  >
                    {dadosCategorias.map((_, index) => (
                      <Cell key={index} fill={CORES_CATEGORIAS[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) =>
                      new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ flex: 1 }}>
                {dadosCategorias.map((cat, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '10px', height: '10px',
                        borderRadius: '50%',
                        background: CORES_CATEGORIAS[i],
                        flexShrink: 0,
                      }}/>
                      <span style={{ fontSize: '0.8rem', color: '#5a4a3a' }}>{cat.nome}</span>
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2d1f0e' }}>
                      {cat.percentual}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Próximas contas */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 4px 16px rgba(45,31,14,0.06)',
          }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2d1f0e', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Próximas contas
            </div>
            {proximasContas.map((conta, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 0',
                borderBottom: i < proximasContas.length - 1 ? '1px solid #f5f0e8' : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px', height: '40px',
                    background: '#faf7f3',
                    borderRadius: '10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', fontWeight: 700, color: '#c4793a',
                  }}>
                    {conta.data}
                  </div>
                  <span style={{ fontSize: '0.88rem', color: '#2d1f0e', fontWeight: 500 }}>
                    {conta.descricao}
                  </span>
                </div>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#e85d5d' }}>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(conta.valor)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Linha 3: Metas + Cartões ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '24px',
        }}
        className="linha-3"
        >

          {/* Metas */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 4px 16px rgba(45,31,14,0.06)',
          }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2d1f0e', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Metas financeiras
            </div>
            {metas.map((meta, i) => {
              const pct = Math.round((meta.atual / meta.total) * 100)
              return (
                <div key={i} style={{ marginBottom: i < metas.length - 1 ? '24px' : '0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#2d1f0e' }}>🎯 {meta.nome}</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#c4793a' }}>{pct}%</span>
                  </div>
                  <div style={{
                    height: '8px', background: '#f5f0e8',
                    borderRadius: '99px', overflow: 'hidden', marginBottom: '6px',
                  }}>
                    <div style={{
                      height: '100%', width: `${pct}%`,
                      background: 'linear-gradient(90deg, #c4793a, #e8956d)',
                      borderRadius: '99px',
                      transition: 'width 1s ease',
                    }}/>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.75rem', color: '#a89880' }}>
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(meta.atual)}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#a89880' }}>
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(meta.total)}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Cartões */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 4px 16px rgba(45,31,14,0.06)',
          }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2d1f0e', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Cartões de crédito
            </div>
            {cartoes.map((cartao, i) => {
              const pct = Math.round((cartao.usado / cartao.limite) * 100)
              const cor = pct > 70 ? '#e85d5d' : pct > 40 ? '#c4793a' : '#5a9e5a'
              return (
                <div key={i} style={{ marginBottom: i < cartoes.length - 1 ? '24px' : '0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#2d1f0e' }}>💳 {cartao.nome}</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: cor }}>{pct}% usado</span>
                  </div>
                  <div style={{
                    height: '8px', background: '#f5f0e8',
                    borderRadius: '99px', overflow: 'hidden', marginBottom: '6px',
                  }}>
                    <div style={{
                      height: '100%', width: `${pct}%`,
                      background: cor,
                      borderRadius: '99px',
                      transition: 'width 1s ease',
                    }}/>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.75rem', color: '#a89880' }}>
                      Usado: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartao.usado)}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#a89880' }}>
                      Limite: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartao.limite)}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Alertas ── */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 4px 16px rgba(45,31,14,0.06)',
        }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2d1f0e', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Alertas
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {alertas.map((alerta, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px 16px',
                background: alerta.tipo === 'urgente' ? '#fff5f5' : '#fffbf0',
                border: `1px solid ${alerta.tipo === 'urgente' ? 'rgba(232,93,93,0.2)' : 'rgba(196,121,58,0.2)'}`,
                borderRadius: '12px',
              }}>
                <span style={{ fontSize: '1rem' }}>
                  {alerta.tipo === 'urgente' ? '🔴' : '⚠️'}
                </span>
                <span style={{ fontSize: '0.85rem', color: '#2d1f0e', fontWeight: 500 }}>
                  {alerta.texto}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ── Bottom Navigation Mobile ── */}
      <nav style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        background: '#2d1f0e',
        padding: '12px 0 20px',
        display: 'none',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 100,
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
      className="bottom-nav"
      >
        {menuItems.slice(0, 5).map((item, i) => (
          <a key={i} href={item.path} style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '4px',
            textDecoration: 'none',
          }}>
            <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
            <span style={{
              fontSize: '0.6rem', fontWeight: 700,
              color: item.ativo ? '#c4793a' : 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase', letterSpacing: '0.05em',
            }}>
              {item.label}
            </span>
          </a>
        ))}
      </nav>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;1,700&family=DM+Sans:wght@400;500;600;700&display=swap');

        @media (max-width: 768px) {
          .sidebar-desktop { display: none !important; }
          .bottom-nav { display: flex !important; }
          .cards-saldo { grid-template-columns: 1fr !important; }
          .linha-2 { grid-template-columns: 1fr !important; }
          .linha-3 { grid-template-columns: 1fr !important; }
          main { padding: 20px 16px !important; }
        }
      `}</style>
    </div>
  )
}