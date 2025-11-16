import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth-config'
import { LayoutDashboard, FileText, FolderOpen, LogOut } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  const navItems = [
    { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/posts', icon: FileText, label: 'Posts' },
    { href: '/admin/categories', icon: FolderOpen, label: 'Categorías' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <aside className="fixed top-0 left-0 z-40 w-64 h-screen border-r bg-background">
        <div className="h-full px-3 py-4 overflow-y-auto">
          <div className="mb-6">
            <Link href="/admin/dashboard" className="flex items-center pl-2.5">
              <span className="self-center text-xl font-semibold whitespace-nowrap">
                Blog CMS
              </span>
            </Link>
            <p className="text-sm text-muted-foreground pl-2.5 mt-1">
              {session.user?.email}
            </p>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="absolute bottom-4 left-0 right-0 px-3">
            <Link href="/blog" className="block mb-2">
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

      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  )
}
