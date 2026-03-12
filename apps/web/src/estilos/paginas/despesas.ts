import React from 'react'
import { cores, fontes } from '../global'

export const estilosDespesas = {
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
    marginBottom: '4px',
  } as React.CSSProperties,

  headerSubtitulo: {
    fontSize: '0.85rem',
    color: cores.textoSuave,
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
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  } as React.CSSProperties,

  resumoGrade: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '24px',
  } as React.CSSProperties,

  resumoCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '20px 24px',
    boxShadow: '0 4px 16px rgba(45,31,14,0.06)',
    border: '2px solid transparent',
  } as React.CSSProperties,

  resumoLabel: {
    fontSize: '0.7rem',
    fontWeight: 700,
    color: cores.textoSuave,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    marginBottom: '6px',
  } as React.CSSProperties,

  resumoValor: {
    fontSize: '1.4rem',
    fontWeight: 700,
    fontFamily: fontes.titulo,
    color: cores.texto,
  } as React.CSSProperties,

  filtrosArea: {
    background: 'white',
    borderRadius: '16px',
    padding: '16px 20px',
    boxShadow: '0 4px 16px rgba(45,31,14,0.06)',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap' as const,
  } as React.CSSProperties,

  buscaWrap: {
    flex: 1,
    minWidth: '200px',
    position: 'relative' as const,
  } as React.CSSProperties,

  buscaInput: {
    width: '100%',
    padding: '10px 16px 10px 36px',
    border: `2px solid ${cores.fundoBorda}`,
    borderRadius: '10px',
    fontSize: '0.88rem',
    color: cores.texto,
    background: cores.fundo,
    outline: 'none',
    fontFamily: fontes.corpo,
  } as React.CSSProperties,

  filtroSelect: {
    padding: '10px 14px',
    border: `2px solid ${cores.fundoBorda}`,
    borderRadius: '10px',
    fontSize: '0.85rem',
    color: cores.texto,
    background: cores.fundo,
    outline: 'none',
    fontFamily: fontes.corpo,
    cursor: 'pointer',
  } as React.CSSProperties,

  listaCard: {
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 4px 16px rgba(45,31,14,0.06)',
    overflow: 'visible',
  } as React.CSSProperties,

  grupoData: {
    padding: '12px 24px 8px',
    background: cores.fundo,
    fontSize: '0.72rem',
    fontWeight: 700,
    color: cores.textoSuave,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
  } as React.CSSProperties,

  itemDespesa: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 24px',
    borderBottom: `1px solid ${cores.fundo}`,
    transition: 'background 0.15s',
    cursor: 'pointer',
    gap: '16px',
  } as React.CSSProperties,

  itemIcone: {
    width: '42px',
    height: '42px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.1rem',
    flexShrink: 0,
  } as React.CSSProperties,

  itemNome: {
    fontSize: '0.92rem',
    fontWeight: 600,
    color: cores.texto,
    marginBottom: '2px',
  } as React.CSSProperties,

  itemCategoria: {
    fontSize: '0.75rem',
    color: cores.textoSuave,
  } as React.CSSProperties,

  itemValor: {
    fontSize: '0.95rem',
    fontWeight: 700,
    color: cores.vermelho,
    marginLeft: 'auto',
    flexShrink: 0,
  } as React.CSSProperties,

  badgeCompartilhado: {
    fontSize: '0.65rem',
    fontWeight: 700,
    padding: '3px 8px',
    borderRadius: '99px',
    background: 'rgba(196,121,58,0.1)',
    color: cores.primaria,
    flexShrink: 0,
  } as React.CSSProperties,

  badgeIndividual: {
    fontSize: '0.65rem',
    fontWeight: 700,
    padding: '3px 8px',
    borderRadius: '99px',
    background: cores.fundo,
    color: cores.textoSuave,
    flexShrink: 0,
  } as React.CSSProperties,

  menuAcoes: {
    position: 'relative' as const,
    flexShrink: 0,
    overflow: 'visible',
  } as React.CSSProperties,

  botaoMenu: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: cores.textoSuave,
    fontSize: '1.2rem',
    padding: '4px 8px',
    borderRadius: '8px',
    fontFamily: fontes.corpo,
  } as React.CSSProperties,

  dropdownMenu: {
    position: 'absolute' as const,
    right: 0,
    top: '100%',
    marginTop: '4px',
    background: 'white',
    border: `1px solid ${cores.fundoBorda}`,
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(45,31,14,0.12)',
    zIndex: 100,
    minWidth: '140px',
    overflow: 'hidden',
  } as React.CSSProperties,

  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    fontSize: '0.85rem',
    color: cores.texto,
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    width: '100%',
    fontFamily: fontes.corpo,
    fontWeight: 500,
    textAlign: 'left' as const,
  } as React.CSSProperties,

  // Modal
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
    maxWidth: '560px',
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

  modalGrade2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
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