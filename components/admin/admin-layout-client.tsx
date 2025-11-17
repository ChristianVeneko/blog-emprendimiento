'use client'

import { useState } from 'react'
import { LayoutDashboard, FileText, FolderOpen, LogOut, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Session } from 'next-auth'

interface AdminLayoutClientProps {
  children: React.ReactNode
  session: Session
}

export function AdminLayoutClient({ children, session }: AdminLayoutClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems = [
    { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/posts', icon: FileText, label: 'Posts' },
    { href: '/admin/categories', icon: FolderOpen, label: 'Categorías' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-background border-b flex items-center justify-between px-4">
        <Link href="/admin/dashboard" className="font-semibold text-lg">
          L.E.I.
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 mt-16"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 lg:top-0 left-0 z-40 w-64 h-screen border-r bg-background transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0 mt-16 lg:mt-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto flex flex-col">
          <div className="mb-6 hidden lg:block">
            <Link href="/admin/dashboard" className="flex items-center pl-2.5">
              <span className="self-center text-xl font-semibold whitespace-nowrap">
                L.E.I.
              </span>
            </Link>
            <p className="text-sm text-muted-foreground pl-2.5 mt-1 truncate">
              {session?.user?.email}
            </p>
          </div>

          <div className="lg:hidden mb-4 pb-4 border-b">
            <p className="text-sm text-muted-foreground px-2.5 truncate">
              {session?.user?.email}
            </p>
          </div>

          <nav className="space-y-2 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-4 space-y-2">
            <Link href="/blog" className="block" onClick={() => setSidebarOpen(false)}>
              <Button variant="outline" className="w-full justify-start">
                Ver Blog
              </Button>
            </Link>
            <form action="/api/auth/signout" method="POST">
              <Button
                type="submit"
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Cerrar Sesión
              </Button>
            </form>
          </div>
        </div>
      </aside>

      <main className="lg:ml-64 pt-16 lg:pt-0 p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  )
}
