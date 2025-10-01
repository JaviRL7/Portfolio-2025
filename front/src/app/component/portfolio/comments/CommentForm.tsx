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
        className="text-4xl md:text-6xl font-bold text-center mb-4 text-blue-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>
      <p className="text-center mb-12 text-blue-300">{subtitle}</p>

      <motion.form
        onSubmit={onSubmit}
        className="mx-auto w-full md:w-3/4 lg:w-2/3 space-y-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        <div className="space-y-8">
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => onChangeName(e.target.value)}
              placeholder="John Doe"
              className="w-full bg-transparent border-b-2 border-gray-600 focus:border-cyan-400 outline-none px-2 py-3 text-white placeholder-gray-500 transition-colors"
              required
              {...stopModes}
            />
            <label className="absolute -top-5 left-0 text-xs text-gray-400 uppercase tracking-wider">
              {t.name}
            </label>
          </div>

          <div className="relative">
            <input
              type="text"
              value={role}
              onChange={(e) => onChangeRole(e.target.value)}
              placeholder="Frontend Developer"
              className="w-full bg-transparent border-b-2 border-gray-600 focus:border-cyan-400 outline-none px-2 py-3 text-white placeholder-gray-500 transition-colors"
              {...stopModes}
            />
            <label className="absolute -top-5 left-0 text-xs text-gray-400 uppercase tracking-wider">
              {t.role}
            </label>
          </div>

          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => onChangeMessage(e.target.value)}
              placeholder={isHacker ? t.msgPhHacker : t.msgPhNormal}
              className="w-full bg-transparent border-2 border-gray-600 focus:border-cyan-400 outline-none px-4 py-3 text-white placeholder-gray-500 transition-colors rounded-lg min-h-[120px] resize-none"
              maxLength={300}
              required
              {...stopModes}
            />
            <label className="absolute -top-5 left-0 text-xs text-gray-400 uppercase tracking-wider">
              {t.msg}
            </label>
            <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
              <span className="font-medium">{remaining} <span className="opacity-80">{t.chars}</span></span>
              <span className="flex items-center gap-2 opacity-90">
                <MessageSquare size={16} className="text-cyan-400/80" />
                <span>{t.instant}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-end">
          <Button
            type="submit"
            disabled={loading || !name || !message}
            className={`group rounded-lg px-8 py-3 font-medium border border-cyan-500/50 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 backdrop-blur-sm transition-all duration-300 ${loading ? "opacity-60 cursor-not-allowed" : "hover:border-cyan-400/70"}`}
          >
            <span className="mr-2">{t.send}</span>
            <Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      </motion.form>
    </>
  );
}
