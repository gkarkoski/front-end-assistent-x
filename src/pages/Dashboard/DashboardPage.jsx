import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import KpiCard from '../../components/charts/KpiCard'
import StatusBadge from '../../components/charts/StatusBadge'
import SuggestionsCard from '../../components/charts/SuggestionsCard'
import Card from '../../components/ui/Card'
import Spinner from '../../components/ui/Spinner'
import Table from '../../components/ui/Table'
import { getResumoEntradas, getResumoSaidas } from '../../api/transacoes'
import { getResumoPatrimonio } from '../../api/investimentos'
import { getResumoOrcamento } from '../../api/usuario'
import { useAuth } from '../../context/AuthContext'
import { formatCurrency } from '../../utils/currency'
import { getStatusConfig } from '../../utils/budgetStatus'
import ProgressBar from '../../components/charts/ProgressBar'

export default function DashboardPage() {
  const { token, usuarioId, user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [entradas, setEntradas] = useState(null)
  const [saidas, setSaidas] = useState(null)
  const [patrimonio, setPatrimonio] = useState(null)
  const [orcamento, setOrcamento] = useState(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError('')
      try {
        const [e, s, p] = await Promise.all([
          getResumoEntradas(token, usuarioId),
          getResumoSaidas(token, usuarioId),
          getResumoPatrimonio(token, usuarioId),
        ])
        setEntradas(e)
        setSaidas(s)
        setPatrimonio(p)

        if (user?.modeloId) {
          const o = await getResumoOrcamento(token, usuarioId, user.modeloId)
          setOrcamento(o)
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

  const saldo = (entradas?.valorTotalEntradas ?? 0) - (saidas?.valorTotalSaidas ?? 0)
  const alertas =
    orcamento?.categorias?.filter((c) =>
      ['POUCO_ACIMA_DO_LIMITE', 'MUITO_ACIMA_DO_LIMITE'].includes(c.status),
    ) ?? []

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Olá, {user?.nome?.split(' ')[0] ?? 'usuário'}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Visão geral das suas finanças
        </p>
      </div>

      {error && (
        <p className="mb-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-500/10">
          {error}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          title="Entradas"
          value={formatCurrency(entradas?.valorTotalEntradas)}
          accent="text-emerald-600 dark:text-emerald-400"
          icon="↗"
          to="/entradas"
        />
        <KpiCard
          title="Saídas"
          value={formatCurrency(saidas?.valorTotalSaidas)}
          accent="text-rose-600 dark:text-rose-400"
          icon="↘"
          to="/saidas"
        />
        <KpiCard
          title="Patrimônio"
          value={formatCurrency(patrimonio?.valorAtualTotal)}
          subtitle={`Rendimento: ${((patrimonio?.jurosEstimados ?? 0) * 100).toFixed(2)}% a.m.`}
          accent="text-sky-600 dark:text-sky-400"
          icon="💎"
          to="/patrimonio"
        />
        <KpiCard
          title="Saldo"
          value={formatCurrency(saldo)}
          subtitle="Entradas − saídas"
          accent={saldo >= 0 ? 'text-emerald-600' : 'text-rose-600'}
          icon="⚖"
        />
      </div>

      {patrimonio?.classificacoes?.length > 0 && (
        <Card
          title="Patrimônio Investido"
          className="mt-6"
          action={
            <Link
              to="/patrimonio"
              className="text-xs font-medium text-sky-600 hover:underline dark:text-sky-400"
            >
              Ver Patrimônio →
            </Link>
          }
        >
          <Table
            headers={[
              'Classificação',
              'Valor (R$)',
              'Rendimento (%)',
              'Receita Mensal (R$)',
            ]}
            columnWidths={['35%', '25%', '20%', '20%']}
          >
            {patrimonio.classificacoes.map((c) => (
              <tr
                key={c.classificacao}
                className="border-b border-slate-100 dark:border-slate-800 last:border-0"
              >
                <td className="px-4 py-3 font-medium">{c.classificacao}</td>
                <td className="px-4 py-3 tabular-nums">{formatCurrency(c.valorAtualTotal)}</td>
                <td className="px-4 py-3 tabular-nums">
                  {((c.jurosEstimados ?? 0) * 100).toFixed(1)}%
                </td>
                <td className="px-4 py-3 tabular-nums text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(c.ultimaMensalidade)}
                </td>
              </tr>
            ))}
            <tr className="border-b-2 border-slate-200 dark:border-slate-700 bg-slate-500/5 dark:bg-white/5 font-semibold">
              <td className="px-4 py-3">Total</td>
              <td className="px-4 py-3 tabular-nums">{formatCurrency(patrimonio?.valorAtualTotal ?? 0)}</td>
              <td className="px-4 py-3 tabular-nums">{((patrimonio?.jurosEstimados ?? 0) * 100).toFixed(2)}%</td>
              <td className="px-4 py-3 tabular-nums text-emerald-600 dark:text-emerald-400">
                {formatCurrency(patrimonio?.ultimaMensalidade ?? 0)}
              </td>
            </tr>
          </Table>
        </Card>
      )}

      <div className="mt-6">
  <Card className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
    <div className="space-y-8">

      {/* Entradas */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Entradas por origem
          </h3>

          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
            {formatCurrency(entradas?.valorTotalEntradas ?? 0)}
          </span>
        </div>

        <div className="space-y-4">
          {entradas?.origens?.map((origem) => {
            const percent =
              (origem.valorTotal / (entradas?.valorTotalEntradas || 1)) * 100

            return (
              <div key={origem.origemId} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    {origem.origemNome}
                  </span>

                  <span className="text-sm font-medium tabular-nums text-slate-900 dark:text-slate-100">
                    {formatCurrency(origem.valorTotal)}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            )
          })}

          <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-700">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Total
            </span>

            <span className="text-sm font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
              {formatCurrency(entradas?.valorTotalEntradas ?? 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Saídas */}
      <div className="border-t border-slate-200 pt-8 dark:border-slate-800">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Saídas por origem
          </h3>
        </div>

        <div className="space-y-4">
          {saidas?.origens?.map((origem) => {
            const percent =
              (origem.valorTotal / (saidas?.valorTotalSaidas || 1)) * 100

            return (
              <div key={origem.origemId} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    {origem.origemNome}
                  </span>

                  <span className="text-sm font-medium tabular-nums text-slate-900 dark:text-slate-100">
                    {formatCurrency(origem.valorTotal)}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className="h-full rounded-full bg-rose-500 transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            )
          })}

          <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-700">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Total
            </span>

            <span className="text-sm font-bold tabular-nums text-rose-600 dark:text-rose-400">
              {formatCurrency(saidas?.valorTotalSaidas ?? 0)}
            </span>
          </div>
        </div>
      </div>

    </div>
  </Card>
</div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {orcamento ? (
          <Card
            title="Orçamento por categoria"
            subtitle={`Base: ${formatCurrency(orcamento.orcamento)} · ${user?.modeloNome}`}
            action={
              <Link
                to="/orcamento"
                className="text-xs font-medium text-emerald-600 hover:underline dark:text-emerald-400"
              >
                Ver detalhes →
              </Link>
            }
          >
            {alertas.length > 0 && (
              <div className="mb-4 rounded-xl bg-orange-500/10 px-4 py-3 text-sm text-orange-800 dark:text-orange-200">
                {alertas.length} categoria(s) acima do limite recomendado.
              </div>
            )}
            <ul className="space-y-4">
              {orcamento.categorias?.map((cat) => {
                const cfg = getStatusConfig(cat.status)
                return (
                  <li key={cat.categoriaId}>
                    <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-medium">{cat.categoriaNome}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs tabular-nums text-slate-500">
                          {cat.percentualUtilizado?.toFixed(0)}%
                        </span>
                        <StatusBadge status={cat.status} />
                      </div>
                    </div>
                    <ProgressBar percent={cat.percentualUtilizado} barClassName={cfg.bar} />
                    <p className="mt-1 text-xs text-slate-500">
                      {formatCurrency(cat.valorUtilizado)} de {formatCurrency(cat.limite)}
                    </p>
                  </li>
                )
              })}
            </ul>
          </Card>
        ) : (
          <Card title="Orçamento">
            <p className="text-sm text-slate-500">
              Nenhum modelo vinculado.{' '}
              <Link to="/orcamento" className="text-emerald-600 hover:underline">
                Escolha um plano
              </Link>
            </p>
          </Card>
        )}
        <SuggestionsCard />
      </div>
    </div>
  )
}
