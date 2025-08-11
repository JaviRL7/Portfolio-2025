// component/portfolio/comments/CommentsForm.tsx
"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send } from "lucide-react";
import { useLanguage } from "@/context/useLanguage";
import { STRINGS } from "./strings";
import type { Theme } from "./types";

interface Props {
  theme: Theme;
  isHacker?: boolean;
  name: string;
  role: string;
  message: string;
  remaining: number;
  loading: boolean;
  onChangeName: (v: string) => void;
  onChangeRole: (v: string) => void;
  onChangeMessage: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  // SOLO se usa en inputs/textarea
  stopModes: Record<string, (e: React.SyntheticEvent) => void>;
}

export default function CommentsForm({
  theme, isHacker, name, role, message, remaining, loading,
  onChangeName, onChangeRole, onChangeMessage, onSubmit, stopModes,
}: Props) {
  const { language } = useLanguage();
  const t = language === "es" ? STRINGS.es : STRINGS.en;

  const title = useMemo(() => (isHacker ? t.title.hacker : t.title.normal), [isHacker, t]);
  const subtitle = useMemo(() => (isHacker ? t.subtitle.hacker : t.subtitle.normal), [isHacker, t]);

  return (
    <>
      <motion.h2
        className={`text-4xl md:text-6xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r ${theme.primary}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>
      <p className={`text-center mb-12 ${theme.accent}`}>{subtitle}</p>

      <motion.form
        onSubmit={onSubmit}
        className={`mx-auto w-full md:w-3/4 lg:w-2/3 p-4 md:p-6 rounded-2xl shadow-xl border ${theme.border} bg-white/5 backdrop-blur-sm`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm opacity-80">{t.name}</label>
            <Input
              value={name}
              onChange={(e) => onChangeName(e.target.value)}
              placeholder={t.namePh}
              className="mt-1 bg-transparent"
              required
              {...stopModes}
            />
          </div>
          <div>
            <label className="text-sm opacity-80">{t.role}</label>
            <Input
              value={role}
              onChange={(e) => onChangeRole(e.target.value)}
              placeholder={t.rolePh}
              className="mt-1 bg-transparent"
              {...stopModes}
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="text-sm opacity-80">{t.msg}</label>
          <Textarea
            value={message}
            onChange={(e) => onChangeMessage(e.target.value)}
            placeholder={isHacker ? t.msgPhHacker : t.msgPhNormal}
            className="mt-1 min-h-[110px] bg-transparent"
            maxLength={300}
            required
            {...stopModes}
          />
          <div className="flex items-center justify-between mt-2 text-xs opacity-70">
            <span>{remaining} {t.chars}</span>
            <span className="flex items-center gap-1"><MessageSquare size={14} /> {t.instant}</span>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <Button
            type="submit"
            disabled={loading || !name || !message}
            className={`group rounded-2xl px-5 py-2 font-semibold shadow ${loading ? "opacity-60" : ""} bg-gradient-to-r ${theme.secondary}`}
          >
            <span className="mr-2">{t.send}</span>
            <Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      </motion.form>
    </>
  );
}
