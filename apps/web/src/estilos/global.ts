import React from 'react'

export const cores = {
  primaria: '#c4793a',
  primariaEscura: '#a85e28',
  fundo: '#f5f0e8',
  fundoCard: '#faf7f3',
  fundoBorda: '#ede8df',
  texto: '#2d1f0e',
  textoSuave: '#a89880',
  textoLabel: '#8a7060',
  sidebar: '#2d1f0e',
  verde: '#5a9e5a',
  vermelho: '#e85d5d',
  azul: '#8fa8c8',
}

export const fontes = {
  titulo: "'Fraunces', serif",
  corpo: "'DM Sans', sans-serif",
}

export const estilosGlobais = {
  paginaComSidebar: {
    display: 'flex',
    minHeight: '100vh',
    background: cores.fundo,
    fontFamily: fontes.corpo,
  } as React.CSSProperties,

  conteudoPrincipal: {
    flex: 1,
    padding: '32px',
    overflowY: 'auto' as const,
    paddingBottom: '100px',
  } as React.CSSProperties,

  card: {
    background: 'white',
    borderRadius: '20px',
    padding: '24px',
    boxShadow: '0 4px 16px rgba(45,31,14,0.06)',
    border: '2px solid transparent',
  } as React.CSSProperties,

  secaoTitulo: {
    fontSize: '0.8rem',
    fontWeight: 700,
    color: cores.texto,
    marginBottom: '20px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
  } as React.CSSProperties,

  input: {
    width: '100%',
    padding: '14px 16px',
    border: '2px solid #ede8df',
    borderRadius: '14px',
    fontSize: '0.95rem',
    color: cores.texto,
    background: cores.fundoCard,
    outline: 'none',
    fontFamily: fontes.corpo,
  } as React.CSSProperties,

  label: {
    display: 'block',
    fontSize: '0.7rem',
    fontWeight: 700,
    color: cores.textoLabel,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    marginBottom: '8px',
  } as React.CSSProperties,

  botaoPrimario: {
    width: '100%',
    padding: '15px',
    background: 'linear-gradient(135deg, #c4793a, #a85e28)',
    color: 'white',
    border: 'none',
    borderRadius: '14px',
    fontSize: '0.95rem',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: fontes.corpo,
    boxShadow: '0 8px 24px rgba(196,121,58,0.35)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  } as React.CSSProperties,

  barraProgresso: {
    height: '8px',
    background: cores.fundo,
    borderRadius: '99px',
    overflow: 'hidden',
    marginBottom: '6px',
  } as React.CSSProperties,
}

export const responsivo = `
  * { box-sizing: border-box; }

  @media (max-width: 768px) {
    .sidebar-desktop { display: none !important; }
    .bottom-nav { display: flex !important; }
    .cards-saldo { grid-template-columns: 1fr !important; }
    .linha-2 { grid-template-columns: 1fr !important; }
    .linha-3 { grid-template-columns: 1fr !important; }
    .conteudo-principal { padding: 20px 16px !important; }
  }
`