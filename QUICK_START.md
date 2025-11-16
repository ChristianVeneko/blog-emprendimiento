# Quick Start Guide 🚀

## Setup en 5 Minutos

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar base de datos
1. Crea cuenta en [neon.tech](https://neon.tech)
2. Copia tu connection string
3. Crea `.env`:

```env
DATABASE_URL="tu-connection-string"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="genera-uno-con: openssl rand -base64 32"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="admin123"
```

### 3. Inicializar DB
```bash
npx prisma db push
npm run db:seed
```

### 4. Iniciar servidor
```bash
npm run dev
```

### 5. Acceder
- Blog: http://localhost:3000/blog
- Admin: http://localhost:3000/login
  - Email: admin@example.com
  - Password: admin123

---

## Comandos Esenciales

```bash
# Desarrollo
npm run dev                    # Iniciar servidor de desarrollo

# Base de datos
npx prisma studio             # Ver datos en UI
npx prisma db push            # Sync schema sin migración
npm run db:seed               # Poblar con datos de ejemplo

# Producción
npm run build                 # Build para producción
npm start                     # Iniciar en producción
```

---

## Estructura Rápida

```
app/
├── admin/          # Panel de administración (/admin/*)
├── blog/           # Blog público (/blog/*)
├── api/            # API endpoints
└── login/          # Login page

components/
├── ui/             # Componentes base
├── admin/          # Componentes del admin
└── blog/           # Componentes del blog

lib/
├── db/             # Prisma client
├── auth/           # NextAuth config
├── utils/          # Utilidades
└── validations/    # Schemas Zod
```

---

## Tareas Comunes

### Crear un nuevo post
1. Login en http://localhost:3000/login
2. Ve a "Posts" → "Nuevo Post"
3. Llena el formulario
4. Clic en "Publicar"

### Editar un post
1. Ve a "Posts"
2. Clic en el ícono de lápiz
3. Edita y guarda

### Ver el blog público
- Abre http://localhost:3000/blog

### Agregar categorías/tags
- Edita `prisma/seed.ts`
- Ejecuta `npm run db:seed`

---

## Deploy a Vercel

### Método 1: GitHub (Recomendado)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin tu-repo.git
git push -u origin main
```

Luego en Vercel:
1. Import from GitHub
2. Configura env variables
3. Deploy

### Método 2: Vercel CLI
```bash
npm i -g vercel
vercel
```

---

## Variables de Entorno en Producción

En Vercel, configura:

```
DATABASE_URL=tu-neon-production-url
NEXTAUTH_URL=https://tu-dominio.com
NEXTAUTH_SECRET=tu-secret-de-produccion
BLOB_READ_WRITE_TOKEN=tu-vercel-blob-token
ADMIN_EMAIL=admin@tudominio.com
ADMIN_PASSWORD=password-seguro-de-produccion
```

---

## Troubleshooting

### No puedo hacer login
- ✅ Verifica que ejecutaste el seed
- ✅ Usa las credenciales de `.env`
- ✅ Asegúrate que `NEXTAUTH_SECRET` está configurado

### Error de conexión a DB
- ✅ Verifica que `DATABASE_URL` sea correcto
- ✅ Asegúrate que incluye `?sslmode=require`
- ✅ Verifica que Neon.tech esté activo

### Errores de tipos TypeScript
```bash
npx prisma generate  # Regenera cliente de Prisma
```

### No se ven los estilos
```bash
npm run dev  # Reinicia el servidor
```

---

## Recursos

- 📖 [README.md](./README.md) - Documentación completa
- 🔧 [SETUP.md](./SETUP.md) - Guía paso a paso
- 🏗️ [ARCHITECTURE.md](./ARCHITECTURE.md) - Arquitectura del proyecto
- ✨ [FEATURES.md](./FEATURES.md) - Lista de características

---

## Próximos Pasos

1. ✅ Cambia las credenciales del admin
2. ✅ Personaliza los estilos en `app/globals.css`
3. ✅ Crea tus propias categorías
4. ✅ Escribe tu primer post
5. ✅ Deploy a producción

---

**¿Necesitas ayuda?** Consulta [SETUP.md](./SETUP.md) para instrucciones detalladas.
