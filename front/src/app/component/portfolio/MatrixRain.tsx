"use client";

export default function MatrixRain() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="matrix-rain">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="matrix-column"
            style={{ left: `${i * 2}%`, animationDelay: `${Math.random() * 2}s`, animationDuration: `${2 + Math.random() * 3}s` }}
          >
            {Array.from({ length: 20 }).map((_, j) => (
              <span key={j} className="matrix-char">{String.fromCharCode(0x30a0 + Math.random() * 96)}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}