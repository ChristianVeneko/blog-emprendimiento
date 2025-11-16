import { prisma } from '@/lib/db/prisma'
import { notFound } from 'next/navigation'
import { PostCard } from '@/components/blog/post-card'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tag = await prisma.tag.findUnique({
    where: { slug: params.slug },
  })

  if (!tag) {
    return { title: 'Tag no encontrado' }
  }

  return {
    title: `${tag.name} - Blog Emprendimiento`,
    description: `Artículos etiquetados con ${tag.name}`,
  }
}

export default async function TagPage({ params }: { params: { slug: string } }) {
  const tag = await prisma.tag.findUnique({
    where: { slug: params.slug },
  })

  if (!tag) {
    notFound()
  }

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      tags: {
        some: {
          id: tag.id,
        },
      },
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
        <div className="flex items-center gap-3">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            #{tag.name}
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          {posts.length} {posts.length === 1 ? 'artículo' : 'artículos'}
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No hay posts con este tag aún
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
