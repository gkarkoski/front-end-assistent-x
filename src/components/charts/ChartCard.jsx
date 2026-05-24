import { useState } from 'react'
import Card from '../ui/Card'
import { chartPeriods, chartData } from '../../mock/chartData'
import { formatCurrency } from '../../utils/currency'

export default function ChartCard() {
  const [selectedPeriod, setSelectedPeriod] = useState('1y')
  const [showTooltip, setShowTooltip] = useState(false)
  const [hoveredPoint, setHoveredPoint] = useState(null)
  const [startDate, setStartDate] = useState('2024-01-01')
  const [endDate, setEndDate] = useState('2024-12-31')

  const currentData = chartData[selectedPeriod]
  const allValues = [
    ...currentData.receitas,
    ...currentData.despesas,
    ...currentData.patrimonio,
    ...currentData.investimentos,
  ]
  const maxValue = Math.max(...allValues)
  const minValue = Math.min(...allValues)
  const valueRange = maxValue - minValue || 1

  const series = [
    { key: 'receitas', label: 'Receitas', color: '#10b981', data: currentData.receitas },
    { key: 'despesas', label: 'Despesas', color: '#f43f5e', data: currentData.despesas },
    { key: 'patrimonio', label: 'Patrimônio', color: '#3b82f6', data: currentData.patrimonio },
    { key: 'investimentos', label: 'Investimentos', color: '#f59e0b', data: currentData.investimentos },
  ]

  return (
    <Card
      title="Evolução Financeira"
      action={
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="rounded-lg border border-slate-200 px-2 py-1 text-sm dark:border-slate-700 dark:bg-slate-800"
          />
          <span className="text-slate-400">-</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="rounded-lg border border-slate-200 px-2 py-1 text-sm dark:border-slate-700 dark:bg-slate-800"
          />
          <div className="relative">
            <button
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            {showTooltip && (
              <div className="absolute right-0 top-full z-10 mt-2 w-64 rounded-xl bg-slate-900 px-4 py-3 text-xs text-white shadow-lg dark:bg-slate-700">
                <p className="mb-2 font-semibold">Períodos disponíveis:</p>
                <ul className="space-y-1">
                  {chartPeriods.map((period) => (
                    <li key={period.id} className="text-slate-300">
                      <span className="font-medium">{period.label}:</span> {period.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      }
    >
      <div className="relative h-80 w-full">
        <svg width="100%" height="100%" viewBox="0 0 850 320" preserveAspectRatio="none">
          <defs>
            <clipPath id="chart-clip">
              <rect x="0" y="0" width="850" height="320" />
            </clipPath>
          </defs>
          <g clipPath="url(#chart-clip)">
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((percent) => {
              const y = 20 + 260 * percent
              return (
                <line
                  key={percent}
                  x1="100"
                  y1={y}
                  x2="830"
                  y2={y}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  className="dark:stroke-slate-700"
                />
              )
            })}

            {/* Y-axis labels */}
            {[0, 0.25, 0.5, 0.75, 1].map((percent) => {
              const value = minValue + valueRange * (1 - percent)
              const y = 20 + 260 * percent
              return (
                <text
                  key={percent}
                  x="90"
                  y={y + 4}
                  textAnchor="end"
                  className="text-xs fill-slate-500 dark:fill-slate-400"
                >
                  {formatCurrency(value)}
                </text>
              )
            })}

            {/* X-axis labels */}
            {currentData.labels.map((label, index) => {
              const x = 100 + (index / (currentData.labels.length - 1)) * 730
              return (
                <text
                  key={label}
                  x={x}
                  y="305"
                  textAnchor="middle"
                  className="text-xs fill-slate-500 dark:fill-slate-400"
                >
                  {label}
                </text>
              )
            })}

            {/* Series lines */}
            {series.map((s) => (
              <polyline
                key={s.key}
                points={s.data.map((value, index) => {
                  const x = 100 + (index / (currentData.labels.length - 1)) * 730
                  const y = 20 + 260 - ((value - minValue) / valueRange) * 260
                  return `${x},${y}`
                }).join(' ')}
                fill="none"
                stroke={s.color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}

            {/* Series points */}
            {series.map((s) =>
              s.data.map((value, index) => {
                const x = 100 + (index / (currentData.labels.length - 1)) * 730
                const y = 20 + 260 - ((value - minValue) / valueRange) * 260
                return (
                  <circle
                    key={`${s.key}-${index}`}
                    cx={x}
                    cy={y}
                    r="4"
                    fill={s.color}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPoint({ type: s.key, label: s.label, index, value, color: s.color, month: currentData.labels[index] })}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                )
              })
            )}
          </g>
        </svg>

        {/* Tooltip for hovered point */}
        {hoveredPoint && (
          <div
            className="absolute rounded-lg bg-slate-900 px-3 py-2 text-xs text-white shadow-lg dark:bg-slate-700 pointer-events-none"
            style={{
              left: `${(100 + (hoveredPoint.index / (currentData.labels.length - 1)) * 730) / 8.5}%`,
              top: `${(20 + 260 - ((hoveredPoint.value - minValue) / valueRange) * 260) / 3.2}%`,
              transform: 'translate(-50%, -100%)',
              marginTop: '-10px',
            }}
          >
            <p className="font-semibold">{hoveredPoint.month}</p>
            <p style={{ color: hoveredPoint.color }}>
              {hoveredPoint.label}: {formatCurrency(hoveredPoint.value)}
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs">
        {series.map((s) => (
          <div key={s.key} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="text-slate-600 dark:text-slate-400">{s.label}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
