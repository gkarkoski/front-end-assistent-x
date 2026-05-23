import { NavLink } from 'react-router-dom'
import Button from '../ui/Button'
import { useAuth } from '../../context/AuthContext'
import Logo from './Logo'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/entradas', label: 'Entradas', icon: '↗' },
  { to: '/saidas', label: 'Saídas', icon: '↘' },
  { to: '/patrimonio', label: 'Patrimônio', icon: '💎' },
  { to: '/orcamento', label: 'Orçamento', icon: '📋' },
]

function userInitials(nome) {
  if (!nome) return '?'
  const parts = nome.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

export default function Sidebar({ mobileOpen, onClose }) {
  const { user, logout } = useAuth()

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col border-r border-slate-200 bg-white transition-transform dark:border-slate-800 dark:bg-slate-900 lg:static lg:h-screen lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 shrink-0 items-center border-b border-slate-200 px-5 dark:border-slate-800">
          <Logo />
        </div>
        <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                    : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto shrink-0 border-t border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-sm font-semibold text-emerald-700 dark:text-emerald-400"
              aria-hidden
            >
              {userInitials(user?.nome)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                {user?.nome}
              </p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                {user?.modeloNome ?? 'Sem modelo'}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={logout} className="shrink-0 px-2">
              Sair
            </Button>
          </div>
          <p className="mt-3 text-center text-[10px] text-slate-400">Assistentx · FIAP</p>
        </div>
      </aside>
    </>
  )
}
