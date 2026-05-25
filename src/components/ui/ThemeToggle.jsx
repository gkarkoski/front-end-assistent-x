import { useTheme } from '../../context/ThemeContext'

function SunIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function MoonIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3a6.5 6.5 0 0 0 11.5 11.5z" />
    </svg>
  )
}

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      onClick={toggleTheme}
      className={`group relative inline-flex h-9 w-[4.25rem] shrink-0 items-center rounded-full border border-slate-200/80 p-1 shadow-inner transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 dark:border-slate-700 dark:bg-slate-800 bg-[#fdeeb2] ${className}`}
    >
      <SunIcon
        className={`pointer-events-none absolute left-2 h-3.5 w-3.5 text-amber-500 transition-all duration-500 ${
          isDark ? 'scale-75 opacity-30' : 'scale-100 opacity-100'
        }`}
      />
      <MoonIcon
        className={`pointer-events-none absolute right-2 h-3.5 w-3.5 text-sky-400 transition-all duration-500 ${
          isDark ? 'scale-100 opacity-100' : 'scale-75 opacity-30'
        }`}
      />
      <span
        className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-[#fcf9ed]  text-amber-500 shadow-md ring-1 ring-slate-200/60 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-active:scale-95 dark:bg-slate-600 dark:text-sky-300 dark:ring-slate-600 ${
          isDark ? 'translate-x-[2rem]' : 'translate-x-0'
        }`}
      >
        <span
          className={`absolute transition-all duration-500 ${
            isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
        >
          <SunIcon className="h-4 w-4" />
        </span>
        <span
          className={`absolute transition-all duration-500 ${
            isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`}
        >
          <MoonIcon className="h-4 w-4" />
        </span>
      </span>
    </button>
  )
}
