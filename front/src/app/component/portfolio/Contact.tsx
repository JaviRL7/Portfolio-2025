"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/context/useLanguage";
import {phone} from "@/lib/portfolio/dataPhone";
interface Props {
  theme: { primary: string; border: string; accent: string };
  isHacker: boolean;
}
console.log(phone);
export default function Contact({ theme, isHacker }: Props) {
  const { language } = useLanguage();

  const heading = isHacker
    ? (language === "es" ? "ESTABLISH_CONNECTION()" : "ESTABLISH_CONNECTION()")
    : (language === "es" ? "CONTACTO" : "CONTACT");

  const sub = isHacker
    ? (language === "es"
        ? "¿Tenés un sistema que necesita ser... mejorado? ¡Iniciemos la conexión!"
        : "Got a system that needs to be... improved? Let’s establish the link!")
    : (language === "es"
        ? "¿Estás buscando a un nuevo desarrollador? Hablemos y creemos algo juntos."
        : "Are you looking for a new developer? Let's talk and create something together.");

  const socials = [
    {
      icon: <Github className="w-6 h-6" />,
      label: language === "es" ? "GitHub" : "GitHub",
      href: "https://github.com/JaviRL7",
      hover: "hover:text-gray-400",
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: language === "es" ? "LinkedIn" : "LinkedIn",
      href: "https://www.linkedin.com/in/javier-rodriguez-lopez-4795a8180/",
      hover: "hover:text-blue-400",
    },
    {
      icon: <FaWhatsapp className="w-6 h-6" />,
      label: language === "es" ? "WhatsApp" : "WhatsApp",
      href: phone, // Ej: `https://wa.me/549XXXXXXXXX`
      hover: "hover:text-green-400",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: language === "es" ? "Correo" : "Email",
      href: "mailto:jrlsanlucar11@gmail.com", // Ej: `mailto:tuemail@dominio.com`
      hover: "hover:text-purple-400",
    },
  ];

  return (
    <section id="contacto" className="py-20 px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-8 text-blue-300"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {heading}
        </motion.h2>

        <motion.p
          className="text-xl text-gray-300 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          {sub}
        </motion.p>

        <motion.div
          className="flex justify-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          {socials.map((s, i) => (
            <motion.a
              key={`${s.label}-${i}`}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              title={s.label}
              className={`p-4 backdrop-blur-sm rounded-full text-gray-400 transition-all duration-300 hover:scale-110 bg-gray-900/50 border ${theme.border} ${s.hover}`}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              viewport={{ once: true }}
            >
              {s.icon}
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            {language === "es" ? "Hecho con" : "Made with"}{" "}
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />{" "}
            {language === "es" ? "y muchas líneas de código" : "and lots of lines of code"}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
