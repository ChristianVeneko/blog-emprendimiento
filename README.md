# Blog Emprendimiento - CMS

Sistema de gestión de contenidos (CMS) completo para blogs, construido con Next.js 14, Prisma, PostgreSQL y NextAuth.

## Características

- Panel de administración completo con dashboard
- Editor de Markdown con vista previa en tiempo real
- Gestión de posts, categorías y tags
- Autenticación segura con NextAuth.js
- Almacenamiento de imágenes con Vercel Blob
- Frontend público optimizado para lectura
- SEO-friendly
- Dark mode
- Responsive design
- Sintaxis highlighting para código

## Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL (Neon.tech)
- **ORM**: Prisma
- **Autenticación**: NextAuth.js
- **Estilos**: Tailwind CSS + shadcn/ui
- **Markdown**: Marked + Highlight.js
- **Validación**: Zod
- **Deploy**: Vercel

## Requisitos Previos

- Node.js 18+
- Una cuenta en [Neon.tech](https://neon.tech) (PostgreSQL gratuito)
- (Opcional) Una cuenta en [Vercel](https://vercel.com) para Blob Storage

## Instalación

### 1. Clonar el repositorio

\`\`\`bash
git clone <tu-repo>
cd blog-emprendimiento
\`\`\`

### 2. Instalar dependencias

\`\`\`bash
npm install
\`\`\`

### 3. Configurar variables de entorno

Copia el archivo de ejemplo y edítalo con tus credenciales:

\`\`\`bash
cp .env.example .env
\`\`\`

Edita `.env`:

\`\`\`env
# Database - Obtén esto de Neon.tech
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="genera-un-secret-aleatorio-aqui"

# Vercel Blob (opcional para desarrollo)
BLOB_READ_WRITE_TOKEN="tu-token-de-vercel-blob"

# Credenciales del admin (para el seed)
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="admin123"
\`\`\`

**Generar NEXTAUTH_SECRET:**

\`\`\`bash
openssl rand -base64 32
\`\`\`

### 4. Configurar la base de datos en Neon.tech

1. Ve a [Neon.tech](https://neon.tech) y crea una cuenta gratuita
2. Crea un nuevo proyecto
3. Copia la connection string que te proporciona
4. Pégala en tu `.env` como `DATABASE_URL`

### 5. Ejecutar migraciones de Prisma

\`\`\`bash
npx prisma db push
\`\`\`

### 6. Ejecutar el seed (datos de prueba)

\`\`\`bash
npm run db:seed
\`\`\`

Esto creará:
- 1 usuario admin
- 4 categorías
- 8 tags
- 5 posts de ejemplo

### 7. Iniciar el servidor de desarrollo

\`\`\`bash
npm run dev
\`\`\`

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Credenciales de Acceso

Usa las credenciales que configuraste en `.env`:

- **Email**: admin@example.com (o el que configuraste)
- **Contraseña**: admin123 (o la que configuraste)

## Rutas de la Aplicación

### Públicas
- `/` - Redirige a `/blog`
- `/blog` - Lista de posts publicados
- `/blog/[slug]` - Post individual
- `/blog/category/[slug]` - Posts por categoría
- `/blog/tag/[slug]` - Posts por tag

### Admin (requieren autenticación)
- `/login` - Página de login
- `/admin/dashboard` - Dashboard con estadísticas
- `/admin/posts` - Lista de todos los posts
- `/admin/posts/new` - Crear nuevo post
- `/admin/posts/[id]/edit` - Editar post
- `/admin/categories` - Gestión de categorías

## Configurar Vercel Blob (Opcional)

Para subir imágenes necesitas configurar Vercel Blob:

1. Ve a tu proyecto en Vercel
2. Ve a Storage → Create Database → Blob
3. Copia el token que te proporciona
4. Pégalo en `.env` como `BLOB_READ_WRITE_TOKEN`

## Comandos Útiles

\`\`\`bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar en producción
npm start

# Prisma Studio (UI para ver la DB)
npx prisma studio

# Generar el cliente de Prisma
npx prisma generate

# Crear una nueva migración
npm run db:migrate

# Push al schema sin migración
npm run db:push

# Ejecutar seed
npm run db:seed
\`\`\`

## Estructura del Proyecto

\`\`\`
blog-emprendimiento/
├── app/
│   ├── api/              # API routes
│   ├── admin/            # Panel de administración
│   ├── blog/             # Frontend público
│   ├── login/            # Página de login
│   └── layout.tsx        # Layout principal
├── components/
│   ├── ui/               # Componentes UI (shadcn/ui style)
│   ├── admin/            # Componentes del admin
│   ├── blog/             # Componentes del blog público
│   └── shared/           # Componentes compartidos
├── lib/
│   ├── db/               # Configuración de Prisma
│   ├── auth/             # Configuración de NextAuth
│   ├── utils/            # Utilidades
│   └── validations/      # Schemas de Zod
├── prisma/
│   ├── schema.prisma     # Schema de la base de datos
│   └── seed.ts           # Seed script
└── types/                # TypeScript types
\`\`\`

## Deploy a Producción

### Vercel (Recomendado)

1. Push tu código a GitHub
2. Importa el proyecto en Vercel
3. Configura las variables de entorno en Vercel
4. Deploy automático

### Otras plataformas

Este proyecto puede ser desplegado en cualquier plataforma que soporte Next.js:
- Railway
- Render
- AWS
- DigitalOcean

## Próximas Características

- [ ] Búsqueda full-text
- [ ] Contador de vistas
- [ ] Sitemap.xml automático
- [ ] RSS feed
- [ ] Open Graph images dinámicas
- [ ] Versionado de posts
- [ ] Comentarios

## Problemas Comunes

### Error de conexión a la base de datos

Verifica que:
- Tu `DATABASE_URL` sea correcta
- Incluya `?sslmode=require` al final
- Neon.tech esté activo

### Error de autenticación

- Verifica que `NEXTAUTH_SECRET` esté configurado
- Asegúrate de haber ejecutado el seed

### Error al subir imágenes

- Configura `BLOB_READ_WRITE_TOKEN`
- Verifica que Vercel Blob esté activo

## Licencia

MIT

## Contribuciones

Las contribuciones son bienvenidas. Por favor abre un issue primero para discutir los cambios.

---

Hecho con ❤️ para emprendedores
