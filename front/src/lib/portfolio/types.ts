export type ThemeKey =
  | "default"
  | "hacker"
  | "matrix"
  | "retro"
  | "cyberpunk"
  | "ocean"
  | "fire"
  | "rainbow";

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  border: string;
  bg: string;
  cursor: string;
}

export interface Skill {
  name: {
    es: string;
    en: string;
  };
  level: number;
  icon: JSX.Element;
}

export interface ProjectItem {
  title: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  tech: string[];
  image: string;
  link: string;
}