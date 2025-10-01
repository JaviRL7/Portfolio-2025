"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import type { ProjectItem } from "@/lib/portfolio/types";
import { useLanguage } from "@/context/useLanguage";
import Image from "next/image";

// 👇 importá el modal
import ProjectModal from "./proyectModal";

interface Props {
  theme: { primary: string; secondary: string; accent: string; border: string };
  isHacker: boolean;
  projects: ProjectItem[];
}

/** Extiendo lo mínimo que usa el modal */
type ProjectForModal = ProjectItem & {
  images?: string[]; // ['/p/1.jpg', '/p/2.jpg', ...]
  demoUrl?: string;
  codeUrl?: string;
  featured?: boolean;
};

// Función para obtener colores de chips por tecnología
const getTechChipColor = (): string => {
  // Todos los botones tendrán el mismo estilo outline blanco
  return "bg-transparent text-white border-white";
};

export default function Projects({ theme, isHacker, projects }: Props) {
  const { language } = useLanguage();
  const heading = isHacker
    ? language === "es"
      ? "EXPLOITS.log"
      : "EXPLOITS.log"
    : language === "es"
    ? "PROYECTOS"
    : "PROJECTS";

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<ProjectForModal | null>(null);

  const openModal = (p: ProjectForModal) => {
    setSelected(p);
    setOpen(true);
  };

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-center mb-16 text-blue-300"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {heading}
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10 items-stretch">
          {projects.map((p, index) => {
            const title =
              p.title?.[language] ?? p.title?.en ?? p.title?.es ?? "";
            const description =
              p.description?.[language] ??
              p.description?.en ??
              p.description?.es ??
              "";

            return (
              <motion.div
                key={`${title}-${index}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group h-full"
              >
                {/* En vez de <a href=...> abrimos el modal */}
                <button
                  type="button"
                  onClick={() => openModal(p as ProjectForModal)}
                  className="block h-full w-full text-left"
                  aria-label={`Abrir detalles de ${title}`}
                >
                  <div className="flex flex-col h-full max-w-lg mx-auto">
                    {/* Imagen rectangular superior */}
                    <div className="relative overflow-hidden rounded-t-xl border-x border-t border-gray-700 bg-gray-900/30">
                      <Image
                        src={p.image || "/placeholder.svg"}
                        alt={title}
                        width={600}
                        height={300}
                        className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Contenido en recuadro separado */}
                    <div className="p-6 flex flex-col flex-1 bg-gray-900/70 border border-gray-700 rounded-b-xl mt-1 backdrop-blur-sm transition-colors duration-300 group-hover:border-cyan-400/40">
                      <h3 className="text-xl font-bold text-white mb-3">
                        {isHacker ? `${title}.exe` : title}
                      </h3>
                      <p className="text-gray-400 mb-4 flex-1 leading-relaxed">{description}</p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {p.tech.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 rounded-md text-sm font-medium bg-gray-800/50 text-gray-300/90 border border-gray-700"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <ProjectModal
          isOpen={open}
          onClose={() => setOpen(false)}
          title={
            selected.title?.[language] ??
            selected.title?.en ??
            selected.title?.es ??
            ""
          }
          description={
            selected.description?.[language] ??
            selected.description?.en ??
            selected.description?.es ??
            ""
          }
          images={
            selected.images && selected.images.length > 0
              ? selected.images
              : [selected.image || "/placeholder.svg"]
          }
          stack={selected.tech}
          demoUrl={(selected as ProjectForModal).demoUrl}
          codeUrl={selected.link}
          featured={(selected as ProjectForModal).featured}
        />
      )}
    </section>
  );
}
