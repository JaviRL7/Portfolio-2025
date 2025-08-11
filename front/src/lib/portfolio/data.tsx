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
    es: "eCommerce full stack para productos y accesorios para mascotas con panel de administración, pagos online y estadísticas en tiempo real.",
    en: "Full stack eCommerce for pet products and accessories with admin panel, online payments, and real-time statistics.",
  },
  tech: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "React Hook Form",
    "Formik",
    "Axios",
    "Swiper",
    "Recharts",
    "Node.js",
    "Express",
    "Prisma",
    "PostgreSQL",
    "MercadoPago SDK",
    "Cloudinary",
    "JWT",
    "Nodemailer",
    "Swagger"
  ],
  image: "/punkypet.png",
  link: "#",
},

  {
  title: { es: "KasApp", en: "KasApp" },
  description: {
    es: "Frontend de plataforma web para gestión de inmobiliarias con autenticación, dashboard y manejo visual de propiedades, desarrollado con Next.js, Tailwind CSS y múltiples integraciones.",
    en: "Frontend for a real estate management platform with authentication, dashboard, and visual property management, built with Next.js, Tailwind CSS, and multiple integrations.",
  },
  tech: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Axios",
    "React Hook Form",
    "Yup",
    "Formik",
    "Stripe.js",
    "JWT Decode",
    "Lucide React",
    "React Icons",
    "Swiper"
  ],
  image: "/Kasapp.png",
  link: "#",
},
  {
  title: { es: "ManzanaTech", en: "ManzanaTech" },
  description: {
    es: "Frontend de eCommerce especializado en productos Apple con carrito, checkout y gestión visual de productos, desarrollado con Next.js y Tailwind CSS.",
    en: "Frontend for an eCommerce specialized in Apple products with cart, checkout, and visual product management, built with Next.js and Tailwind CSS.",
  },
  tech: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Formik",
    "Yup",
    "Axios",
    "React Toastify",
    "Classnames"
  ],
  image: "/manzanatech.png",
  link: "#",
},
  {
  title: { es: "Trip Moon", en: "Trip Moon" },
  description: {
    es: "Proyecto full stack para reservar y gestionar viajes a la Luna, con frontend en Vite + React y backend en Node.js, Express y TypeORM conectado a PostgreSQL.",
    en: "Full stack project for booking and managing trips to the Moon, with a frontend in Vite + React and a backend in Node.js, Express, and TypeORM connected to PostgreSQL.",
  },
  tech: [
    "Vite",
    "React",
    "TypeScript",
    "React Router",
    "Axios",
    "Node.js",
    "Express",
    "TypeORM",
    "PostgreSQL"
  ],
  image: "/Tripmoon.png",
  link: "#",
},
];
