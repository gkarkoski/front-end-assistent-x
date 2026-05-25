import { Link } from 'react-router-dom'

export default function KpiCard({ title, value, subtitle, icon, accent, to }) {
  const content = (
    <div
      className={`h-full rounded-2xl border border-slate-200/80 bg-[#faf2d3]  p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80 ${to ? 'cursor-pointer' : ''}`}
    >
      <div className="flex h-full flex-col bg-[#f6e7b0] text-lg dark:bg-slate-800">
        {/* Header */}
        <div className="flex items-start justify-between">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {title}
          </p>

          {icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg dark:bg-slate-800">
              {icon}
            </div>
          )}
        </div>

        {/* Valor centralizado */}
        <div className="flex flex-1 items-center justify-center">
          <p className={`text-2xl font-bold tabular-nums ${accent}`}>
            {value}
          </p>
        </div>

        {/* Footer */}
        <p className="text-left text-xs text-slate-500 dark:text-slate-400">
          {subtitle ?? '\u00A0'}
        </p>
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
