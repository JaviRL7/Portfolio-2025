import type { ThemeColors, ThemeKey } from "./types";

export const THEMES: Record<ThemeKey, ThemeColors> = {
  default: {
    primary: "from-indigo-400 via-violet-500 to-fuchsia-500",
    secondary: "from-cyan-400 to-indigo-500",
    accent: 	"text-gray-100", 
    border: "border-violet-400/30 hover:border-fuchsia-400/60",
    bg: "bg-[#0b0f19]", // navy oscuro elegante
    cursor: "bg-fuchsia-400",
  },
  hacker: {
    primary: "from-emerald-400 via-lime-400 to-green-500",
    secondary: "from-green-500 to-emerald-600",
    accent: "text-emerald-300",
    border: "border-emerald-500/30 hover:border-lime-400/60",
    bg: "bg-[#07140e]", // verde oscuro profundo
    cursor: "bg-lime-400",
  },
  matrix: {
    primary: "from-green-300 via-emerald-400 to-lime-500",
    secondary: "from-emerald-500 to-green-700",
    accent: "text-green-300",
    border: "border-green-400/30 hover:border-lime-400/60",
    bg: "bg-[#020403]", // casi negro con tinte verde
    cursor: "bg-green-300",
  },
  retro: {
    primary: "from-amber-300 via-rose-400 to-fuchsia-500",
    secondary: "from-rose-500 to-fuchsia-600",
    accent: "text-rose-300",
    border: "border-rose-400/30 hover:border-fuchsia-400/60",
    bg: "bg-gradient-to-br from-[#1b0a12] to-[#2a0f1f]",
    cursor: "bg-rose-400",
  },
  cyberpunk: {
    primary: "from-fuchsia-500 via-violet-500 to-cyan-400",
    secondary: "from-violet-600 to-cyan-500",
    accent: "text-fuchsia-300",
    border: "border-fuchsia-500/30 hover:border-cyan-400/60",
    bg: "bg-gradient-to-br from-[#0a0014] to-[#00121c]", 
    cursor: "bg-cyan-400",
  },
  ocean: {
    primary: "from-teal-300 via-cyan-400 to-sky-500",
    secondary: "from-teal-500 to-sky-600",
    accent: "text-cyan-300",
    border: "border-cyan-500/30 hover:border-teal-400/60",
    bg: "bg-gradient-to-br from-[#061824] to-[#071a29]",
    cursor: "bg-cyan-400",
  },
  fire: {
    primary: "from-amber-400 via-orange-500 to-rose-500",
    secondary: "from-orange-600 to-rose-600",
    accent: "text-amber-300",
    border: "border-orange-500/30 hover:border-amber-400/60",
    bg: "bg-gradient-to-br from-[#190c07] to-[#2a0f0b]",
    cursor: "bg-amber-400",
  },
  rainbow: {
    primary: "from-rose-400 via-amber-300 via-emerald-300 via-sky-400 to-violet-400",
    secondary: "from-violet-500 to-sky-500",
    accent: "text-violet-300",
    border: "border-violet-500/30 hover:border-sky-400/60",
    bg: "bg-gradient-to-br from-[#0f0f1e] via-[#110c1b] to-[#0a1820]",
    cursor: "bg-violet-400",
  },
};

export const getCurrentTheme = (flags: {
  rainbowMode: boolean;
  retroMode: boolean;
  cyberpunkMode: boolean;
  oceanMode: boolean;
  fireMode: boolean;
  isHackerMode: boolean;
  matrixMode: boolean;
}): ThemeKey => {
  if (flags.rainbowMode) return "rainbow";
  if (flags.retroMode) return "retro";
  if (flags.cyberpunkMode) return "cyberpunk";
  if (flags.oceanMode) return "ocean";
  if (flags.fireMode) return "fire";
  if (flags.isHackerMode) return "hacker";
  if (flags.matrixMode) return "matrix";
  return "default";
};
