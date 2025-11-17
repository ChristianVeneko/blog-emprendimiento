import { prisma } from '@/lib/db/prisma'
import { PostCard } from '@/components/blog/post-card'
import Link from 'next/link'

export const metadata = {
  title: 'L.E.I. - Liderar, Ejecutar, Inspirar',
  description: 'Desarrolla las tres dimensiones del liderazgo en ingeniería: Liderar con visión estratégica clara, Ejecutar proyectos que importan, Inspirar equipos de alto rendimiento',
}

export default async function BlogPage() {
  const [featuredPost, posts, categories] = await Promise.all([
    prisma.post.findFirst({
      where: {
        published: true,
        featured: true,
      },
      include: {
        category: true,
        tags: true,
      },
      orderBy: {
        publishedAt: 'desc',
      },
    }),
    prisma.post.findMany({
      where: {
        published: true,
      },
      include: {
        category: true,
        tags: true,
      },
      orderBy: {
        publishedAt: 'desc',
      },
    }),
    prisma.category.findMany({
      include: {
        _count: {
          select: {
            posts: {
              where: {
                published: true,
              },
            },
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    }),
  ])

  // Filtrar el artículo destacado de la lista de posts
  const regularPosts = featuredPost
    ? posts.filter(post => post.id !== featuredPost.id)
    : posts

  return (
    <div className="container py-12">
      <div className="space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          L.E.I. - Liderar, Ejecutar, Inspirar
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Desarrolla las tres dimensiones del liderazgo en ingeniería: 
          Liderar con visión estratégica clara, Ejecutar proyectos que importan, 
          Inspirar equipos de alto rendimiento.
        </p>
      </div>

      {featuredPost && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Artículo Destacado</h2>
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/20 rounded-lg p-1">
            <PostCard post={featuredPost} />
          </div>
        </div>
      )}

      {categories.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Categorías</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Todas
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/blog/category/${category.slug}`}
                className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-full text-sm font-medium transition-colors"
              >
                {category.name} ({category._count.posts})
              </Link>
            ))}
          </div>
        </div>
      )}

      {regularPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No hay posts publicados aún
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {regularPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
