export function formatCurrency(value) {
  const num = Number(value)
  if (Number.isNaN(num)) return 'R$ 0,00'
  return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function formatPercent(value, decimals = 1) {
  const num = Number(value)
  if (Number.isNaN(num)) return '0%'
  return `${num.toFixed(decimals)}%`
}

export function formatPercentFromDecimal(decimal) {
  return formatPercent(Number(decimal) * 100, 0)
}
