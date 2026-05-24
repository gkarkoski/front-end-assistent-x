import { useEffect, useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'
import ProgressBar from '../../components/charts/ProgressBar'
import StatusBadge from '../../components/charts/StatusBadge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Spinner from '../../components/ui/Spinner'
import { listModelos } from '../../api/catalogos'
import { getResumoOrcamento, setModelo } from '../../api/usuario'
import { useAuth } from '../../context/AuthContext'
import { formatCurrency, formatPercentFromDecimal } from '../../utils/currency'
import { getStatusConfig } from '../../utils/budgetStatus'

export default function OrcamentoPage() {
  const { token, usuarioId, user, updateUser } = useAuth()
  const [modelos, setModelos] = useState([])
  const [loading, setLoading] = useState(true)
  const [applyingId, setApplyingId] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError('')
      try {
        const list = await listModelos(token)
        setModelos(list ?? [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [token, usuarioId, user?.modeloId])

  const handleSelectModelo = async (modelo) => {
    setApplyingId(modelo.id)
    setError('')
    try {
      const updated = await setModelo(token, usuarioId, modelo.id)
      updateUser(updated)
    } catch (err) {
      setError(err.message)
    } finally {
      setApplyingId(null)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner className="h-10 w-10" />
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title="Modelos"
        description="Escolha um modelo de planejamento orçamentário que mais se alinha com seus objetivos."
      />

      {error && (
        <p className="mb-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-500/10">
          {error}
        </p>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        {modelos.map((modelo) => {
          const isActive = user?.modeloId === modelo.id
          return (
            <Card
              key={modelo.id}
              className={`flex h-full flex-col ${
                isActive ? 'ring-2 ring-emerald-500/50' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">{modelo.nome}</h3>
                  <p className="mt-1 text-sm text-slate-500">{modelo.descricao}</p>
                </div>
                {isActive && (
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                    Ativo
                  </span>
                )}
              </div>
              <ul className="mt-4 space-y-2">
                {modelo.categorias?.map((cat) => (
                  <li key={cat.id} className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">{cat.nome}</span>
                    <span className="font-medium tabular-nums">
                      {formatPercentFromDecimal(cat.valor)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-4">
                <Button
                  className="w-full"
                  variant={isActive ? 'secondary' : 'primary'}
                  disabled={isActive || applyingId === modelo.id}
                  onClick={() => handleSelectModelo(modelo)}
                >
                  {applyingId === modelo.id
                    ? 'Aplicando...'
                    : isActive
                      ? 'Modelo em uso'
                      : 'Usar este modelo'}
                </Button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
