# Arquitectura del Proyecto

## Estructura de Directorios

```
blog-emprendimiento/
├── app/                          # App Router de Next.js 14
│   ├── api/                     # API Routes
│   │   ├── auth/                # NextAuth endpoints
│   │   ├── posts/               # CRUD de posts
│   │   ├── categories/          # CRUD de categorías
│   │   ├── tags/                # CRUD de tags
│   │   └── upload/              # Upload de imágenes a Vercel Blob
│   ├── admin/                   # Panel de administración
│   │   ├── dashboard/           # Dashboard con estadísticas
│   │   ├── posts/               # Gestión de posts
│   │   │   ├── [id]/edit/      # Editar post
│   │   │   └── new/            # Crear post
│   │   ├── categories/          # Gestión de categorías
│   │   └── layout.tsx           # Layout con sidebar
│   ├── blog/                    # Frontend público
│   │   ├── [slug]/             # Post individual
│   │   ├── category/[slug]/    # Posts por categoría
│   │   ├── tag/[slug]/         # Posts por tag
│   │   └── layout.tsx          # Layout con navbar
│   ├── login/                   # Página de login
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home (redirige a /blog)
├── components/
│   ├── ui/                      # Componentes UI base (shadcn/ui style)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── admin/                   # Componentes del admin
│   │   ├── editor/             # Editor de Markdown
│   │   └── post-form.tsx       # Formulario de post
│   ├── blog/                    # Componentes del blog público
│   │   └── post-card.tsx       # Card de post
│   └── shared/                  # Componentes compartidos
│       └── navbar.tsx          # Navbar del blog
├── lib/
│   ├── db/                      # Configuración de base de datos
│   │   └── prisma.ts           # Prisma client singleton
│   ├── auth/                    # Configuración de autenticación
│   │   └── auth-config.ts      # NextAuth config
│   ├── utils/                   # Utilidades
│   │   ├── cn.ts               # Merge de clases CSS
│   │   ├── date.ts             # Formateo de fechas
│   │   ├── markdown.ts         # Parser de Markdown
│   │   └── slug.ts             # Generación de slugs
│   └── validations/             # Schemas de validación
│       └── post.ts             # Validaciones con Zod
├── prisma/
│   ├── schema.prisma            # Schema de la base de datos
│   └── seed.ts                  # Seed script
├── types/
│   └── next-auth.d.ts          # Type definitions para NextAuth
└── middleware.ts                # Middleware para proteger rutas
```

## Flujo de Datos

### Autenticación

```
Usuario → /login
  → POST /api/auth/signin
    → NextAuth verifica credenciales
      → Consulta User en DB
        → Compara hash de password
          → Crea sesión JWT
            → Redirige a /admin/dashboard
```

### Crear Post

```
Admin → /admin/posts/new
  → Llena formulario (PostForm component)
    → Valida con Zod schema
      → POST /api/posts
        → Verifica sesión (getServerSession)
          → Valida datos
            → Crea post en DB con Prisma
              → Conecta categoría y tags
                → Retorna post creado
                  → Redirige a /admin/posts
```

### Ver Post Público

```
Usuario → /blog/[slug]
  → Server Component consulta DB
    → Prisma find post by slug
      → Verifica que esté publicado
        → Incrementa contador de vistas
          → Renderiza Markdown a HTML
            → SSR del componente
              → Envía HTML al cliente
```

## Patrones de Diseño

### Server Components vs Client Components

- **Server Components** (por defecto):
  - Páginas de blog público
  - Dashboard
  - Listados
  - Beneficio: SEO, menor JS al cliente

- **Client Components** ('use client'):
  - Formularios interactivos
  - Editor de Markdown
  - Login page
  - Componentes con hooks (useState, useEffect)

### Validación en Capas

1. **Frontend**: React Hook Form + Zod
2. **API Route**: Zod schema validation
3. **Database**: Prisma constraints

### Manejo de Errores

```typescript
try {
  // Operación
} catch (error) {
  console.error('Context:', error)
  return NextResponse.json(
    { error: 'User-friendly message' },
    { status: appropriate_code }
  )
}
```

## Base de Datos

### Relaciones

```
User (admin)
  │
  └── has many Posts
        │
        ├── belongs to one Category (optional)
        └── has many Tags (many-to-many)
```

### Índices

Los siguientes campos están indexados para mejor performance:

- `Post.slug` (unique)
- `Post.published`
- `Post.publishedAt`
- `Category.slug` (unique)
- `Tag.slug` (unique)

## API Routes

Todas las rutas de API siguen el patrón REST:

```
GET    /api/posts          → Listar posts (con query params para filtrar)
POST   /api/posts          → Crear post
GET    /api/posts/[id]     → Obtener un post
PATCH  /api/posts/[id]     → Actualizar post
DELETE /api/posts/[id]     → Eliminar post

GET    /api/categories     → Listar categorías
POST   /api/categories     → Crear categoría

GET    /api/tags           → Listar tags
POST   /api/tags           → Crear tag

POST   /api/upload         → Subir imagen a Vercel Blob
```

### Autenticación de API Routes

```typescript
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth-config'

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // ... resto del código
}
```

## Seguridad

### Implementado

- ✅ Passwords hasheados con bcrypt
- ✅ Sesiones JWT con NextAuth
- ✅ Middleware para proteger rutas /admin/*
- ✅ Validación de inputs con Zod
- ✅ SQL injection prevention (Prisma)
- ✅ CSRF protection (NextAuth)

### Recomendaciones Adicionales

- [ ] Rate limiting en API routes
- [ ] Sanitización de HTML en Markdown
- [ ] Content Security Policy headers
- [ ] HTTPS en producción (automático con Vercel)

## Performance

### Optimizaciones Implementadas

- **Imágenes**: Next.js Image component con lazy loading
- **Server Components**: Reduce JS enviado al cliente
- **Database queries**: Prisma con includes estratégicos
- **Caching**: Next.js automático en Server Components

### Recomendaciones

- [ ] Implementar ISR (Incremental Static Regeneration) para posts
- [ ] Cache de Prisma queries con Redis
- [ ] CDN para imágenes (Vercel Blob incluye CDN)
- [ ] Lazy loading de componentes pesados

## Escalabilidad

### Actual (Pequeña a Mediana Escala)

- **Base de datos**: Neon.tech (PostgreSQL serverless)
- **Hosting**: Vercel (serverless functions)
- **Storage**: Vercel Blob
- **Límites**: ~10K posts, ~1K requests/min

### Para Escalar

1. **Database**: Migrar a PostgreSQL dedicado (AWS RDS, Railway)
2. **Caching**: Redis para queries frecuentes
3. **CDN**: Cloudflare o similar
4. **Búsqueda**: Algolia o Elasticsearch
5. **Analytics**: Plausible o Google Analytics

## Testing

### Estructura Recomendada

```
__tests__/
├── unit/
│   ├── utils/
│   │   ├── slug.test.ts
│   │   ├── markdown.test.ts
│   │   └── date.test.ts
│   └── validations/
│       └── post.test.ts
├── integration/
│   └── api/
│       ├── posts.test.ts
│       └── auth.test.ts
└── e2e/
    ├── login.test.ts
    ├── create-post.test.ts
    └── public-blog.test.ts
```

### Herramientas Recomendadas

- **Unit tests**: Jest
- **Integration tests**: Jest + Supertest
- **E2E tests**: Playwright o Cypress

## Deployment

### Vercel (Recomendado)

1. Push a GitHub
2. Import en Vercel
3. Configura environment variables
4. Deploy automático

### Alternativas

- **Railway**: Soporta PostgreSQL + Next.js
- **Render**: Free tier generoso
- **DigitalOcean App Platform**: Más control
- **AWS Amplify**: Para AWS ecosystem

## Monitoreo

### Recomendado Implementar

- **Errors**: Sentry
- **Analytics**: Plausible / Vercel Analytics
- **Uptime**: UptimeRobot
- **Performance**: Vercel Speed Insights

---

## Convenciones de Código

### Naming

- **Componentes**: PascalCase (`PostCard.tsx`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE
- **Types/Interfaces**: PascalCase con sufijo (`PostFormData`)

### Imports

```typescript
// 1. React/Next
import { useState } from 'react'
import Link from 'next/link'

// 2. Externos
import { zodResolver } from '@hookform/resolvers/zod'

// 3. Internos (alias @/)
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/db/prisma'

// 4. Relativos
import { formatDate } from '../utils/date'
```

### Componentes

```typescript
// Props interface
interface ComponentProps {
  required: string
  optional?: number
}

// Component
export function Component({ required, optional = 0 }: ComponentProps) {
  // JSX
}
```

---

Esta arquitectura está diseñada para ser:
- ✅ **Mantenible**: Separación clara de responsabilidades
- ✅ **Escalable**: Fácil de extender con nuevas features
- ✅ **Segura**: Best practices de seguridad implementadas
- ✅ **Performante**: Optimizaciones desde el inicio
