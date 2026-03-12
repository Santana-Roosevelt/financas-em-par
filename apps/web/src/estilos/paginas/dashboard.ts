import React from 'react'

export const estilos = {
  pagina: {
    display: 'flex',
    minHeight: '100vh',
    background: '#f5f0e8',
    fontFamily: "'DM Sans', sans-serif",
  } as React.CSSProperties,

  conteudo: {
    flex: 1,
    padding: '32px',
    overflowY: 'auto',
    paddingBottom: '100px',
  } as React.CSSProperties,

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  } as React.CSSProperties,

  headerTitulo: {
    fontFamily: "'Fraunces', serif",
    fontSize: '1.6rem',
    fontWeight: 700,
    color: '#2d1f0e',
    marginBottom: '4px',
  } as React.CSSProperties,

  headerSubtitulo: {
    fontSize: '0.85rem',
    color: '#a89880',
  } as React.CSSProperties,

  botaoAdicionar: {
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
  } as React.CSSProperties,

  gradeCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '24px',
  } as React.CSSProperties,

  card: {
    background: 'white',
    borderRadius: '20px',
    padding: '24px',
    boxShadow: '0 4px 16px rgba(45,31,14,0.06)',
    border: '2px solid transparent',
  } as React.CSSProperties,

  cardIcone: {
    fontSize: '1.4rem',
    marginBottom: '8px',
  } as React.CSSProperties,

  cardLabel: {
    fontSize: '0.72rem',
    fontWeight: 700,
    color: '#a89880',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '8px',
  } as React.CSSProperties,

  cardValor: {
    fontSize: '1.6rem',
    fontWeight: 700,
    fontFamily: "'Fraunces', serif",
  } as React.CSSProperties,

  grade2colunas: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '24px',
  } as React.CSSProperties,

  secao: {
    background: 'white',
    borderRadius: '20px',
    padding: '24px',
    boxShadow: '0 4px 16px rgba(45,31,14,0.06)',
  } as React.CSSProperties,

  secaoTitulo: {
    fontSize: '0.8rem',
    fontWeight: 700,
    color: '#2d1f0e',
    marginBottom: '20px',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  } as React.CSSProperties,

  barraFundo: {
    height: '8px',
    background: '#f5f0e8',
    borderRadius: '99px',
    overflow: 'hidden',
    marginBottom: '6px',
  } as React.CSSProperties,

  alertaAviso: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    background: '#fffbf0',
    border: '1px solid rgba(196,121,58,0.2)',
    borderRadius: '12px',
  } as React.CSSProperties,

  alertaUrgente: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    background: '#fff5f5',
    border: '1px solid rgba(232,93,93,0.2)',
    borderRadius: '12px',
  } as React.CSSProperties,
}
