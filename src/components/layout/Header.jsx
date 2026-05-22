import Button from '../ui/Button'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'

export default function Header({ onMenuClick }) {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80 lg:px-6">
      <button
        type="button"
        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden dark:text-slate-300 dark:hover:bg-slate-800"
        onClick={onMenuClick}
        aria-label="Abrir menu"
      >
        ☰
      </button>
      <div className="hidden flex-1 lg:block" />
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{user?.nome}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {user?.modeloNome ?? 'Sem modelo'}
          </p>
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-xl border border-slate-200 p-2 text-sm dark:border-slate-700"
          aria-label="Alternar tema"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
        <Button variant="ghost" size="sm" onClick={logout}>
          Sair
        </Button>
      </div>
    </header>
  )
}
