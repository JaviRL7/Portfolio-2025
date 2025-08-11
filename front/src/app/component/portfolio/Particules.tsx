"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import React from "react";

interface Props { active: boolean; cursorClass: string; count?: number; }

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const Particle: React.FC<{
  i: number; w: number; h: number; cursorClass: string; start: { x: number; y: number };
}> = ({ i, w, h, cursorClass, start }) => {
  const controls = useAnimation();

  // loop infinito: al terminar un movimiento, empieza otro hacia coords nuevas
  useEffect(() => {
    let mounted = true;
    const loop = async () => {
      while (mounted) {
        await controls.start({
          x: rand(0, w),
          y: rand(0, h),
          opacity: rand(0.4, 1),
          scale: rand(0.6, 1.3),
          transition: { duration: rand(2, 6), ease: "linear" },
        });
      }
    };
    loop();
    return () => { mounted = false; };
  }, [controls, w, h]);

  return (
    <motion.div
      className={`absolute w-2 h-2 rounded-full ${cursorClass} pointer-events-none`}
      style={{ filter: "blur(0.2px)" }}
      initial={{ x: start.x, y: start.y, opacity: 0.8, scale: 1 }}
      animate={controls}
    />
  );
};

function ParticlesBase({ active, cursorClass, count = 30 }: Props) {
  if (!active) return null;


  const w = typeof window !== "undefined" ? window.innerWidth : 1000;
  const h = typeof window !== "undefined" ? window.innerHeight : 1000;

  // posiciones iniciales estables entre re-renders
  const startsRef = useRef(
    Array.from({ length: count }).map(() => ({ x: rand(0, w), y: rand(0, h) }))
  );
  const starts = startsRef.current;

  // clave estable para que React no remonte las partículas
  const ids = useMemo(() => Array.from({ length: count }).map((_, i) => `p-${i}`), [count]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {ids.map((id, i) => (
        <Particle
          key={id}
          i={i}
          w={w}
          h={h}
          cursorClass={cursorClass}
          start={starts[i]}
        />
      ))}
    </div>
  );
}

export default React.memo(ParticlesBase);
