"use client";
import { motion } from "framer-motion";
import type { Skill } from "@/lib/portfolio/types";
import { useLanguage } from "@/context/useLanguage";

interface Props {
  theme: { primary: string; secondary: string; accent: string; border: string };
  isHacker: boolean;
  stats: { coffee: number; clicks: number; timeSpent: number; scrolls: number; gameScore: number; activeFlags: number };
  skills: Skill[];
}

export default function About({ theme, isHacker, stats, skills }: Props) {
  const { language } = useLanguage();

  const heading = isHacker
    ? language === "es" ? "PERFIL.exe" : "PROFILE.exe"
    : language === "es" ? "SOBRE MÍ" : "ABOUT ME";

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
                        ? "system.log → Full Stack Developer especializado en infiltraciones creativas en la capa frontend. Dominio de React.exe, Next.js protocols y TypeScript compiler. Backend blindado con Node.js + Prisma + PostgreSQL."
                        : "system.log → Full Stack Developer specialized in creative infiltrations on the frontend layer. Mastery of React.exe, Next.js protocols, and the TypeScript compiler. Backend hardened with Node.js + Prisma + PostgreSQL.")
                    : (language === "es"
                        ? "Desarrollador full stack apasionado por crear experiencias digitales únicas e innovadoras. Especializado en frontend con React, Next.js y TypeScript, complementado con un backend sólido en Node.js, Prisma y PostgreSQL."
                        : "Full stack developer passionate about creating unique and innovative digital experiences. Specialized in frontend with React, Next.js, and TypeScript, complemented by a solid backend in Node.js, Prisma, and PostgreSQL.")}
                </p>

                <p className="text-lg text-gray-300 leading-relaxed">
                  {isHacker
                    ? (language === "es"
                        ? "mission.status → Construir aplicaciones que hackeen la mente del usuario, fusionando interfaces futuristas con experiencias inmersivas y alto rendimiento."
                        : "mission.status → Build applications that hack the user’s mind, blending futuristic interfaces with immersive experiences and high performance.")
                    : (language === "es"
                        ? "Mi objetivo es desarrollar aplicaciones que combinen rendimiento impecable con interfaces futuristas, cautivando e inspirando a los usuarios en cada interacción."
                        : "My goal is to develop applications that combine flawless performance with futuristic interfaces, captivating and inspiring users in every interaction.")}
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

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {skills.map((skill, index) => {
              // skill.name es { es: string; en: string }
              const displayName = (skill as any).name?.[language] ?? (skill as any).name?.en ?? (skill as any).name ?? "";
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
                      <div className={theme.accent}>{skill.icon}</div>
                      <span className="text-white font-semibold">
                        {isHacker ? `${displayName}.dll` : displayName}
                      </span>
                    </div>
                    <span className={`font-bold ${theme.accent}`}>{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
