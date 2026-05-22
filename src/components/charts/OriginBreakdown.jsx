import { formatCurrency } from '../../utils/currency'

export default function OriginBreakdown({ origens = [], total, colorClass = 'bg-emerald-500' }) {
  if (!origens.length) {
    return <p className="text-xs text-slate-500">Sem dados</p>
  }

  const max = Math.max(...origens.map((o) => o.valorTotal), 1)

  return (
    <ul className="space-y-3">
      {origens.slice(0, 5).map((origem) => {
        const pct = (origem.valorTotal / max) * 100
        return (
          <li key={origem.origemId}>
            <div className="mb-1 flex justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">{origem.origemNome}</span>
              <span className="tabular-nums font-medium text-slate-800 dark:text-slate-200">
                {formatCurrency(origem.valorTotal)}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${pct}%` }} />
            </div>
          </li>
        )
      })}
      {total != null && (
        <li className="border-t border-slate-100 pt-2 text-xs font-medium dark:border-slate-800">
          Total: <span className="tabular-nums">{formatCurrency(total)}</span>
        </li>
      )}
    </ul>
  )
}
