"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send } from "lucide-react";
import { useLanguage } from "@/context/useLanguage";

export type Theme = { primary: string; secondary: string; accent: string; border: string };

export interface CommentItem {
  id: string;
  name: string;
  role?: string;
  message: string;
  createdAt: string; // ISO
}

interface Props {
  theme: Theme;
  isHacker?: boolean;
  initialComments?: CommentItem[];
  onSubmitComment?: (payload: Omit<CommentItem, "id" | "createdAt">) => Promise<CommentItem>;
}

const uid = () => Math.random().toString(36).slice(2, 9);

// Diccionario i18n
const STRINGS = {
  es: {
    title: { normal: "COMENTARIOS", hacker: "GUESTBOOK.log" },
    subtitle: { normal: "Dejame tu mensaje", hacker: "// Firma el repo humano" },
    name: "Nombre",
    role: "Rol (opcional)",
    rolePh: "Frontend, Tech Lead, Cliente, etc.",
    namePh: "Marcos",
    msg: "Mensaje",
    msgPhNormal: "Un gusto trabajar con vos...",
    msgPhHacker: 'echo "Gran trabajo, shippeamos en tiempo récord" >> guestbook',
    chars: "caracteres",
    instant: "Se publicará al instante",
    send: "Enviar",
    empty: "Aún no hay mensajes. ¡Sé el primero en firmar!",
  },
  en: {
    title: { normal: "COMMENTS", hacker: "GUESTBOOK.log" },
    subtitle: { normal: "Leave me your message", hacker: "// Sign the human repo" },
    name: "Name",
    role: "Role (optional)",
    rolePh: "Frontend, Tech Lead, Client, etc.",
    namePh: "John",
    msg: "Message",
    msgPhNormal: "Pleasure working with you...",
    msgPhHacker: 'echo "Great job, shipped in record time" >> guestbook',
    chars: "characters",
    instant: "Will be published instantly",
    send: "Send",
    empty: "No messages yet. Be the first to sign!",
  },
} as const;

/* --- NUEVO: tarjeta con mejor estética --- */
function CommentCard({
  c,
  theme,
}: {
  c: CommentItem;
  theme: Theme;
}) {
  return (
    <Card
      className={`group h-full relative overflow-hidden rounded-2xl
      border ${theme.border} bg-white/[0.06] backdrop-blur-md
      ring-1 ring-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.12)]
      transition-all duration-300`}
    >
      {/* brillo sutil */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/10 to-transparent" />
      <CardContent className="relative p-5">
        {/* header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <p className="font-semibold text-white/95 leading-tight truncate">{c.name}</p>
            {c.role && (
              <span
                className={`mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-[11px]
                font-medium tracking-wide bg-white/10 ${theme.accent}`}
                title={c.role}
              >
                {c.role}
              </span>
            )}
          </div>
          <span className={`shrink-0 text-xs ${theme.accent}`}>
            {new Date(c.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })}
          </span>
        </div>

        {/* mensaje */}
        <p className="text-[0.95rem] text-white/90 leading-relaxed">
          <span aria-hidden className="mr-1 text-white/40">“</span>
          {c.message}
          <span aria-hidden className="ml-1 text-white/40">”</span>
        </p>
      </CardContent>
    </Card>
  );
}

export default function Comments({ theme, isHacker = false, initialComments = [], onSubmitComment }: Props) {
  const [comments, setComments] = useState<CommentItem[]>(initialComments);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { language } = useLanguage();

  const t = language === "es" ? STRINGS.es : STRINGS.en;

  const title = useMemo(() => (isHacker ? t.title.hacker : t.title.normal), [isHacker, t]);
  const subtitle = useMemo(() => (isHacker ? t.subtitle.hacker : t.subtitle.normal), [isHacker, t]);

  const remaining = 300 - message.length;

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
        const local: CommentItem = {
          id: uid(),
          name: name.trim(),
          role: role.trim() || undefined,
          message: message.trim(),
          createdAt: new Date().toISOString(),
        };
        setComments((prev) => [local, ...prev]);
      }
      setMessage("");
    } finally {
      setLoading(false);
    }
  }

  // bloquear activaciones de modos mientras se escribe
  const stopModes = {
    onClickCapture: (e: React.SyntheticEvent) => e.stopPropagation(),
    onDoubleClickCapture: (e: React.SyntheticEvent) => e.stopPropagation(),
    onMouseDownCapture: (e: React.SyntheticEvent) => e.stopPropagation(),
    onKeyDownCapture: (e: React.SyntheticEvent) => e.stopPropagation(),
  };

  return (
    <section className="py-20 px-4 relative z-10" {...stopModes}>
      <div className="max-w-5xl mx-auto">
        {/* Encabezado */}
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-center mb-4 text-blue-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>
        <p className={`text-center mb-12 ${theme.accent}`}>{subtitle}</p>

        {/* Formulario */}
        <motion.form
          onSubmit={handleSubmit}
          className="mx-auto w-full md:w-3/4 lg:w-2/3 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          {...stopModes}
        >
          <div className="space-y-8">
            <div className="relative">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-transparent border-b-2 border-gray-600 focus:border-cyan-400 outline-none px-2 py-3 text-white placeholder-gray-500 transition-colors"
                required
                {...stopModes}
              />
              <label className="absolute -top-5 left-0 text-xs text-gray-400 uppercase tracking-wider">{t.name}</label>
            </div>
            <div className="relative">
              <Input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Frontend Developer"
                className="w-full bg-transparent border-b-2 border-gray-600 focus:border-cyan-400 outline-none px-2 py-3 text-white placeholder-gray-500 transition-colors"
                {...stopModes}
              />
              <label className="absolute -top-5 left-0 text-xs text-gray-400 uppercase tracking-wider">{t.role}</label>
            </div>
            <div className="relative">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={isHacker ? t.msgPhHacker : t.msgPhNormal}
                className="w-full bg-transparent border-2 border-gray-600 focus:border-cyan-400 outline-none px-4 py-3 text-white placeholder-gray-500 transition-colors rounded-lg min-h-[120px] resize-none"
                maxLength={300}
                required
                {...stopModes}
              />
              <label className="absolute -top-5 left-0 text-xs text-gray-400 uppercase tracking-wider">{t.msg}</label>
              <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                <span>
                  {remaining} {t.chars}
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare size={14} /> {t.instant}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-end">
            <Button
              type="submit"
              disabled={loading || !name || !message}
              className={`group rounded-2xl px-6 py-3 font-semibold shadow-lg ${loading ? "opacity-60" : ""}
              bg-gradient-to-r from-cyan-400 to-indigo-500 hover:shadow-cyan-500/50 transition-all`}
              {...stopModes}
            >
              <span className="mr-2">{t.send}</span>
              <Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </div>
        </motion.form>

        {/* Listado de comentarios (NUEVO render con CommentCard) */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" {...stopModes}>
          {comments.map((c) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25 }}
            >
              <CommentCard c={c} theme={theme} />
            </motion.div>
          ))}
        </div>

        {/* Estado vacío */}
        {comments.length === 0 && (
          <p className={`text-center mt-8 text-sm ${theme.accent}`}>{t.empty}</p>
        )}
      </div>
    </section>
  );
}
