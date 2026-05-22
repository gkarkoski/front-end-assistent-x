const STATUS_CONFIG = {
  ABAIXO_DO_LIMITE: {
    label: 'Abaixo do limite',
    bar: 'bg-emerald-500',
    badge: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  },
  NO_LIMITE: {
    label: 'No limite',
    bar: 'bg-amber-500',
    badge: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
  },
  POUCO_ACIMA_DO_LIMITE: {
    label: 'Pouco acima',
    bar: 'bg-orange-500',
    badge: 'bg-orange-500/15 text-orange-700 dark:text-orange-300',
  },
  MUITO_ACIMA_DO_LIMITE: {
    label: 'Muito acima',
    bar: 'bg-red-500',
    badge: 'bg-red-500/15 text-red-700 dark:text-red-300',
  },
}

export function getStatusConfig(status) {
  return (
    STATUS_CONFIG[status] ?? {
      label: status ?? '—',
      bar: 'bg-slate-400',
      badge: 'bg-slate-500/15 text-slate-600 dark:text-slate-300',
    }
  )
}
