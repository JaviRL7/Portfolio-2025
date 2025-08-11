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

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
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
