# 🚀 Guía de Despliegue - Portfolio

## Opción Recomendada: Vercel + Railway

### 1. **Desplegar Backend en Railway**

1. **Subir código a GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Configurar Railway:**
   - Ve a [railway.app](https://railway.app)
   - "New Project" → "Deploy from GitHub repo"
   - Selecciona tu repositorio
   - **Configuración importante:**
     - Root Directory: `/backend`
     - Build Command: `npm run build`
     - Start Command: `npm run start`

3. **Variables de entorno en Railway:**
   ```env
   DATABASE_URL=[Railway te dará una PostgreSQL automáticamente]
   PORT=3000
   OWNER_EMAIL=jrlsanlucar11@gmail.com
   ```

4. **Copiar la URL de Railway** (ej: `https://tu-proyecto.railway.app`)

### 2. **Desplegar Frontend en Vercel**

1. **Configurar variables de entorno en Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - "New Project" → Importa desde GitHub
   - **Configuración:**
     - Root Directory: `/front`
     - Build Command: `npm run build`
     - Output Directory: `.next`

2. **Variables de entorno en Vercel:**
   ```env
   NEXT_PUBLIC_API_URL=https://tu-proyecto.railway.app
   ```

### 3. **Alternativa: Todo en Railway**

1. **Backend:**
   - Root Directory: `/backend`
   
2. **Frontend:**
   - Root Directory: `/front`
   - Variables: `NEXT_PUBLIC_API_URL=https://tu-backend.railway.app`

## 📋 Checklist de Despliegue

- [ ] Código subido a GitHub
- [ ] Backend desplegado en Railway
- [ ] Base de datos PostgreSQL configurada
- [ ] Variables de entorno del backend configuradas
- [ ] Frontend desplegado en Vercel/Railway
- [ ] Variable `NEXT_PUBLIC_API_URL` configurada
- [ ] Probar formulario de comentarios
- [ ] Dominio personalizado (opcional)

## 🔧 Comandos útiles

```bash
# Desarrollo local
npm run dev          # Frontend
npm run dev          # Backend

# Producción
npm run build        # Construir para producción
npm run start        # Iniciar servidor de producción
```