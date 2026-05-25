export default function Card({ children, className = '', title, subtitle, action }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-[#faf2d3] p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 ${className}`}
    >
      {(title || action) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title && <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  )
}
