"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/useLanguage";

interface Props {
  theme: { primary: string; secondary: string; accent: string; border: string };
}

export default function Education({ theme }: Props) {
  const { language } = useLanguage();

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
          {language === "es" ? "FORMACIÓN Y EXPERIENCIA" : "EDUCATION & EXPERIENCE"}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Educación */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className={`inline-block p-4 rounded-full mb-6 bg-gradient-to-r ${theme.secondary} bg-opacity-20`}>
              <div className="w-12 h-12 flex items-center justify-center">
                <span className="text-2xl">🎓</span>
              </div>
            </div>
            <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent`}>
              {language === "es" ? "Educación" : "Education"}
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              {language === "es"
                ? "Graduado en Desarrollo de Aplicaciones Web, IES Doñana."
                : "Graduated in Web Application Development, IES Doñana."}
            </p>
          </motion.div>

          {/* Experiencia */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className={`inline-block p-4 rounded-full mb-6 bg-gradient-to-r ${theme.secondary} bg-opacity-20`}>
              <div className="w-12 h-12 flex items-center justify-center">
                <span className="text-2xl">💼</span>
              </div>
            </div>
            <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent`}>
              {language === "es" ? "Experiencia" : "Experience"}
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              {language === "es"
                ? "Full Stack Developer en el Departamento de Infraestructura de Sanlúcar de Barrameda."
                : "Full Stack Developer at the Infrastructure Department of Sanlúcar de Barrameda."}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}