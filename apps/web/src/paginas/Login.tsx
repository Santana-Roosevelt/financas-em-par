import React, { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [verSenha, setVerSenha] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCarregando(true)
    setTimeout(() => setCarregando(false), 2000)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f0e8 0%, #ede8df 50%, #e8e0d4 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: "'DM Sans', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Blobs decorativos de fundo */}
      <div style={{
        position: 'absolute', top: '-120px', left: '-120px',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(196,121,58,0.08) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }}/>
      <div style={{
        position: 'absolute', bottom: '-100px', right: '-80px',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(163,190,140,0.1) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }}/>
      <div style={{
        position: 'absolute', top: '40%', right: '8%',
        width: '200px', height: '200px',
        background: 'radial-gradient(circle, rgba(232,149,109,0.07) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }}/>

      {/* Container principal — dois painéis */}
      <div style={{
        display: 'flex',
        width: '100%',
        maxWidth: '900px',
        minHeight: '580px',
        background: 'white',
        borderRadius: '32px',
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(45,31,14,0.12), 0 8px 24px rgba(45,31,14,0.06)',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* ── Painel Esquerdo ── */}
        <div style={{
          width: '48%',
          background: 'linear-gradient(160deg, #2d1f0e 0%, #3d2914 60%, #4a3420 100%)',
          padding: '56px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Textura de fundo */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(196,121,58,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(232,149,109,0.1) 0%, transparent 50%)',
            pointerEvents: 'none',
          }}/>

          {/* Logo */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '1.6rem',
              fontWeight: 700,
              color: 'white',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}>
              Finanças{' '}
              <em style={{ color: '#c4793a', fontStyle: 'italic' }}>em Par</em>
            </div>
          </div>

          {/* Frase principal */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '2.8rem',
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.1,
              marginBottom: '20px',
            }}>
              Juntos vamos<br/>
              <em style={{ color: '#c4793a', fontStyle: 'italic' }}>mais longe.</em>
            </div>
            <div style={{
              fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.7,
              maxWidth: '260px',
            }}>
              Organize as finanças do casal com clareza e parceria.
            </div>
          </div>

          {/* Espaço vazio para balancear */}
          <div/>
          

          {/* Barras de progresso animadas */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {[
              { label: 'ECONOMIA', cor: '#a3be8c', pct: 75 },
              { label: 'LAZER', cor: '#c4793a', pct: 45 },
              { label: 'METAS', cor: '#8fa8c8', pct: 60 },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: '14px' }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  marginBottom: '6px',
                }}>
                  <span style={{
                    fontSize: '0.62rem', fontWeight: 700,
                    color: 'rgba(255,255,255,0.4)',
                    letterSpacing: '0.12em',
                    fontFamily: "'DM Sans', sans-serif",
                  }}>{item.label}</span>
                  <span style={{
                    fontSize: '0.62rem', fontWeight: 700,
                    color: item.cor,
                    fontFamily: "'DM Sans', sans-serif",
                  }}>{item.pct}%</span>
                </div>
                <div style={{
                  height: '4px', background: 'rgba(255,255,255,0.08)',
                  borderRadius: '99px', overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%', width: `${item.pct}%`,
                    background: item.cor,
                    borderRadius: '99px',
                    animation: `crescer${i} 1.5s ease forwards`,
                    animationDelay: `${i * 0.2}s`,
                  }}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Painel Direito — Formulário ── */}
        <div style={{
          flex: 1,
          padding: '56px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#fdfcfa',
        }}>

          <div style={{
            fontSize: '1.6rem',
            fontWeight: 700,
            color: '#2d1f0e',
            fontFamily: "'Fraunces', serif",
            marginBottom: '4px',
          }}>
            Entrar na conta
          </div>
          <div style={{
            fontSize: '0.88rem',
            color: '#a89880',
            marginBottom: '36px',
          }}>
            Acesse o painel do casal
          </div>

          <form onSubmit={handleSubmit}>

            {/* Campo E-mail */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '0.7rem',
                fontWeight: 700,
                color: '#8a7060',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '8px',
              }}>
                E-mail
              </label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '2px solid #ede8df',
                  borderRadius: '14px',
                  fontSize: '0.95rem',
                  color: '#2d1f0e',
                  background: '#faf7f3',
                  outline: 'none',
                  fontFamily: "'DM Sans', sans-serif",
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = '#c4793a'}
                onBlur={e => e.target.style.borderColor = '#ede8df'}
              />
            </div>

            {/* Campo Senha */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#8a7060',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}>
                  Senha
                </label>
                <a href="#" style={{
                  fontSize: '0.75rem',
                  color: '#c4793a',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}>
                  Esqueceu?
                </a>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={verSenha ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 48px 14px 16px',
                    border: '2px solid #ede8df',
                    borderRadius: '14px',
                    fontSize: '0.95rem',
                    color: '#2d1f0e',
                    background: '#faf7f3',
                    outline: 'none',
                    fontFamily: "'DM Sans', sans-serif",
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = '#c4793a'}
                  onBlur={e => e.target.style.borderColor = '#ede8df'}
                />
                <button
                  type="button"
                  onClick={() => setVerSenha(!verSenha)}
                  style={{
                    position: 'absolute', right: '14px', top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#c4b8a8', fontSize: '1.1rem', padding: '4px',
                  }}
                >
                  {verSenha ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Botão entrar */}
            <button
              type="submit"
              disabled={carregando}
              style={{
                width: '100%',
                padding: '15px',
                background: carregando
                  ? '#d4a87a'
                  : 'linear-gradient(135deg, #c4793a, #a85e28)',
                color: 'white',
                border: 'none',
                borderRadius: '14px',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: carregando ? 'not-allowed' : 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: '0.02em',
                transition: 'transform 0.15s, box-shadow 0.15s',
                boxShadow: carregando ? 'none' : '0 8px 24px rgba(196,121,58,0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
              onMouseEnter={e => {
                if (!carregando) {
                  (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)'
                  ;(e.target as HTMLButtonElement).style.boxShadow = '0 12px 28px rgba(196,121,58,0.45)'
                }
              }}
              onMouseLeave={e => {
                ;(e.target as HTMLButtonElement).style.transform = 'translateY(0)'
                ;(e.target as HTMLButtonElement).style.boxShadow = '0 8px 24px rgba(196,121,58,0.35)'
              }}
            >
              {carregando ? (
                <>
                  <span style={{
                    width: '16px', height: '16px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white',
                    borderRadius: '50%',
                    display: 'inline-block',
                    animation: 'girar 0.7s linear infinite',
                  }}/>
                  Entrando...
                </>
              ) : (
                'Entrar agora →'
              )}
            </button>

          </form>

          {/* Divisor */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            margin: '24px 0',
          }}>
            <div style={{ flex: 1, height: '1px', background: '#ede8df' }}/>
            <span style={{ fontSize: '0.75rem', color: '#c4b8a8' }}>ou</span>
            <div style={{ flex: 1, height: '1px', background: '#ede8df' }}/>
          </div>

          {/* Botão Google */}
          <button style={{
            width: '100%',
            padding: '13px',
            background: 'white',
            color: '#2d1f0e',
            border: '2px solid #ede8df',
            borderRadius: '14px',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => {
            (e.currentTarget).style.borderColor = '#c4b8a8'
            ;(e.currentTarget).style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)'
          }}
          onMouseLeave={e => {
            (e.currentTarget).style.borderColor = '#ede8df'
            ;(e.currentTarget).style.boxShadow = 'none'
          }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuar com Google
          </button>

          {/* Link cadastro */}
          <div style={{
            textAlign: 'center',
            marginTop: '24px',
            fontSize: '0.85rem',
            color: '#a89880',
          }}>
            Ainda não tem conta?{' '}
            <a href="/cadastro" style={{
              color: '#c4793a',
              fontWeight: 700,
              textDecoration: 'none',
            }}>
              Criar conta grátis
            </a>
          </div>

        </div>
      </div>

      {/* Animações CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;1,700&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes girar { to { transform: rotate(360deg); } }
        @keyframes crescer0 { from { width: 0 } to { width: 75% } }
        @keyframes crescer1 { from { width: 0 } to { width: 45% } }
        @keyframes crescer2 { from { width: 0 } to { width: 60% } }
      `}</style>
    </div>
  )
}