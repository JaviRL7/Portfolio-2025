"use client";
import { useEffect, useMemo, useRef, useState, useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Theme = {
  primary: string;
  secondary: string;
  accent: string;
  border: string;
  bg: string;
  cursor: string;
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

  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Refs para evitar reconfigurar timers en cada render
  const timer = useRef<number | null>(null);
  const speedRef = useRef(typeSpeed);
  const holdRef = useRef(holdMs);
  const isMounted = useRef(true);

  const prefersReducedMotion = useReducedMotion();
  const statusId = useId();

  // Mantener refs sincronizadas si cambian las props (sin rearmar timers)
  useEffect(() => {
    speedRef.current = typeSpeed;
  }, [typeSpeed]);

  useEffect(() => {
    holdRef.current = holdMs;
  }, [holdMs]);

  // Limpiar timers al desmontar
  useEffect(() => {
    return () => {
      isMounted.current = false;
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    const full = defaultLines[i % defaultLines.length];

    const step = () => {
      if (!isMounted.current) return;

      if (!deleting) {
        const next = full.slice(0, text.length + 1);
        setText(next);
        if (next === full) {
          // Mantener línea un ratito antes de borrar
          timer.current = window.setTimeout(() => {
            if (!isMounted.current) return;
            setDeleting(true);
          }, holdRef.current) as unknown as number;
          return;
        }
      } else {
        const next = full.slice(0, Math.max(0, text.length - 1));
        setText(next);
        if (next.length === 0) {
          setDeleting(false);
          setI((prev) => (prev + 1) % defaultLines.length);
        }
      }

      // Jitter suave + velocidad estable desde ref
      const base = deleting ? Math.floor(speedRef.current * 0.6) : speedRef.current;
      const jitter = Math.floor(Math.random() * 40);
      timer.current = window.setTimeout(step, base + jitter) as unknown as number;
    };

    // Iniciar ciclo
    const base = deleting ? Math.floor(speedRef.current * 0.6) : speedRef.current;
    const jitter = Math.floor(Math.random() * 40);
    timer.current = window.setTimeout(step, base + jitter) as unknown as number;

    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [text, deleting, i, defaultLines]);

  // Progreso estable, con mínimo visible
  const progress = (i % defaultLines.length) / Math.max(1, defaultLines.length - 1);
  const progressPct = Math.max(10, Math.floor(progress * 100));

  return (
    <div
      className={`fixed inset-0 z-[9999] ${theme.bg} flex items-center justify-center overflow-x-hidden`}
      style={{
        minHeight: "100dvh", // evita saltos en iOS
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
      }}
      aria-live="polite"
      aria-busy="true"
      role="status"
      aria-describedby={statusId}
    >
      {/* Fondo con gradientes suaves */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20" />
        {!prefersReducedMotion && (
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
        )}
      </div>

      {/* Card tipo terminal */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative w-full max-w-[820px] mx-3 sm:mx-6 md:mx-0 rounded-2xl border ${theme.border} bg-black/40 backdrop-blur-md shadow-2xl`}
      >
        {/* Barra superior */}
        <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border-b border-white/10 min-w-0">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
          <div className="ml-2 sm:ml-3 text-[10px] sm:text-xs text-white/60 truncate">
            /usr/bin/next-start
          </div>
          <div className={`ml-auto text-[9px] sm:text-[10px] ${theme.accent}`}>
            loading…
          </div>
        </div>

        {/* Cuerpo terminal */}
        <div className="px-3 sm:px-5 py-4 sm:py-6">
          {/* prompt */}
          <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2 text-[11px] sm:text-sm max-[320px]:text-[10px]">
            <span className="text-emerald-400">joaco@portfolio</span>
            <span className="text-white/50">:</span>
            <span className="text-sky-400">~/app</span>
            <span className="text-white/50">$</span>
            <span className="sr-only">loading line</span>
          </div>

          {/* Línea tipeada */}
          <div className="mt-2 font-mono leading-relaxed min-w-0 overflow-hidden whitespace-pre-wrap break-all text-[12px] sm:text-[15px] md:text-base max-[320px]:text-[11px]">
            <span className="text-white/90">{text}</span>
            {/* Caret */}
            <span
              className={`inline-block w-2 ml-1 h-[1em] align-middle ${theme.cursor} ${
                prefersReducedMotion ? "" : "animate-pulse"
              } rounded-sm`}
              aria-hidden="true"
            />
          </div>

          {/* Separador */}
          <div
            className={`pointer-events-none mt-5 sm:mt-6 h-[2px] bg-gradient-to-r ${theme.primary} opacity-60`}
          />

          {/* Progreso */}
          <div className="mt-4 sm:mt-5 h-2 w-full rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${theme.secondary}`}
              style={{ width: `${progressPct}%` }}
              animate={
                prefersReducedMotion
                  ? undefined
                  : { width: ["15%", "85%", "35%", "95%", "25%", "75%"] }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 3.6, repeat: Infinity, ease: "easeInOut" }
              }
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progressPct}
              aria-labelledby={statusId}
            />
          </div>

          {/* Estado */}
          <div
            id={statusId}
            className={`mt-2.5 sm:mt-3 text-[10px] sm:text-[11px] ${theme.accent}`}
          >
            {deleting ? "Optimizing bundles…" : "Bootstrapping modules…"}
          </div>
        </div>

        {/* Botón Skip */}
        {onFinish && (
          <div className="px-3 sm:px-5 pb-4 sm:pb-5 pt-1 flex justify-end">
            <button
              onClick={onFinish}
              className={`text-xs underline-offset-4 hover:underline ${theme.accent} focus:outline-none focus:ring-2 focus:ring-white/30 rounded-md px-1.5 py-0.5`}
            >
              Skip
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
