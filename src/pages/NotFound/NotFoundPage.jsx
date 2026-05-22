import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'
import { useAuth } from '../../context/AuthContext'

export default function NotFoundPage() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-8xl font-bold text-emerald-600/20 dark:text-emerald-500/20">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
        Página não encontrada
      </h1>
      <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
        O endereço que você acessou não existe ou foi movido.
      </p>
      <div className="mt-8 flex gap-3">
        <Link to={isAuthenticated ? '/dashboard' : '/login'}>
          <Button>{isAuthenticated ? 'Ir ao dashboard' : 'Ir ao login'}</Button>
        </Link>
      </div>
    </div>
  )
}
