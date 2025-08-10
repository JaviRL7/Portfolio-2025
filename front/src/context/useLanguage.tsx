"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Language = "es" | "en";
type Ctx = { language: Language; setLanguage: (l: Language) => void; toggle: () => void };

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("language") : null;
    if (saved === "es" || saved === "en") setLanguage(saved);
  }, []);

  const toggle = () => {
    setLanguage(prev => {
      const next = prev === "es" ? "en" : "es";
      localStorage.setItem("language", next);
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
