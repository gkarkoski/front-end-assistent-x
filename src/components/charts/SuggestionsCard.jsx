import Card from '../ui/Card'

const suggestions = {
 economia: [
  'Revise suas assinaturas mensais e elimine serviços pouco utilizados',
  'Compare preços antes de comprar para evitar gastos impulsivos',
  'Use cupons e cashback para economizar nas compras do mês',
],

investimentos: [
  'Diversifique sua carteira para reduzir riscos no longo prazo',
  'Considere FIIs para gerar uma renda passiva mensal consistente',
  'Aproveite oportunidades de mercado mantendo uma reserva estratégica',
],

desenvolvimentoPessoal: [
  'Invista em cursos e capacitação para aumentar sua renda futura',
  'Leia livros sobre finanças para melhorar suas decisões financeiras',
  'Participe de comunidades de investimento e troque experiências práticas',
],
}

export default function SuggestionsCard() {
  return (
    <Card title="Sugestões de Ações">
      <div className="space-y-5">
        <div>
          <h3 className="mb-3 text-base font-semibold text-slate-700 dark:text-slate-300">
            💰 Economia
          </h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            {suggestions.economia.map((s, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-emerald-500" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-base font-semibold text-slate-700 dark:text-slate-300">
            📈 Investimentos
          </h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            {suggestions.investimentos.map((s, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-sky-500" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-base font-semibold text-slate-700 dark:text-slate-300">
            🎯 Desenvolvimento Pessoal
          </h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            {suggestions.desenvolvimentoPessoal.map((s, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-purple-500" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}
