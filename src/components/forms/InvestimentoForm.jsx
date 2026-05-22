import { useState } from 'react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'
import { toApiDateTime, toDatetimeLocalValue } from '../../utils/dates'

export default function InvestimentoForm({ tipos = [], initial, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(() => {
    if (!initial) {
      return {
        tipoInvestimentoId: '',
        valorInicial: '',
        valorAtual: '',
        dataInicio: toDatetimeLocalValue(new Date()),
      }
    }
    return {
      tipoInvestimentoId: String(initial.tipoInvestimentoId),
      valorInicial: String(initial.valorInicial),
      valorAtual: String(initial.valorAtual),
      dataInicio: toDatetimeLocalValue(initial.dataInicio),
    }
  })
  const [error, setError] = useState('')

  const tipoOptions = tipos.map((t) => ({
    value: String(t.id),
    label: `${t.nome} (${t.classificacao})`,
  }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await onSubmit({
        tipoInvestimentoId: Number(form.tipoInvestimentoId),
        valorInicial: Number(form.valorInicial),
        valorAtual: Number(form.valorAtual),
        dataInicio: toApiDateTime(form.dataInicio),
      })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        label="Tipo de investimento"
        value={form.tipoInvestimentoId}
        onChange={(e) => setForm((f) => ({ ...f, tipoInvestimentoId: e.target.value }))}
        options={tipoOptions}
        placeholder="Selecione..."
        required
      />
      <Input
        label="Valor inicial (R$)"
        type="number"
        min="0"
        step="0.01"
        value={form.valorInicial}
        onChange={(e) => setForm((f) => ({ ...f, valorInicial: e.target.value }))}
        required
      />
      <Input
        label="Valor atual (R$)"
        type="number"
        min="0"
        step="0.01"
        value={form.valorAtual}
        onChange={(e) => setForm((f) => ({ ...f, valorAtual: e.target.value }))}
        required
      />
      <Input
        label="Data de início"
        type="datetime-local"
        value={form.dataInicio}
        onChange={(e) => setForm((f) => ({ ...f, dataInicio: e.target.value }))}
        required
      />
      {error && (
        <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
          {error}
        </p>
      )}
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : initial ? 'Atualizar' : 'Cadastrar'}
        </Button>
      </div>
    </form>
  )
}
