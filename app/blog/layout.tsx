import { Navbar } from '@/components/shared/navbar'

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
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Blog Emprendimiento. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  )
}
