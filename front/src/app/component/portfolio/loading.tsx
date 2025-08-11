"use client";

import { useEffect, useMemo, useState } from "react"; // ya lo tenés

type Props = {
  /** Progreso 0..100 (controlado desde el padre) */
  progress: number;
  /** Índice del paso actual (opcional). Si no se pasa, se deriva del progreso. */
  stepIndex?: number;
  /** Pasos de la “terminal” */
  steps?: string[];
  /** Texto grande superior (opcional) */
  title?: string;
};

export default function LoadingScreen({
  progress,
  stepIndex,
  steps,
  title = "<JOACO_404?/>",
}: Props) {
  const loadingSteps = useMemo(
    () =>
      steps ?? [
        "Inicializando sistema",
        "Cargando módulos",
        "Estableciendo conexiones",
        "Compilando recursos",
        "Optimizando rendimiento",
        "Finalizando configuración",
      ],
    [steps]
  );
  const [clock, setClock] = useState<string | null>(null);

  const pct = Math.max(0, Math.min(Math.round(progress), 100));

  useEffect(() => {
  const format = () => new Date().toLocaleTimeString("es-AR", { hour12: false });
  setClock(format());
  const id = setInterval(() => setClock(format()), 1000);
  return () => clearInterval(id);
}, []);

  // Derivar paso a partir del progreso si no viene controlado
  const derivedIndex = Math.min(
    Math.floor((pct / 100) * loadingSteps.length),
    loadingSteps.length - 1
  );
  const currentStep = stepIndex ?? derivedIndex;

  // Tamaño fijo del “terminal”: ancho máx. controlado y alto fijo
  // Cada línea tiene altura fija (h-6) para evitar "jump layout"
  return (
    <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center relative overflow-hidden text-gray-100">
      {/* Background grid */}
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.06)_1px,transparent_1px)] bg-[size:50px_50px]"
        aria-hidden="true"
      />

      {/* Partículas mínimas */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-fuchsia-500 rounded-full animate-pulse" aria-hidden="true" />
      <div className="absolute top-40 right-32 w-1 h-1 bg-indigo-400 rounded-full animate-ping" aria-hidden="true" />
      <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" aria-hidden="true" />
      <div className="absolute bottom-20 right-20 w-1 h-1 bg-cyan-400 rounded-full animate-ping" aria-hidden="true" />

      <div
        className="z-10 w-[min(92vw,560px)] space-y-8 px-6"
        role="status"
        aria-live="polite"
      >
        {/* Brand */}
        <div className="space-y-3 text-center">
          <div className="flex items-center justify-center space-x-2" aria-hidden="true">
            <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse" />
            <div className="w-3 h-3 bg-violet-500 rounded-full animate-pulse [animation-delay:100ms]" />
            <div className="w-3 h-3 bg-fuchsia-500 rounded-full animate-pulse [animation-delay:200ms]" />
          </div>

          <h1 className="text-2xl font-mono font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-500 to-fuchsia-500 select-none">
            {title}
          </h1>
        </div>

        {/* Terminal (tamaño constante) */}
        <div className="bg-[#0e1220] border border-violet-400/30 rounded-lg p-4 md:p-5 font-mono text-[13px] md:text-sm">
          <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-violet-400/30">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-gray-400 text-xs ml-2">terminal</span>
          </div>

          {/* Contenedor de líneas: alto fijo y sin reflow visual */}
          <div className="relative">
            <ul className="space-y-1">
              {loadingSteps.map((label, idx) => {
                const isDone = idx < currentStep;
                const isActive = idx === currentStep;
                const isPending = idx > currentStep;

                return (
                  <li
                    key={idx}
                    className="h-6 leading-6 flex items-center gap-2 whitespace-nowrap"
                  >
                    {/* Hora tipo log */}
                    <span className="text-gray-500 tabular-nums" suppressHydrationWarning>
  [{clock ?? "--:--:--"}]
</span>

                    {/* Nivel */}
                    <span className="text-cyan-300">INFO</span>
                    <span className="text-gray-500">▶</span>

                    {/* Mensaje */}
                    <span
                      className={
                        isPending
                          ? "text-gray-500/60"
                          : "text-gray-100"
                      }
                    >
                      {label}
                    </span>

                    {/* Sufijo de estado */}
                    {isDone && (
                      <span className="ml-auto text-emerald-400 flex items-center gap-1">
                        ✓ <span className="hidden sm:inline">OK</span>
                      </span>
                    )}

                    {isActive && (
                      <span className="ml-auto flex items-center gap-2">
                        {/* spinner */}
                        <svg
                          className="w-3.5 h-3.5 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle cx="12" cy="12" r="9" stroke="currentColor" className="opacity-20" />
                          <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" className="text-violet-400" />
                        </svg>
                        <span className="text-violet-300">procesando…</span>
                        {/* caret */}
                        <span className="w-2 h-4 bg-violet-400/80 animate-pulse" aria-hidden="true" />
                      </span>
                    )}

                    {isPending && <span className="ml-auto text-gray-500/50">…</span>}
                  </li>
                );
              })}
            </ul>

            {/* Overlay de degradado sutil (look terminal) */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 rounded-md" />
          </div>
        </div>

        {/* Progress fijo */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono text-gray-400">
            <span>Progreso</span>
            <span>{pct}%</span>
          </div>
          <div
            className="w-full bg-[#12172a] rounded-full h-2 overflow-hidden"
            aria-label="Barra de progreso"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            role="progressbar"
          >
            <div
              className="h-full bg-gradient-to-r from-indigo-400 via-violet-500 to-fuchsia-500 rounded-full transition-[width] duration-150 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Scanline que acompaña el progreso (constante en tamaño) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-violet-400 to-transparent animate-pulse opacity-40"
          style={{
            top: `${20 + pct * 0.6}%`,
            transition: "top 0.25s ease-out",
          }}
        />
      </div>
    </div>
  );
}
