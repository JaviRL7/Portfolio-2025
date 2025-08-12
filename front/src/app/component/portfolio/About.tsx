"use client";
import { motion } from "framer-motion";
import type { Skill } from "@/lib/portfolio/types";
import { useLanguage } from "@/context/useLanguage";

interface Props {
  theme: { primary: string; secondary: string; accent: string; border: string };
  isHacker: boolean;
  stats: { coffee: number; clicks: number; timeSpent: number; scrolls: number; gameScore: number; activeFlags: number };
  /** Reutilizamos tu estructura: skill.level = % de uso */
  skills: Skill[];
}

type Localized = { es?: string; en?: string } | string;

export default function About({ theme, isHacker, stats, skills }: Props) {
  const { language } = useLanguage();

  const heading = isHacker
    ? language === "es" ? "PERFIL.exe" : "PROFILE.exe"
    : language === "es" ? "SOBRE MÍ" : "ABOUT ME";

  const getDisplayName = (name: Localized, lang: "es" | "en") => {
    return typeof name === "string" ? name : (name[lang] ?? name.en ?? "");
  };

  const usageLabel =
    language === "es" ? "Frecuencia de uso (últimos 12 meses)" : "Usage frequency (last 12 months)";
  const legendNote =
    language === "es"
      ? "Estos porcentajes reflejan con qué frecuencia uso cada tecnología en mis proyectos recientes (no equivalen a nivel de dominio)."
      : "Percentages reflect how often I use each technology in recent projects (not a mastery level).";

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className={`text-4xl md:text-6xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r ${theme.primary}`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {heading}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className={`absolute inset-0 rounded-lg blur-xl opacity-30 bg-gradient-to-r ${theme.secondary}`} />
              <div className={`relative backdrop-blur-sm rounded-lg p-8 bg-gray-900/50 border ${theme.border}`}>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  {isHacker
                    ? (language === "es"
                        ? "system.log → Full Stack orientado a crear interfaces con identidad propia en la capa frontend y producto sólido end-to-end."
                        : "system.log → Full Stack focused on building bold frontends and solid end-to-end products.")
                    : (language === "es"
                        ? "Desarrollador full stack enfocado en rendimiento, UX y micro-interacciones que suman valor al producto."
                        : "Full-stack developer focused on performance, UX, and delightful micro-interactions.")}
                </p>

                <p className="text-lg text-gray-300 leading-relaxed">
                  {isHacker
                    ? (language === "es"
                        ? "mission.status → Prototipos rápidos, interfaces fluidas y código mantenible."
                        : "mission.status → Rapid prototyping, fluid interfaces, and maintainable code.")
                    : (language === "es"
                        ? "Mi objetivo: prototipar rápido, entregar interfaces fluidas y mantener un código claro."
                        : "Goal: prototype fast, ship fluid interfaces, and keep the codebase clean.")}
                </p>

                <div className="mt-6 text-sm text-gray-500 space-y-1">
                  <p>☕ {language === "es" ? "Café consumido" : "Coffee consumed"}: {stats.coffee} {language === "es" ? "tazas" : "cups"}</p>
                  <p>🖱️ {language === "es" ? "Clicks en avatar" : "Avatar clicks"}: {stats.clicks}/10</p>
                  <p>⏰ {language === "es" ? "Tiempo en página" : "Time on page"}: {Math.floor(stats.timeSpent / 60)}m {stats.timeSpent % 60}s</p>
                  <p>📜 {language === "es" ? "Scrolls realizados" : "Scrolls made"}: {stats.scrolls}</p>
                  <p>💚 {language === "es" ? "Easter eggs encontrados" : "Easter eggs found"}: {stats.activeFlags}/15</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Barras de uso (no “skills”) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
            aria-label={usageLabel}
          >
            <div className="mb-2 text-sm text-gray-400">{usageLabel}</div>

            {skills.map((skill, index) => {
              const displayName = getDisplayName(skill.name as Localized, language as "es" | "en");
              return (
                <motion.div
                  key={`${displayName}-${index}`}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={theme.accent} aria-hidden>{skill.icon}</div>
                      <span className="text-white font-semibold">
                        {isHacker ? `${displayName}.log` : displayName}
                      </span>
                    </div>
                    {/* Antes decía “level%”. Ahora explicitamos que es uso */}
                    <span className={`font-bold ${theme.accent}`}>
                      {language === "es" ? "Uso: " : "Use: "}{skill.level}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100} aria-label={`${displayName} ${usageLabel}`}>
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${theme.secondary}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              );
            })}

            <p className="text-xs text-gray-500 mt-4">
              {legendNote}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
