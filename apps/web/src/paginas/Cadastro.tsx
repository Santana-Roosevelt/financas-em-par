import React, { useState } from 'react'
import { estilosCadastro } from '../estilos/paginas/cadastro'
import { estilosGlobais, responsivo } from '../estilos/global'

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
    <div style={estilosCadastro.pagina}>

      <div style={{ position: 'absolute', top: '-120px', right: '-120px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(196,121,58,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', bottom: '-100px', left: '-80px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(163,190,140,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }}/>

      <div style={estilosCadastro.container}>

        {/* Painel Formulário */}
        <div style={estilosCadastro.painelFormulario}>
          <div style={estilosCadastro.titulo}>Criar sua conta</div>
          <div style={estilosCadastro.subtitulo}>Comece a organizar as finanças do casal</div>

          <form onSubmit={handleSubmit}>

            <div style={{ marginBottom: '16px' }}>
              <label style={estilosGlobais.label}>Seu nome</label>
              <input type="text" placeholder="Como você se chama?" value={nome} onChange={e => setNome(e.target.value)} style={estilosGlobais.input}
                onFocus={e => e.target.style.borderColor = '#c4793a'}
                onBlur={e => e.target.style.borderColor = '#ede8df'}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={estilosGlobais.label}>E-mail</label>
              <input type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} style={estilosGlobais.input}
                onFocus={e => e.target.style.borderColor = '#c4793a'}
                onBlur={e => e.target.style.borderColor = '#ede8df'}
              />
            </div>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '28px' }}>
              <div style={{ flex: 1 }}>
                <label style={estilosGlobais.label}>Senha</label>
                <div style={{ position: 'relative' }}>
                  <input type={verSenha ? 'text' : 'password'} placeholder="••••••••" value={senha} onChange={e => setSenha(e.target.value)}
                    style={{ ...estilosGlobais.input, paddingRight: '40px' }}
                    onFocus={e => e.target.style.borderColor = '#c4793a'}
                    onBlur={e => e.target.style.borderColor = '#ede8df'}
                  />
                  <button type="button" onClick={() => setVerSenha(!verSenha)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
                    {verSenha ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <label style={estilosGlobais.label}>Confirmar senha</label>
                <input type={verSenha ? 'text' : 'password'} placeholder="••••••••" value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)}
                  style={{
                    ...estilosGlobais.input,
                    borderColor: confirmarSenha && confirmarSenha !== senha ? '#e85d5d' : confirmarSenha && confirmarSenha === senha ? '#a3be8c' : '#ede8df',
                  }}
                  onFocus={e => e.target.style.borderColor = '#c4793a'}
                  onBlur={e => e.target.style.borderColor = confirmarSenha && confirmarSenha !== senha ? '#e85d5d' : confirmarSenha && confirmarSenha === senha ? '#a3be8c' : '#ede8df'}
                />
                {confirmarSenha && confirmarSenha !== senha && <div style={{ fontSize: '0.72rem', color: '#e85d5d', marginTop: '4px' }}>Senhas não coincidem</div>}
                {confirmarSenha && confirmarSenha === senha && <div style={{ fontSize: '0.72rem', color: '#a3be8c', marginTop: '4px' }}>✓ Senhas coincidem</div>}
              </div>
            </div>

            <button type="submit" disabled={carregando} style={{ ...estilosGlobais.botaoPrimario, opacity: carregando ? 0.7 : 1 }}>
              {carregando ? 'Criando conta...' : 'Criar conta grátis →'}
            </button>

          </form>

          <div style={estilosCadastro.linkLogin}>
            Já tem conta?{' '}
            <a href="/" style={estilosCadastro.link}>Entrar agora</a>
          </div>
        </div>

        {/* Painel Decorativo */}
        <div style={estilosCadastro.painelDecoratvo}>
          <div style={estilosCadastro.textura}/>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={estilosCadastro.logoTexto}>
              Finanças <em style={{ color: '#c4793a', fontStyle: 'italic' }}>em Par</em>
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={estilosCadastro.frasePrincipal}>
              Começa hoje,<br/>
              <em style={{ color: '#c4793a', fontStyle: 'italic' }}>termina nunca.</em>
            </div>
            <div style={estilosCadastro.fraseSubtitulo}>
              Crie sua conta e convide seu parceiro para organizar as finanças juntos.
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            {[
              { num: '01', texto: 'Crie sua conta' },
              { num: '02', texto: 'Convide seu parceiro(a)' },
              { num: '03', texto: 'Organize juntos' },
            ].map((passo, i) => (
              <div key={i} style={{ ...estilosCadastro.passoItem, marginBottom: i < 2 ? '16px' : '0' }}>
                <div style={estilosCadastro.passoNumero}>{passo.num}</div>
                <div style={estilosCadastro.passoTexto}>{passo.texto}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{responsivo}</style>
    </div>
  )
}