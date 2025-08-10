import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/context/useLanguage"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Joaquin Martinez - Full Stack Developer",
  description: "Joaquin Martinez, desarrollador full stack especializado en crear interfaces modernas, rápidas y responsivas con React, Next.js y TypeScript. Experto en integrar backend sólido con Node.js, Prisma y PostgreSQL, y en optimizar la experiencia de usuario con animaciones fluidas y diseño UI/UX de alto impacto.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LanguageProvider>
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
    </LanguageProvider>
  )
}
