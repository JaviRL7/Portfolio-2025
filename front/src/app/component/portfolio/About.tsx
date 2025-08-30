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
          className="text-4xl md:text-6xl font-bold text-center mb-16 text-blue-300"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {heading}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Bio Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative flex flex-col justify-center min-h-[400px] pt-20 px-4"
          >
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              {language === "es"
                ? "Desarrollador web especializado en backend, con experiencia en Python, PHP, JavaScript y React. Amplio dominio en la gestión y análisis de bases de datos, así como en la optimización de procesos y flujos de trabajo."
                : "Web developer specialized in backend, with experience in Python, PHP, JavaScript and React. Extensive expertise in database management and analysis, as well as process and workflow optimization."}
            </p>

            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              {language === "es"
                ? "Desarrollo de proyectos personales con inteligencia artificial, incluyendo machine learning, procesamiento de datos y automatización de tareas con IA. Mi objetivo es aportar soluciones técnicas sólidas y eficientes en proyectos desafiantes y multidisciplinarios, siempre con muchas ganas de aprender, crecer profesionalmente y aportar valor a los equipos en los que colabore."
                : "Development of personal projects with artificial intelligence, including machine learning, data processing and AI task automation. My goal is to provide solid and efficient technical solutions in challenging and multidisciplinary projects, always eager to learn, grow professionally and add value to the teams I collaborate with."}
            </p>


            {/* Vertical line separator */}
            <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-indigo-400/30 to-transparent hidden md:block"></div>
          </motion.div>

          {/* Barras de uso (no “skills”) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 mt-24 px-4"
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
