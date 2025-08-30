"use client";
import { useEffect, useState } from "react";

export function useEasterEggs() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking for cursor
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  // Simple handlers for basic interactions
  const handleAvatarClick = () => {
    // Simple click without complex logic
  };

  const handleDoubleClick = () => {
    // Simple double click without complex logic
  };

  return {
    mousePosition,
    // Fixed default values
    matrixMode: false,
    isHackerMode: false,
    retroMode: false,
    cyberpunkMode: false,
    oceanMode: false,
    fireMode: false,
    rainbowMode: false,
    devMode: false,
    clickCount: 0,
    coffeeCount: 0,
    doubleClickCount: 0,
    timeSpent: 0,
    scrollCount: 0,
    particlesActive: false,
    showMiniGame: false,
    gameScore: 0,
    soundEnabled: false,
    showEasterEgg: false,
    secretMessage: "",
    // Empty handlers
    setShowMiniGame: () => {},
    setSoundEnabled: () => {},
    setParticlesActive: () => {},
    handleAvatarClick,
    handleCoffeeClick: () => {},
    handleDoubleClick,
    playMiniGame: () => {},
  } as const;
}
