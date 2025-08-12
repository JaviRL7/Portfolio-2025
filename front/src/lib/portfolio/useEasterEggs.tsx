"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { playSound } from "./sounds";

export function useEasterEggs() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [konamiCode, setKonamiCode] = useState<string[]>([]);
  const [secretCode, setSecretCode] = useState<string[]>([]);

  // Modos (exclusivos)
  const [matrixMode, setMatrixMode] = useState(false);
  const [isHackerMode, setIsHackerMode] = useState(false);
  const [retroMode, setRetroMode] = useState(false);
  const [cyberpunkMode, setCyberpunkMode] = useState(false);
  const [oceanMode, setOceanMode] = useState(false);
  const [fireMode, setFireMode] = useState(false);
  const [rainbowMode, setRainbowMode] = useState(false);
  const [devMode, setDevMode] = useState(false);

  // Stats/otros
  const [clickCount, setClickCount] = useState(0);
  const [coffeeCount, setCoffeeCount] = useState(0);
  const [doubleClickCount, setDoubleClickCount] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [scrollCount, setScrollCount] = useState(0);
  const [particlesActive, setParticlesActive] = useState(false);

  const [showMiniGame, setShowMiniGame] = useState(false);
  const [gameScore, setGameScore] = useState(0);

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [secretMessage, setSecretMessage] = useState("");

  // Secuencias
  const konamiSequence = useMemo(
    () => ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","KeyB","KeyA"],
    []
  );
  const cyberSequence = useMemo(() => ["KeyC", "KeyY", "KeyB", "KeyE", "KeyR"], []);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(`
╔═════════════════════════════════════════════════════════╗
║ 🚀 ¡Hola, developer! 🚀                                ║
║ Abriste la consola... me gusta tu estilo.              ║
║                                                         ║
║ Easter Eggs:                                           ║
║ • Konami Code (↑↑↓↓←→←→BA)                              ║
║ • M = Matrix | H = Hacker | R = Retro                   ║
║ • C = Cyberpunk | O = Ocean | F = Fire                  ║
║ • T = Rainbow | D = Dev                                 ║
║ • Click 10 veces el avatar, ☕ para café, etc.           ║
╚═════════════════════════════════════════════════════════╝
`);
    console.log("💻 Hecho con React + Next.js");
  }, []);

  /** Apaga todos los modos */
  const clearAllModes = useCallback(() => {
    setMatrixMode(false);
    setIsHackerMode(false);
    setRetroMode(false);
    setCyberpunkMode(false);
    setOceanMode(false);
    setFireMode(false);
    setRainbowMode(false);
    setDevMode(false);
  }, []);

  /**
   * Activa un modo de manera exclusiva. Si ese modo ya estaba activo,
   * apaga todos (quedando sin modo).
   */
  const activateMode = useCallback((
    mode: "matrix" | "hacker" | "retro" | "cyberpunk" | "ocean" | "fire" | "rainbow" | "dev",
    wasOn: boolean,
    sound: Parameters<typeof playSound>[0],
    onMsg: string,
    offMsg: string
  ) => {
    // Sonido
    if (soundEnabled) playSound(sound);

    // Si ya estaba activo, lo apagamos todo
    if (wasOn) {
      clearAllModes();
      setSecretMessage(offMsg);
      setShowEasterEgg(true);
      setTimeout(() => setShowEasterEgg(false), 3000);
      return;
    }

    // Si no estaba activo: apagar todo y prender solo ese
    clearAllModes();
    switch (mode) {
      case "matrix": setMatrixMode(true); break;
      case "hacker": setIsHackerMode(true); break;
      case "retro": setRetroMode(true); break;
      case "cyberpunk": setCyberpunkMode(true); break;
      case "ocean": setOceanMode(true); break;
      case "fire": setFireMode(true); break;
      case "rainbow": setRainbowMode(true); break;
      case "dev": setDevMode(true); break;
    }

    setSecretMessage(onMsg);
    setShowEasterEgg(true);
    setTimeout(() => setShowEasterEgg(false), 3000);
  }, [clearAllModes, soundEnabled]);

  // Teclado
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      setKonamiCode((prev) => {
        const seq = [...prev, e.code].slice(-10);
        if (JSON.stringify(seq) === JSON.stringify(konamiSequence)) {
          if (soundEnabled) playSound("success");
          // Activa Matrix de forma exclusiva
          activateMode("matrix", matrixMode, "matrix", "🟢 Matrix mode ON", "🔴 Matrix mode OFF");
          // eslint-disable-next-line no-console
          console.log("🎮 KONAMI CODE DETECTED! Matrix mode activated!");
        }
        return seq;
      });

      setSecretCode((prev) => {
        const seq = [...prev, e.code].slice(-5);
        if (JSON.stringify(seq) === JSON.stringify(cyberSequence)) {
          if (soundEnabled) playSound("game");
          setShowMiniGame(true);
          setSecretMessage("🎮 ¡CÓDIGO CYBER ACTIVADO! Mini-juego desbloqueado");
          setShowEasterEgg(true);
          setTimeout(() => setShowEasterEgg(false), 3000);
        }
        return seq;
      });

      switch (e.code) {
        case "KeyM": activateMode("matrix",    matrixMode,     "matrix",    "🟢 Matrix mode ON",   "🔴 Matrix mode OFF"); break;
        case "KeyH": activateMode("hacker",    isHackerMode,   "hacker",    "🕶️ Hacker mode ON",   "👨‍💻 Hacker mode OFF"); break;
        case "KeyR": activateMode("retro",     retroMode,      "retro",     "📼 Retro mode ON",     "📼 Retro mode OFF"); break;
        case "KeyC": activateMode("cyberpunk", cyberpunkMode,  "cyberpunk", "🤖 Cyberpunk ON",      "🤖 Cyberpunk OFF"); break;
        case "KeyO": activateMode("ocean",     oceanMode,      "ocean",     "🌊 Ocean mode ON",     "🌊 Ocean mode OFF"); break;
        case "KeyF": activateMode("fire",      fireMode,       "fire",      "🔥 Fire mode ON",      "🔥 Fire mode OFF"); break;
        case "KeyT": activateMode("rainbow",   rainbowMode,    "rainbow",   "🌈 Rainbow mode ON",   "🌈 Rainbow mode OFF"); break;
        case "KeyD": activateMode("dev",       devMode,        "developer", "💻 Dev mode ON",       "💻 Dev mode OFF"); break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [
    activateMode,
    matrixMode, isHackerMode, retroMode, cyberpunkMode, oceanMode, fireMode, rainbowMode, devMode,
    soundEnabled, konamiSequence, cyberSequence
  ]);

  // Tiempo + scroll
  useEffect(() => {
    const timer = setInterval(() => setTimeSpent((p) => p + 1), 1000);
    const handleScroll = () => {
      setScrollCount((p) => {
        const next = p + 1;
        if (next === 100) {
          if (soundEnabled) playSound("success");
          setSecretMessage("🌊 ¡SCROLL MASTER! Hiciste 100 scrolls");
          setShowEasterEgg(true);
          setTimeout(() => setShowEasterEgg(false), 4000);
        }
        return next;
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [soundEnabled]);

  // Hitos de tiempo
  useEffect(() => {
    if (timeSpent === 60) {
      if (soundEnabled) playSound("success");
      setSecretMessage("⏰ ¡1 minuto por acá! ¿Qué te va pareciendo?");
      setShowEasterEgg(true);
      setTimeout(() => setShowEasterEgg(false), 4000);
    }
    if (timeSpent === 300) {
      if (soundEnabled) playSound("rainbow");
      setParticlesActive(true);
      setSecretMessage("✨ ¡5 minutos! Activando partículas especiales…");
      setShowEasterEgg(true);
      setTimeout(() => setShowEasterEgg(false), 4000);
    }
  }, [timeSpent, soundEnabled]);

  // Mouse
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  // Handlers
  const handleAvatarClick = () => {
    if (soundEnabled) playSound("click");
    setClickCount((prev) => {
      const next = prev + 1;
      if (next === 10) {
        if (soundEnabled) playSound("success");
        setSecretMessage("🤖 ¡SISTEMA SOBRECARGADO! ¡Hiciste 10 clicks! 🔥");
        setShowEasterEgg(true);
        setTimeout(() => {
          setShowEasterEgg(false);
          setClickCount(0);
        }, 3000);
        // eslint-disable-next-line no-console
        console.log("🤖 Avatar overload detected!");
      }
      return next;
    });
  };

  const handleCoffeeClick = () => {
    if (soundEnabled) playSound("coffee");
    setCoffeeCount((prev) => {
      const next = prev + 1;
      const messages = [
        "☕ +1 café",
        "☕☕ Doble shot",
        "☕☕☕ Modo turbo",
        "☕☕☕☕ Nivel crítico",
        "☕☕☕☕☕ ALERTA: vibrando",
      ];
      // eslint-disable-next-line no-console
      console.log(messages[Math.min(next - 1, 4)]);
      return next;
    });
  };

  const handleDoubleClick = () => {
    if (soundEnabled) playSound("click");
    setDoubleClickCount((prev) => {
      const next = prev + 1;
      if (next === 5) {
        if (soundEnabled) playSound("success");
        setParticlesActive(true);
        setSecretMessage("✨ ¡DOUBLE CLICK MASTER! Partículas ON");
        setShowEasterEgg(true);
        setTimeout(() => setShowEasterEgg(false), 4000);
        // eslint-disable-next-line no-console
        console.log("✨ Double click master detected!");
      }
      return next;
    });
  };

  const playMiniGame = () => {
    if (soundEnabled) playSound("game");
    const score = Math.floor(Math.random() * 1000) + 500;
    setGameScore(score);
    setSecretMessage(`🎮 ¡Puntuación: ${score}! ${score > 800 ? "¡INCREÍBLE!" : "¡Bien jugado!"}`);
    setShowEasterEgg(true);
    setTimeout(() => {
      setShowEasterEgg(false);
      setShowMiniGame(false);
    }, 5000);
  };

  return {
    mousePosition, konamiCode, secretCode,
    matrixMode, isHackerMode, retroMode, cyberpunkMode, oceanMode, fireMode, rainbowMode, devMode,
    clickCount, coffeeCount, doubleClickCount, timeSpent, scrollCount, particlesActive,
    showMiniGame, gameScore, soundEnabled, showEasterEgg, secretMessage,
    setShowMiniGame, setSoundEnabled, setParticlesActive,
    handleAvatarClick, handleCoffeeClick, handleDoubleClick, playMiniGame,
  } as const;
}
