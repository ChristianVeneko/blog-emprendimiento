import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth-config'
import { Button } from '@/components/ui/button'
import { LayoutDashboard } from 'lucide-react'

export async function Navbar() {
  const session = await getServerSession(authOptions)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex flex-1 items-center justify-between">
          <Link href="/blog" className="flex items-center space-x-2">
            <span className="text-xl font-bold">L.E.I.</span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/blog"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Acerca de
            </Link>
            {session && (
              <Link href="/admin/dashboard">
                <Button variant="outline" size="sm">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
