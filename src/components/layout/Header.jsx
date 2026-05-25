import ThemeToggle from '../ui/ThemeToggle'

export default function Header({ onMenuClick }) {
  return (
    <header className="z-30 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-[#faf2d3] px-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900 lg:px-6">
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
