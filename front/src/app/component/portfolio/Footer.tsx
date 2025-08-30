"use client";
import { useLanguage } from "@/context/useLanguage";

interface Props {
  borderClass: string;
  isHacker: boolean;
}

export default function Footer({ borderClass, isHacker }: Props) {
  const { language } = useLanguage();

  return (
    <footer className={`py-8 px-4 relative z-10 border-t ${borderClass}`}>
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-400 mb-3">
          {isHacker
            ? language === "es"
              ? "© 2025 H4CK3R_M0D3.exe • System.build(React, Next.js, Coffee++)"
              : "© 2025 H4CK3R_M0D3.exe • System.build(React, Next.js, Coffee++)"
            : language === "es"
            ? "© 2025 Javier Rodriguez. Construido con React, Next.js y mucho ☕"
            : "© 2025 Javier Rodriguez. Built with React, Next.js and lots of ☕"}
        </p>
        <p className="text-gray-500 text-sm">
          {language === "es"
            ? "En agradecimiento a Enrique Cuevas, que me animó cuando más difícil estaban las cosas."
            : "In gratitude to Enrique Cuevas, who encouraged me when things were at their most difficult."}
        </p>
      </div>
    </footer>
  );
}
