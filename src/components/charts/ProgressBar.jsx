export default function ProgressBar({ percent, barClassName = 'bg-emerald-500' }) {
  const clamped = Math.min(Math.max(percent ?? 0, 0), 150)
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
      <div
        className={`h-full rounded-full transition-all duration-500 ${barClassName}`}
        style={{ width: `${Math.min(clamped, 100)}%` }}
      />
    </div>
  )
}
