import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...')

  // Crear usuario admin
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10)

  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@example.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      name: 'Admin',
      password: hashedPassword,
      role: 'admin',
    },
  })

  console.log('✅ Usuario admin creado:', admin.email)

  // Crear categorías
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'emprendimiento' },
      update: {},
      create: {
        name: 'Emprendimiento',
        slug: 'emprendimiento',
        description: 'Artículos sobre cómo emprender y crear negocios exitosos',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'marketing' },
      update: {},
      create: {
        name: 'Marketing Digital',
        slug: 'marketing',
        description: 'Estrategias de marketing digital para hacer crecer tu negocio',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'productividad' },
      update: {},
      create: {
        name: 'Productividad',
        slug: 'productividad',
        description: 'Tips y herramientas para mejorar tu productividad',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'finanzas' },
      update: {},
      create: {
        name: 'Finanzas',
        slug: 'finanzas',
        description: 'Gestión financiera y estrategias de inversión',
      },
    }),
  ])

  console.log('✅ Categorías creadas:', categories.length)

  // Crear tags
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { slug: 'startup' },
      update: {},
      create: { name: 'Startup', slug: 'startup' },
    }),
    prisma.tag.upsert({
      where: { slug: 'seo' },
      update: {},
      create: { name: 'SEO', slug: 'seo' },
    }),
    prisma.tag.upsert({
      where: { slug: 'redes-sociales' },
      update: {},
      create: { name: 'Redes Sociales', slug: 'redes-sociales' },
    }),
    prisma.tag.upsert({
      where: { slug: 'gestion-tiempo' },
      update: {},
      create: { name: 'Gestión del Tiempo', slug: 'gestion-tiempo' },
    }),
    prisma.tag.upsert({
      where: { slug: 'freelance' },
      update: {},
      create: { name: 'Freelance', slug: 'freelance' },
    }),
    prisma.tag.upsert({
      where: { slug: 'ecommerce' },
      update: {},
      create: { name: 'Ecommerce', slug: 'ecommerce' },
    }),
    prisma.tag.upsert({
      where: { slug: 'inversion' },
      update: {},
      create: { name: 'Inversión', slug: 'inversion' },
    }),
    prisma.tag.upsert({
      where: { slug: 'contenido' },
      update: {},
      create: { name: 'Marketing de Contenido', slug: 'contenido' },
    }),
  ])

  console.log('✅ Tags creados:', tags.length)

  // Crear posts de ejemplo
  const posts = [
    {
      title: 'Cómo Empezar tu Primer Negocio Online en 2024',
      slug: 'como-empezar-tu-primer-negocio-online-2024',
      content: `# Cómo Empezar tu Primer Negocio Online en 2024

Emprender en el mundo digital nunca ha sido más accesible. Con las herramientas y plataformas disponibles hoy en día, **cualquier persona con una idea y determinación puede lanzar su propio negocio online**.

## ¿Por qué emprender online?

El emprendimiento digital ofrece ventajas únicas:

- **Baja inversión inicial**: No necesitas una oficina física ni gran capital
- **Alcance global**: Tu negocio puede llegar a clientes en todo el mundo
- **Flexibilidad**: Trabaja desde donde quieras, cuando quieras
- **Escalabilidad**: Crece a tu ritmo sin límites físicos

## Pasos para Empezar

### 1. Identifica tu Nicho

Lo primero es encontrar un problema que puedas resolver. Pregúntate:

- ¿Qué me apasiona?
- ¿En qué soy bueno?
- ¿Qué necesita la gente?

### 2. Valida tu Idea

Antes de invertir tiempo y dinero, **valida que existe demanda**. Puedes:

- Crear una landing page y medir el interés
- Hacer encuestas en redes sociales
- Ofrecer preventa de tu producto o servicio

### 3. Construye tu Presencia Online

Tu sitio web es tu carta de presentación. Asegúrate de que sea:

\`\`\`typescript
// Ejemplo de componentes esenciales
const sitioWeb = {
  homepage: 'Clara y atractiva',
  productos: 'Bien descritos con imágenes',
  contacto: 'Fácil de encontrar',
  blog: 'Contenido de valor'
}
\`\`\`

### 4. Estrategia de Marketing

Sin clientes, no hay negocio. Algunas estrategias efectivas:

1. **SEO**: Optimiza para aparecer en Google
2. **Redes Sociales**: Conecta con tu audiencia
3. **Email Marketing**: Construye una lista de contactos
4. **Contenido de Valor**: Educa y atrae a tu público

## Conclusión

Emprender online es un viaje emocionante. No esperes a tener todo perfecto - **empieza hoy con lo que tienes** y mejora sobre la marcha.

> "El mejor momento para empezar fue ayer. El segundo mejor momento es ahora."

¿Listo para dar el salto? ¡Manos a la obra!`,
      excerpt: 'Guía completa para lanzar tu primer negocio digital con baja inversión y alto potencial de crecimiento.',
      published: true,
      publishedAt: new Date('2024-01-15'),
      categoryId: categories[0].id,
      tagIds: [tags[0].id, tags[5].id],
      metaTitle: 'Cómo Empezar tu Negocio Online en 2024 - Guía Completa',
      metaDescription: 'Aprende paso a paso cómo lanzar tu primer negocio online con esta guía completa. Desde la idea hasta las primeras ventas.',
    },
    {
      title: '10 Estrategias de SEO que Aumentarán tu Tráfico en 90 Días',
      slug: '10-estrategias-seo-aumentar-trafico-90-dias',
      content: `# 10 Estrategias de SEO que Aumentarán tu Tráfico en 90 Días

El **SEO (Search Engine Optimization)** es una de las formas más efectivas de conseguir tráfico orgánico y gratuito a largo plazo.

## ¿Por qué el SEO es importante?

- El 93% de las experiencias online comienzan con un buscador
- El 75% de los usuarios nunca pasa de la primera página
- El tráfico orgánico tiene mejor tasa de conversión que el de pago

## Las 10 Estrategias

### 1. Investigación de Palabras Clave

Usa herramientas como:
- Google Keyword Planner
- Ahrefs
- SEMrush

### 2. Optimiza tus Títulos y Descripciones

Los meta tags son cruciales para el CTR.

### 3. Contenido de Calidad

Escribe artículos de más de 1500 palabras que resuelvan problemas reales.

### 4. Enlaces Internos

Conecta tu contenido de forma estratégica.

### 5. Velocidad de Carga

Un sitio rápido mejora el ranking y la experiencia del usuario.

### 6. Mobile-First

Más del 60% del tráfico viene de móviles.

### 7. Backlinks de Calidad

Los enlaces de sitios autorizados mejoran tu autoridad.

### 8. Contenido Actualizado

Revisa y actualiza tus artículos antiguos.

### 9. Schema Markup

Ayuda a Google a entender mejor tu contenido.

### 10. Experiencia del Usuario

Google premia los sitios que retienen usuarios.

## Conclusión

El SEO es un juego de paciencia. **Implementa estas estrategias consistentemente** y verás resultados en 90 días.`,
      excerpt: 'Descubre las estrategias de SEO más efectivas para multiplicar tu tráfico orgánico en menos de 3 meses.',
      published: true,
      publishedAt: new Date('2024-01-20'),
      categoryId: categories[1].id,
      tagIds: [tags[1].id, tags[7].id],
      metaTitle: '10 Estrategias de SEO Efectivas para 2024',
      metaDescription: '10 técnicas probadas de SEO que aumentarán tu tráfico orgánico significativamente en solo 90 días.',
    },
    {
      title: 'Productividad para Emprendedores: El Método Pomodoro',
      slug: 'productividad-emprendedores-metodo-pomodoro',
      content: `# Productividad para Emprendedores: El Método Pomodoro

Como emprendedor, el tiempo es tu recurso más valioso. El **Método Pomodoro** puede revolucionar tu productividad.

## ¿Qué es el Método Pomodoro?

Es una técnica de gestión del tiempo creada por Francesco Cirillo en los años 80. Se basa en trabajar en intervalos de 25 minutos con descansos cortos.

## Cómo Funciona

1. **Elige una tarea**
2. **Trabaja 25 minutos** (1 pomodoro)
3. **Descansa 5 minutos**
4. **Cada 4 pomodoros**, descansa 15-30 minutos

## Beneficios

- ✅ Mejora el enfoque
- ✅ Reduce la procrastinación
- ✅ Previene el burnout
- ✅ Aumenta la conciencia del tiempo

## Herramientas Recomendadas

- **Forest**: Gamifica el proceso
- **Tomato Timer**: Simple y efectivo
- **Focus To-Do**: Combina pomodoros con to-do lists

## Mi Experiencia

Desde que uso Pomodoro, **mi productividad aumentó un 40%**. Lo clave es ser estricto con los descansos.

> "Trabaja con tu mente, no contra ella."

Pruébalo por una semana y cuéntame qué tal te va.`,
      excerpt: 'Aprende a usar el Método Pomodoro para maximizar tu productividad y evitar el agotamiento mental.',
      published: true,
      publishedAt: new Date('2024-01-25'),
      categoryId: categories[2].id,
      tagIds: [tags[3].id],
      metaTitle: 'Método Pomodoro: Guía Completa para Emprendedores',
      metaDescription: 'Descubre cómo el Método Pomodoro puede transformar tu productividad como emprendedor. Guía práctica con ejemplos.',
    },
    {
      title: 'Freelancing: Cómo Conseguir tus Primeros Clientes',
      slug: 'freelancing-conseguir-primeros-clientes',
      content: `# Freelancing: Cómo Conseguir tus Primeros Clientes

Uno de los mayores desafíos al empezar como freelancer es **conseguir los primeros clientes**. Aquí te comparto estrategias que funcionan.

## Plataformas para Empezar

### Internacionales
- Upwork
- Fiverr
- Toptal (para expertos)

### Latinoamérica
- Workana
- Freelancer.com

## Estrategias para Destacar

### 1. Portfolio Impecable

Aunque no tengas clientes, puedes crear proyectos de muestra que demuestren tu habilidad.

### 2. Perfil Optimizado

- Foto profesional
- Descripción clara de tus servicios
- Portfolio visible
- Testimonios (aunque sean de proyectos personales)

### 3. Propuestas Personalizadas

**Nunca uses templates genéricos**. Lee bien lo que el cliente necesita y ofrece una solución específica.

### 4. Precios Competitivos al Inicio

No te regales, pero sé realista. Puedes empezar un poco más bajo para construir reputación.

## Más Allá de las Plataformas

- **LinkedIn**: Optimiza tu perfil y comparte contenido
- **Networking**: Asiste a eventos de tu industria
- **Referidos**: Tus primeros clientes pueden traer más

## Errores a Evitar

❌ Aplicar a trabajos sin leer bien
❌ Cobrar demasiado bajo por demasiado tiempo
❌ No tener contratos claros
❌ Mala comunicación con el cliente

## Conclusión

Conseguir los primeros clientes requiere esfuerzo y paciencia. **La clave es ser consistente y profesional desde el día uno**.`,
      excerpt: 'Guía práctica para freelancers principiantes sobre cómo conseguir y retener tus primeros clientes.',
      published: true,
      publishedAt: new Date('2024-02-01'),
      categoryId: categories[0].id,
      tagIds: [tags[4].id],
      metaTitle: 'Cómo Conseguir Clientes como Freelancer Principiante',
      metaDescription: 'Estrategias efectivas para conseguir tus primeros clientes como freelancer. Plataformas, tips y errores a evitar.',
    },
    {
      title: 'E-commerce 2024: Tendencias que Debes Conocer',
      slug: 'ecommerce-2024-tendencias',
      content: `# E-commerce 2024: Tendencias que Debes Conocer

El comercio electrónico evoluciona constantemente. Estas son las **tendencias que dominarán el 2024**.

## 1. Social Commerce

Las redes sociales se convierten en tiendas. Instagram Shopping y TikTok Shop lideran.

## 2. Personalización con IA

Los clientes esperan experiencias únicas. La IA ayuda a:
- Recomendaciones de productos
- Chat bots inteligentes
- Emails personalizados

## 3. Sostenibilidad

Los consumidores prefieren marcas eco-friendly.

## 4. Realidad Aumentada

Probar productos virtualmente antes de comprar.

## 5. Pagos Flexibles

Buy Now, Pay Later (BNPL) aumenta conversiones.

## Cómo Adaptarte

1. **Invierte en contenido de calidad**
2. **Optimiza para móvil**
3. **Mejora tu logística**
4. **Escucha a tus clientes**

El e-commerce del futuro es **personal, sostenible y omnicanal**.`,
      excerpt: 'Las principales tendencias de comercio electrónico que transformarán el mercado en 2024.',
      published: true,
      publishedAt: new Date('2024-02-05'),
      categoryId: categories[1].id,
      tagIds: [tags[5].id, tags[2].id],
      metaTitle: 'Tendencias de E-commerce 2024: Guía Completa',
      metaDescription: 'Descubre las tendencias de e-commerce que dominarán 2024 y cómo aplicarlas en tu negocio online.',
    },
  ]

  for (const postData of posts) {
    const { tagIds, ...data } = postData
    await prisma.post.upsert({
      where: { slug: data.slug },
      update: {},
      create: {
        ...data,
        authorId: admin.id,
        tags: {
          connect: tagIds.map(id => ({ id })),
        },
      },
    })
  }

  console.log('✅ Posts creados:', posts.length)
  console.log('✨ Seed completado exitosamente!')
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
