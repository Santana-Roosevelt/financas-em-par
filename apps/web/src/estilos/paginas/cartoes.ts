import React from 'react'
import { cores, fontes } from '../global'

export const estilosCartoes = {
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
    marginBottom: '32px',
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

  grade: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: '24px',
    marginBottom: '32px',
  } as React.CSSProperties,

  cartaoCard: {
    background: 'white',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 4px 16px rgba(45,31,14,0.08)',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
  } as React.CSSProperties,

  cartaoTopo: {
    padding: '24px',
    background: 'linear-gradient(135deg, #2d1f0e, #4a3520)',
    position: 'relative' as const,
    overflow: 'hidden',
  } as React.CSSProperties,

  cartaoBanco: {
    fontSize: '0.75rem',
    fontWeight: 700,
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    marginBottom: '8px',
  } as React.CSSProperties,

  cartaoNome: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: 'white',
    fontFamily: fontes.titulo,
    marginBottom: '16px',
  } as React.CSSProperties,

  cartaoLimiteLabel: {
    fontSize: '0.7rem',
    color: 'rgba(255,255,255,0.5)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
  } as React.CSSProperties,

  cartaoLimiteValor: {
    fontSize: '1.4rem',
    fontWeight: 700,
    color: 'white',
    fontFamily: fontes.titulo,
  } as React.CSSProperties,

  cartaoCorpo: {
    padding: '20px 24px',
  } as React.CSSProperties,

  barraWrap: {
    marginBottom: '16px',
  } as React.CSSProperties,

  barraFundo: {
    height: '8px',
    background: '#f0ebe3',
    borderRadius: '99px',
    overflow: 'hidden',
    marginBottom: '8px',
  } as React.CSSProperties,

  barraInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.78rem',
    color: cores.textoSuave,
  } as React.CSSProperties,

  infoLinha: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: `1px solid ${cores.fundo}`,
    fontSize: '0.85rem',
  } as React.CSSProperties,

  infoLabel: {
    color: cores.textoSuave,
    fontWeight: 500,
  } as React.CSSProperties,

  infoValor: {
    fontWeight: 700,
    color: cores.texto,
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

  alertasArea: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
    marginBottom: '32px',
  } as React.CSSProperties,

  alerta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 18px',
    borderRadius: '12px',
    fontSize: '0.85rem',
    fontWeight: 500,
  } as React.CSSProperties,

  parcelamentosCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '24px',
    boxShadow: '0 4px 16px rgba(45,31,14,0.06)',
  } as React.CSSProperties,

  parcelamentoItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 0',
    borderBottom: `1px solid ${cores.fundo}`,
  } as React.CSSProperties,

  secaoTitulo: {
    fontFamily: fontes.titulo,
    fontSize: '1.1rem',
    fontWeight: 700,
    color: cores.texto,
    marginBottom: '16px',
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
}