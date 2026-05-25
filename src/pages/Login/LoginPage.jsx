import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import ThemeToggle from '../../components/ui/ThemeToggle'
import { useAuth } from '../../context/AuthContext'

export default function LoginPage() {
  const { login, loading, isAuthenticated } = useAuth()
  const [usuario, setUsuario] = useState('joao@email.com.br')
  const [senha, setSenha] = useState('senha')
  const [error, setError] = useState('')

  useEffect(() => {
    if (isAuthenticated) return
  }, [isAuthenticated])

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(usuario, senha)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 p-12 text-white lg:flex">
        <div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-lg font-bold">
            Ax
          </div>
          <h1 className="mt-12 text-4xl font-bold leading-tight">Assistentx</h1>
          <p className="mt-4 max-w-md text-lg text-slate-300">
            Controle entradas, saídas, investimentos e orçamento familiar com clareza e elegância.
          </p>
        </div>
        <ul className="space-y-3 text-sm text-slate-400">
          <li>Dashboard financeiro em tempo real</li>
          <li>Orçamento por categorias com alertas</li>
          <li>Acompanhamento de patrimônio</li>
        </ul>
        <p className="text-xs text-slate-500">Projeto acadêmico FIAP</p>
      </div>

      <div className="bg-[#faf2d3] dark:bg-slate-950 flex flex-1 flex-col justify-center px-6 py-12 sm:px-12">
        <div className="absolute right-4 top-4 lg:right-8 lg:top-8">
          <ThemeToggle />
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-lg font-bold text-white">
              Ax
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Entrar no Assistentx</h2>
          </div>
          <h2 className="mb-2 hidden text-2xl font-bold text-slate-900 dark:text-white lg:block">
            Bem-vindo de volta
          </h2>
          <p className="mb-8 text-sm text-slate-500 dark:text-slate-400">
            Use suas credenciais para acessar sua conta.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="E-mail"
              type="email"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              autoComplete="username"
            />
            <Input
              label="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              autoComplete="current-password"
            />
            {error && (
              <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
                {error}
              </p>
            )}
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-400">
            Demo: joao@email.com.br / senha
          </p>
        </div>
      </div>
    </div>
  )
}
