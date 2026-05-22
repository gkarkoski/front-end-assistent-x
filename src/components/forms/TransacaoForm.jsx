import { useState } from 'react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'
import { toApiDateTime, toDatetimeLocalValue } from '../../utils/dates'

const emptyForm = {
  valor: '',
  dataHora: '',
  origemId: '',
}

export default function TransacaoForm({
  tipo,
  origens = [],
  initial,
  onSubmit,
  onCancel,
  loading,
}) {
  const isSaida = tipo === 'S'
  const [form, setForm] = useState(() => {
    if (!initial) {
      return { ...emptyForm, dataHora: toDatetimeLocalValue(new Date()) }
    }
    return {
      valor: String(isSaida ? Math.abs(initial.valor) : initial.valor),
      dataHora: toDatetimeLocalValue(initial.dataHora),
      origemId: String(initial.origemId ?? ''),
    }
  })
  const [error, setError] = useState('')

  const origemOptions = origens.map((o) => ({ value: String(o.id), label: o.nome }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const valorNum = Number(form.valor)
    if (!valorNum || valorNum <= 0) {
      setError('Informe um valor válido maior que zero.')
      return
    }
    if (!form.origemId) {
      setError('Selecione uma origem.')
      return
    }
    try {
      await onSubmit({
        valor: isSaida ? -Math.abs(valorNum) : Math.abs(valorNum),
        dataHora: toApiDateTime(form.dataHora),
        origemId: Number(form.origemId),
      })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Valor (R$)"
        name="valor"
        type="number"
        min="0.01"
        step="0.01"
        value={form.valor}
        onChange={(e) => setForm((f) => ({ ...f, valor: e.target.value }))}
        required
      />
      <Input
        label="Data e hora"
        name="dataHora"
        type="datetime-local"
        value={form.dataHora}
        onChange={(e) => setForm((f) => ({ ...f, dataHora: e.target.value }))}
        required
      />
      <Select
        label="Origem"
        name="origemId"
        value={form.origemId}
        onChange={(e) => setForm((f) => ({ ...f, origemId: e.target.value }))}
        options={origemOptions}
        placeholder="Selecione..."
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
