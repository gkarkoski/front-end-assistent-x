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
  const [resumo, setResumo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [applyingId, setApplyingId] = useState(null)
  const [error, setError] = useState('')

  const loadResumo = async (modeloId) => {
    if (!modeloId) {
      setResumo(null)
      return
    }
    const data = await getResumoOrcamento(token, usuarioId, modeloId)
    setResumo(data)
  }

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError('')
      try {
        const list = await listModelos(token)
        setModelos(list ?? [])
        if (user?.modeloId) {
          await loadResumo(user.modeloId)
        }
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
      await loadResumo(modelo.id)
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
        title="Orçamento"
        description="Escolha um modelo de planejamento e acompanhe o uso por categoria."
      />

      {error && (
        <p className="mb-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-500/10">
          {error}
        </p>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        {modelos.map((modelo) => {
          const isActive = user?.modeloId === modelo.id
          const totalPct = modelo.categorias?.reduce((s, c) => s + (c.valor ?? 0), 0) ?? 0
          return (
            <Card
              key={modelo.id}
              className={isActive ? 'ring-2 ring-emerald-500/50' : ''}
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
              <p className="mt-2 text-xs text-slate-400">Total alocado: {formatPercentFromDecimal(totalPct)}</p>
              <Button
                className="mt-4 w-full"
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
            </Card>
          )
        })}
      </div>

      {resumo && (
        <Card
          title="Resumo do orçamento ativo"
          subtitle={`Orçamento base (entradas): ${formatCurrency(resumo.orcamento)}`}
          className="mt-8"
        >
          <ul className="space-y-5">
            {resumo.categorias?.map((cat) => {
              const cfg = getStatusConfig(cat.status)
              return (
                <li key={cat.categoriaId}>
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-medium">{cat.categoriaNome}</p>
                      <p className="text-xs text-slate-500">
                        Limite: {formatCurrency(cat.limite)} ({formatPercentFromDecimal(cat.percentualCategoria)})
                      </p>
                    </div>
                    <StatusBadge status={cat.status} />
                  </div>
                  <ProgressBar percent={cat.percentualUtilizado} barClassName={cfg.bar} />
                  <div className="mt-2 flex justify-between text-xs text-slate-500">
                    <span>Utilizado: {formatCurrency(cat.valorUtilizado)}</span>
                    <span className={cat.sobra >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                      {cat.sobra >= 0 ? 'Sobra' : 'Excesso'}: {formatCurrency(Math.abs(cat.sobra))}
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        </Card>
      )}
    </div>
  )
}
