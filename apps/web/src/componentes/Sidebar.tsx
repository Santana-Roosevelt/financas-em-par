import React, { useState } from 'react'

const menuItems = [
  { icon: '📊', label: 'Dashboard', path: '/dashboard', ativo: true },
  { icon: '💸', label: 'Despesas', path: '/despesas', ativo: false },
  { icon: '💳', label: 'Cartões', path: '/cartoes', ativo: false },
  { icon: '🎯', label: 'Metas', path: '/metas', ativo: false },
  { icon: '📈', label: 'Relatórios', path: '/relatorios', ativo: false },
  { icon: '⚙️', label: 'Perfil', path: '/perfil', ativo: false },
]

interface SidebarProps {
  paginaAtiva?: string
  nomeUsuario?: string
  nomeCasal?: string
}

export default function Sidebar({ paginaAtiva = 'dashboard', nomeUsuario = 'Roosevelt', nomeCasal = 'Casal Silva' }: SidebarProps) {
  const [aberta, setAberta] = useState(true)

  return (
    <>
      {/* ── Sidebar Desktop ── */}
      <aside style={{
        width: aberta ? '240px' : '72px',
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
          {aberta && (
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
            onClick={() => setAberta(!aberta)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.4)', fontSize: '1.2rem',
              padding: '4px', marginLeft: aberta ? '0' : 'auto',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '32px',
            }}
          >
            {aberta ? '←' : '→'}
          </button>
        </div>

        {/* Menu items */}
        <nav style={{ flex: 1, padding: '0 12px' }}>
          {menuItems.map((item, i) => {
            const ativo = item.path === `/${paginaAtiva}`
            return (
              <a key={i} href={item.path} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                borderRadius: '12px',
                marginBottom: '4px',
                textDecoration: 'none',
                background: ativo ? 'rgba(196,121,58,0.15)' : 'transparent',
                border: ativo ? '1px solid rgba(196,121,58,0.3)' : '1px solid transparent',
                transition: 'all 0.15s',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                if (!ativo) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
              }}
              onMouseLeave={e => {
                if (!ativo) e.currentTarget.style.background = 'transparent'
              }}
              >
                <span style={{ fontSize: '1.1rem', flexShrink: 0, width: '24px', textAlign: 'center' }}>
                  {item.icon}
                </span>
                {aberta && (
                  <span style={{
                    fontSize: '0.88rem',
                    fontWeight: ativo ? 700 : 500,
                    color: ativo ? '#c4793a' : 'rgba(255,255,255,0.6)',
                    whiteSpace: 'nowrap',
                  }}>
                    {item.label}
                  </span>
                )}
              </a>
            )
          })}
        </nav>

        {/* Usuário */}
        {aberta && (
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
              {nomeUsuario.charAt(0)}
            </div>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'white' }}>{nomeUsuario}</div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>{nomeCasal}</div>
            </div>
          </div>
        )}
      </aside>

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
        {menuItems.slice(0, 5).map((item, i) => {
          const ativo = item.path === `/${paginaAtiva}`
          return (
            <a key={i} href={item.path} style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '4px',
              textDecoration: 'none',
            }}>
              <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
              <span style={{
                fontSize: '0.6rem', fontWeight: 700,
                color: ativo ? '#c4793a' : 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>
                {item.label}
              </span>
            </a>
          )
        })}
      </nav>
    </>
  )
}