"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { playSound } from "./sounds";

export function useEasterEggs() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [konamiCode, setKonamiCode] = useState<string[]>([]);
  const [secretCode, setSecretCode] = useState<string[]>([]);

  const [matrixMode, setMatrixMode] = useState(false);
  const [isHackerMode, setIsHackerMode] = useState(false);
  const [retroMode, setRetroMode] = useState(false);
  const [cyberpunkMode, setCyberpunkMode] = useState(false);
  const [oceanMode, setOceanMode] = useState(false);
  const [fireMode, setFireMode] = useState(false);
  const [rainbowMode, setRainbowMode] = useState(false);
  const [devMode, setDevMode] = useState(false);

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

  // secuencias con referencia estable (evita warning de deps)
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
║                                                         ║
║ Veo que revisas la consola...                           ║
║ 😎 ¡Me gusta tu estilo! 😎                             ║
║                                                         ║
║ Easter Eggs disponibles:                                ║
║ • Konami Code (↑↑↓↓←→←→BA)                              ║
║ • M = Matrix Mode                                       ║
║ • H = Hacker Mode                                       ║
║ • R = Retro Mode                                        ║
║ • C = Cyberpunk Mode                                    ║
║ • O = Ocean Mode                                        ║
║ • F = Fire Mode                                         ║
║ • T = Rainbow Mode                                      ║
║ • D = Developer Mode                                    ║
║ • Click 10 veces en mi avatar                           ║
║ • Click en ☕ para más café ☕                         ║
║ • Doble click 5 veces                                   ║
║ • Quédate 5 minutos para partículas                     ║
║ • Haz scroll 100 veces                                  ║
║                                                         ║
║ ¿Encontraste todos los 15?                              ║
╚═════════════════════════════════════════════════════════╝
`);
    console.log("💻 Construido con React, Next.js y mucho amor por los detalles");
    console.log("🎯 ¿Quieres trabajar conmigo? ¡Hablemos!");
  }, []);

  const toggleFlag = useCallback((
    flag: boolean,
    setter: (v: boolean) => void,
    sound: Parameters<typeof playSound>[0],
    onMsg: string,
    offMsg: string
  ) => {
    if (soundEnabled) playSound(sound);
    setter(!flag);
    setSecretMessage(flag ? offMsg : onMsg);
    setShowEasterEgg(true);
    setTimeout(() => setShowEasterEgg(false), 3000);
  }, [soundEnabled]);

  // teclado
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      setKonamiCode((prev) => {
        const seq = [...prev, e.code].slice(-10);
        if (JSON.stringify(seq) === JSON.stringify(konamiSequence)) {
          if (soundEnabled) playSound("success");
          setMatrixMode(true);
          setSecretMessage("🎉 ¡KONAMI CODE ACTIVADO! ¡Eres un verdadero gamer! 🎮");
          setShowEasterEgg(true);
          setTimeout(() => setShowEasterEgg(false), 5000);
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
        case "KeyM": toggleFlag(matrixMode, setMatrixMode, "matrix", "🟢 Matrix mode ON", "🔴 Matrix mode OFF"); break;
        case "KeyH": toggleFlag(isHackerMode, setIsHackerMode, "hacker", "🕶️ Hacker mode ON", "👨‍💻 Hacker mode OFF"); break;
        case "KeyR": toggleFlag(retroMode, setRetroMode, "retro", "📼 ¡RETRO MODE ON! Welcome to the 80s!", "📼 Retro mode OFF"); break;
        case "KeyC": toggleFlag(cyberpunkMode, setCyberpunkMode, "cyberpunk", "🤖 ¡CYBERPUNK 2077 ACTIVATED!", "🤖 Cyberpunk mode OFF"); break;
        case "KeyO": toggleFlag(oceanMode, setOceanMode, "ocean", "🌊 ¡DEEP OCEAN MODE! Dive in!", "🌊 Ocean mode OFF"); break;
        case "KeyF": toggleFlag(fireMode, setFireMode, "fire", "🔥 ¡FIRE MODE! Things are heating up!", "🔥 Fire mode OFF"); break;
        case "KeyT": toggleFlag(rainbowMode, setRainbowMode, "rainbow", "🌈 ¡RAINBOW MODE! Taste the rainbow!", "🌈 Rainbow mode OFF"); break;
        case "KeyD": toggleFlag(devMode, setDevMode, "developer", "💻 ¡DEVELOPER MODE! Welcome to the matrix!", "💻 Developer mode OFF"); break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  // deps completas y estables
  }, [
    matrixMode, isHackerMode, retroMode, cyberpunkMode, oceanMode, fireMode, rainbowMode, devMode,
    soundEnabled, konamiSequence, cyberSequence, toggleFlag
  ]);

  // tiempo + scroll
  useEffect(() => {
    const timer = setInterval(() => setTimeSpent((p) => p + 1), 1000);
    const handleScroll = () => {
      setScrollCount((p) => {
        const next = p + 1;
        if (next === 100) {
          if (soundEnabled) playSound("success");
          setSecretMessage("🌊 ¡SCROLL MASTER! Has hecho scroll 100 veces");
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

  // hitos de tiempo
  useEffect(() => {
    if (timeSpent === 60) {
      if (soundEnabled) playSound("success");
      setSecretMessage("⏰ ¡Has estado aquí 1 minuto! ¿Te gusta lo que ves?");
      setShowEasterEgg(true);
      setTimeout(() => setShowEasterEgg(false), 4000);
    }
    if (timeSpent === 300) {
      if (soundEnabled) playSound("rainbow");
      setParticlesActive(true);
      setSecretMessage("✨ ¡5 minutos! Activando partículas especiales...");
      setShowEasterEgg(true);
      setTimeout(() => setShowEasterEgg(false), 4000);
    }
  }, [timeSpent, soundEnabled]);

  // mouse
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  // handlers
  const handleAvatarClick = () => {
    if (soundEnabled) playSound("click");
    setClickCount((prev) => {
      const next = prev + 1;
      if (next === 10) {
        if (soundEnabled) playSound("success");
        setSecretMessage("🤖 ¡SISTEMA SOBRECARGADO! ¡Has clickeado demasiado! 🔥");
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
        "☕ +1 café para el desarrollador",
        "☕☕ Doble shot de cafeína",
        "☕☕☕ Modo turbo activado",
        "☕☕☕☕ ¡Peligro! Nivel de cafeína crítico",
        "☕☕☕☕☕ ¡ALERTA! ¡El desarrollador está vibrando!",
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
        setSecretMessage("✨ ¡DOUBLE CLICK MASTER! Partículas activadas");
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
