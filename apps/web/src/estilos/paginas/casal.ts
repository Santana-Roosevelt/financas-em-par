import React from 'react'
import { cores, fontes } from '../global'

export const estilosCasal = {
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

  card: {
    width: '100%',
    maxWidth: '520px',
    background: 'white',
    borderRadius: '32px',
    padding: '56px 48px',
    boxShadow: '0 32px 80px rgba(45,31,14,0.12)',
    position: 'relative',
    zIndex: 1,
  } as React.CSSProperties,

  logo: {
    textAlign: 'center',
    marginBottom: '40px',
  } as React.CSSProperties,

  logoTexto: {
    fontFamily: fontes.titulo,
    fontSize: '1.8rem',
    fontWeight: 700,
    color: cores.texto,
  } as React.CSSProperties,

  titulo: {
    fontSize: '1.6rem',
    fontWeight: 700,
    color: cores.texto,
    fontFamily: fontes.titulo,
    marginBottom: '8px',
    textAlign: 'center',
  } as React.CSSProperties,

  subtitulo: {
    fontSize: '0.9rem',
    color: cores.textoSuave,
    textAlign: 'center',
    marginBottom: '40px',
  } as React.CSSProperties,

  opcao: {
    padding: '24px',
    background: cores.fundoCard,
    border: `2px solid ${cores.fundoBorda}`,
    borderRadius: '18px',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s',
    fontFamily: fontes.corpo,
    width: '100%',
  } as React.CSSProperties,

  opcaoIcone: {
    width: '48px', height: '48px',
    borderRadius: '14px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  } as React.CSSProperties,

  opcaoTitulo: {
    fontWeight: 700,
    color: cores.texto,
    fontSize: '1rem',
    marginBottom: '2px',
  } as React.CSSProperties,

  opcaoSubtitulo: {
    fontSize: '0.82rem',
    color: cores.textoSuave,
  } as React.CSSProperties,

  botaoVoltar: {
    background: 'none', border: 'none', cursor: 'pointer',
    color: cores.textoSuave, fontSize: '0.85rem', fontWeight: 600,
    marginBottom: '24px', padding: 0, display: 'flex',
    alignItems: 'center', gap: '6px',
    fontFamily: fontes.corpo,
  } as React.CSSProperties,

  codigoBox: {
    background: cores.fundoCard,
    border: `2px dashed ${cores.primaria}`,
    borderRadius: '18px',
    padding: '24px',
    marginBottom: '32px',
    textAlign: 'center',
  } as React.CSSProperties,

  codigoLabel: {
    fontSize: '0.65rem', fontWeight: 700, color: cores.textoSuave,
    textTransform: 'uppercase', letterSpacing: '0.15em',
    marginBottom: '8px',
  } as React.CSSProperties,

  codigoValor: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '2rem', fontWeight: 700,
    color: cores.primaria, letterSpacing: '0.1em',
  } as React.CSSProperties,
}