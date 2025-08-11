"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

// Theme completo según tu THEMES (incluye bg y cursor)
type Theme = {
  primary: string;   // gradient classes (e.g. "from-... via-... to-...")
  secondary: string; // gradient classes
  accent: string;    // text-* class
  border: string;    // border-* classes
  bg: string;        // bg-* (puede ser gradient también)
  cursor: string;    // bg-* para el caret
};

interface LoadingScreenProps {
  theme: Theme;
  onFinish?: () => void;
  lines?: string[];
  typeSpeed?: number;
  holdMs?: number;
}

export default function LoadingScreen({
  theme,
  onFinish,
  lines,
  typeSpeed = 28,
  holdMs = 700,
}: LoadingScreenProps) {
  const defaultLines = useMemo(
    () =>
      lines ?? [
        'const res = await fetch("/api/boot");',
        "initPipelines({ cache: true, retries: 3 });",
        "await connectDB(process.env.DB_URL);",
        "compile(assets).then(() => deploy());",
        "hydrate(<App />).then(() => enableEasterEggs());",
        'console.time("bootstrap"); // TODO: remove',
        "const user = await auth.me();",
        "preloadRoutes(['/proyectos','/contacto']);",
        "optimizeImages({ quality: 0.85 });",
        "console.log('%cPunky Pet rocks!', 'font-weight:bold');",
        "await delay(250); // syncing UI...",
      ],
    [lines]
  );

  // máquina de escribir
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const full = defaultLines[i % defaultLines.length];

    const step = () => {
      if (!deleting) {
        const next = full.slice(0, text.length + 1);
        setText(next);
        if (next === full) window.setTimeout(() => setDeleting(true), holdMs);
      } else {
        const next = full.slice(0, Math.max(0, text.length - 1));
        setText(next);
        if (next.length === 0) {
          setDeleting(false);
          setI((prev) => (prev + 1) % defaultLines.length);
        }
      }
    };

    const base = deleting ? Math.floor(typeSpeed * 0.6) : typeSpeed;
    const jitter = Math.floor(Math.random() * 40);
    timer.current = window.setTimeout(step, base + jitter) as unknown as number;

    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [text, deleting, i, defaultLines, typeSpeed, holdMs]);

  const progress = (i % defaultLines.length) / Math.max(1, defaultLines.length - 1);

  return (
    <div
      className={`fixed inset-0 z-[9999] ${theme.bg} flex items-center justify-center`}
      aria-live="polite"
      aria-busy="true"
      role="status"
    >
      {/* Fondo con gradientes suaves */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20" />
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, #00f5ff 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, #ff00ff 0%, transparent 50%)",
              "radial-gradient(circle at 40% 40%, #00ff00 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      {/* Terminal card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative w-[92%] max-w-2xl rounded-2xl border ${theme.border} bg-black/40 backdrop-blur-md shadow-2xl`}
      >
        {/* Barra superior con acento */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
          <span className="size-3 rounded-full bg-red-500/70" />
          <span className="size-3 rounded-full bg-yellow-500/70" />
          <span className="size-3 rounded-full bg-green-500/70" />
          <div className="ml-3 text-xs text-white/60">/usr/bin/next-start</div>
          <div className={`ml-auto text-[10px] ${theme.accent}`}>loading…</div>
        </div>

        {/* Cuerpo terminal */}
        <div className="px-5 py-6">
          {/* prompt */}
          <div className="flex items-baseline gap-2 text-sm">
            <span className="text-emerald-400">joaco@portfolio</span>
            <span className="text-white/50">:</span>
            <span className="text-sky-400">~/app</span>
            <span className="text-white/50">$</span>
            <span className="sr-only">loading line</span>
          </div>

          {/* Línea tipeada */}
          <div className="mt-2 font-mono text-[15px] md:text-base leading-relaxed">
            <span className="text-white/90">{text}</span>
            {/* Caret usa theme.cursor */}
            <span className={`inline-block w-2 ml-1 h-4 align-middle ${theme.cursor} animate-pulse rounded-sm`} />
          </div>

          {/* Separador con gradiente primary */}
          <div className={`pointer-events-none mt-6 h-[2px] bg-gradient-to-r ${theme.primary} opacity-60`} />

          {/* Progreso respirando con secondary */}
          <div className="mt-5 h-2 w-full rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${theme.secondary}`}
              style={{ width: `${Math.max(10, Math.floor(progress * 100))}%` }}
              animate={{ width: ["15%", "85%", "35%", "95%", "25%", "75%"] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Tip/estado con accent */}
          <div className={`mt-3 text-[11px] ${theme.accent}`}>
            {deleting ? "Optimizing bundles…" : "Bootstrapping modules…"}
          </div>
        </div>

        {/* Botón opcional para saltar */}
        {onFinish && (
          <div className="px-5 pb-5 pt-1 flex justify-end">
            <button
              onClick={onFinish}
              className={`text-xs underline-offset-4 hover:underline ${theme.accent}`}
            >
              Skip
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
