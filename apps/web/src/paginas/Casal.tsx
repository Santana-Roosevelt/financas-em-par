import React, { useState } from 'react'

type Etapa = 'escolha' | 'criar' | 'entrar'

export default function Casal() {
  const [etapa, setEtapa] = useState<Etapa>('escolha')
  const [nomeCasal, setNomeCasal] = useState('')
  const [codigoConvite, setCodigoConvite] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [codigoCriado, setCodigoCriado] = useState('')

  const handleCriarCasal = (e: React.FormEvent) => {
    e.preventDefault()
    setCarregando(true)
    setTimeout(() => {
      setCarregando(false)
      setCodigoCriado('PAR-7K3M')
    }, 1500)
  }

  const handleEntrarCasal = (e: React.FormEvent) => {
    e.preventDefault()
    setCarregando(true)
    setTimeout(() => setCarregando(false), 1500)
  }

  const estiloContainer: React.CSSProperties = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f0e8 0%, #ede8df 50%, #e8e0d4 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    fontFamily: "'DM Sans', sans-serif",
    position: 'relative',
    overflow: 'hidden',
  }

  return (
    <div style={estiloContainer}>

      {/* Blobs decorativos */}
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

      {/* Card principal */}
      <div style={{
        width: '100%',
        maxWidth: '520px',
        background: 'white',
        borderRadius: '32px',
        padding: '56px 48px',
        boxShadow: '0 32px 80px rgba(45,31,14,0.12)',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* Logo */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
        }}>
          <div style={{
            fontFamily: "'Fraunces', serif",
            fontSize: '1.9rem',
            fontWeight: 700,
            color: '#2d1f0e',
          }}>
            Finanças <em style={{ color: '#c4793a', fontStyle: 'italic' }}>em Par</em>
          </div>
        </div>

        {/* ── ETAPA 1: Escolha ── */}
        {etapa === 'escolha' && (
          <div> 
            <div style={{
              textAlign: 'center',
              marginBottom: '40px',
            }}>
              <div style={{
                fontSize: '1.6rem',
                fontWeight: 700,
                color: '#2d1f0e',
                fontFamily: "'Fraunces', serif",
                marginBottom: '8px',
              }}>
                Bem-vindo ao casal! 💑
              </div>
              <div style={{ fontSize: '0.9rem', color: '#a89880' }}>
                Você quer criar um novo casal ou entrar em um já existente?
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Opção criar */}
              <button
                onClick={() => setEtapa('criar')}
                style={{
                  padding: '24px',
                  background: '#faf7f3',
                  border: '2px solid #ede8df',
                  borderRadius: '18px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#c4793a'
                  e.currentTarget.style.background = '#fff7f0'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#ede8df'
                  e.currentTarget.style.background = '#faf7f3'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '48px', height: '48px',
                    background: 'linear-gradient(135deg, #c4793a, #a85e28)',
                    borderRadius: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#2d1f0e', fontSize: '1rem', marginBottom: '2px' }}>
                      Criar novo casal
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#a89880' }}>
                      Gere um código e convide seu parceiro(a)
                    </div>
                  </div>
                </div>
              </button>

              {/* Opção entrar */}
              <button
                onClick={() => setEtapa('entrar')}
                style={{
                  padding: '24px',
                  background: '#faf7f3',
                  border: '2px solid #ede8df',
                  borderRadius: '18px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#c4793a'
                  e.currentTarget.style.background = '#fff7f0'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#ede8df'
                  e.currentTarget.style.background = '#faf7f3'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '48px', height: '48px',
                    background: 'linear-gradient(135deg, #8fa8c8, #6b8aaa)',
                    borderRadius: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                      <polyline points="10 17 15 12 10 7"/>
                      <line x1="15" y1="12" x2="3" y2="12"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#2d1f0e', fontSize: '1rem', marginBottom: '2px' }}>
                      Entrar em um casal
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#a89880' }}>
                      Use o código de convite do seu parceiro(a)
                    </div>
                  </div>
                </div>
              </button>

            </div>
          </div>
        )}

        {/* ── ETAPA 2: Criar casal ── */}
        {etapa === 'criar' && !codigoCriado && (
          <div>
            <button
              onClick={() => setEtapa('escolha')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#a89880', fontSize: '0.85rem', fontWeight: 600,
                marginBottom: '24px', padding: 0, display: 'flex',
                alignItems: 'center', gap: '6px',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              ← Voltar
            </button>

            <div style={{ marginBottom: '32px' }}>
              <div style={{
                fontSize: '1.6rem', fontWeight: 700,
                color: '#2d1f0e', fontFamily: "'Fraunces', serif",
                marginBottom: '8px',
              }}>
                Criar novo casal
              </div>
              <div style={{ fontSize: '0.9rem', color: '#a89880' }}>
                Dê um nome pro casal de vocês
              </div>
            </div>

            <form onSubmit={handleCriarCasal}>
              <div style={{ marginBottom: '28px' }}>
                <label style={{
                  display: 'block', fontSize: '0.7rem', fontWeight: 700,
                  color: '#8a7060', textTransform: 'uppercase',
                  letterSpacing: '0.1em', marginBottom: '8px',
                }}>
                  Nome do casal
                </label>
                <input
                  type="text"
                  placeholder="Ex: Casal Silva, Nós dois..."
                  value={nomeCasal}
                  onChange={e => setNomeCasal(e.target.value)}
                  style={{
                    width: '100%', padding: '14px 16px',
                    border: '2px solid #ede8df', borderRadius: '14px',
                    fontSize: '0.95rem', color: '#2d1f0e',
                    background: '#faf7f3', outline: 'none',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onFocus={e => e.target.style.borderColor = '#c4793a'}
                  onBlur={e => e.target.style.borderColor = '#ede8df'}
                />
              </div>

              <button
                type="submit"
                disabled={carregando || !nomeCasal}
                style={{
                  width: '100%', padding: '15px',
                  background: !nomeCasal ? '#e8e0d4' : 'linear-gradient(135deg, #c4793a, #a85e28)',
                  color: !nomeCasal ? '#a89880' : 'white',
                  border: 'none', borderRadius: '14px',
                  fontSize: '0.95rem', fontWeight: 700,
                  cursor: !nomeCasal ? 'not-allowed' : 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: !nomeCasal ? 'none' : '0 8px 24px rgba(196,121,58,0.35)',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: '8px',
                  transition: 'all 0.2s',
                }}
              >
                {carregando ? (
                  <>
                    <span style={{
                      width: '16px', height: '16px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: 'white', borderRadius: '50%',
                      display: 'inline-block',
                      animation: 'girar 0.7s linear infinite',
                    }}/>
                    Criando...
                  </>
                ) : 'Criar casal →'}
              </button>
            </form>
          </div>
        )}

        {/* ── ETAPA 3: Código gerado ── */}
        {etapa === 'criar' && codigoCriado && (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '72px', height: '72px',
              background: 'linear-gradient(135deg, #a3be8c, #6a9e5a)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px',
              boxShadow: '0 8px 24px rgba(106,158,90,0.3)',
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>

            <div style={{
              fontSize: '1.5rem', fontWeight: 700,
              color: '#2d1f0e', fontFamily: "'Fraunces', serif",
              marginBottom: '8px',
            }}>
              Casal criado! 🎉
            </div>
            <div style={{ fontSize: '0.9rem', color: '#a89880', marginBottom: '32px' }}>
              Compartilhe esse código com seu parceiro(a)
            </div>

            <div style={{
              background: '#faf7f3',
              border: '2px dashed #c4793a',
              borderRadius: '18px',
              padding: '24px',
              marginBottom: '32px',
            }}>
              <div style={{
                fontSize: '0.65rem', fontWeight: 700, color: '#a89880',
                textTransform: 'uppercase', letterSpacing: '0.15em',
                marginBottom: '8px',
              }}>
                Código de convite
              </div>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '2rem', fontWeight: 700,
                color: '#c4793a', letterSpacing: '0.1em',
              }}>
                {codigoCriado}
              </div>
            </div>

            <a href="/dashboard" style={{
              display: 'block', width: '100%', padding: '15px',
              background: 'linear-gradient(135deg, #c4793a, #a85e28)',
              color: 'white', border: 'none', borderRadius: '14px',
              fontSize: '0.95rem', fontWeight: 700,
              fontFamily: "'DM Sans', sans-serif",
              textDecoration: 'none', textAlign: 'center',
              boxShadow: '0 8px 24px rgba(196,121,58,0.35)',
            }}>
              Ir para o Dashboard →
            </a>
          </div>
        )}

        {/* ── ETAPA 4: Entrar no casal ── */}
        {etapa === 'entrar' && (
          <div>
            <button
              onClick={() => setEtapa('escolha')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#a89880', fontSize: '0.85rem', fontWeight: 600,
                marginBottom: '24px', padding: 0, display: 'flex',
                alignItems: 'center', gap: '6px',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              ← Voltar
            </button>

            <div style={{ marginBottom: '32px' }}>
              <div style={{
                fontSize: '1.6rem', fontWeight: 700,
                color: '#2d1f0e', fontFamily: "'Fraunces', serif",
                marginBottom: '8px',
              }}>
                Entrar no casal
              </div>
              <div style={{ fontSize: '0.9rem', color: '#a89880' }}>
                Digite o código que seu parceiro(a) compartilhou
              </div>
            </div>

            <form onSubmit={handleEntrarCasal}>
              <div style={{ marginBottom: '28px' }}>
                <label style={{
                  display: 'block', fontSize: '0.7rem', fontWeight: 700,
                  color: '#8a7060', textTransform: 'uppercase',
                  letterSpacing: '0.1em', marginBottom: '8px',
                }}>
                  Código de convite
                </label>
                <input
                  type="text"
                  placeholder="Ex: PAR-7K3M"
                  value={codigoConvite}
                  onChange={e => setCodigoConvite(e.target.value.toUpperCase())}
                  maxLength={8}
                  style={{
                    width: '100%', padding: '14px 16px',
                    border: '2px solid #ede8df', borderRadius: '14px',
                    fontSize: '1.2rem', color: '#2d1f0e',
                    background: '#faf7f3', outline: 'none',
                    fontFamily: "'Space Mono', monospace",
                    letterSpacing: '0.15em', textAlign: 'center',
                  }}
                  onFocus={e => e.target.style.borderColor = '#c4793a'}
                  onBlur={e => e.target.style.borderColor = '#ede8df'}
                />
              </div>

              <button
                type="submit"
                disabled={carregando || codigoConvite.length < 8}
                style={{
                  width: '100%', padding: '15px',
                  background: codigoConvite.length < 8 ? '#e8e0d4' : 'linear-gradient(135deg, #c4793a, #a85e28)',
                  color: codigoConvite.length < 8 ? '#a89880' : 'white',
                  border: 'none', borderRadius: '14px',
                  fontSize: '0.95rem', fontWeight: 700,
                  cursor: codigoConvite.length < 8 ? 'not-allowed' : 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: codigoConvite.length < 8 ? 'none' : '0 8px 24px rgba(196,121,58,0.35)',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: '8px',
                  transition: 'all 0.2s',
                }}
              >
                {carregando ? (
                  <>
                    <span style={{
                      width: '16px', height: '16px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: 'white', borderRadius: '50%',
                      display: 'inline-block',
                      animation: 'girar 0.7s linear infinite',
                    }}/>
                    Entrando...
                  </>
                ) : 'Entrar no casal →'}
              </button>
            </form>
          </div>
        )}

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;1,700&family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        @keyframes girar { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}