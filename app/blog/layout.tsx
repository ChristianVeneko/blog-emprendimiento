import { Navbar } from '@/components/shared/navbar'
import Link from 'next/link'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} L.E.I. - Liderar, Ejecutar, Inspirar. Todos los derechos reservados.
            </div>
            <nav className="flex gap-6 text-sm">
              <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                Acerca de
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
