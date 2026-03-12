import React from 'react'
import { cores, fontes } from '../global'

export const estilosCadastro = {
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

  painelFormulario: {
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
    marginBottom: '32px',
  } as React.CSSProperties,

  painelDecoratvo: {
    width: '42%',
    background: 'linear-gradient(160deg, #2d1f0e 0%, #3d2914 60%, #4a3420 100%)',
    padding: '56px 48px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  } as React.CSSProperties,

  textura: {
    position: 'absolute', inset: 0,
    backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(196,121,58,0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(232,149,109,0.1) 0%, transparent 50%)',
    pointerEvents: 'none',
  } as React.CSSProperties,

  logoTexto: {
    fontFamily: fontes.titulo,
    fontSize: '1.6rem',
    fontWeight: 700,
    color: 'white',
    letterSpacing: '-0.02em',
    lineHeight: 1,
  } as React.CSSProperties,

  frasePrincipal: {
    fontFamily: fontes.titulo,
    fontSize: '2.4rem',
    fontWeight: 700,
    color: 'white',
    lineHeight: 1.1,
    marginBottom: '16px',
  } as React.CSSProperties,

  fraseSubtitulo: {
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.45)',
    lineHeight: 1.7,
  } as React.CSSProperties,

  passoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  } as React.CSSProperties,

  passoNumero: {
    width: '32px', height: '32px',
    background: 'rgba(196,121,58,0.2)',
    border: '1px solid rgba(196,121,58,0.4)',
    borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: fontes.corpo,
    fontSize: '0.65rem',
    fontWeight: 700,
    color: cores.primaria,
    flexShrink: 0,
  } as React.CSSProperties,

  passoTexto: {
    fontSize: '0.88rem',
    color: 'rgba(255,255,255,0.6)',
    fontWeight: 500,
  } as React.CSSProperties,

  linkLogin: {
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