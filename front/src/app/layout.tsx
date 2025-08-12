// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/useLanguage";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.joacodev.com.ar"),
  title: {
    default: "Joaquin Martinez – Full Stack Developer",
    template: "%s | Joaquin Martinez",
  },
  description:
    "Portfolio de Joaquin Martinez. Desarrollo full stack, frontend enfocado en UI/UX y performance.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Joaquin Martinez – Portfolio",
    title: "Joaquin Martinez – Full Stack Developer",
    description:
      "Experiencias web atractivas: performance, animaciones y UX.",
    images: [
      {
        url: "/Captura de pantalla 2025-08-12 012551.png", // 1200x630 recomendado
        width: 1200,
        height: 630,
        alt: "Portfolio de Joaquin Martinez",
      },
    ],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0f19",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
