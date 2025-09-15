import { Code, Rocket, Terminal, Database, Cpu, Layers } from "lucide-react";
import { 
  SiPython, 
  SiJavascript, 
  SiReact, 
  SiPhp, 
  SiOpenjdk, 
  SiPostgresql, 
  SiLaravel, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss,
  SiFastapi,
  SiSqlite,
  SiVite
} from "react-icons/si";
import type { ProjectItem, Skill } from "./types";

export const skills: Skill[] = [
  {
    name: { es: "Python", en: "Python" },
    level: 92,
    icon: <SiPython className="w-6 h-6 text-blue-400" />,
  },
  {
    name: { es: "JavaScript", en: "JavaScript" },
    level: 88,
    icon: <SiJavascript className="w-6 h-6 text-yellow-400" />,
  },
  {
    name: { es: "React", en: "React" },
    level: 85,
    icon: <SiReact className="w-6 h-6 text-cyan-400" />,
  },
  {
    name: { es: "PHP", en: "PHP" },
    level: 90,
    icon: <SiPhp className="w-6 h-6 text-purple-400" />,
  },
  {
    name: { es: "Java", en: "Java" },
    level: 78,
    icon: <img src="/java-icon.svg" alt="Java" className="w-6 h-6" />,
  },
  {
    name: { es: "PostgreSQL", en: "PostgreSQL" },
    level: 87,
    icon: <SiPostgresql className="w-6 h-6 text-blue-500" />,
  },
  {
    name: { es: "Laravel", en: "Laravel" },
    level: 82,
    icon: <SiLaravel className="w-6 h-6 text-red-500" />,
  },
  {
    name: { es: "Next.js", en: "Next.js" },
    level: 79,
    icon: <SiNextdotjs className="w-6 h-6 text-white" />,
  },
  {
    name: { es: "TypeScript", en: "TypeScript" },
    level: 81,
    icon: <SiTypescript className="w-6 h-6 text-blue-600" />,
  },
  {
    name: { es: "Tailwind CSS", en: "Tailwind CSS" },
    level: 86,
    icon: <SiTailwindcss className="w-6 h-6 text-cyan-500" />,
  },
  {
    name: { es: "Machine Learning", en: "Machine Learning" },
    level: 74,
    icon: <Cpu className="w-6 h-6" />,
  },
];

export const projects: ProjectItem[] = [
  {
  title: { es: "Gunlim", en: "Gunlim" },
  description: {
    es: "Web dedicada a la escena competitiva de League of Legends. Funcionalidades: estadísticas de jugadores y equipos, valoración post-partida, foros, panel de moderación y gestión de contenido.",
    en: "Website dedicated to the competitive League of Legends scene. Features: player and team statistics, post-game rating, forums, moderation panel and content management.",
  },
  tech: [
    "PHP",
    "CSS",
    "HTML",
    "JavaScript",
    "Hack",
    "Laravel"
  ],
  image: "/gunlim.jpeg",
  link: "https://github.com/JaviRL7/Arena",
},

  {
  title: { es: "NBA 3X3", en: "NBA 3X3" },
  description: {
    es: "Juego web de tablero 3x3 con jugadores que pasaron por dos equipos distintos. API: balldontlie.io. Backend en Express para peticiones.",
    en: "3x3 web board game with players who played for two different teams. API: balldontlie.io. Express backend for requests.",
  },
  tech: [
    "React",
    "Tailwind CSS",
    "TypeScript",
    "CSS",
    "JavaScript",
    "HTML",
    "Express"
  ],
  image: "/nba.jpeg",
  images: ["/nba.jpeg", "/NBA2.png", "/NBA3.png"],
  link: "https://github.com/JaviRL7/NBA",
},
  {
  title: { es: "Temperatura API", en: "Temperatura API" },
  description: {
    es: "App del clima fusionada con mini-portfolio visual. Funciones: consumo de APIs, descarga de CV, UI dinámica responsive, cambios visuales según clima, animaciones.",
    en: "Weather app merged with visual mini-portfolio. Functions: API consumption, CV download, responsive dynamic UI, visual changes based on weather, animations.",
  },
  tech: [
    "TypeScript",
    "JavaScript",
    "CSS",
    "HTML"
  ],
  image: "/Temperatura.PNG",
  link: "https://github.com/JaviRL7/Temperatura",
},
  {
  title: { es: "BOT-OPOS", en: "BOT-OPOS" },
  description: {
    es: "Asistente conversacional con Python y modelos de lenguaje. Funciones: subir PDFs, generar resúmenes, crear tests tipo examen. Enfoque en estudiantes de oposiciones.",
    en: "Conversational assistant with Python and language models. Functions: upload PDFs, generate summaries, create exam-type tests. Focus on competitive exam students.",
  },
  tech: [
    "Python"
  ],
  image: "/BOTOPOS.PNG",
  link: "https://github.com/JaviRL7/BOT-opos",
},
  {
  title: { es: "Doña Araña e-commerce", en: "Doña Araña e-commerce" },
  description: {
    es: "Tienda online para un negocio de lanas y manualidades. Funcionalidades: sistema de compras, gestión de pedidos, panel de administración, apartados personalizados para clientes.",
    en: "Online store for a yarn and crafts business. Features: shopping system, order management, admin panel, customized sections for customers.",
  },
  tech: [
    "Next.js",
    "TypeScript",
    "CSS",
    "JavaScript"
  ],
  image: "/tienda.png",
  link: "https://github.com/JaviRL7/Tienda2025",
},
  {
  title: { es: "Daltonismo", en: "Daltonismo" },
  description: {
    es: "Juego web para comprobar el daltonismo y juego de identificación de colores. Funcionalidades: pruebas de percepción cromática, ejercicios para diferenciar colores, y herramientas de diagnóstico visual.",
    en: "Web game to test color blindness and color identification game. Features: chromatic perception tests, color differentiation exercises, and visual diagnostic tools.",
  },
  tech: [
    "JavaScript",
    "CSS",
    "HTML"
  ],
  image: "/Daltonismo.PNG",
  link: "https://github.com/JaviRL7/Daltonismo",
},
  {
  title: { es: "Contabilidad Doña Araña", en: "Contabilidad Doña Araña" },
  description: {
    es: "Dedicado a mi madre y a todos los pequeños comerciantes. Sistema de contabilidad simple y automático enfocado en facilidad de uso para personas de mediana edad. Incluye historial de movimientos, búsqueda inteligente, gestión de etiquetas, gastos recurrentes, análisis con gráficos interactivos y calendario financiero.",
    en: "Dedicated to my mother and all small merchants. Simple and automatic accounting system focused on ease of use for middle-aged people. Includes transaction history, smart search, tag management, recurring expenses, analysis with interactive charts and financial calendar.",
  },
  tech: [
    "React",
    "TypeScript", 
    "FastAPI",
    "Python",
    "SQLite",
    "Tailwind CSS",
    "Vite"
  ],
  image: "/c1.PNG",
  images: ["/c1.PNG", "/c2.PNG", "/c3.PNG", "/c4.PNG", "/c5.PNG", "/c6.PNG", "/c7.PNG", "/c8.PNG"],
  link: "https://github.com/JaviRL7/Contabilidad-DA",
},
];
