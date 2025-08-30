"use client";
import { motion } from "framer-motion";
import { useLanguage } from "../../../context/useLanguage";
import Flag from 'react-flagkit';

export default function LanguageToggleButton() {
  const { language, toggle } = useLanguage();
  return (
    <motion.button
      onClick={toggle}
      className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center backdrop-blur-sm border border-white/20"
      whileTap={{ scale: 0.9 }}
      title={language === "es" ? "Cambiar a inglés" : "Switch to Spanish"}
    >
      <Flag
        country={language === "es" ? "GB" : "ES"}
        size={24}
        className="rounded-sm"
      />
    </motion.button>
  );
}
