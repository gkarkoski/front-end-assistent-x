import { useCallback, useEffect, useMemo, useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'
import InvestimentoForm from '../../components/forms/InvestimentoForm'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import EmptyState from '../../components/ui/EmptyState'
import Modal from '../../components/ui/Modal'
import Spinner from '../../components/ui/Spinner'
import KpiCard from '../../components/charts/KpiCard'
import {
  createInvestimento,
  deleteInvestimento,
  listPatrimonio,
  getResumoPatrimonio,
  updateInvestimento,
} from '../../api/investimentos'
import { listTiposInvestimento } from '../../api/catalogos'
import { useAuth } from '../../context/AuthContext'
import { formatCurrency } from '../../utils/currency'
import { formatDisplayDate } from '../../utils/dates'

export default function PatrimonioPage() {
  const { token, usuarioId } = useAuth()
  const [items, setItems] = useState([])
  const [resumo, setResumo] = useState(null)
  const [tipos, setTipos] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [filterClassificacao, setFilterClassificacao] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [list, summary, tiposList] = await Promise.all([
        listPatrimonio(token, usuarioId),
        getResumoPatrimonio(token, usuarioId),
        listTiposInvestimento(token),
      ])
      setItems(list ?? [])
      setResumo(summary)
      setTipos(tiposList ?? [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [token, usuarioId])

  useEffect(() => {
    load()
  }, [load])

  const filtered = useMemo(() => {
    if (!filterClassificacao) return items
    return items.filter((i) => i.classificacao === filterClassificacao)
  }, [items, filterClassificacao])

  const classificacoes = useMemo(
    () => [...new Set(items.map((i) => i.classificacao))],
    [items],
  )

  const openCreate = () => {
    setEditing(null)
    setModalOpen(true)
  }

  const openEdit = (item) => {
    setEditing(item)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditing(null)
  }

  const handleSubmit = async (payload) => {
    setSaving(true)
    try {
      if (editing) {
        await updateInvestimento(token, usuarioId, editing.investimentoId, {
          investimentoId: editing.investimentoId,
          usuarioId,
          ...payload,
        })
      } else {
        await createInvestimento(token, usuarioId, { usuarioId, ...payload })
      }
      closeModal()
      await load()
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (item) => {
    if (!window.confirm(`Excluir investimento ${item.tipoInvestimento}?`)) return
    try {
      await deleteInvestimento(token, usuarioId, item.investimentoId)
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <PageHeader
        title="Patrimônio"
        description="Gerencie investimentos e acompanhe a evolução do seu patrimônio."
        action={<Button onClick={openCreate}>+ Novo investimento</Button>}
      />

      {error && (
        <p className="mb-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-500/10">
          {error}
        </p>
      )}

      {resumo && (
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <KpiCard
            title="Valor atual"
            value={formatCurrency(resumo.valorAtualTotal)}
            accent="text-sky-600 dark:text-sky-400"
          />
          <KpiCard
            title="Valor inicial"
            value={formatCurrency(resumo.valorInicialTotal)}
            accent="text-slate-700 dark:text-slate-300"
          />
          <KpiCard
            title="Rendimento médio"
            value={`${((resumo.jurosEstimados ?? 0) * 100).toFixed(2)}% a.m.`}
            subtitle={`Últ. mensalidade: ${formatCurrency(resumo.ultimaMensalidade)}`}
            accent="text-emerald-600 dark:text-emerald-400"
          />
        </div>
      )}

      {classificacoes.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilterClassificacao('')}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              !filterClassificacao
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
            }`}
          >
            Todos
          </button>
          {classificacoes.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilterClassificacao(c)}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                filterClassificacao === c
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner className="h-10 w-10" />
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="Nenhum investimento"
          description="Cadastre seu primeiro investimento para acompanhar o patrimônio."
          action={<Button onClick={openCreate}>Novo investimento</Button>}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => {
            const rendimento =
              item.valorInicial > 0
                ? ((item.valorAtual - item.valorInicial) / item.valorInicial) * 100
                : 0
            return (
              <Card key={item.investimentoId}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-lg font-semibold">{item.tipoInvestimento}</p>
                    <p className="text-xs text-slate-500">{item.classificacao}</p>
                  </div>
                  <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-xs font-medium text-sky-700 dark:text-sky-300">
                    {((item.jurosEstimados ?? 0) * 100).toFixed(2)}% a.m.
                  </span>
                </div>
                <p className="mt-4 text-2xl font-bold tabular-nums text-sky-600 dark:text-sky-400">
                  {formatCurrency(item.valorAtual)}
                </p>
                <p className="text-xs text-slate-500">
                  Inicial: {formatCurrency(item.valorInicial)} ·{' '}
                  {rendimento >= 0 ? '+' : ''}
                  {rendimento.toFixed(1)}%
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Desde {formatDisplayDate(item.dataInicio)}
                </p>
                <div className="mt-4 flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(item)}>
                    Editar
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(item)}>
                    Excluir
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      <Modal
        open={modalOpen}
        title={editing ? 'Editar investimento' : 'Novo investimento'}
        onClose={closeModal}
        footer={null}
      >
        <InvestimentoForm
          tipos={tipos}
          initial={editing}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          loading={saving}
        />
      </Modal>
    </div>
  )
}
