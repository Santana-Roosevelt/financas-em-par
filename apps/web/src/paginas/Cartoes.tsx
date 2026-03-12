import React, { useState } from 'react'
import Sidebar from '../componentes/Sidebar'
import { estilosCartoes } from '../estilos/paginas/cartoes'
import { estilosGlobais, cores, responsivo } from '../estilos/global'

const bancos = ['Nubank', 'Itaú', 'Bradesco', 'Santander', 'Inter', 'C6 Bank', 'BTG', 'Outro']

const cartoesIniciais = [
  { id: 1, nome: 'Nubank', banco: 'Nubank', limite: 5000, fechamento: 5, vencimento: 12, titular: 'Roosevelt', compartilhado: false,
    despesas: [
      { id: 1, data: '2026-04-08', nome: 'Mercado Carrefour', valor: 210, parcelas: 1, parcelaAtual: 1 },
      { id: 2, data: '2026-04-07', nome: 'Uber', valor: 35, parcelas: 1, parcelaAtual: 1 },
      { id: 3, data: '2026-04-06', nome: 'Netflix', valor: 39.90, parcelas: 1, parcelaAtual: 1 },
      { id: 4, data: '2026-03-20', nome: 'TV Samsung', valor: 300, parcelas: 10, parcelaAtual: 4 },
    ]
  },
  { id: 2, nome: 'Inter', banco: 'Inter', limite: 3000, fechamento: 10, vencimento: 17, titular: 'Querén', compartilhado: false,
    despesas: [
      { id: 5, data: '2026-04-09', nome: 'iFood', valor: 75, parcelas: 1, parcelaAtual: 1 },
      { id: 6, data: '2026-03-15', nome: 'iPhone 14', valor: 450, parcelas: 12, parcelaAtual: 8 },
    ]
  },
  { id: 3, nome: 'C6 Bank', banco: 'C6 Bank', limite: 8000, fechamento: 15, vencimento: 22, titular: 'Casal', compartilhado: true,
    despesas: [
      { id: 7, data: '2026-04-10', nome: 'Aluguel', valor: 1200, parcelas: 1, parcelaAtual: 1 },
      { id: 8, data: '2026-04-05', nome: 'Supermercado', valor: 430, parcelas: 1, parcelaAtual: 1 },
    ]
  },
]

const moeda = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

const corBarra = (pct: number) => {
  if (pct <= 50) return '#a3be8c'
  if (pct <= 80) return '#e8c96d'
  return '#e87d6d'
}

const gradienteCartao = (banco: string) => {
  const gradientes: Record<string, string> = {
    'Nubank': 'linear-gradient(135deg, #6B2D8B, #3d1a52)',
    'Itaú': 'linear-gradient(135deg, #EC7000, #a04d00)',
    'Bradesco': 'linear-gradient(135deg, #CC092F, #8a0620)',
    'Santander': 'linear-gradient(135deg, #CC0000, #8a0000)',
    'Inter': 'linear-gradient(135deg, #FF6600, #b34700)',
    'C6 Bank': 'linear-gradient(135deg, #2d2d2d, #111)',
    'BTG': 'linear-gradient(135deg, #1a1a2e, #0f0f1a)',
  }
  return gradientes[banco] || 'linear-gradient(135deg, #2d1f0e, #4a3520)'
}

const formVazio = {
  nome: '', banco: 'Nubank', limite: '', fechamento: '', vencimento: '', titular: 'Roosevelt', compartilhado: false,
}

type Cartao = typeof cartoesIniciais[0]

export default function Cartoes() {
  const [cartoes, setCartoes] = useState(cartoesIniciais)
  const [modalAberto, setModalAberto] = useState(false)
  const [editando, setEditando] = useState<number | null>(null)
  const [form, setForm] = useState(formVazio)
  const [cartaoSelecionado, setCartaoSelecionado] = useState<Cartao | null>(null)

  const abrirModal = (cartao?: Cartao) => {
    if (cartao) {
      setForm({ ...cartao, limite: String(cartao.limite), fechamento: String(cartao.fechamento), vencimento: String(cartao.vencimento) })
      setEditando(cartao.id)
    } else {
      setForm(formVazio)
      setEditando(null)
    }
    setModalAberto(true)
  }

  const salvar = (e: React.FormEvent) => {
    e.preventDefault()
    if (editando) {
      setCartoes(prev => prev.map(c => c.id === editando ? {
        ...c, nome: form.nome, banco: form.banco, limite: parseFloat(form.limite),
        fechamento: parseInt(form.fechamento), vencimento: parseInt(form.vencimento),
        titular: form.titular, compartilhado: form.compartilhado,
      } : c))
    } else {
      setCartoes(prev => [...prev, {
        id: Date.now(), nome: form.nome, banco: form.banco, limite: parseFloat(form.limite),
        fechamento: parseInt(form.fechamento), vencimento: parseInt(form.vencimento),
        titular: form.titular, compartilhado: form.compartilhado, despesas: [],
      }])
    }
    setModalAberto(false)
  }

  const excluir = (id: number) => {
    setCartoes(prev => prev.filter(c => c.id !== id))
    if (cartaoSelecionado?.id === id) setCartaoSelecionado(null)
  }

  const alertas = cartoes.flatMap(c => {
    const usado = c.despesas.filter(d => d.parcelas === 1).reduce((s, d) => s + d.valor, 0)
    const pct = (usado / c.limite) * 100
    const hoje = new Date().getDate()
    const diasFecha = c.fechamento >= hoje ? c.fechamento - hoje : 30 - hoje + c.fechamento
    const alerts = []
    if (pct >= 80) alerts.push({ tipo: 'limite', msg: `Cartão ${c.nome} está com ${Math.round(pct)}% do limite usado`, cor: '#fff0ee', corTexto: '#c0392b' })
    if (diasFecha <= 3) alerts.push({ tipo: 'fatura', msg: `Fatura do ${c.nome} fecha em ${diasFecha} dia(s)`, cor: '#fff8ee', corTexto: '#c4793a' })
    return alerts
  })

  const parcelamentos = cartoes.flatMap(c =>
    c.despesas.filter(d => d.parcelas > 1).map(d => ({ ...d, cartaoNome: c.nome }))
  )

  return (
    <div style={estilosCartoes.pagina}>
      <Sidebar paginaAtiva="cartoes" />

      <main style={estilosCartoes.conteudo} className="conteudo-principal">

        {/* Header */}
        <div style={estilosCartoes.header}>
          <div>
            <div style={estilosCartoes.headerTitulo}>Cartões 💳</div>
            <div style={estilosCartoes.headerSubtitulo}>{cartoes.length} cartão(ões) cadastrado(s)</div>
          </div>
          <button style={estilosCartoes.botaoAdicionar} onClick={() => abrirModal()}>
            + Adicionar cartão
          </button>
        </div>

        {/* Alertas */}
        {alertas.length > 0 && (
          <div style={estilosCartoes.alertasArea}>
            {alertas.map((a, i) => (
              <div key={i} style={{ ...estilosCartoes.alerta, background: a.cor, color: a.corTexto }}>
                <span>⚠️</span>
                <span>{a.msg}</span>
              </div>
            ))}
          </div>
        )}

        {/* Grade de cartões */}
        <div style={estilosCartoes.grade}>
          {cartoes.map(cartao => {
            const usado = cartao.despesas.reduce((s, d) => s + (d.parcelas > 1 ? d.valor : d.valor), 0)
            const disponivel = cartao.limite - usado
            const pct = Math.min((usado / cartao.limite) * 100, 100)
            const hoje = new Date().getDate()
            const diasFecha = cartao.fechamento >= hoje ? cartao.fechamento - hoje : 30 - hoje + cartao.fechamento

            return (
              <div key={cartao.id} style={estilosCartoes.cartaoCard}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(45,31,14,0.14)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(45,31,14,0.08)' }}
              >
                {/* Topo colorido */}
                <div style={{ ...estilosCartoes.cartaoTopo, background: gradienteCartao(cartao.banco) }}>
                  <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
                  <div style={{ position: 'absolute', bottom: '-30px', right: '40px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
                  <div style={estilosCartoes.cartaoBanco}>{cartao.banco}</div>
                  <div style={estilosCartoes.cartaoNome}>{cartao.nome}</div>
                  <div style={estilosCartoes.cartaoLimiteLabel}>Limite total</div>
                  <div style={estilosCartoes.cartaoLimiteValor}>{moeda(cartao.limite)}</div>
                  {cartao.compartilhado && (
                    <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.15)', padding: '4px 10px', borderRadius: '99px', fontSize: '0.7rem', color: 'white', fontWeight: 700 }}>
                      💑 Casal
                    </div>
                  )}
                </div>

                {/* Corpo */}
                <div style={estilosCartoes.cartaoCorpo}>
                  {/* Barra de uso */}
                  <div style={estilosCartoes.barraWrap}>
                    <div style={estilosCartoes.barraFundo}>
                      <div style={{ height: '100%', width: `${pct}%`, background: corBarra(pct), borderRadius: '99px', transition: 'width 0.4s' }} />
                    </div>
                    <div style={estilosCartoes.barraInfo}>
                      <span>Usado: {moeda(usado)}</span>
                      <span style={{ color: disponivel < 0 ? cores.vermelho : cores.textoSuave }}>Disponível: {moeda(Math.max(disponivel, 0))}</span>
                    </div>
                  </div>

                  {/* Infos */}
                  <div style={estilosCartoes.infoLinha}>
                    <span style={estilosCartoes.infoLabel}>Titular</span>
                    <span style={estilosCartoes.infoValor}>{cartao.titular}</span>
                  </div>
                  <div style={estilosCartoes.infoLinha}>
                    <span style={estilosCartoes.infoLabel}>Fecha dia</span>
                    <span style={{ ...estilosCartoes.infoValor, color: diasFecha <= 3 ? cores.vermelho : cores.texto }}>
                      {cartao.fechamento} {diasFecha <= 3 ? `(em ${diasFecha} dia${diasFecha !== 1 ? 's' : ''})` : ''}
                    </span>
                  </div>
                  <div style={{ ...estilosCartoes.infoLinha, borderBottom: 'none' }}>
                    <span style={estilosCartoes.infoLabel}>Vence dia</span>
                    <span style={estilosCartoes.infoValor}>{cartao.vencimento}</span>
                  </div>

                  {/* Ações */}
                  <div style={estilosCartoes.acoes}>
                    <button style={estilosCartoes.botaoAcao} onClick={() => setCartaoSelecionado(cartao)}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#c4793a'; e.currentTarget.style.color = '#c4793a' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = cores.fundoBorda; e.currentTarget.style.color = cores.textoSuave }}
                    >📄 Ver fatura</button>
                    <button style={estilosCartoes.botaoAcao} onClick={() => abrirModal(cartao)}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#c4793a'; e.currentTarget.style.color = '#c4793a' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = cores.fundoBorda; e.currentTarget.style.color = cores.textoSuave }}
                    >✏️ Editar</button>
                    <button style={{ ...estilosCartoes.botaoAcao, flex: 'none', padding: '9px 12px' }} onClick={() => excluir(cartao.id)}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = cores.vermelho; e.currentTarget.style.color = cores.vermelho }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = cores.fundoBorda; e.currentTarget.style.color = cores.textoSuave }}
                    >🗑️</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Parcelamentos ativos */}
        {parcelamentos.length > 0 && (
          <div style={estilosCartoes.parcelamentosCard}>
            <div style={estilosCartoes.secaoTitulo}>📦 Parcelamentos ativos</div>
            {parcelamentos.map((p, i) => (
              <div key={i} style={{ ...estilosCartoes.parcelamentoItem, borderBottom: i === parcelamentos.length - 1 ? 'none' : undefined }}>
                <div>
                  <div style={{ fontWeight: 600, color: cores.texto, fontSize: '0.9rem', marginBottom: '2px' }}>{p.nome}</div>
                  <div style={{ fontSize: '0.75rem', color: cores.textoSuave }}>{p.cartaoNome} · Parcela {p.parcelaAtual}/{p.parcelas}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, color: cores.vermelho, fontSize: '0.95rem' }}>{moeda(p.valor)}/mês</div>
                  <div style={{ fontSize: '0.75rem', color: cores.textoSuave }}>{p.parcelas - p.parcelaAtual} restante(s)</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal detalhes da fatura */}
      {cartaoSelecionado && (
        <div style={estilosCartoes.modalOverlay} onClick={() => setCartaoSelecionado(null)}>
          <div style={estilosCartoes.modalCard} onClick={e => e.stopPropagation()}>
            <div style={{ ...estilosCartoes.modalTitulo, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>📄 Fatura — {cartaoSelecionado.nome}</span>
              <button onClick={() => setCartaoSelecionado(null)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: cores.textoSuave }}>✕</button>
            </div>
            {cartaoSelecionado.despesas.length === 0 ? (
              <div style={{ textAlign: 'center', color: cores.textoSuave, padding: '32px 0' }}>Nenhuma despesa neste cartão</div>
            ) : (
              cartaoSelecionado.despesas.map((d, i) => (
                <div key={i} style={{ ...estilosCartoes.parcelamentoItem, borderBottom: i === cartaoSelecionado.despesas.length - 1 ? 'none' : undefined }}>
                  <div>
                    <div style={{ fontWeight: 600, color: cores.texto, fontSize: '0.9rem', marginBottom: '2px' }}>{d.nome}</div>
                    <div style={{ fontSize: '0.75rem', color: cores.textoSuave }}>
                      {new Date(d.data + 'T00:00:00').toLocaleDateString('pt-BR')}
                      {d.parcelas > 1 ? ` · ${d.parcelaAtual}/${d.parcelas}x` : ''}
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, color: cores.vermelho }}>{moeda(d.valor)}</div>
                </div>
              ))
            )}
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: `2px solid ${cores.fundo}`, display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
              <span style={{ color: cores.texto }}>Total da fatura</span>
              <span style={{ color: cores.vermelho, fontSize: '1.1rem' }}>
                {moeda(cartaoSelecionado.despesas.reduce((s, d) => s + d.valor, 0))}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Modal adicionar/editar cartão */}
      {modalAberto && (
        <div style={estilosCartoes.modalOverlay} onClick={() => setModalAberto(false)}>
          <div style={estilosCartoes.modalCard} onClick={e => e.stopPropagation()}>
            <div style={estilosCartoes.modalTitulo}>{editando ? '✏️ Editar cartão' : '+ Novo cartão'}</div>
            <form onSubmit={salvar}>

              <div style={{ marginBottom: '16px' }}>
                <label style={estilosGlobais.label}>Nome do cartão</label>
                <input placeholder="Ex: Nubank Gold" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} required
                  style={estilosGlobais.input}
                  onFocus={e => e.target.style.borderColor = '#c4793a'}
                  onBlur={e => e.target.style.borderColor = '#ede8df'}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={estilosGlobais.label}>Banco</label>
                <select value={form.banco} onChange={e => setForm({ ...form, banco: e.target.value })} style={{ ...estilosGlobais.input, cursor: 'pointer' }}>
                  {bancos.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={estilosGlobais.label}>Limite (R$)</label>
                  <input type="number" placeholder="5000" value={form.limite} onChange={e => setForm({ ...form, limite: e.target.value })} required
                    style={estilosGlobais.input}
                    onFocus={e => e.target.style.borderColor = '#c4793a'}
                    onBlur={e => e.target.style.borderColor = '#ede8df'}
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={estilosGlobais.label}>Titular</label>
                  <select value={form.titular} onChange={e => setForm({ ...form, titular: e.target.value })} style={{ ...estilosGlobais.input, cursor: 'pointer' }}>
                    <option value="Roosevelt">Roosevelt</option>
                    <option value="Querén">Querén</option>
                  </select>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={estilosGlobais.label}>Dia de fechamento</label>
                  <input type="number" min="1" max="31" placeholder="5" value={form.fechamento} onChange={e => setForm({ ...form, fechamento: e.target.value })} required
                    style={estilosGlobais.input}
                    onFocus={e => e.target.style.borderColor = '#c4793a'}
                    onBlur={e => e.target.style.borderColor = '#ede8df'}
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={estilosGlobais.label}>Dia de vencimento</label>
                  <input type="number" min="1" max="31" placeholder="12" value={form.vencimento} onChange={e => setForm({ ...form, vencimento: e.target.value })} required
                    style={estilosGlobais.input}
                    onFocus={e => e.target.style.borderColor = '#c4793a'}
                    onBlur={e => e.target.style.borderColor = '#ede8df'}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <input type="checkbox" id="compartilhado" checked={form.compartilhado} onChange={e => setForm({ ...form, compartilhado: e.target.checked })} style={{ width: '18px', height: '18px', accentColor: '#c4793a' }} />
                <label htmlFor="compartilhado" style={{ fontSize: '0.88rem', color: cores.texto, cursor: 'pointer' }}>Cartão compartilhado do casal</label>
              </div>

              <div style={estilosCartoes.modalBotoes}>
                <button type="button" onClick={() => setModalAberto(false)} style={estilosCartoes.botaoCancelar}>Cancelar</button>
                <button type="submit" style={{ ...estilosGlobais.botaoPrimario, flex: 1 }}>
                  {editando ? 'Salvar alterações' : 'Adicionar cartão'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{responsivo}</style>
    </div>
  )
}