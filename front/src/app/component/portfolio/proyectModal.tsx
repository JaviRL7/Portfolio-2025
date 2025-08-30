"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";

// =====================
// Types
// =====================
export type ProjectDetailProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  images: string[]; // rutas públicas o URLs
  stack?: string[]; // etiquetas de tecnología
  demoUrl?: string;
  codeUrl?: string;
  featured?: boolean;
};

// =====================
// Helpers
// =====================
function cn(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

// =====================
// Componente
// =====================
export default function ProjectModal({
  isOpen,
  onClose,
  title,
  description,
  images,
  stack = [],
  demoUrl,
  codeUrl,
  featured,
}: ProjectDetailProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: images.length > 1,
    slides: { perView: 1, spacing: 0 },
  });

  // Cerrar con ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") instanceRef.current?.next();
      if (e.key === "ArrowLeft") instanceRef.current?.prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, instanceRef]);

  // Cerrar al clickear fuera
  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={overlayRef}
      onMouseDown={handleBackdrop}
      className={cn(
        "fixed inset-0 z-[80]",
        "bg-black/60 backdrop-blur-sm",
        "flex items-center justify-center px-4"
      )}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={cn(
          "relative w-full max-w-5xl",
          "rounded-2xl border border-white/10",
          "bg-[#0E1625] text-white shadow-2xl"
        )}
      >
        {/* Header */}
        <header className="flex items-start gap-4 p-6 pb-4">
          <div className="flex-1">
            <h3 className="text-2xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-fuchsia-400 bg-clip-text text-transparent">
                {title}
              </span>
              {featured && (
                <span className="ml-3 rounded-full bg-fuchsia-500/20 px-2 py-0.5 text-xs font-semibold text-fuchsia-300 align-middle">
                  Featured
                </span>
              )}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </header>

        {/* Imagenes - slider */}
        <div className="px-6">
          <div className="relative overflow-hidden rounded-xl border border-white/10">
            <div ref={sliderRef} className="keen-slider">
              {images.map((src, i) => (
                <div key={i} className="keen-slider__slide">
                  {/* Usá next/image si preferís */}
                  <Image
                    src={src}
                    alt={`${title} screenshot ${i + 1}`}
                    width={200}
                    height={200}
                    className="h-[360px] w-full object-cover"
                    draggable={false}
                  />
                </div>
              ))}
            </div>

            {/* Controles */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => instanceRef.current?.prev()}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white shadow hover:bg-black/60"
                  aria-label="Anterior"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={() => instanceRef.current?.next()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white shadow hover:bg-black/60"
                  aria-label="Siguiente"
                >
                  <ChevronRight />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="space-y-5 p-6">
          <p className="text-white/85 leading-relaxed">
            {description}
          </p>

          {!!stack.length && (
            <section>
              <h4 className="mb-3 text-lg font-semibold text-violet-200/90">Stack Tecnológico</h4>
              <div className="flex flex-wrap gap-2">
                {stack.map((s, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-1 text-sm text-violet-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Footer - actions */}
        <footer className="flex flex-col gap-3 border-t border-white/10 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-white/60">
            Tip: usá ← → para navegar imágenes, ESC para cerrar.
          </div>
          <div className="flex gap-3">
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-lg bg-fuchsia-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/60"
              >
                <ExternalLink size={16} /> Ver Demo
              </a>
            )}
            {codeUrl && (
              <a
                href={codeUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <Github size={16} /> Ver Proyecto
              </a>
            )}
          </div>
        </footer>
      </div>
    </div>,
    // Portal a body
    document.body
  );
}

