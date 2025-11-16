import { prisma } from '@/lib/db/prisma'
import { PostCard } from '@/components/blog/post-card'
import Link from 'next/link'

export const metadata = {
  title: 'Blog Emprendimiento - Artículos sobre negocios y startups',
  description: 'Descubre artículos sobre emprendimiento, marketing digital, productividad y finanzas',
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
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

  return (
    <div className="container py-12">
      <div className="space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Blog de Emprendimiento
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Artículos, guías y recursos para emprendedores y creadores de negocios
        </p>
      </div>

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

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No hay posts publicados aún
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
