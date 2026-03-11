import React, { useState } from 'react'

export default function Cadastro() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
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

      {/* Blobs decorativos */}
      <div style={{
        position: 'absolute', top: '-120px', right: '-120px',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(196,121,58,0.08) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }}/>
      <div style={{
        position: 'absolute', bottom: '-100px', left: '-80px',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(163,190,140,0.1) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }}/>

      {/* Container principal */}
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
            Criar sua conta
          </div>
          <div style={{
            fontSize: '0.88rem',
            color: '#a89880',
            marginBottom: '32px',
          }}>
            Comece a organizar as finanças do casal
          </div>

          <form onSubmit={handleSubmit}>

            {/* Campo Nome */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '0.7rem',
                fontWeight: 700,
                color: '#8a7060',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '8px',
              }}>
                Seu nome
              </label>
              <input
                type="text"
                placeholder="Como você se chama?"
                value={nome}
                onChange={e => setNome(e.target.value)}
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
                }}
                onFocus={e => e.target.style.borderColor = '#c4793a'}
                onBlur={e => e.target.style.borderColor = '#ede8df'}
              />
            </div>

            {/* Campo E-mail */}
            <div style={{ marginBottom: '16px' }}>
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
                }}
                onFocus={e => e.target.style.borderColor = '#c4793a'}
                onBlur={e => e.target.style.borderColor = '#ede8df'}
              />
            </div>

            {/* Campos de senha lado a lado */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '28px' }}>
              <div style={{ flex: 1 }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#8a7060',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '8px',
                }}>
                  Senha
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={verSenha ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '14px 40px 14px 16px',
                      border: '2px solid #ede8df',
                      borderRadius: '14px',
                      fontSize: '0.95rem',
                      color: '#2d1f0e',
                      background: '#faf7f3',
                      outline: 'none',
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                    onFocus={e => e.target.style.borderColor = '#c4793a'}
                    onBlur={e => e.target.style.borderColor = '#ede8df'}
                  />
                  <button
                    type="button"
                    onClick={() => setVerSenha(!verSenha)}
                    style={{
                      position: 'absolute', right: '12px', top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: '#c4b8a8', fontSize: '1rem',
                    }}
                  >
                    {verSenha ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#8a7060',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '8px',
                }}>
                  Confirmar senha
                </label>
                <input
                  type={verSenha ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmarSenha}
                  onChange={e => setConfirmarSenha(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: confirmarSenha && confirmarSenha !== senha
                      ? '2px solid #e85d5d'
                      : confirmarSenha && confirmarSenha === senha
                      ? '2px solid #a3be8c'
                      : '2px solid #ede8df',
                    borderRadius: '14px',
                    fontSize: '0.95rem',
                    color: '#2d1f0e',
                    background: '#faf7f3',
                    outline: 'none',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onFocus={e => e.target.style.borderColor = '#c4793a'}
                  onBlur={e => {
                    e.target.style.borderColor = confirmarSenha && confirmarSenha !== senha
                      ? '#e85d5d'
                      : confirmarSenha && confirmarSenha === senha
                      ? '#a3be8c'
                      : '#ede8df'
                  }}
                />
                {confirmarSenha && confirmarSenha !== senha && (
                  <div style={{ fontSize: '0.72rem', color: '#e85d5d', marginTop: '4px' }}>
                    Senhas não coincidem
                  </div>
                )}
                {confirmarSenha && confirmarSenha === senha && (
                  <div style={{ fontSize: '0.72rem', color: '#a3be8c', marginTop: '4px' }}>
                    ✓ Senhas coincidem
                  </div>
                )}
              </div>
            </div>

            {/* Botão criar conta */}
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
                boxShadow: carregando ? 'none' : '0 8px 24px rgba(196,121,58,0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={e => {
                if (!carregando) {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(196,121,58,0.45)'
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(196,121,58,0.35)'
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
                  Criando conta...
                </>
              ) : (
                'Criar conta grátis →'
              )}
            </button>

          </form>

          {/* Link login */}
          <div style={{
            textAlign: 'center',
            marginTop: '24px',
            fontSize: '0.85rem',
            color: '#a89880',
          }}>
            Já tem conta?{' '}
            <a href="/" style={{
              color: '#c4793a',
              fontWeight: 700,
              textDecoration: 'none',
            }}>
              Entrar agora
            </a>
          </div>

        </div>

        {/* ── Painel Direito — Decorativo ── */}
        <div style={{
          width: '42%',
          background: 'linear-gradient(160deg, #2d1f0e 0%, #3d2914 60%, #4a3420 100%)',
          padding: '56px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(196,121,58,0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(232,149,109,0.1) 0%, transparent 50%)',
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

          {/* Frase */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '2.4rem',
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}>
              Começa hoje,<br/>
              <em style={{ color: '#c4793a', fontStyle: 'italic' }}>termina nunca.</em>
            </div>
            <div style={{
              fontSize: '0.9rem',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.7,
            }}>
              Crie sua conta e convide seu parceiro para organizar as finanças juntos.
            </div>
          </div>

          {/* Passos */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {[
              { num: '01', texto: 'Crie sua conta' },
              { num: '02', texto: 'Convide seu parceiro(a)' },
              { num: '03', texto: 'Organize juntos' },
            ].map((passo, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                marginBottom: i < 2 ? '16px' : '0',
              }}>
                <div style={{
                  width: '32px', height: '32px',
                  background: 'rgba(196,121,58,0.2)',
                  border: '1px solid rgba(196,121,58,0.4)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: '#c4793a',
                  flexShrink: 0,
                }}>
                  {passo.num}
                </div>
                <div style={{
                  fontSize: '0.88rem',
                  color: 'rgba(255,255,255,0.6)',
                  fontWeight: 500,
                }}>
                  {passo.texto}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;1,700&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes girar { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}