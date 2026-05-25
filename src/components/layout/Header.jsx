import ThemeToggle from '../ui/ThemeToggle'
import Logo from './Logo'

export default function Header({ onMenuClick }) {
  return (
    <header className="grid h-16 grid-cols-3 items-center border-b border-slate-200 bg-[#faf2d3] px-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900 xl:px-6">

      <div className="flex justify-start">
        <button
          type="button"
          className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 xl:hidden dark:text-slate-300 dark:hover:bg-slate-800"
          onClick={onMenuClick}
          aria-label="Abrir menu"
        >
          ☰
        </button>
      </div>

      <div className="flex justify-center">
        <Logo />
      </div>

      <div className="flex justify-end">
        <ThemeToggle />
      </div>

    </header>
  )
}
