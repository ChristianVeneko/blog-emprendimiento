import { prisma } from '@/lib/db/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate, getReadingTime } from '@/lib/utils/date'
import { parseMarkdown } from '@/lib/utils/markdown'
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  })

  if (!post) {
    return {
      title: 'Post no encontrado',
    }
  }

  return {
    title: post.metaTitle || `${post.title} | L.E.I.`,
    description: post.metaDescription || post.excerpt,
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      tags: true,
    },
  })

  if (!post || !post.published) {
    notFound()
  }

  const htmlContent = await parseMarkdown(post.content)
  const readingTime = getReadingTime(post.content)

  // Incrementar vistas
  await prisma.post.update({
    where: { id: post.id },
    data: { views: { increment: 1 } },
  })

  return (
    <article className="container max-w-4xl py-12">
      <Link href="/blog" className="inline-flex items-center mb-8 text-sm hover:text-primary">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver al blog
      </Link>

      <header className="space-y-6 mb-12">
        {post.category && (
          <Link
            href={`/blog/category/${post.category.slug}`}
            className="inline-block text-sm font-medium text-primary hover:underline"
          >
            {post.category.name}
          </Link>
        )}

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-xl text-muted-foreground">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {post.author && (
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {post.author}
            </div>
          )}
          {post.publishedAt && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishedAt, 'dd MMMM yyyy')}
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {readingTime} min de lectura
          </div>
          <div>{post.views} vistas</div>
        </div>

        {post.coverImage && (
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </header>

      <div
        className="prose dark:prose-invert max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {post.tags.length > 0 && (
        <div className="border-t pt-8">
          <h3 className="text-lg font-semibold mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/blog/tag/${tag.slug}`}
                className="px-3 py-1 bg-muted hover:bg-muted/80 rounded-full text-sm"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
