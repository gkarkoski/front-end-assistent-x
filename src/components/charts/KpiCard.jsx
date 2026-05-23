import { Link } from 'react-router-dom'

export default function KpiCard({ title, value, subtitle, icon, accent, to }) {
  const content = (
    <div
      className={`h-full rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80 ${to ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <p className={`mt-2 text-2xl font-bold tabular-nums ${accent}`}>{value}</p>
          <p className="mt-1 min-h-4 text-xs text-slate-500 dark:text-slate-400">
            {subtitle ?? '\u00A0'}
          </p>
        </div>
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg dark:bg-slate-800">
            {icon}
          </div>
        )}
      </div>
    </div>
  )

  return to ? (
    <Link to={to} className="block h-full">
      {content}
    </Link>
  ) : (
    <div className="h-full">{content}</div>
  )
}
