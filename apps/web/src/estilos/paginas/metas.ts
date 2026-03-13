import React from 'react'
import { cores, fontes } from '../global'

export const estilosMetas = {
  pagina: {
    display: 'flex',
    minHeight: '100vh',
    background: cores.fundo,
    fontFamily: fontes.corpo,
  } as React.CSSProperties,

  conteudo: {
    flex: 1,
    padding: '32px',
    overflowY: 'auto' as const,
    paddingBottom: '100px',
  } as React.CSSProperties,

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  } as React.CSSProperties,

  headerTitulo: {
    fontFamily: fontes.titulo,
    fontSize: '1.6rem',
    fontWeight: 700,
    color: cores.texto,
  } as React.CSSProperties,

  headerSubtitulo: {
    fontSize: '0.85rem',
    color: cores.textoSuave,
    marginTop: '4px',
  } as React.CSSProperties,

  botaoAdicionar: {
    padding: '10px 20px',
    background: `linear-gradient(135deg, ${cores.primaria}, ${cores.primariaEscura})`,
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '0.85rem',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: fontes.corpo,
    boxShadow: '0 4px 12px rgba(196,121,58,0.3)',
  } as React.CSSProperties,

  resumoCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '20px 24px',
    boxShadow: '0 4px 16px rgba(45,31,14,0.06)',
    marginBottom: '24px',
    display: 'flex',
    gap: '32px',
    flexWrap: 'wrap' as const,
  } as React.CSSProperties,

  resumoItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  } as React.CSSProperties,

  resumoLabel: {
    fontSize: '0.7rem',
    fontWeight: 700,
    color: cores.textoSuave,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
  } as React.CSSProperties,

  resumoValor: {
    fontSize: '1.3rem',
    fontWeight: 700,
    fontFamily: fontes.titulo,
    color: cores.texto,
  } as React.CSSProperties,

  filtros: {
    display: 'flex',
    gap: '8px',
    marginBottom: '24px',
    flexWrap: 'wrap' as const,
  } as React.CSSProperties,

  filtroBotao: {
    padding: '8px 16px',
    border: '2px solid transparent',
    borderRadius: '99px',
    fontSize: '0.8rem',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: fontes.corpo,
    transition: 'all 0.15s',
  } as React.CSSProperties,

  grade: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: '20px',
  } as React.CSSProperties,

  metaCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '24px',
    boxShadow: '0 4px 16px rgba(45,31,14,0.06)',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    position: 'relative' as const,
  } as React.CSSProperties,

  metaIcone: {
    width: '48px',
    height: '48px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.4rem',
    marginBottom: '14px',
  } as React.CSSProperties,

  metaNome: {
    fontFamily: fontes.titulo,
    fontSize: '1.05rem',
    fontWeight: 700,
    color: cores.texto,
    marginBottom: '4px',
  } as React.CSSProperties,

  metaDescricao: {
    fontSize: '0.78rem',
    color: cores.textoSuave,
    marginBottom: '16px',
  } as React.CSSProperties,

  barraFundo: {
    height: '8px',
    background: '#f0ebe3',
    borderRadius: '99px',
    overflow: 'hidden',
    marginBottom: '10px',
  } as React.CSSProperties,

  metaValores: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.8rem',
    marginBottom: '16px',
  } as React.CSSProperties,

  metaAtual: {
    fontWeight: 700,
    color: cores.texto,
  } as React.CSSProperties,

  metaAlvo: {
    color: cores.textoSuave,
  } as React.CSSProperties,

  metaRodape: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '8px',
  } as React.CSSProperties,

  metaPrazo: {
    fontSize: '0.75rem',
    color: cores.textoSuave,
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  } as React.CSSProperties,

  badgeTipo: {
    fontSize: '0.65rem',
    fontWeight: 700,
    padding: '3px 8px',
    borderRadius: '99px',
  } as React.CSSProperties,

  acoes: {
    display: 'flex',
    gap: '8px',
    marginTop: '16px',
  } as React.CSSProperties,

  botaoAcao: {
    flex: 1,
    padding: '9px',
    border: `2px solid ${cores.fundoBorda}`,
    borderRadius: '10px',
    background: 'none',
    fontSize: '0.78rem',
    fontWeight: 700,
    color: cores.textoSuave,
    cursor: 'pointer',
    fontFamily: fontes.corpo,
    transition: 'all 0.15s',
  } as React.CSSProperties,

  previsao: {
    fontSize: '0.75rem',
    color: cores.textoSuave,
    marginTop: '8px',
    padding: '8px 12px',
    background: cores.fundo,
    borderRadius: '8px',
  } as React.CSSProperties,

  modalOverlay: {
    position: 'fixed' as const,
    inset: 0,
    background: 'rgba(45,31,14,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '24px',
  } as React.CSSProperties,

  modalCard: {
    background: 'white',
    borderRadius: '24px',
    padding: '40px',
    width: '100%',
    maxWidth: '500px',
    maxHeight: '90vh',
    overflowY: 'auto' as const,
    boxShadow: '0 32px 80px rgba(45,31,14,0.2)',
  } as React.CSSProperties,

  modalTitulo: {
    fontFamily: fontes.titulo,
    fontSize: '1.4rem',
    fontWeight: 700,
    color: cores.texto,
    marginBottom: '24px',
  } as React.CSSProperties,

  modalBotoes: {
    display: 'flex',
    gap: '12px',
    marginTop: '28px',
  } as React.CSSProperties,

  botaoCancelar: {
    flex: 1,
    padding: '13px',
    background: cores.fundo,
    color: cores.textoSuave,
    border: 'none',
    borderRadius: '12px',
    fontSize: '0.9rem',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: fontes.corpo,
  } as React.CSSProperties,

  historicoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: `1px solid ${cores.fundo}`,
    fontSize: '0.85rem',
  } as React.CSSProperties,
}