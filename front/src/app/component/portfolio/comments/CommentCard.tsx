// component/portfolio/comments/CommentCard.tsx
"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { CommentItem, Theme } from "./types";
import { useLanguage } from "@/context/useLanguage";
import { STRINGS } from "./strings";

export default function CommentCard({ c, theme }: { c: CommentItem; theme: Theme }) {
  const [expanded, setExpanded] = useState(false);
  const { language } = useLanguage();
  const t = language === "es" ? STRINGS.es : STRINGS.en;

  const MAX_LENGTH = 80;
  const isLong = c.message.length > MAX_LENGTH;
  const displayText = !expanded && isLong ? c.message.slice(0, MAX_LENGTH).trim() + "…" : c.message;

  return (
    <Card
      className={`group h-full relative overflow-hidden rounded-2xl
      border ${theme.border} bg-white/[0.06] backdrop-blur-md
      ring-1 ring-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.12)]
      transition-all duration-300 hover:border-cyan-400/30 hover:ring-cyan-400/20`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-400/5 to-transparent" />
      <CardContent className="relative p-5">
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

        <p className="text-[0.95rem] text-white/90 leading-relaxed">
          <span aria-hidden className="mr-1 text-white/40">“</span>
          {displayText}
          <span aria-hidden className="ml-1 text-white/40">”</span>
        </p>

        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className={`mt-2 text-xs ${theme.accent} hover:underline focus:outline-none`}
          >
            {expanded ? t.less : t.more}
          </button>
        )}
      </CardContent>
    </Card>
  );
}
