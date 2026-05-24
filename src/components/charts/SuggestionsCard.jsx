import Card from '../ui/Card'

const suggestions = {
  economia: [
    'Revise suas assinaturas mensais',
    'Compare preços antes de comprar',
    'Use cupons de desconto',
  ],
  investimentos: [
    'Diversifique sua carteira',
    'Considere FIIs para renda passiva',
    'Aproveite oportunidades de mercado',
  ],
  desenvolvimentoPessoal: [
    'Invista em cursos e capacitação',
    'Leia livros sobre finanças',
    'Participe de comunidades de investimento',
  ],
}

export default function SuggestionsCard() {
  return (
    <Card title="Sugestões de Ações">
      <div className="space-y-4">
        <div>
          <h3 className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            💰 Economia
          </h3>
          <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
            {suggestions.economia.map((s, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            📈 Investimentos
          </h3>
          <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
            {suggestions.investimentos.map((s, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-sky-500" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            🎯 Desenvolvimento Pessoal
          </h3>
          <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
            {suggestions.desenvolvimentoPessoal.map((s, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-purple-500" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}
