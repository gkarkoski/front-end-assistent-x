import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'

export default function TransactionFilters({
  filters,
  setStartDate,
  setEndDate,
  setOrigemId,
  setMinValue,
  setMaxValue,
  origens = [],
  onReset,
}) {
  const origemOptions = origens.map((o) => ({ value: String(o.id), label: o.nome }))

  return (
    <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/50 sm:grid-cols-2 lg:grid-cols-5">
      <Input
        label="De"
        type="date"
        value={filters.startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <Input
        label="Até"
        type="date"
        value={filters.endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <Select
        label="Origem"
        value={filters.origemId}
        onChange={(e) => setOrigemId(e.target.value)}
        options={origemOptions}
        placeholder="Todas"
      />
      <Input
        label="Valor mín."
        type="number"
        min="0"
        step="0.01"
        value={filters.minValue}
        onChange={(e) => setMinValue(e.target.value)}
      />
      <div className="flex items-end gap-2">
        <Input
          label="Valor máx."
          type="number"
          min="0"
          step="0.01"
          value={filters.maxValue}
          onChange={(e) => setMaxValue(e.target.value)}
          className="flex-1"
        />
        <Button variant="outline" size="sm" onClick={onReset} className="mb-0.5 shrink-0 hover:bg-slate-100 dark:hover:bg-slate-800">
          Limpar
        </Button>
      </div>
    </div>
  )
}
