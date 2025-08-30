"use client";

import { useEffect, useMemo, useState } from "react";

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
  title = "<javi_404/>",
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
    const format = () =>
      new Date().toLocaleTimeString("es-AR", { hour12: false });
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

  return (
    <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center relative overflow-hidden text-gray-100">
      {/* Background grid */}
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.06)_1px,transparent_1px)] bg-[size:50px_50px]"
        aria-hidden="true"
      />

      {/* Partículas mínimas */}
      <div
        className="absolute top-20 left-20 w-2 h-2 bg-fuchsia-500 rounded-full animate-pulse"
        aria-hidden="true"
      />
      <div
        className="absolute top-40 right-32 w-1 h-1 bg-indigo-400 rounded-full animate-ping"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-20 right-20 w-1 h-1 bg-cyan-400 rounded-full animate-ping"
        aria-hidden="true"
      />

      <div
        className="z-10 w-[min(92vw,560px)] space-y-6 sm:space-y-8 px-4 sm:px-6"
        role="status"
        aria-live="polite"
      >
        {/* Brand */}
        <div className="space-y-2 sm:space-y-3 text-center">
          <div className="flex items-center justify-center space-x-2" aria-hidden="true">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-indigo-400 rounded-full animate-pulse" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-violet-500 rounded-full animate-pulse [animation-delay:100ms]" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-fuchsia-500 rounded-full animate-pulse [animation-delay:200ms]" />
          </div>

          <h1 className="text-xl sm:text-2xl font-mono font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-500 to-fuchsia-500 select-none">
            {title}
          </h1>
        </div>

        {/* Terminal (tamaño constante) */}
        <div className="bg-[#0e1220] border border-violet-400/30 rounded-lg p-3 sm:p-5 font-mono text-[12px] sm:text-[13px] md:text-sm overflow-x-hidden">
          <div className="flex items-center space-x-2 mb-2 sm:mb-3 pb-2 border-b border-violet-400/30">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-gray-400 text-[11px] sm:text-xs ml-2">
              terminal
            </span>
          </div>

          {/* Contenedor de líneas: alto fijo por línea, sin reflow visual */}
          <div className="relative">
            <ul className="space-y-1">
              {loadingSteps.map((label, idx) => {
                const isDone = idx < currentStep;
                const isActive = idx === currentStep;
                const isPending = idx > currentStep;

                return (
                  <li
                    key={idx}
                    className="h-6 leading-6 flex items-center gap-1.5 sm:gap-2"
                  >
                    {/* Hora tipo log (ancho fijo para evitar saltos) */}
                    <span
                      className="text-gray-500 tabular-nums w-[72px] sm:w-[80px] shrink-0 text-right"
                      suppressHydrationWarning
                    >
                      [{clock ?? "--:--:--"}]
                    </span>

                    {/* Nivel */}
                    <span className="text-cyan-300 shrink-0">INFO</span>
                    <span className="text-gray-500 shrink-0">▶</span>

                    {/* Mensaje (flexible + trunca en móviles) */}
                    <span
                      className={
                        (isPending ? "text-gray-500/60 " : "text-gray-100 ") +
                        "min-w-0 flex-1 truncate"
                      }
                      title={label}
                    >
                      {label}
                    </span>

                    {/* Sufijo de estado */}
                    {isDone && (
                      <span className="ml-2 sm:ml-auto text-emerald-400 flex items-center gap-1 shrink-0">
                        ✓ <span className="hidden sm:inline">OK</span>
                      </span>
                    )}

                    {isActive && (
                      <span className="ml-2 sm:ml-auto flex items-center gap-1.5 sm:gap-2 shrink-0">
                        {/* spinner */}
                        <svg
                          className="w-3.5 h-3.5 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="9"
                            stroke="currentColor"
                            className="opacity-20"
                          />
                          <path
                            d="M21 12a9 9 0 0 0-9-9"
                            stroke="currentColor"
                            className="text-violet-400"
                          />
                        </svg>
                        <span className="text-violet-300 text-[11px] sm:text-inherit">
                          procesando…
                        </span>
                        {/* caret */}
                        <span
                          className="w-2 h-4 bg-violet-400/80 animate-pulse"
                          aria-hidden="true"
                        />
                      </span>
                    )}

                    {isPending && (
                      <span className="ml-2 sm:ml-auto text-gray-500/50 shrink-0">
                        …
                      </span>
                    )}
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
          <div className="flex justify-between text-[11px] sm:text-xs font-mono text-gray-400">
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
