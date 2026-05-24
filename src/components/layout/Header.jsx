import ThemeToggle from '../ui/ThemeToggle'
import Logo from './Logo'

export default function Header({ onMenuClick }) {
  return (
    <header className="z-30 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80 lg:px-6">
      <div className="flex h-16 shrink-0 items-center border-b border-slate-200 px-5 dark:border-slate-800">
        <Logo />
      </div>
      <button
        type="button"
        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden dark:text-slate-300 dark:hover:bg-slate-800"
        onClick={onMenuClick}
        aria-label="Abrir menu"
      >
        ☰
      </button>
      <div className="flex-1" />
      <ThemeToggle />
    </header>
  )
}
