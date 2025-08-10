"use client";

interface Props { x: number; y: number; colorClass: string; }
export default function Cursor({ x, y, colorClass }: Props) {
  return (
    <div
      className={`fixed w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-150 ease-out ${colorClass}`}
      style={{ left: x - 12, top: y - 12, transform: `scale(${x > 0 ? 1 : 0})` }}
    />
  );
}