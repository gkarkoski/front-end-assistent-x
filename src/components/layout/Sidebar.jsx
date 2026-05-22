import { NavLink } from 'react-router-dom'
import Logo from './Logo'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/entradas', label: 'Entradas', icon: '↗' },
  { to: '/saidas', label: 'Saídas', icon: '↘' },
  { to: '/patrimonio', label: 'Patrimônio', icon: '💎' },
  { to: '/orcamento', label: 'Orçamento', icon: '📋' },
]

export default function Sidebar({ mobileOpen, onClose }) {
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
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform dark:border-slate-800 dark:bg-slate-900 lg:static lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center border-b border-slate-200 px-5 dark:border-slate-800">
          <Logo />
        </div>
        <nav className="flex-1 space-y-1 p-3">
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
        <p className="border-t border-slate-200 p-4 text-[10px] text-slate-400 dark:border-slate-800">
          Assistentx · FIAP
        </p>
      </aside>
    </>
  )
}
