import React, { useState } from 'react'
import Sidebar from '../componentes/Sidebar'
import { estilosDespesas } from '../estilos/paginas/despesas'
import { estilosGlobais, cores, responsivo } from '../estilos/global'

const categorias = [
  { nome: 'Moradia', icone: '🏠', cor: '#8fa8c8' },
  { nome: 'Mercado', icone: '🛒', cor: '#a3be8c' },
  { nome: 'Transporte', icone: '🚗', cor: '#c4793a' },
  { nome: 'Lazer', icone: '🍔', cor: '#e8956d' },
  { nome: 'Saúde', icone: '💊', cor: '#b8a8c8' },
  { nome: 'Educação', icone: '📚', cor: '#8fa8c8' },
  { nome: 'Pets', icone: '🐶', cor: '#a3be8c' },
  { nome: 'Outros', icone: '📦', cor: '#c4b8a8' },
]

const formasPagamento = ['Débito', 'Crédito', 'PIX', 'Dinheiro']
const pessoas = ['Roosevelt', 'Quéren', 'Compartilhado']

const despesasIniciais = [
  { id: 1, data: '2026-04-12', nome: 'Mercado Carrefour', categoria: 'Mercado', valor: 210, quem: 'Quéren', tipo: 'compartilhado', forma: 'Débito', cartao: '' },
  { id: 2, data: '2026-04-12', nome: 'Conta de Luz', categoria: 'Moradia', valor: 180, quem: 'Roosevelt', tipo: 'compartilhado', forma: 'PIX', cartao: '' },
  { id: 3, data: '2026-04-11', nome: 'Uber', categoria: 'Transporte', valor: 35, quem: 'Roosevelt', tipo: 'individual', forma: 'Crédito', cartao: 'Nubank' },
  { id: 4, data: '2026-04-11', nome: 'Farmácia', categoria: 'Saúde', valor: 89, quem: 'Quéren', tipo: 'individual', forma: 'Débito', cartao: '' },
  { id: 5, data: '2026-04-10', nome: 'Netflix', categoria: 'Lazer', valor: 39.90, quem: 'Compartilhado', tipo: 'compartilhado', forma: 'Crédito', cartao: 'Nubank' },
  { id: 6, data: '2026-04-10', nome: 'Aluguel', categoria: 'Moradia', valor: 1200, quem: 'Roosevelt', tipo: 'compartilhado', forma: 'PIX', cartao: '' },
  { id: 7, data: '2026-04-09', nome: 'iFood', categoria: 'Lazer', valor: 75, quem: 'Quéren', tipo: 'compartilhado', forma: 'Crédito', cartao: 'Inter' },
  { id: 8, data: '2026-04-08', nome: 'Gasolina', categoria: 'Transporte', valor: 150, quem: 'Roosevelt', tipo: 'individual', forma: 'Crédito', cartao: 'Nubank' },
]

const moeda = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

const formatarData = (data: string) => {
  const d = new Date(data + 'T00:00:00')
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
}

const agruparPorData = (lista: typeof despesasIniciais) => {
  const grupos: Record<string, typeof despesasIniciais> = {}
  lista.forEach(d => {
    if (!grupos[d.data]) grupos[d.data] = []
    grupos[d.data].push(d)
  })
  return grupos
}

type Despesa = typeof despesasIniciais[0]

const formVazio = {
  nome: '', valor: '', categoria: 'Mercado', data: new Date().toISOString().split('T')[0],
  quem: 'Roosevelt', forma: 'PIX', cartao: '', tipo: 'compartilhado', recorrente: false, observacao: '',
}

export default function Despesas() {
  const [despesas, setDespesas] = useState(despesasIniciais)
  const [busca, setBusca] = useState('')
  const [filtroCat, setFiltroCat] = useState('')
  const [filtroQuem, setFiltroQuem] = useState('')
  const [filtroTipo, setFiltroTipo] = useState('')
  const [menuAberto, setMenuAberto] = useState<number | null>(null)
  const [modalAberto, setModalAberto] = useState(false)
  const [form, setForm] = useState(formVazio)
  const [editando, setEditando] = useState<number | null>(null)

  const hoje = new Date()
  const mesAtual = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}`
  const [mesFiltro, setMesFiltro] = useState(mesAtual)

  const despesasFiltradas = despesas.filter(d => {
    const buscaOk = d.nome.toLowerCase().includes(busca.toLowerCase()) || d.categoria.toLowerCase().includes(busca.toLowerCase())
    const catOk = !filtroCat || d.categoria === filtroCat
    const quemOk = !filtroQuem || d.quem === filtroQuem
    const tipoOk = !filtroTipo || d.tipo === filtroTipo
    const mesOk = mesFiltro === 'todos' || d.data.startsWith(mesFiltro)
    return buscaOk && catOk && quemOk && tipoOk && mesOk
  })

  const totalGasto = despesasFiltradas.reduce((s, d) => s + d.valor, 0)
  const grupos = agruparPorData(despesasFiltradas)
  const datasOrdenadas = Object.keys(grupos).sort((a, b) => b.localeCompare(a))

  const getCat = (nome: string) => categorias.find(c => c.nome === nome) || categorias[7]

  const abrirModal = (despesa?: Despesa) => {
    if (despesa) {
      setForm({ ...despesa, valor: String(despesa.valor), recorrente: false, observacao: '' })
      setEditando(despesa.id)
    } else {
      setForm(formVazio)
      setEditando(null)
    }
    setModalAberto(true)
  }

  const salvarDespesa = (e: React.FormEvent) => {
    e.preventDefault()
    if (editando) {
      setDespesas(prev => prev.map(d => d.id === editando ? { ...d, ...form, valor: parseFloat(form.valor) } : d))
    } else {
      setDespesas(prev => [...prev, { ...form, id: Date.now(), valor: parseFloat(form.valor) }])
    }
    setModalAberto(false)
    setForm(formVazio)
    setEditando(null)
  }

  const excluirDespesa = (id: number) => {
    setDespesas(prev => prev.filter(d => d.id !== id))
    setMenuAberto(null)
  }

  return (
    <div style={estilosDespesas.pagina}>
      <Sidebar paginaAtiva="despesas" />

      <main style={estilosDespesas.conteudo} className="conteudo-principal" onClick={() => setMenuAberto(null)}>

       {/* Header */}
        <div style={estilosDespesas.header}>
        <div>
            <div style={estilosDespesas.headerTitulo}>Despesas 💸</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
            <input
                type="month"
                value={mesFiltro === 'todos' ? '' : mesFiltro}
                onChange={e => setMesFiltro(e.target.value || 'todos')}
                style={estilosDespesas.filtroSelect}
            />
            <button
                onClick={() => setMesFiltro('todos')}
                style={{
                padding: '8px 14px',
                background: mesFiltro === 'todos' ? '#c4793a' : '#f5f0e8',
                color: mesFiltro === 'todos' ? 'white' : '#a89880',
                border: 'none',
                borderRadius: '10px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                }}
            >
                Todos
            </button>
            </div>
        </div>
        <button style={estilosDespesas.botaoAdicionar} onClick={() => abrirModal()}>
            + Adicionar despesa
        </button>
        </div>
        {/* Resumo */}
        <div style={estilosDespesas.resumoGrade} className="cards-saldo">
          <div style={estilosDespesas.resumoCard}>
            <div style={estilosDespesas.resumoLabel}>Total gasto</div>
            <div style={{ ...estilosDespesas.resumoValor, color: cores.vermelho }}>{moeda(totalGasto)}</div>
          </div>
          <div style={estilosDespesas.resumoCard}>
            <div style={estilosDespesas.resumoLabel}>Registros</div>
            <div style={estilosDespesas.resumoValor}>{despesasFiltradas.length}</div>
          </div>
          <div style={estilosDespesas.resumoCard}>
            <div style={estilosDespesas.resumoLabel}>Média por dia</div>
            <div style={estilosDespesas.resumoValor}>{moeda(totalGasto / 30)}</div>
          </div>
        </div>

        {/* Filtros */}
        <div style={estilosDespesas.filtrosArea}>
          <div style={estilosDespesas.buscaWrap}>
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: cores.textoSuave, fontSize: '0.9rem' }}>🔍</span>
            <input placeholder="Buscar despesa..." value={busca} onChange={e => setBusca(e.target.value)} style={estilosDespesas.buscaInput} />
          </div>

          <select value={filtroCat} onChange={e => setFiltroCat(e.target.value)} style={estilosDespesas.filtroSelect}>
            <option value="">Todas categorias</option>
            {categorias.map(c => <option key={c.nome} value={c.nome}>{c.icone} {c.nome}</option>)}
          </select>

          <select value={filtroQuem} onChange={e => setFiltroQuem(e.target.value)} style={estilosDespesas.filtroSelect}>
            <option value="">Todas pessoas</option>
            {pessoas.map(p => <option key={p} value={p}>{p}</option>)}
          </select>

          <select value={filtroTipo} onChange={e => setFiltroTipo(e.target.value)} style={estilosDespesas.filtroSelect}>
            <option value="">Todos os tipos</option>
            <option value="compartilhado">💑 Compartilhado</option>
            <option value="individual">👤 Individual</option>
          </select>
        </div>

        {/* Lista de despesas */}
        <div style={estilosDespesas.listaCard}>
          {datasOrdenadas.length === 0 ? (
            <div style={{ padding: '48px', textAlign: 'center', color: cores.textoSuave }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🔍</div>
              <div style={{ fontWeight: 600 }}>Nenhuma despesa encontrada</div>
            </div>
          ) : (
            datasOrdenadas.map(data => (
              <div key={data}>
                <div style={estilosDespesas.grupoData}>
                  {new Date(data + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })}
                </div>
                {grupos[data].map((despesa, i) => {
                  const cat = getCat(despesa.categoria)
                  const isUltimo = i === grupos[data].length - 1
                  return (
                    <div
                      key={despesa.id}
                      style={{ ...estilosDespesas.itemDespesa, borderBottom: isUltimo ? 'none' : `1px solid ${cores.fundo}` }}
                      onMouseEnter={e => e.currentTarget.style.background = '#faf7f3'}
                      onMouseLeave={e => e.currentTarget.style.background = 'white'}
                    >
                      {/* Ícone categoria */}
                      <div style={{ ...estilosDespesas.itemIcone, background: cat.cor + '20' }}>
                        {cat.icone}
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={estilosDespesas.itemNome}>{despesa.nome}</div>
                        <div style={estilosDespesas.itemCategoria}>{despesa.categoria} · {despesa.forma} · {despesa.quem}</div>
                      </div>

                      {/* Badge */}
                      <div style={despesa.tipo === 'compartilhado' ? estilosDespesas.badgeCompartilhado : estilosDespesas.badgeIndividual}>
                        {despesa.tipo === 'compartilhado' ? '💑 Casal' : '👤 Individual'}
                      </div>

                      {/* Valor */}
                      <div style={estilosDespesas.itemValor}>{moeda(despesa.valor)}</div>

                      {/* Menu ações */}
                      <div style={estilosDespesas.menuAcoes}>
                        <button
                          style={estilosDespesas.botaoMenu}
                          onClick={e => { e.stopPropagation(); setMenuAberto(menuAberto === despesa.id ? null : despesa.id) }}
                        >⋯</button>
                        {menuAberto === despesa.id && (
                        <div style={{ ...estilosDespesas.dropdownMenu }}>   
                            <button style={estilosDespesas.dropdownItem} onClick={() => { abrirModal(despesa); setMenuAberto(null) }}>✏️ Editar</button>
                            <button style={{ ...estilosDespesas.dropdownItem, color: cores.vermelho }} onClick={() => excluirDespesa(despesa.id)}>🗑️ Excluir</button>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            ))
          )}
        </div>
      </main>

      {/* Modal adicionar/editar despesa */}
      {modalAberto && (
        <div style={estilosDespesas.modalOverlay} onClick={() => setModalAberto(false)}>
          <div style={estilosDespesas.modalCard} onClick={e => e.stopPropagation()}>
            <div style={estilosDespesas.modalTitulo}>
              {editando ? '✏️ Editar despesa' : '+ Nova despesa'}
            </div>

            <form onSubmit={salvarDespesa}>
              <div style={estilosDespesas.modalGrade2}>

                <div style={{ marginBottom: '16px', gridColumn: '1 / -1' }}>
                  <label style={estilosGlobais.label}>Descrição</label>
                  <input placeholder="Ex: Mercado Carrefour" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} required
                    style={estilosGlobais.input}
                    onFocus={e => e.target.style.borderColor = '#c4793a'}
                    onBlur={e => e.target.style.borderColor = '#ede8df'}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={estilosGlobais.label}>Valor (R$)</label>
                  <input type="number" step="0.01" placeholder="0,00" value={form.valor} onChange={e => setForm({ ...form, valor: e.target.value })} required
                    style={estilosGlobais.input}
                    onFocus={e => e.target.style.borderColor = '#c4793a'}
                    onBlur={e => e.target.style.borderColor = '#ede8df'}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={estilosGlobais.label}>Data</label>
                  <input type="date" value={form.data} onChange={e => setForm({ ...form, data: e.target.value })} required
                    style={estilosGlobais.input}
                    onFocus={e => e.target.style.borderColor = '#c4793a'}
                    onBlur={e => e.target.style.borderColor = '#ede8df'}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={estilosGlobais.label}>Categoria</label>
                  <select value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value })} style={{ ...estilosGlobais.input, cursor: 'pointer' }}>
                    {categorias.map(c => <option key={c.nome} value={c.nome}>{c.icone} {c.nome}</option>)}
                  </select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={estilosGlobais.label}>Quem pagou</label>
                  <select value={form.quem} onChange={e => setForm({ ...form, quem: e.target.value })} style={{ ...estilosGlobais.input, cursor: 'pointer' }}>
                    {pessoas.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={estilosGlobais.label}>Forma de pagamento</label>
                  <select value={form.forma} onChange={e => setForm({ ...form, forma: e.target.value })} style={{ ...estilosGlobais.input, cursor: 'pointer' }}>
                    {formasPagamento.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={estilosGlobais.label}>Tipo</label>
                  <select value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })} style={{ ...estilosGlobais.input, cursor: 'pointer' }}>
                    <option value="compartilhado">💑 Compartilhado</option>
                    <option value="individual">👤 Individual</option>
                  </select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={estilosGlobais.label}>Cartão (opcional)</label>
                  <input placeholder="Ex: Nubank" value={form.cartao} onChange={e => setForm({ ...form, cartao: e.target.value })}
                    style={estilosGlobais.input}
                    onFocus={e => e.target.style.borderColor = '#c4793a'}
                    onBlur={e => e.target.style.borderColor = '#ede8df'}
                  />
                </div>

                <div style={{ marginBottom: '16px', gridColumn: '1 / -1' }}>
                  <label style={estilosGlobais.label}>Observação (opcional)</label>
                  <input placeholder="Alguma nota sobre essa despesa..." value={form.observacao} onChange={e => setForm({ ...form, observacao: e.target.value })}
                    style={estilosGlobais.input}
                    onFocus={e => e.target.style.borderColor = '#c4793a'}
                    onBlur={e => e.target.style.borderColor = '#ede8df'}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <input type="checkbox" id="recorrente" checked={form.recorrente} onChange={e => setForm({ ...form, recorrente: e.target.checked })} style={{ width: '18px', height: '18px', accentColor: '#c4793a' }} />
                  <label htmlFor="recorrente" style={{ fontSize: '0.88rem', color: cores.texto, cursor: 'pointer' }}>Despesa recorrente (se repete todo mês)</label>
                </div>

              </div>

              <div style={estilosDespesas.modalBotoes}>
                <button type="button" onClick={() => setModalAberto(false)} style={estilosDespesas.botaoCancelar}>Cancelar</button>
                <button type="submit" style={{ ...estilosGlobais.botaoPrimario, flex: 1 }}>
                  {editando ? 'Salvar alterações' : 'Adicionar despesa'}
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