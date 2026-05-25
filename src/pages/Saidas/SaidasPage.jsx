import { useCallback, useEffect, useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'
import TransactionFilters from '../../components/transactions/TransactionFilters'
import TransacaoForm from '../../components/forms/TransacaoForm'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import EmptyState from '../../components/ui/EmptyState'
import Modal from '../../components/ui/Modal'
import Spinner from '../../components/ui/Spinner'
import {
  createSaida,
  deleteSaida,
  listSaidas,
  updateSaida,
} from '../../api/transacoes'
import { listOrigens } from '../../api/catalogos'
import { useAuth } from '../../context/AuthContext'
import { useClientFilters } from '../../hooks/useClientFilters'
import { formatCurrency } from '../../utils/currency'
import { formatDisplayDate } from '../../utils/dates'

export default function SaidasPage() {
  const { token, usuarioId } = useAuth()
  const [items, setItems] = useState([])
  const [origens, setOrigens] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const {
    filtered,
    filters,
    setStartDate,
    setEndDate,
    setOrigemId,
    setMinValue,
    setMaxValue,
    resetFilters,
  } = useClientFilters(items, { absValue: true })

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [list, allOrigens] = await Promise.all([
        listSaidas(token, usuarioId),
        listOrigens(token),
      ])
      setItems(list ?? [])
      setOrigens((allOrigens ?? []).filter((o) => o.tipo === 'S'))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [token, usuarioId])

  useEffect(() => {
    load()
  }, [load])

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
        await updateSaida(token, usuarioId, editing.transacaoId, {
          transacaoId: editing.transacaoId,
          usuarioId,
          ...payload,
        })
      } else {
        await createSaida(token, usuarioId, { usuarioId, ...payload })
      }
      closeModal()
      await load()
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (item) => {
    if (!window.confirm(`Excluir saída de ${formatCurrency(Math.abs(item.valor))}?`)) return
    try {
      await deleteSaida(token, usuarioId, item.transacaoId)
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <PageHeader
        title="Saídas"
        description="Controle despesas e gastos por categoria de origem."
        action={<Button onClick={openCreate}>+ Nova saída</Button>}
      />

      {error && (
        <p className="mb-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-500/10">
          {error}
        </p>
      )}

      <TransactionFilters
        filters={filters}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setOrigemId={setOrigemId}
        setMinValue={setMinValue}
        setMaxValue={setMaxValue}
        origens={origens}
        onReset={resetFilters}
      />

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner className="h-10 w-10" />
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="Nenhuma saída encontrada"
          description="Cadastre uma nova saída ou ajuste os filtros."
          action={<Button onClick={openCreate}>Nova saída</Button>}
        />
      ) : (
        <Card className="mt-4 overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-500/5 dark:bg-white/5">
                  <th className="px-4 py-3 font-medium text-slate-600 dark:text-slate-400">Data</th>
                  <th className="px-4 py-3 font-medium text-slate-600 dark:text-slate-400">Origem</th>
                  <th className="px-4 py-3 font-medium text-slate-600 dark:text-slate-400 text-right">Valor</th>
                  <th className="px-4 py-3 font-medium text-slate-600 dark:text-slate-400 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr
                    key={item.transacaoId}
                    className="border-b border-slate-50 hover:bg-slate-50/50 dark:border-slate-800 dark:hover:bg-slate-800/30"
                  >
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {formatDisplayDate(item.dataHora)}
                    </td>
                    <td className="px-4 py-3">{item.origemNome}</td>
                    <td className="px-4 py-3 text-right font-semibold tabular-nums text-rose-600 dark:text-rose-400">
                      − {formatCurrency(Math.abs(item.valor))}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(item)}>
                          Editar
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(item)}>
                          Excluir
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Modal
        open={modalOpen}
        title={editing ? 'Editar saída' : 'Nova saída'}
        onClose={closeModal}
        footer={null}
      >
        <TransacaoForm
          tipo="S"
          origens={origens}
          initial={editing}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          loading={saving}
        />
      </Modal>
    </div>
  )
}
