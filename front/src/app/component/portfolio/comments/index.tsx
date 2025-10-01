"use client";
import { useState, useEffect } from "react";
import CommentsForm from "./CommentForm";
import { useStopModes } from "./useStopModes";
import type { CommentItem, CommentsProps } from "./types";
import { useLanguage } from "@/context/useLanguage";
import { STRINGS } from "./strings";
import { commentsApi } from "../../../../service/apiService";
import CommentsCarousel from "./CommentCarrousel";

export default function Comments({
  theme,
  isHacker = false,
  initialComments = [],
  onSubmitComment,
}: CommentsProps) {
  const [comments, setComments] = useState<CommentItem[]>(initialComments);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { language } = useLanguage();
  const t = language === "es" ? STRINGS.es : STRINGS.en;

  const remaining = 300 - message.length;
  const stopModes = useStopModes();

  // Cargar del backend si no vino initial
  useEffect(() => {
    if (initialComments.length) return;
    (async () => {
      try {
        const list = await commentsApi.list();
        const adapted: CommentItem[] = list.map((c) => ({
          id: c.id,
          name: c.name,
          role: c.role,
          message: c.texto,
          createdAt: c.createdAt,
        }));
        setComments(adapted);
      } catch {
        /* toasts desde apiService */
      }
    })();
  }, [initialComments.length]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    if (message.length > 300) return;

    setLoading(true);
    try {
      if (onSubmitComment) {
        const saved = await onSubmitComment({
          name: name.trim(),
          role: role.trim() || undefined,
          message: message.trim(),
        });
        setComments((prev) => [saved, ...prev]);
      } else {
        const created = await commentsApi.create({
          name: name.trim(),
          texto: message.trim(),
          role: role.trim() || undefined,
        });
        const saved: CommentItem = {
          id: created.id,
          name: created.name,
          role: created.role,
          message: created.texto,
          createdAt: created.createdAt,
        };
        setComments((prev) => [saved, ...prev]);
      }
      setMessage("");
      setRole("");
      setName("");
    } finally {
      setLoading(false);
    }
  }

  const count = comments.length;
  const countLabel =
    language === "es"
      ? `${count} comentario${count === 1 ? "" : "s"}`
      : `${count} comment${count === 1 ? "" : "s"}`;

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* ---- Counter pill ---- */}
        <div className="w-full flex items-center justify-center mb-8">
          <div className="relative group">
            {/* Content */}
            <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 sm:px-5 py-2.5 sm:py-3 flex items-center gap-3 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
              {/* Icono inline para evitar deps */}
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 opacity-90"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M7 8h10M7 12h7M5 20l3-3h9a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v11l1.8-1.8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-200"
                />
              </svg>

              <div className="flex items-baseline gap-2">
                <span className={`text-xs sm:text-sm tracking-wide ${theme.accent}`}>
                  {language === "es" ? "Firmas" : "Signatures"}
                </span>
                <span className="text-lg sm:text-xl font-semibold tabular-nums text-gray-100">
                  {count.toLocaleString()}
                </span>
                <span className="hidden sm:inline text-sm text-gray-300/80">
                  • {countLabel}
                </span>
              </div>

              {/* Dot status */}
              <span className="ml-2 inline-flex items-center gap-1 text-xs text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {language === "es" ? "en vivo" : "live"}
              </span>
            </div>
          </div>
        </div>
        {/* ---- /Counter pill ---- */}

        <CommentsForm
          theme={theme}
          isHacker={isHacker}
          name={name}
          role={role}
          message={message}
          remaining={remaining}
          loading={loading}
          onChangeName={setName}
          onChangeRole={setRole}
          onChangeMessage={setMessage}
          onSubmit={handleSubmit}
          stopModes={stopModes}
        />

        {/* Carrusel */}
        {comments.length === 0 ? (
          <p className={`text-center mt-12 text-sm ${theme.accent}`}>{t.empty}</p>
        ) : (
          <div className="mt-12 mx-auto max-w-[1100px]">
            <CommentsCarousel comments={comments} theme={theme} />
          </div>
        )}
      </div>
    </section>
  );
}
