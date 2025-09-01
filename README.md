# 💼 Portfolio Personal

Un portfolio moderno y dinámico construido con tecnologías de vanguardia, que incluye un sistema de comentarios interactivo, múltiples temas visuales y efectos de partículas envolventes.

## 🚀 Características Principales

- ✨ **Interfaz Moderna**: Diseño responsive con animaciones fluidas usando Framer Motion
- 🎨 **Múltiples Temas**: Sistema de temas dinámicos con diferentes estilos visuales
- 💬 **Sistema de Comentarios**: Funcionalidad completa para dejar comentarios y feedback
- 🌟 **Efectos Visuales**: Partículas interactivas y animaciones envolventes
- 📱 **Responsive Design**: Optimizado para todos los dispositivos
- 🔧 **Full Stack**: Frontend en Next.js y Backend en Express con base de datos
- 🚀 **Deploy Automático**: Configurado para despliegue en Vercel

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 15** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS 4** - Framework de estilos
- **Framer Motion** - Animaciones y transiciones
- **Radix UI** - Componentes accesibles
- **Lucide React** - Iconografía moderna
- **React Hot Toast** - Notificaciones

### Backend
- **Express.js** - Framework web para Node.js
- **TypeScript** - Desarrollo tipado
- **Prisma** - ORM moderno para base de datos
- **Zod** - Validación de esquemas
- **Helmet** - Seguridad HTTP
- **CORS** - Control de acceso entre dominios
- **Nodemailer** - Envío de emails

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **Autoprefixer** - Prefijos CSS automáticos
- **ts-node-dev** - Desarrollo con recarga automática

## 📁 Estructura del Proyecto

```
Portfolio/
├── front/                  # Aplicación Next.js
│   ├── src/
│   │   ├── app/           # App Router de Next.js
│   │   ├── components/    # Componentes reutilizables
│   │   ├── context/       # Contextos de React
│   │   ├── lib/          # Utilidades y configuraciones
│   │   └── service/      # Servicios API
│   └── package.json
├── backend/               # API Express
│   ├── src/
│   │   ├── controller/   # Controladores de rutas
│   │   ├── middleware/   # Middlewares personalizados
│   │   ├── routes/       # Definición de rutas
│   │   ├── schema/       # Esquemas de validación
│   │   └── services/     # Lógica de negocio
│   └── package.json
├── vercel.json           # Configuración de despliegue
└── nixpacks.toml        # Configuración de contenedor
```

## 🚀 Instalación y Desarrollo

### Requisitos Previos
- Node.js 18.x o superior
- npm o yarn

### Configuración del Proyecto

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd Portfolio
   ```

2. **Instalar dependencias del Frontend**
   ```bash
   cd front
   npm install
   ```

3. **Instalar dependencias del Backend**
   ```bash
   cd backend
   npm install
   ```

4. **Configurar la base de datos**
   ```bash
   cd backend
   npx prisma migrate dev
   npx prisma generate
   ```

### Comandos de Desarrollo

#### Frontend (Next.js)
```bash
cd front
npm run dev        # Desarrollo en http://localhost:3000
npm run build      # Construir para producción
npm run start      # Iniciar en modo producción
npm run lint       # Ejecutar linting
```

#### Backend (Express)
```bash
cd backend
npm run dev        # Desarrollo con recarga automática
npm run build      # Compilar TypeScript
npm run start      # Iniciar servidor compilado
npm run migrate:dev    # Aplicar migraciones en desarrollo
npm run migrate:deploy # Aplicar migraciones en producción
```

## 🌍 Despliegue

### Vercel (Recomendado)

El proyecto está configurado para desplegarse automáticamente en Vercel:

1. Conecta tu repositorio a Vercel
2. El archivo `vercel.json` se encarga de la configuración
3. El frontend se despliega automáticamente
4. Configura las variables de entorno necesarias

### Variables de Entorno

Crea un archivo `.env.local` en la carpeta `front` y `.env` en la carpeta `backend` con las variables necesarias para tu configuración específica.

## 🎨 Personalización

### Temas
Los temas se pueden personalizar en `/front/src/lib/portfolio/themes.ts`. Cada tema incluye:
- Colores de fondo y texto
- Efectos de cursor
- Estilos de borde y degradados

### Datos del Portfolio
Actualiza tu información personal en `/front/src/lib/portfolio/data.ts`:
- Información personal
- Proyectos
- Habilidades
- Experiencia educativa

## 🔧 Funcionalidades Técnicas

- **SSR/SSG**: Renderizado del lado del servidor con Next.js
- **API Routes**: Endpoints RESTful con Express
- **Validación**: Esquemas Zod para validación de datos
- **Seguridad**: Implementación de medidas de seguridad HTTP
- **Performance**: Optimizaciones de rendimiento y carga
- **Accesibilidad**: Componentes accesibles con Radix UI

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

---

⭐ Si te gusta este proyecto, ¡no olvides darle una estrella!
