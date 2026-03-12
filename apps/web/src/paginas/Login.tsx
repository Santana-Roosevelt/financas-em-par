import React, { useState } from 'react'
import { estilosLogin } from '../estilos/paginas/login'
import { estilosGlobais, responsivo } from '../estilos/global'

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
    <div style={estilosLogin.pagina}>

      <div style={estilosLogin.blobTopEsquerda}/>
      <div style={estilosLogin.blobBottomDireita}/>

      <div style={estilosLogin.container}>

        {/* Painel Esquerdo */}
        <div style={estilosLogin.painelEsquerdo}>
          <div style={estilosLogin.painelEsquerdoTextura}/>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={estilosLogin.logoTexto}>
              Finanças <em style={estilosLogin.logoEm}>em Par</em>
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={estilosLogin.frasePrincipal}>
              Juntos vamos<br/>
              <em style={estilosLogin.fraseDestaque}>mais longe.</em>
            </div>
            <div style={estilosLogin.fraseSubtitulo}>
              Organize as finanças do casal com clareza e parceria.
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            {[
              { label: 'ECONOMIA', cor: '#a3be8c', pct: 75 },
              { label: 'LAZER', cor: '#c4793a', pct: 45 },
              { label: 'METAS', cor: '#8fa8c8', pct: 60 },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.62rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em' }}>{item.label}</span>
                  <span style={{ fontSize: '0.62rem', fontWeight: 700, color: item.cor }}>{item.pct}%</span>
                </div>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${item.pct}%`, background: item.cor, borderRadius: '99px' }}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Painel Direito */}
        <div style={estilosLogin.painelDireito}>
          <div style={estilosLogin.titulo}>Entrar na conta</div>
          <div style={estilosLogin.subtitulo}>Acesse o painel do casal</div>

          <form onSubmit={handleSubmit}>

            <div style={{ marginBottom: '20px' }}>
              <label style={estilosGlobais.label}>E-mail</label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={estilosGlobais.input}
                onFocus={e => e.target.style.borderColor = '#c4793a'}
                onBlur={e => e.target.style.borderColor = '#ede8df'}
              />
            </div>

            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={estilosGlobais.label}>Senha</label>
                <a href="#" style={estilosLogin.link}>Esqueceu?</a>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={verSenha ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                  style={{ ...estilosGlobais.input, paddingRight: '48px' }}
                  onFocus={e => e.target.style.borderColor = '#c4793a'}
                  onBlur={e => e.target.style.borderColor = '#ede8df'}
                />
                <button type="button" onClick={() => setVerSenha(!verSenha)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>
                  {verSenha ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button type="submit" disabled={carregando} style={{ ...estilosGlobais.botaoPrimario, opacity: carregando ? 0.7 : 1 }}>
              {carregando ? 'Entrando...' : 'Entrar agora →'}
            </button>

          </form>

          <div style={estilosLogin.divisor}>
            <div style={estilosLogin.divisorLinha}/>
            <span style={estilosLogin.divisorTexto}>ou</span>
            <div style={estilosLogin.divisorLinha}/>
          </div>

          <button style={estilosLogin.botaoGoogle}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuar com Google
          </button>

          <div style={estilosLogin.linkCadastro}>
            Ainda não tem conta?{' '}
            <a href="/cadastro" style={estilosLogin.link}>Criar conta grátis</a>
          </div>

        </div>
      </div>

      <style>{responsivo}</style>
    </div>
  )
}