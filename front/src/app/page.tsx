"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { THEMES, getCurrentTheme } from "@/lib/portfolio/themes";
import { useEasterEggs } from "@/lib/portfolio/useEasterEggs";
import { skills, projects } from "@/lib/portfolio/data";
import Comments from "./component/portfolio/comments";
import Particles from "./component/portfolio/Particules";
import Hero from "./component/portfolio/Hero";
import About from "./component/portfolio/About";
import Education from "./component/portfolio/Education";
import Projects from "./component/portfolio/Projects";
import Contact from "./component/portfolio/Contact";
import Footer from "./component/portfolio/Footer";
import LoadingScreen from "./component/portfolio/loading";

export default function PortfolioPage() {
  const eg = useEasterEggs();

  // ===== Loader controlado por onDone =====
  const [showLoader, setShowLoader] = useState(true);
  const [progress, setProgress] = useState(0);
  // bloquea/desbloquea scroll según loader
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = showLoader ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showLoader]);
  // ========================================


  useEffect(() => {
  const start = performance.now();
  const D = 2500; // tu duración mínima
  let raf = 0;
  const loop = (now: number) => {
    const f = Math.min((now - start) / D, 1);
    setProgress(Math.round(f * 100));
    if (f < 1) raf = requestAnimationFrame(loop);
    else setShowLoader(false);
  };
  raf = requestAnimationFrame(loop);
  return () => cancelAnimationFrame(raf);
}, []);

  const themeKey = useMemo(() => getCurrentTheme(), []);

  const theme = THEMES[themeKey];

  const activeFlags = 0;

  return (
    <div
      className={`min-h-screen text-white overflow-x-hidden transition-all duration-1000 ${theme.bg}`}
    >
      {/* Overlay de carga (solo si showLoader === true) */}
      {showLoader && (
  <div className="fixed inset-0 z-[100] bg-[#0b0f19]">
    <LoadingScreen progress={progress} />
  </div>
)}

      {/* Fondo/efectos (quedan por detrás) */}



      {/* Fondo/efectos (quedan por detrás) */}
      <Particles active={false} cursorClass={theme.cursor} />

      {/* Contenido */}
      <Hero
        theme={theme}
        isHacker={false}
        clickCount={0}
        coffeeCount={0}
        onAvatarClick={() => {}}
        onCoffee={() => {}}
        soundEnabled={false}
        setSoundEnabled={() => {}}
      />

      <Education theme={theme} />

      <About
        theme={theme}
        isHacker={false}
        stats={{
          coffee: 0,
          clicks: 0,
          timeSpent: 0,
          scrolls: 0,
          gameScore: 0,
          activeFlags: 0,
        }}
        skills={skills}
      />

      <Projects theme={theme} isHacker={false} projects={projects} />
      <Comments theme={theme} />
      <Contact theme={theme} isHacker={false} />
      <Footer borderClass={theme.border} isHacker={false} />
    </div>
  );
}
