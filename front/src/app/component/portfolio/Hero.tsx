"use client";
import { motion } from "framer-motion";
import { Code, Zap, Download, Mail, Coffee, ChevronDown, Globe } from "lucide-react";
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
  avatarSrc="/joaco-avatar.png" // o tu URL de Cloudinary
/>

        {/* Título */}
        <motion.h1
          className={`text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent transition-all duration-1000 bg-gradient-to-r ${theme.primary}`}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {isHacker ? "H4CK3R_M0D3" : "JOAQUIN MARTINEZ"}
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          className="text-xl md:text-2xl mb-8 text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {isHacker
            ? language === "es"
              ? "System.exe • Root Access • Matrix.dll"
              : "System.exe • Root Access • Matrix.dll"
            : language === "es"
            ? "Desarrollador Full Stack • Especialista en Frontend • Creador de experiencias web atractivas"
            : "Full Stack Developer • Frontend Specialist • Creator of engaging web experiences"}
        </motion.p>

        {/* Botones */}
        <motion.div
          className="flex gap-4 justify-center items-center flex-wrap"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {/* Descargar CV */}
          <Button
            className={`px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg text-white bg-gradient-to-r ${theme.secondary} hover:shadow-current/50`}
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
            variant="outline"
            className={`px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 bg-transparent ${theme.border} ${theme.accent} hover:bg-white hover:text-black hover:shadow-lg`}
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

          {/* Café */}
          <motion.button
            onClick={onCoffee}
            className="relative p-3 bg-amber-600 hover:bg-amber-700 rounded-full transition-all duration-300 hover:scale-110"
            whileHover={{ rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            title={language === "es" ? "¡Dame más café!" : "Give me more coffee!"}
          >
            <Coffee className="w-5 h-5 text-white" />
            {coffeeCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {coffeeCount}
              </span>
            )}
          </motion.button>

          {/* Sonido */}
          <motion.button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
              soundEnabled ? "bg-green-600 hover:bg-green-700" : "bg-gray-600 hover:bg-gray-700"
            }`}
            whileHover={{ rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            title={
              soundEnabled
                ? language === "es"
                  ? "Desactivar sonidos"
                  : "Disable sounds"
                : language === "es"
                ? "Activar sonidos"
                : "Enable sounds"
            }
          >
            {soundEnabled ? "🔊" : "🔇"}
          </motion.button>

          {/* 🌐 Idioma */}
            <LanguageSwitcher />
        </motion.div>

        {/* Tips */}
        {!isHacker && (
          <motion.div
            className="mt-8 text-sm text-gray-500 space-y-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <p>💡 Tips: M=Matrix, H=Hacker, R=Retro, C=Cyberpunk</p>
            <p>🌊 O=Ocean, F=Fire, T=Rainbow, D=Developer</p>
          </motion.div>
        )}
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
