import React from 'react'
import { cores, fontes } from '../global'

export const estilosLogin = {
  pagina: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f0e8 0%, #ede8df 50%, #e8e0d4 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    fontFamily: fontes.corpo,
    position: 'relative',
    overflow: 'hidden',
  } as React.CSSProperties,

  blobTopEsquerda: {
    position: 'absolute', top: '-120px', left: '-120px',
    width: '500px', height: '500px',
    background: 'radial-gradient(circle, rgba(196,121,58,0.08) 0%, transparent 70%)',
    borderRadius: '50%', pointerEvents: 'none',
  } as React.CSSProperties,

  blobBottomDireita: {
    position: 'absolute', bottom: '-100px', right: '-80px',
    width: '400px', height: '400px',
    background: 'radial-gradient(circle, rgba(163,190,140,0.1) 0%, transparent 70%)',
    borderRadius: '50%', pointerEvents: 'none',
  } as React.CSSProperties,

  container: {
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
  } as React.CSSProperties,

  painelEsquerdo: {
    width: '48%',
    background: 'linear-gradient(160deg, #2d1f0e 0%, #3d2914 60%, #4a3420 100%)',
    padding: '56px 48px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  } as React.CSSProperties,

  painelEsquerdoTextura: {
    position: 'absolute', inset: 0,
    backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(196,121,58,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(232,149,109,0.1) 0%, transparent 50%)',
    pointerEvents: 'none',
  } as React.CSSProperties,

  logoTexto: {
    fontFamily: fontes.titulo,
    fontSize: '1.8rem',
    fontWeight: 700,
    color: 'white',
    letterSpacing: '-0.02em',
    lineHeight: 1,
  } as React.CSSProperties,

  logoEm: {
    color: cores.primaria,
    fontStyle: 'italic',
  } as React.CSSProperties,

  frasePrincipal: {
    fontFamily: fontes.titulo,
    fontSize: '2.6rem',
    fontWeight: 700,
    color: 'white',
    lineHeight: 1.1,
    marginBottom: '16px',
  } as React.CSSProperties,

  fraseDestaque: {
    color: cores.primaria,
    fontStyle: 'italic',
  } as React.CSSProperties,

  fraseSubtitulo: {
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.5)',
    lineHeight: 1.6,
    maxWidth: '260px',
  } as React.CSSProperties,

  painelDireito: {
    flex: 1,
    padding: '56px 48px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: '#fdfcfa',
  } as React.CSSProperties,

  titulo: {
    fontSize: '1.6rem',
    fontWeight: 700,
    color: cores.texto,
    fontFamily: fontes.titulo,
    marginBottom: '4px',
  } as React.CSSProperties,

  subtitulo: {
    fontSize: '0.88rem',
    color: cores.textoSuave,
    marginBottom: '36px',
  } as React.CSSProperties,

  divisor: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    margin: '24px 0',
  } as React.CSSProperties,

  divisorLinha: {
    flex: 1,
    height: '1px',
    background: cores.fundoBorda,
  } as React.CSSProperties,

  divisorTexto: {
    fontSize: '0.75rem',
    color: '#c4b8a8',
  } as React.CSSProperties,

  botaoGoogle: {
    width: '100%',
    padding: '13px',
    background: 'white',
    color: cores.texto,
    border: `2px solid ${cores.fundoBorda}`,
    borderRadius: '14px',
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: fontes.corpo,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  } as React.CSSProperties,

  linkCadastro: {
    textAlign: 'center',
    marginTop: '24px',
    fontSize: '0.85rem',
    color: cores.textoSuave,
  } as React.CSSProperties,

  link: {
    color: cores.primaria,
    fontWeight: 700,
    textDecoration: 'none',
  } as React.CSSProperties,
}