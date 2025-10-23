"use client";
import { motion } from "framer-motion";
import { Download, Mail, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/useLanguage";
import LanguageSwitcher from "./LanguageSwitcher";
import AvatarHero from "./AvatarHero";
interface Props {
  theme: { primary: string; secondary: string; accent: string; border: string };
  isHacker: boolean;
  clickCount: number;
  coffeeCount: number;
  onAvatarClick: () => void;
  onCoffee: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
}

export default function Hero({
  theme,
  isHacker,
  clickCount,
  coffeeCount,
  onAvatarClick,
  onCoffee,
  soundEnabled,
  setSoundEnabled,
}: Props) {
   const { language } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Avatar */}
        <AvatarHero
  onAvatarClick={onAvatarClick}
  clickCount={clickCount}
  avatarSrc="/FotoJavi2.jpeg"
/>

        {/* Título */}
        <motion.h1
  className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent"
  initial={{ scale: 0.5 }}
  animate={{ scale: 1 }}
  transition={{ duration: 0.8, delay: 0.2 }}
>
  <motion.span
    className={`inline-block bg-clip-text text-transparent bg-gradient-to-r ${theme.primary}`}
    initial={{ backgroundPosition: "0% 0%" }}
    animate={{ backgroundPosition: "100% 0%" }}   // izquierda → derecha
    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
    style={{ backgroundSize: "200% 100%" }}       // “tela” para mover
  >
    {isHacker ? "H4CK3R_M0D3" : "JAVIER RODRÍGUEZ"}
  </motion.span>
</motion.h1>

        {/* Descripción profesional */}
        <motion.div
          className="mb-8 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Frase principal */}
          <p className="text-2xl md:text-3xl font-semibold text-gray-200 mb-4">
            {language === "es"
              ? "Full Stack Developer con especialidad en Backend • Creando soluciones eficientes y experiencias atractivas"
              : "Full Stack Developer with Backend specialization • Creating efficient solutions and attractive experiences"}
          </p>
          
          {/* Frase complementaria */}
          <p className="text-lg md:text-xl text-gray-400">
            {language === "es"
              ? "Experiencia en Python, PHP, JavaScript y React. Proyectos personales en Machine Learning, procesamiento de datos y automatización con IA."
              : "Experience in Python, PHP, JavaScript and React. Personal projects in Machine Learning, data processing and AI automation."}
          </p>
        </motion.div>

        {/* Botones */}
        <motion.div
          className="flex gap-4 justify-center items-center flex-wrap"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {/* Descargar CV */}
          <Button
            onClick={() => {
    const link = document.createElement("a");
          link.href = "/JavierRL CV 2025.pdf";
          link.download = "JavierRL CV 2025.pdf";
          link.click();
        }}
            variant="outline"
            className={`px-8 py-3 rounded-full transition-all duration-300 bg-transparent ${theme.border} text-white hover:bg-white/20 hover:scale-110 hover:text-white`}
          >
            <Download className="w-4 h-4 mr-2" />
            {isHacker
              ? language === "es"
                ? "Descargar.exe"
                : "Download.exe"
              : language === "es"
              ? "Descargar CV"
              : "Download CV"}
          </Button>

          {/* Contacto */}
         <Button
  onClick={() => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  }}
  variant="outline"
  className={`px-8 py-3 rounded-full transition-all duration-300 bg-transparent ${theme.border} text-white hover:bg-white/20 hover:scale-110 hover:text-white`}
>
  <Mail className="w-4 h-4 mr-2" />
  {isHacker
    ? language === "es"
      ? "Enviar_Mensaje()"
      : "Send_Message()"
    : language === "es"
    ? "Contáctame"
    : "Contact Me"}
</Button>

          {/* 🌐 Idioma */}
          <LanguageSwitcher />
        </motion.div>

      </motion.div>

      {/* Flecha abajo */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <ChevronDown className={`w-8 h-8 ${theme.accent}`} />
      </motion.div>
    </section>
  );
}
