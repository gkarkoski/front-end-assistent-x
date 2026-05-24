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
        description="Veja abaixo quanto você planejou gastar em cada categoria e quanto realmente gastou."
      />

      {error && (
        <p className="mb-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-500/10">
          {error}
        </p>
      )}

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
