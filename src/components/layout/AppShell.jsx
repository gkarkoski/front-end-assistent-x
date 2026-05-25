import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

export default function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex h-dvh overflow-hidden">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden xl:pl-64">
        <Header onMenuClick={() => setMobileOpen(true)} />
        <main className="bg-[#f6e7b0] dark:bg-slate-950 min-h-0 flex-1 overflow-y-auto p-4 xl:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
