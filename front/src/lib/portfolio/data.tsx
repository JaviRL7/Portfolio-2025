import { Code, Rocket, Terminal, Database, Cpu, Layers } from "lucide-react";
import type { ProjectItem, Skill } from "./types";

export const skills: Skill[] = [
  {
    name: { es: "React", en: "React" },
    level: 95,
    icon: <Code className="w-6 h-6" />,
  },
  {
    name: { es: "Next.js", en: "Next.js" },
    level: 98,
    icon: <Rocket className="w-6 h-6" />,
  },
  {
    name: { es: "TypeScript", en: "TypeScript" },
    level: 96,
    icon: <Terminal className="w-6 h-6" />,
  },
  {
    name: { es: "Node.js", en: "Node.js" },
    level: 85,
    icon: <Database className="w-6 h-6" />,
  },
  {
    name: { es: "Prisma", en: "Prisma" },
    level: 88,
    icon: <Cpu className="w-6 h-6" />,
  },
  {
    name: { es: "PostgreSQL", en: "PostgreSQL" },
    level: 95,
    icon: <Database className="w-6 h-6" />,
  },
  {
    name: { es: "UI/UX", en: "UI/UX" },
    level: 92,
    icon: <Layers className="w-6 h-6" />,
  },
  {
    name: { es: "Tailwind CSS", en: "Tailwind CSS" },
    level: 95,
    icon: <Layers className="w-6 h-6" />,
  },
  {
    name: { es: "Docker", en: "Docker" },
    level: 65,
    icon: <Cpu className="w-6 h-6" />,
  },
  {
    name: { es: "API REST / Swagger", en: "REST API / Swagger" },
    level: 95,
    icon: <Code className="w-6 h-6" />,
  },
];

export const projects: ProjectItem[] = [
  {
    title: { es: "Punky Pet", en: "Punky Pet" },
    description: {
      es: "eCommerce completo para productos y accesorios para mascotas con panel admin, pasarelas de pago y estadísticas en tiempo real",
      en: "Full eCommerce for pet products and accessories with admin panel, payment gateways, and real-time statistics",
    },
    tech: ["Next.js", "TypeScript", "Node.js", "Prisma", "PostgreSQL", "Swagger", "Tailwind CSS"],
    image: "/punky-pet.png",
    link: "#",
  },
  {
    title: { es: "KasApp", en: "KasApp" },
    description: {
      es: "Frontend de plataforma web para gestión de inmobiliarias con autenticación, dashboard y manejo visual de propiedades",
      en: "Frontend for a real estate management platform with authentication, dashboard, and visual property management",
    },
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Docker", "Node.js", "Framer Motion"],
    image: "/kasapp.png",
    link: "#",
  },
  {
    title: { es: "ManzanaTech", en: "ManzanaTech" },
    description: {
      es: "Frontend de eCommerce especializado en productos Apple con carrito, checkout y gestión visual de productos",
      en: "Frontend for an eCommerce specialized in Apple products with cart, checkout, and visual product management",
    },
    tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image: "/manzanatech.png",
    link: "#",
  },
];
