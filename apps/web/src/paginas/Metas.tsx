import React, { useState } from 'react'
import Sidebar from '../componentes/Sidebar'
import { estilosMetas } from '../estilos/paginas/metas'
import { estilosGlobais, cores, responsivo } from '../estilos/global'

const iconesMeta = ['🏖️', '🚗', '🏠', '💍', '📚', '💻', '🐶', '✈️', '🏋️', '💰', '🎯', '🌟']

const metasIniciais = [
  {
    id: 1, nome: 'Viagem para Itália', icone: '✈️', descricao: 'Lua de mel dos sonhos',
    valorAlvo: 10000, valorAtual: 6500, prazo: '2026-12', tipo: 'casal',
    contribuicaoMensal: 500, concluida: false,
    historico: [
      { data: '2026-04-05', quem: 'Roosevelt', valor: 300 },
      { data: '2026-04-15', quem: 'Querén', valor: 200 },
      { data: '2026-03-28', quem: 'Casal', valor: 500 },
    ]
  },
  {
    id: 2, nome: 'Reserva de emergência', icone: '💰', descricao: '6 meses de despesas',
    valorAlvo: 15000, valorAtual: 8000, prazo: '2026-09', tipo: 'casal',
    contribuicaoMensal: 800, concluida: false,
    historico: [
      { data: '2026-04-01', quem: 'Casal', valor: 800 },
      { data: '2026-03-01', quem: 'Casal', valor: 800 },
    ]
  },
  {
    id: 3, nome: 'Notebook novo', icone: '💻', descricao: 'Para trabalho e estudos',
    valorAlvo: 5000, valorAtual: 4200, prazo: '2026-06', tipo: 'individual',
    contribuicaoMensal: 400, concluida: false,
    historico: [
      { data: '2026-04-10', quem: 'Roosevelt', valor: 400 },
      { data: '2026-03-10', quem: 'Roosevelt', valor: 400 },
    ]
  },
  {
    id: 4, nome: 'Fundo para casamento', icone: '💍', descricao: 'O dia mais especial',
    valorAlvo: 30000, valorAtual: 30000, prazo: '2027-06', tipo: 'casal',
    contribuicaoMensal: 1000, concluida: true,
    historico: [
      { data: '2026-01-15', quem: 'Casal', valor: 1000 },
    ]
  },
]

const moeda = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

const corBarra = (pct: number) => {
  if (pct >= 100) return '#a3be8c'
  if (pct >= 60) return '#c4793a'
  return '#8fa8c8'
}

const formVazio = {
  nome: '', icone: '🎯', descricao: '', valorAlvo: '', valorAtual: '0',
  prazo: '', tipo: 'casal', contribuicaoMensal: '',
}

type Meta = typeof metasIniciais[0]
type Filtro = 'todas' | 'casal' | 'individual' | 'concluidas'

export default function Metas() {
  const [metas, setMetas] = useState(metasIniciais)
  const [filtro, setFiltro] = useState<Filtro>('todas')
  const [modalAberto, setModalAberto] = useState(false)
  const [modalContribuicao, setModalContribuicao] = useState(false)
  const [modalDetalhes, setModalDetalhes] = useState(false)
  const [metaSelecionada, setMetaSelecionada] = useState<Meta | null>(null)
  const [editando, setEditando] = useState<number | null>(null)
  const [form, setForm] = useState(formVazio)
  const [contribuicao, setContribuicao] = useState({ valor: '', quem: 'Roosevelt' })

  const metasFiltradas = metas.filter(m => {
    if (filtro === 'casal') return m.tipo === 'casal' && !m.concluida
    if (filtro === 'individual') return m.tipo === 'individual' && !m.concluida
    if (filtro === 'concluidas') return m.concluida
    return true
  })

  const totalGuardado = metas.reduce((s, m) => s + m.valorAtual, 0)
  const totalAlvo = metas.reduce((s, m) => s + m.valorAlvo, 0)
  const metasConcluidas = metas.filter(m => m.concluida).length

  const abrirModal = (meta?: Meta) => {
    if (meta) {
      setForm({ ...meta, valorAlvo: String(meta.valorAlvo), valorAtual: String(meta.valorAtual), contribuicaoMensal: String(meta.contribuicaoMensal) })
      setEditando(meta.id)
    } else {
      setForm(formVazio)
      setEditando(null)
    }
    setModalAberto(true)
  }

  const salvar = (e: React.FormEvent) => {
    e.preventDefault()
    const nova = {
      nome: form.nome, icone: form.icone, descricao: form.descricao,
      valorAlvo: parseFloat(form.valorAlvo), valorAtual: parseFloat(form.valorAtual || '0'),
      prazo: form.prazo, tipo: form.tipo, contribuicaoMensal: parseFloat(form.contribuicaoMensal || '0'),
      concluida: false, historico: [] as { data: string; quem: string; valor: number }[],
    }
    if (editando) {
      setMetas(prev => prev.map(m => m.id === editando ? { ...m, ...nova } : m))
    } else {
      setMetas(prev => [...prev, { ...nova, id: Date.now() }])
    }
    setModalAberto(false)
  }

  const excluir = (id: number) => setMetas(prev => prev.filter(m => m.id !== id))

  const adicionarContribuicao = (e: React.FormEvent) => {
    e.preventDefault()
    if (!metaSelecionada) return
    const valor = parseFloat(contribuicao.valor)
    setMetas(prev => prev.map(m => {
      if (m.id !== metaSelecionada.id) return m
      const novoAtual = m.valorAtual + valor
      return {
        ...m,
        valorAtual: novoAtual,
        concluida: novoAtual >= m.valorAlvo,
        historico: [{ data: new Date().toISOString().split('T')[0], quem: contribuicao.quem, valor }, ...m.historico],
      }
    }))
    setModalContribuicao(false)
    setContribuicao({ valor: '', quem: 'Roosevelt' })
  }

  const calcularPrevisao = (meta: Meta) => {
    if (!meta.contribuicaoMensal || meta.contribuicaoMensal === 0) return null
    const restante = meta.valorAlvo - meta.valorAtual
    if (restante <= 0) return 'Meta concluída! 🎉'
    const meses = Math.ceil(restante / meta.contribuicaoMensal)
    return `Meta atingida em ~${meses} mese${meses !== 1 ? 's' : ''} (${moeda(meta.contribuicaoMensal)}/mês)`
  }

  const filtros: { key: Filtro; label: string }[] = [
    { key: 'todas', label: 'Todas' },
    { key: 'casal', label: '💑 Casal' },
    { key: 'individual', label: '👤 Individual' },
    { key: 'concluidas', label: '✅ Concluídas' },
  ]

  return (
    <div style={estilosMetas.pagina}>
      <Sidebar paginaAtiva="metas" />

      <main style={estilosMetas.conteudo} className="conteudo-principal">

        {/* Header */}
        <div style={estilosMetas.header}>
          <div>
            <div style={estilosMetas.headerTitulo}>Metas 🎯</div>
            <div style={estilosMetas.headerSubtitulo}>Planejamento financeiro do casal</div>
          </div>
          <button style={estilosMetas.botaoAdicionar} onClick={() => abrirModal()}>
            + Criar meta
          </button>
        </div>

        {/* Resumo */}
        <div style={estilosMetas.resumoCard}>
          <div style={estilosMetas.resumoItem}>
            <div style={estilosMetas.resumoLabel}>Total guardado</div>
            <div style={{ ...estilosMetas.resumoValor, color: cores.primaria }}>{moeda(totalGuardado)}</div>
          </div>
          <div style={estilosMetas.resumoItem}>
            <div style={estilosMetas.resumoLabel}>Total alvo</div>
            <div style={estilosMetas.resumoValor}>{moeda(totalAlvo)}</div>
          </div>
          <div style={estilosMetas.resumoItem}>
            <div style={estilosMetas.resumoLabel}>Metas ativas</div>
            <div style={estilosMetas.resumoValor}>{metas.filter(m => !m.concluida).length}</div>
          </div>
          <div style={estilosMetas.resumoItem}>
            <div style={estilosMetas.resumoLabel}>Concluídas</div>
            <div style={{ ...estilosMetas.resumoValor, color: '#a3be8c' }}>{metasConcluidas}</div>
          </div>
        </div>

        {/* Filtros */}
        <div style={estilosMetas.filtros}>
          {filtros.map(f => (
            <button key={f.key} onClick={() => setFiltro(f.key)}
              style={{
                ...estilosMetas.filtroBotao,
                background: filtro === f.key ? cores.primaria : 'white',
                color: filtro === f.key ? 'white' : cores.textoSuave,
                borderColor: filtro === f.key ? cores.primaria : cores.fundoBorda,
              }}
            >{f.label}</button>
          ))}
        </div>

        {/* Grade de metas */}
        <div style={estilosMetas.grade}>
          {metasFiltradas.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px', color: cores.textoSuave }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🎯</div>
              <div style={{ fontWeight: 600 }}>Nenhuma meta encontrada</div>
            </div>
          ) : (
            metasFiltradas.map(meta => {
              const pct = (meta.valorAtual / meta.valorAlvo) * 100
              const previsao = calcularPrevisao(meta)
              const prazoFormatado = meta.prazo ? new Date(meta.prazo + '-01').toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : ''

              return (
                <div key={meta.id} style={estilosMetas.metaCard}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(45,31,14,0.12)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(45,31,14,0.06)' }}
                >
                  {/* Badge concluída */}
                  {meta.concluida && (
                    <div style={{ position: 'absolute', top: '16px', right: '16px', background: '#a3be8c', color: 'white', fontSize: '0.7rem', fontWeight: 700, padding: '4px 10px', borderRadius: '99px' }}>
                      ✅ Concluída
                    </div>
                  )}

                  {/* Ícone */}
                  <div style={{ ...estilosMetas.metaIcone, background: corBarra(pct) + '20' }}>
                    {meta.icone}
                  </div>

                  {/* Nome e descrição */}
                  <div style={estilosMetas.metaNome}>{meta.nome}</div>
                  <div style={estilosMetas.metaDescricao}>{meta.descricao}</div>

                  {/* Valores */}
                  <div style={estilosMetas.metaValores}>
                    <span style={estilosMetas.metaAtual}>{moeda(meta.valorAtual)}</span>
                    <span style={estilosMetas.metaAlvo}>{moeda(meta.valorAlvo)}</span>
                  </div>

                  {/* Barra */}
                  <div style={estilosMetas.barraFundo}>
                    <div style={{ height: '100%', display: 'flex', borderRadius: '99px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${Math.min(pct, 100)}%`,
                        background: pct >= 100 ? '#a3be8c' : corBarra(pct),
                        transition: 'width 0.4s',
                        flexShrink: 0,
                      }} />
                      {pct > 100 && (
                        <div style={{
                          width: `${Math.min(pct - 100, 30)}%`,
                          background: '#8fa8c8',
                          transition: 'width 0.4s',
                          flexShrink: 0,
                        }} />
                      )}
                    </div>
                  </div>

                  {/* Progresso e prazo */}
                  <div style={estilosMetas.metaRodape}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: corBarra(pct) }}>{Math.round(pct)}%</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {prazoFormatado && <span style={estilosMetas.metaPrazo}>📅 {prazoFormatado}</span>}
                      <span style={{ ...estilosMetas.badgeTipo, background: meta.tipo === 'casal' ? 'rgba(196,121,58,0.1)' : cores.fundo, color: meta.tipo === 'casal' ? cores.primaria : cores.textoSuave }}>
                        {meta.tipo === 'casal' ? '💑 Casal' : '👤 Individual'}
                      </span>
                    </div>
                  </div>

                  {/* Previsão */}
                  {previsao && !meta.concluida && (
                    <div style={estilosMetas.previsao}>🔮 {previsao}</div>
                  )}

                  {/* Ações */}
                  <div style={estilosMetas.acoes}>
                    <button style={{ ...estilosMetas.botaoAcao, background: cores.primaria, color: 'white', border: 'none' }}
                      onClick={() => { setMetaSelecionada(meta); setModalContribuicao(true) }}
                    >+ Guardar</button>
                    <button style={estilosMetas.botaoAcao}
                      onClick={() => { setMetaSelecionada(meta); setModalDetalhes(true) }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#c4793a'; e.currentTarget.style.color = '#c4793a' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = cores.fundoBorda; e.currentTarget.style.color = cores.textoSuave }}
                    >📋 Histórico</button>
                    <button style={{ ...estilosMetas.botaoAcao, flex: 'none', padding: '9px 12px' }}
                      onClick={() => abrirModal(meta)}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#c4793a'; e.currentTarget.style.color = '#c4793a' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = cores.fundoBorda; e.currentTarget.style.color = cores.textoSuave }}
                    >✏️</button>
                    <button style={{ ...estilosMetas.botaoAcao, flex: 'none', padding: '9px 12px' }}
                      onClick={() => excluir(meta.id)}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = cores.vermelho; e.currentTarget.style.color = cores.vermelho }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = cores.fundoBorda; e.currentTarget.style.color = cores.textoSuave }}
                    >🗑️</button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </main>

      {/* Modal adicionar contribuição */}
      {modalContribuicao && metaSelecionada && (
        <div style={estilosMetas.modalOverlay} onClick={() => setModalContribuicao(false)}>
          <div style={estilosMetas.modalCard} onClick={e => e.stopPropagation()}>
            <div style={estilosMetas.modalTitulo}>💰 Guardar dinheiro</div>
            <div style={{ fontSize: '0.9rem', color: cores.textoSuave, marginBottom: '24px' }}>
              {metaSelecionada.icone} {metaSelecionada.nome} — faltam {moeda(metaSelecionada.valorAlvo - metaSelecionada.valorAtual)}
            </div>
            <form onSubmit={adicionarContribuicao}>
              <div style={{ marginBottom: '16px' }}>
                <label style={estilosGlobais.label}>Valor (R$)</label>
                <input type="number" step="0.01" placeholder="0,00" value={contribuicao.valor}
                  onChange={e => setContribuicao({ ...contribuicao, valor: e.target.value })} required
                  style={estilosGlobais.input}
                  onFocus={e => e.target.style.borderColor = '#c4793a'}
                  onBlur={e => e.target.style.borderColor = '#ede8df'}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={estilosGlobais.label}>Quem está guardando</label>
                <select value={contribuicao.quem} onChange={e => setContribuicao({ ...contribuicao, quem: e.target.value })}
                  style={{ ...estilosGlobais.input, cursor: 'pointer' }}>
                  <option value="Roosevelt">Roosevelt</option>
                  <option value="Querén">Querén</option>
                  <option value="Casal">Casal</option>
                </select>
              </div>
              <div style={estilosMetas.modalBotoes}>
                <button type="button" onClick={() => setModalContribuicao(false)} style={estilosMetas.botaoCancelar}>Cancelar</button>
                <button type="submit" style={{ ...estilosGlobais.botaoPrimario, flex: 1 }}>Guardar 💰</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal histórico */}
      {modalDetalhes && metaSelecionada && (
        <div style={estilosMetas.modalOverlay} onClick={() => setModalDetalhes(false)}>
          <div style={estilosMetas.modalCard} onClick={e => e.stopPropagation()}>
            <div style={{ ...estilosMetas.modalTitulo, display: 'flex', justifyContent: 'space-between' }}>
              <span>📋 {metaSelecionada.nome}</span>
              <button onClick={() => setModalDetalhes(false)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: cores.textoSuave }}>✕</button>
            </div>
            {metaSelecionada.historico.length === 0 ? (
              <div style={{ textAlign: 'center', color: cores.textoSuave, padding: '32px 0' }}>Nenhuma contribuição ainda</div>
            ) : (
              metaSelecionada.historico.map((h, i) => (
                <div key={i} style={{ ...estilosMetas.historicoItem, borderBottom: i === metaSelecionada.historico.length - 1 ? 'none' : undefined }}>
                  <div>
                    <div style={{ fontWeight: 600, color: cores.texto }}>{h.quem}</div>
                    <div style={{ fontSize: '0.75rem', color: cores.textoSuave }}>{new Date(h.data + 'T00:00:00').toLocaleDateString('pt-BR')}</div>
                  </div>
                  <div style={{ fontWeight: 700, color: '#a3be8c' }}>+{moeda(h.valor)}</div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Modal criar/editar meta */}
      {modalAberto && (
        <div style={estilosMetas.modalOverlay} onClick={() => setModalAberto(false)}>
          <div style={estilosMetas.modalCard} onClick={e => e.stopPropagation()}>
            <div style={estilosMetas.modalTitulo}>{editando ? '✏️ Editar meta' : '🎯 Nova meta'}</div>
            <form onSubmit={salvar}>
              <div style={{ marginBottom: '16px' }}>
                <label style={estilosGlobais.label}>Ícone</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {iconesMeta.map(ic => (
                    <button key={ic} type="button" onClick={() => setForm({ ...form, icone: ic })}
                      style={{ width: '40px', height: '40px', border: `2px solid ${form.icone === ic ? '#c4793a' : '#ede8df'}`, borderRadius: '10px', background: form.icone === ic ? '#fff7f0' : 'white', cursor: 'pointer', fontSize: '1.1rem' }}>
                      {ic}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={estilosGlobais.label}>Nome da meta</label>
                <input placeholder="Ex: Viagem para o Japão" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} required
                  style={estilosGlobais.input}
                  onFocus={e => e.target.style.borderColor = '#c4793a'}
                  onBlur={e => e.target.style.borderColor = '#ede8df'}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={estilosGlobais.label}>Descrição (opcional)</label>
                <input placeholder="Ex: Férias de fim de ano" value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })}
                  style={estilosGlobais.input}
                  onFocus={e => e.target.style.borderColor = '#c4793a'}
                  onBlur={e => e.target.style.borderColor = '#ede8df'}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={estilosGlobais.label}>Valor alvo (R$)</label>
                  <input type="number" step="0.01" placeholder="10000" value={form.valorAlvo} onChange={e => setForm({ ...form, valorAlvo: e.target.value })} required
                    style={estilosGlobais.input}
                    onFocus={e => e.target.style.borderColor = '#c4793a'}
                    onBlur={e => e.target.style.borderColor = '#ede8df'}
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={estilosGlobais.label}>Valor atual (R$)</label>
                  <input type="number" step="0.01" placeholder="0" value={form.valorAtual} onChange={e => setForm({ ...form, valorAtual: e.target.value })}
                    style={estilosGlobais.input}
                    onFocus={e => e.target.style.borderColor = '#c4793a'}
                    onBlur={e => e.target.style.borderColor = '#ede8df'}
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={estilosGlobais.label}>Prazo</label>
                  <input type="month" value={form.prazo} onChange={e => setForm({ ...form, prazo: e.target.value })}
                    style={estilosGlobais.input}
                    onFocus={e => e.target.style.borderColor = '#c4793a'}
                    onBlur={e => e.target.style.borderColor = '#ede8df'}
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={estilosGlobais.label}>Contribuição mensal</label>
                  <input type="number" step="0.01" placeholder="500" value={form.contribuicaoMensal} onChange={e => setForm({ ...form, contribuicaoMensal: e.target.value })}
                    style={estilosGlobais.input}
                    onFocus={e => e.target.style.borderColor = '#c4793a'}
                    onBlur={e => e.target.style.borderColor = '#ede8df'}
                  />
                </div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={estilosGlobais.label}>Tipo</label>
                <select value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })} style={{ ...estilosGlobais.input, cursor: 'pointer' }}>
                  <option value="casal">💑 Casal</option>
                  <option value="individual">👤 Individual</option>
                </select>
              </div>
              <div style={estilosMetas.modalBotoes}>
                <button type="button" onClick={() => setModalAberto(false)} style={estilosMetas.botaoCancelar}>Cancelar</button>
                <button type="submit" style={{ ...estilosGlobais.botaoPrimario, flex: 1 }}>
                  {editando ? 'Salvar alterações' : 'Criar meta 🎯'}
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