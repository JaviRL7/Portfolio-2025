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
        <p className="text-gray-400">
          {isHacker
            ? language === "es"
              ? "© 2025 H4CK3R_M0D3.exe • System.build(React, Next.js, Coffee++)"
              : "© 2025 H4CK3R_M0D3.exe • System.build(React, Next.js, Coffee++)"
            : language === "es"
            ? "© 2025 Joaquin Martinez. Construido con React, Next.js y mucho ☕"
            : "© 2025 Joaquin Martinez. Built with React, Next.js and lots of ☕"}
        </p>
      </div>
    </footer>
  );
}
