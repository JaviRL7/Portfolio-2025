// component/portfolio/comments/useStopModes.ts
import type { SyntheticEvent } from "react";

// Frená eventos SOLO cuando el target es input/textarea/contenteditable.
// No bloqueamos onClick de botones (así funciona “Ver más”).
export function useStopModes() {
  const stopIfTyping = (e: SyntheticEvent) => {
    const el = e.target as HTMLElement | null;
    if (el && (el.closest("input") || el.closest("textarea") || el.closest("[contenteditable='true']"))) {
      e.stopPropagation();
    }
  };

  return {
    // onClickCapture: stopIfTyping, // opcional: si querés, activalo
    onDoubleClickCapture: stopIfTyping,
    onKeyDownCapture: stopIfTyping,
  };
}
