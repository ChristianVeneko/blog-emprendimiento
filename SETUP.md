# Guía de Instalación Paso a Paso

Esta guía te llevará desde cero hasta tener el CMS funcionando completamente.

## Paso 1: Instalación de Dependencias

```bash
npm install
```

## Paso 2: Configurar Base de Datos en Neon.tech

1. Ve a [https://neon.tech](https://neon.tech)
2. Crea una cuenta gratuita o inicia sesión
3. Haz clic en "Create a project"
4. Dale un nombre a tu proyecto (ej: "blog-emprendimiento")
5. Selecciona la región más cercana a ti
6. Copia la **Connection String** que se genera automáticamente
   - Se verá algo así: `postgresql://user:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require`

## Paso 3: Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

Edita el archivo `.env` y completa las siguientes variables:

### DATABASE_URL
Pega la connection string que copiaste de Neon.tech:
```env
DATABASE_URL="postgresql://user:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

### NEXTAUTH_URL
En desarrollo, usa:
```env
NEXTAUTH_URL="http://localhost:3000"
```

En producción, cambia a tu dominio:
```env
NEXTAUTH_URL="https://tu-dominio.com"
```

### NEXTAUTH_SECRET
Genera un secreto aleatorio ejecutando:

**En Linux/Mac:**
```bash
openssl rand -base64 32
```

**En Windows (PowerShell):**
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copia el resultado y pégalo en `.env`:
```env
NEXTAUTH_SECRET="tu-secret-aleatorio-aqui"
```

### Credenciales del Admin
Define las credenciales que usarás para acceder al CMS:
```env
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="admin123"
```

**⚠️ IMPORTANTE:** Cambia estas credenciales antes de subir a producción.

### BLOB_READ_WRITE_TOKEN (Opcional para desarrollo)
Si quieres subir imágenes, necesitas configurar Vercel Blob:

1. Ve a [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Crea un proyecto o selecciona uno existente
3. Ve a "Storage" → "Create Database" → "Blob"
4. Copia el token `BLOB_READ_WRITE_TOKEN`
5. Pégalo en tu `.env`:

```env
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_xxxxxxxx"
```

## Paso 4: Inicializar la Base de Datos

Ejecuta el siguiente comando para crear las tablas en la base de datos:

```bash
npx prisma db push
```

Deberías ver algo como:
```
✔ Generated Prisma Client
✔ Your database is now in sync with your Prisma schema
```

## Paso 5: Poblar la Base de Datos con Datos de Ejemplo

Ejecuta el seed script:

```bash
npm run db:seed
```

Esto creará:
- ✅ 1 usuario admin con tus credenciales
- ✅ 4 categorías (Emprendimiento, Marketing, Productividad, Finanzas)
- ✅ 8 tags
- ✅ 5 posts de ejemplo con contenido Markdown

## Paso 6: Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

El servidor se iniciará en: [http://localhost:3000](http://localhost:3000)

## Paso 7: Acceder al CMS

1. Abre tu navegador en [http://localhost:3000](http://localhost:3000)
2. Serás redirigido a `/blog` donde verás los posts de ejemplo
3. Para acceder al admin, ve a [http://localhost:3000/login](http://localhost:3000/login)
4. Ingresa las credenciales que definiste en `.env`:
   - Email: `admin@example.com` (o el que configuraste)
   - Contraseña: `admin123` (o la que configuraste)

## ¡Listo! 🎉

Ahora puedes:
- ✅ Ver el blog público en `/blog`
- ✅ Crear nuevos posts en `/admin/posts/new`
- ✅ Editar posts existentes
- ✅ Gestionar categorías y tags en `/admin/categories`
- ✅ Ver estadísticas en el dashboard `/admin/dashboard`

---

## Problemas Comunes

### Error: "Error: P1001: Can't reach database server"

**Solución:** Verifica que tu `DATABASE_URL` sea correcta y que Neon.tech esté funcionando.

### Error: "Invalid `prisma.user.create()` invocation"

**Solución:** Asegúrate de haber ejecutado `npx prisma db push` antes del seed.

### Error al hacer login: "Credenciales inválidas"

**Solución:**
1. Verifica que ejecutaste el seed correctamente
2. Asegúrate de usar las credenciales definidas en `.env`
3. Verifica que `NEXTAUTH_SECRET` esté configurado

### No puedo subir imágenes

**Solución:** Necesitas configurar `BLOB_READ_WRITE_TOKEN` en tu `.env` (ver Paso 3).

---

## Próximos Pasos

### Deploy a Producción (Vercel)

1. Sube tu código a GitHub
2. Ve a [https://vercel.com/new](https://vercel.com/new)
3. Importa tu repositorio
4. Configura las variables de entorno:
   - `DATABASE_URL`
   - `NEXTAUTH_URL` (tu dominio de producción)
   - `NEXTAUTH_SECRET`
   - `BLOB_READ_WRITE_TOKEN`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
5. Haz clic en "Deploy"
6. Una vez desplegado, ejecuta el seed en producción:
   - Ve a tu proyecto en Vercel
   - Project Settings → Functions
   - Agrega un script de deploy que ejecute el seed

### Configurar Dominio Personalizado

1. En Vercel, ve a tu proyecto
2. Settings → Domains
3. Agrega tu dominio
4. Actualiza `NEXTAUTH_URL` con tu dominio

---

## Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar en producción
npm start

# Ver base de datos con Prisma Studio
npx prisma studio

# Regenerar el cliente de Prisma
npx prisma generate

# Crear nueva migración
npm run db:migrate

# Push schema sin migración (desarrollo)
npm run db:push

# Ejecutar seed
npm run db:seed
```

---

¿Necesitas ayuda? Abre un issue en el repositorio.
