"use client";
import { motion } from "framer-motion";

interface Props { active: boolean; cursorClass: string; }
export default function Particles({ active, cursorClass }: Props) {
  if (!active) return null;
  const w = typeof window !== "undefined" ? window.innerWidth : 1000;
  const h = typeof window !== "undefined" ? window.innerHeight : 1000;
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 ${cursorClass} rounded-full`}
          initial={{ x: Math.random() * w, y: Math.random() * h }}
          animate={{ x: Math.random() * w, y: Math.random() * h }}
          transition={{ duration: Math.random() * 10 + 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
      ))}
    </div>
  );
}