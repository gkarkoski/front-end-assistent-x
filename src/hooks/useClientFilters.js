import { useMemo, useState } from 'react'
import { isInDateRange } from '../utils/dates'

export function useClientFilters(items, config = {}) {
  const { dateField = 'dataHora', valueField = 'valor', absValue = false } = config

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [origemId, setOrigemId] = useState('')
  const [minValue, setMinValue] = useState('')
  const [maxValue, setMaxValue] = useState('')

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (startDate || endDate) {
        if (!isInDateRange(item[dateField], startDate, endDate)) return false
      }

      if (origemId && String(item.origemId) !== origemId) return false

      const raw = Number(item[valueField])
      const value = absValue ? Math.abs(raw) : raw

      if (minValue !== '' && value < Number(minValue)) return false
      if (maxValue !== '' && value > Number(maxValue)) return false

      return true
    })
  }, [items, startDate, endDate, origemId, minValue, maxValue, dateField, valueField, absValue])

  const resetFilters = () => {
    setStartDate('')
    setEndDate('')
    setOrigemId('')
    setMinValue('')
    setMaxValue('')
  }

  return {
    filtered,
    filters: { startDate, endDate, origemId, minValue, maxValue },
    setStartDate,
    setEndDate,
    setOrigemId,
    setMinValue,
    setMaxValue,
    resetFilters,
  }
}
