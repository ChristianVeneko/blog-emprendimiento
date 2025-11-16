import { prisma } from '@/lib/db/prisma'
import { notFound } from 'next/navigation'
import { PostCard } from '@/components/blog/post-card'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
  })

  if (!category) {
    return { title: 'Categoría no encontrada' }
  }

  return {
    title: `${category.name} - Blog Emprendimiento`,
    description: category.description || `Artículos sobre ${category.name}`,
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
  })

  if (!category) {
    notFound()
  }

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      categoryId: category.id,
    },
    include: {
      category: true,
      tags: true,
    },
    orderBy: {
      publishedAt: 'desc',
    },
  })

  return (
    <div className="container py-12">
      <Link href="/blog" className="inline-flex items-center mb-8 text-sm hover:text-primary">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver al blog
      </Link>

      <div className="space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {category.name}
        </h1>
        {category.description && (
          <p className="text-xl text-muted-foreground">
            {category.description}
          </p>
        )}
        <p className="text-sm text-muted-foreground">
          {posts.length} {posts.length === 1 ? 'artículo' : 'artículos'}
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No hay posts en esta categoría aún
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
