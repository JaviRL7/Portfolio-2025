"use client";
import { Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../../../context/useLanguage";

export default function LanguageToggleButton() {
  const { language, toggle } = useLanguage();
  return (
    <motion.button
      onClick={toggle}
      className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-all duration-300 hover:scale-110 text-white"
      whileHover={{ rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      title={language === "es" ? "Cambiar a inglés" : "Switch to Spanish"}
    >
      <Globe className="w-5 h-5" />
    </motion.button>
  );
}
