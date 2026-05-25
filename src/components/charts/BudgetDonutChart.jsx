import { useState } from 'react'

export default function BudgetDonutChart({
  categorias = [],
  total = 0,
  formatCurrency,
}) {
  const [hoveredCategory, setHoveredCategory] = useState(null)

  const COLORS = [
    '#10b981',
    '#3b82f6',
    '#8b5cf6',
    '#f59e0b',
    '#ef4444',
    '#06b6d4',
    '#ec4899',
    '#84cc16',
  ]

  const size = 320
  const strokeWidth = 34
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  const totalBudget =
    categorias.reduce((acc, cat) => acc + cat.limite, 0) || 1

  const totalUsed =
    categorias.reduce(
      (acc, cat) => acc + cat.valorUtilizado,
      0,
    ) || 0

  let accumulated = 0

  return (
    <div className="flex flex-col items-center">

      {/* CHART */}
      <div className="relative">

        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90 overflow-visible"
        >
          {categorias.map((cat, index) => {
            const categoryFraction =
              cat.limite / totalBudget

            const categoryLength =
              circumference * categoryFraction

            const usedFraction = Math.min(
              cat.valorUtilizado / cat.limite,
              1,
            )

            const usedLength =
              categoryLength * usedFraction

            const offset =
              circumference * accumulated

            accumulated += categoryFraction

            const color =
              COLORS[index % COLORS.length]

            return (
              <g key={cat.categoriaId}>

                {/* restante */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke={color}
                  strokeOpacity={0.15}
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${categoryLength} ${circumference}`}
                  strokeDashoffset={-offset}
                  strokeLinecap="round"
                />

                {/* utilizado */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke={color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${usedLength} ${circumference}`}
                  strokeDashoffset={-offset}
                  strokeLinecap="round"
                  className="cursor-pointer transition-all duration-500 hover:opacity-80"
                  onMouseEnter={() =>
                    setHoveredCategory({
                      ...cat,
                      color,
                      percent: usedFraction * 100,
                    })
                  }
                  onMouseLeave={() =>
                    setHoveredCategory(null)
                  }
                />
              </g>
            )
          })}
        </svg>

        {/* CENTRO */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-bold tabular-nums text-slate-900 dark:text-white">
            {Math.round((totalUsed / totalBudget) * 100)}%
          </span>

          <span className="mt-1 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
            utilizado
          </span>

          <span className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-300">
            {formatCurrency(totalUsed)}
          </span>
        </div>

        {/* TOOLTIP */}
        {hoveredCategory && (
          <div
            className="absolute left-1/2 top-1/2 z-20 w-52 rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-xl dark:border-slate-700 dark:bg-slate-900"
            style={{
              transform: 'translate(-50%, -140%)',
            }}
          >
            <div className="mb-2 flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor:
                    hoveredCategory.color,
                }}
              />

              <span className="font-semibold text-slate-900 dark:text-white">
                {hoveredCategory.categoriaNome}
              </span>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">
                  Utilizado
                </span>

                <span className="font-medium text-slate-900 dark:text-white">
                  {formatCurrency(
                    hoveredCategory.valorUtilizado,
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">
                  Limite
                </span>

                <span className="font-medium text-slate-900 dark:text-white">
                  {formatCurrency(
                    hoveredCategory.limite,
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">
                  Percentual
                </span>

                <span className="font-medium text-slate-900 dark:text-white">
                  {hoveredCategory.percent.toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* LEGENDA */}
      <div className="mt-8 grid w-full grid-cols-2 gap-3">
        {categorias.map((cat, index) => {
          const percent = Math.min(
            (cat.valorUtilizado / cat.limite) * 100,
            100,
          )

          return (
            <div
              key={cat.categoriaId}
              className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2 dark:border-slate-800"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor:
                      COLORS[index % COLORS.length],
                  }}
                />

                <span className="truncate text-xs font-medium text-slate-700 dark:text-slate-300">
                  {cat.categoriaNome}
                </span>
              </div>

              <span className="text-xs tabular-nums text-slate-500">
                {percent.toFixed(0)}%
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}