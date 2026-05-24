import { Link } from 'react-router-dom'

export default function Logo({ compact = false }) {
  return (
    <Link to="/dashboard" className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-sm font-bold text-white shadow-sm">
        Ax
      </div>
      {!compact && (
        <div>
          <span className="block text-sm font-bold tracking-tight text-slate-900 dark:text-white">
            AssistentX
          </span>
          <span className="block text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Finanças pessoais
          </span>
        </div>
      )}
    </Link>
  )
}
