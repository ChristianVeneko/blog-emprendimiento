import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "L.E.I. - Liderar, Ejecutar, Inspirar",
  description: "Desarrolla las tres dimensiones del liderazgo en ingeniería: Liderar con visión estratégica clara, Ejecutar proyectos que importan, Inspirar equipos de alto rendimiento",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
