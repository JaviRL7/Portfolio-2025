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
  images?: string[];      // ['/p/1.jpg', '/p/2.jpg', ...]
  demoUrl?: string;
  codeUrl?: string;
  featured?: boolean;
};

export default function Projects({ theme, isHacker, projects }: Props) {
  const { language } = useLanguage();
  const heading =
    isHacker ? (language === "es" ? "EXPLOITS.log" : "EXPLOITS.log")
             : (language === "es" ? "PROYECTOS" : "PROJECTS");

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<ProjectForModal | null>(null);

  const openModal = (p: ProjectForModal) => {
    setSelected(p);
    setOpen(true);
  };

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className={`text-4xl md:text-6xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r ${theme.primary}`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {heading}
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {projects.map((p, index) => {
            const title = p.title?.[language] ?? p.title?.en ?? p.title?.es ?? "";
            const description =
              p.description?.[language] ?? p.description?.en ?? p.description?.es ?? "";

            return (
              <motion.div
                key={`${title}-${index}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group h-full"
              >
                {/* En vez de <a href=...> abrimos el modal */}
                <button
                  type="button"
                  onClick={() => openModal(p as ProjectForModal)}
                  className="block h-full text-left"
                  aria-label={`Abrir detalles de ${title}`}
                >
                  <Card
                    className={`overflow-hidden transition-all duration-300 bg-gray-900/50 backdrop-blur-sm border ${theme.border} flex flex-col h-full`}
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={p.image || "/placeholder.svg"}
                        alt={title}
                        width={500}
                        height={500}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <CardContent className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {isHacker ? `${title}.exe` : title}
                      </h3>
                      <p className="text-gray-400 mb-4 flex-1">{description}</p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {p.tech.map((t) => (
                          <span
                            key={t}
                            className={`px-3 py-1 rounded-full text-sm bg-gradient-to-r ${theme.secondary}/20 border ${theme.border} ${theme.accent}`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
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
          title={selected.title?.[language] ?? selected.title?.en ?? selected.title?.es ?? ""}
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
          codeUrl={(selected as ProjectForModal).codeUrl}
          featured={(selected as ProjectForModal).featured}
        />
      )}
    </section>
  );
}
