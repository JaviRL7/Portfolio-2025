"use client";
import { motion } from "framer-motion";
import { THEMES, getCurrentTheme } from "@/lib/portfolio/themes";
import { useEasterEggs } from "@/lib/portfolio/useEasterEggs";
import { skills, projects } from "@/lib/portfolio/data";
import LanguageSwitcher from "./component/portfolio/LanguageSwitcher";
import Cursor from "./component/portfolio/Cursor";
import MatrixRain from "./component/portfolio/MatrixRain";
import Particles from "./component/portfolio/Particules";
import Hero from "./component/portfolio/Hero";
import About from "./component/portfolio/About";
import Projects from "./component/portfolio/Projects";
import Contact from "./component/portfolio/Contact";
import Footer from "./component/portfolio/Footer";

export default function PortfolioPage() {
  const eg = useEasterEggs();

  const themeKey = getCurrentTheme({
    rainbowMode: eg.rainbowMode,
    retroMode: eg.retroMode,
    cyberpunkMode: eg.cyberpunkMode,
    oceanMode: eg.oceanMode,
    fireMode: eg.fireMode,
    isHackerMode: eg.isHackerMode,
    matrixMode: eg.matrixMode,
  });
  const theme = THEMES[themeKey];

  const activeFlags = [
    eg.matrixMode, eg.isHackerMode, eg.retroMode, eg.cyberpunkMode, eg.oceanMode, eg.fireMode, eg.rainbowMode, eg.devMode,
    eg.coffeeCount > 0, eg.particlesActive,
  ].filter(Boolean).length;

  return (
    <div className={`min-h-screen text-white overflow-x-hidden transition-all duration-1000 ${theme.bg}`} onDoubleClick={eg.handleDoubleClick}>
      {eg.matrixMode && <MatrixRain />}
      <Particles active={eg.particlesActive} cursorClass={theme.cursor} />
     
      {/* Notificación */}
      {eg.showEasterEgg && (
        <motion.div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-purple-600 to-cyan-600 p-4 rounded-lg shadow-2xl border border-cyan-400" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }}>
          <p className="text-white font-bold">{eg.secretMessage}</p>
        </motion.div>
      )}
      <Cursor x={eg.mousePosition.x} y={eg.mousePosition.y} colorClass={theme.cursor} />

      {/* Fondo animado (reducido a un solo motion para simplificar) */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20" />
        <motion.div className="absolute inset-0 opacity-30" animate={{ background: [
          "radial-gradient(circle at 20% 80%, #00f5ff 0%, transparent 50%)",
          "radial-gradient(circle at 80% 20%, #ff00ff 0%, transparent 50%)",
          "radial-gradient(circle at 40% 40%, #00ff00 0%, transparent 50%)",
        ] }} transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }} />
      </div>

        
      <Hero theme={theme} isHacker={eg.isHackerMode} clickCount={eg.clickCount} coffeeCount={eg.coffeeCount} onAvatarClick={eg.handleAvatarClick} onCoffee={eg.handleCoffeeClick} soundEnabled={eg.soundEnabled} setSoundEnabled={eg.setSoundEnabled} />

      <About theme={theme} isHacker={eg.isHackerMode} stats={{ coffee: eg.coffeeCount, clicks: eg.clickCount, timeSpent: eg.timeSpent, scrolls: eg.scrollCount, gameScore: eg.gameScore, activeFlags }} skills={skills} />

      <Projects theme={theme} isHacker={eg.isHackerMode} projects={projects} />
      <Contact theme={theme} isHacker={eg.isHackerMode} />
      <Footer borderClass={theme.border} isHacker={eg.isHackerMode} />

  
    </div>
  );
}