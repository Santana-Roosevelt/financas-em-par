import React, { useState } from 'react'
import { estilosCasal } from '../estilos/paginas/casal'
import { estilosGlobais, responsivo } from '../estilos/global'

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
    setTimeout(() => { setCarregando(false); setCodigoCriado('PAR-7K3M') }, 1500)
  }

  const handleEntrarCasal = (e: React.FormEvent) => {
    e.preventDefault()
    setCarregando(true)
    setTimeout(() => setCarregando(false), 1500)
  }

  return (
    <div style={estilosCasal.pagina}>

      <div style={{ position: 'absolute', top: '-120px', left: '-120px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(196,121,58,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', bottom: '-100px', right: '-80px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(163,190,140,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }}/>

      <div style={estilosCasal.card}>

        {/* Logo */}
        <div style={estilosCasal.logo}>
          <div style={estilosCasal.logoTexto}>
            Finanças <em style={{ color: '#c4793a', fontStyle: 'italic' }}>em Par</em>
          </div>
        </div>

        {/* ── Etapa: Escolha ── */}
        {etapa === 'escolha' && (
          <div>
            <div style={estilosCasal.titulo}>Bem-vindo ao casal! 💑</div>
            <div style={estilosCasal.subtitulo}>Você quer criar um novo casal ou entrar em um já existente?</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { etapa: 'criar' as Etapa, cor: 'linear-gradient(135deg, #c4793a, #a85e28)', icone: '+', titulo: 'Criar novo casal', sub: 'Gere um código e convide seu parceiro(a)' },
                { etapa: 'entrar' as Etapa, cor: 'linear-gradient(135deg, #8fa8c8, #6b8aaa)', icone: '→', titulo: 'Entrar em um casal', sub: 'Use o código de convite do seu parceiro(a)' },
              ].map((item, i) => (
                <button key={i} onClick={() => setEtapa(item.etapa)} style={estilosCasal.opcao}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#c4793a'; e.currentTarget.style.background = '#fff7f0' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#ede8df'; e.currentTarget.style.background = '#faf7f3' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ ...estilosCasal.opcaoIcone, background: item.cor }}>
                      <span style={{ color: 'white', fontSize: '1.2rem', fontWeight: 700 }}>{item.icone}</span>
                    </div>
                    <div>
                      <div style={estilosCasal.opcaoTitulo}>{item.titulo}</div>
                      <div style={estilosCasal.opcaoSubtitulo}>{item.sub}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Etapa: Criar casal ── */}
        {etapa === 'criar' && !codigoCriado && (
          <div>
            <button onClick={() => setEtapa('escolha')} style={estilosCasal.botaoVoltar}>← Voltar</button>
            <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#2d1f0e', fontFamily: "'Fraunces', serif", marginBottom: '8px' }}>Criar novo casal</div>
            <div style={{ fontSize: '0.9rem', color: '#a89880', marginBottom: '32px' }}>Dê um nome pro casal de vocês</div>

            <form onSubmit={handleCriarCasal}>
              <div style={{ marginBottom: '28px' }}>
                <label style={estilosGlobais.label}>Nome do casal</label>
                <input type="text" placeholder="Ex: Casal Silva, Nós dois..." value={nomeCasal} onChange={e => setNomeCasal(e.target.value)}
                  style={estilosGlobais.input}
                  onFocus={e => e.target.style.borderColor = '#c4793a'}
                  onBlur={e => e.target.style.borderColor = '#ede8df'}
                />
              </div>
              <button type="submit" disabled={carregando || !nomeCasal}
                style={{ ...estilosGlobais.botaoPrimario, opacity: !nomeCasal ? 0.5 : 1, cursor: !nomeCasal ? 'not-allowed' : 'pointer' }}>
                {carregando ? 'Criando...' : 'Criar casal →'}
              </button>
            </form>
          </div>
        )}

        {/* ── Etapa: Código gerado ── */}
        {etapa === 'criar' && codigoCriado && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '72px', height: '72px', background: 'linear-gradient(135deg, #a3be8c, #6a9e5a)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 8px 24px rgba(106,158,90,0.3)' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#2d1f0e', fontFamily: "'Fraunces', serif", marginBottom: '8px' }}>Casal criado! 🎉</div>
            <div style={{ fontSize: '0.9rem', color: '#a89880', marginBottom: '32px' }}>Compartilhe esse código com seu parceiro(a)</div>

            <div style={estilosCasal.codigoBox}>
              <div style={estilosCasal.codigoLabel}>Código de convite</div>
              <div style={estilosCasal.codigoValor}>{codigoCriado}</div>
            </div>

            <a href="/dashboard" style={{ ...estilosGlobais.botaoPrimario, textDecoration: 'none' }}>
              Ir para o Dashboard →
            </a>
          </div>
        )}

        {/* ── Etapa: Entrar no casal ── */}
        {etapa === 'entrar' && (
          <div>
            <button onClick={() => setEtapa('escolha')} style={estilosCasal.botaoVoltar}>← Voltar</button>
            <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#2d1f0e', fontFamily: "'Fraunces', serif", marginBottom: '8px' }}>Entrar no casal</div>
            <div style={{ fontSize: '0.9rem', color: '#a89880', marginBottom: '32px' }}>Digite o código que seu parceiro(a) compartilhou</div>

            <form onSubmit={handleEntrarCasal}>
              <div style={{ marginBottom: '28px' }}>
                <label style={estilosGlobais.label}>Código de convite</label>
                <input type="text" placeholder="Ex: PAR-7K3M" value={codigoConvite}
                  onChange={e => setCodigoConvite(e.target.value.toUpperCase())}
                  maxLength={8}
                  style={{ ...estilosGlobais.input, fontSize: '1.2rem', letterSpacing: '0.15em', textAlign: 'center', fontFamily: "'Space Mono', monospace" }}
                  onFocus={e => e.target.style.borderColor = '#c4793a'}
                  onBlur={e => e.target.style.borderColor = '#ede8df'}
                />
              </div>
              <button type="submit" disabled={carregando || codigoConvite.length < 8}
                style={{ ...estilosGlobais.botaoPrimario, opacity: codigoConvite.length < 8 ? 0.5 : 1, cursor: codigoConvite.length < 8 ? 'not-allowed' : 'pointer' }}>
                {carregando ? 'Entrando...' : 'Entrar no casal →'}
              </button>
            </form>
          </div>
        )}

      </div>

      <style>{responsivo}</style>
    </div>
  )
}