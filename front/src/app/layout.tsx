// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/useLanguage";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.joacodev.com.ar"),
  title: {
    default: "Javier Rodriguez - Full Stack Developer",
    template: "%s | Javier Rodriguez",
  },
  description:
    "Portfolio de Javier Rodriguez. Desarrollo full stack, backend enfocado en Python, PHP y bases de datos.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Javier Rodriguez – Portfolio",
    title: "Javier Rodriguez - Full Stack Developer",
    description:
      "Desarrollador especializado en backend, bases de datos y automatización con IA.",
    images: [
      {
        url: "/FotoJavi.jpeg",
        width: 1200,
        height: 630,
        alt: "Portfolio de Javier Rodriguez",
      },
    ],
  },

  icons: {
    icon: "/logoJavi.svg",
    apple: "/logoJavi.svg",
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
      <body className={inter.className} suppressHydrationWarning={true}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
