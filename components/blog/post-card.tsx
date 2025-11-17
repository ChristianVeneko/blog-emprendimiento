import Link from 'next/link'
import Image from 'next/image'
import { formatDate, getReadingTime } from '@/lib/utils/date'
import { Calendar, Clock, User } from 'lucide-react'

interface PostCardProps {
  post: {
    slug: string
    title: string
    excerpt: string | null
    coverImage: string | null
    publishedAt: Date | null
    content: string
    author: string | null
    category: {
      name: string
      slug: string
    } | null
    tags: {
      name: string
      slug: string
    }[]
  }
}

export function PostCard({ post }: PostCardProps) {
  const readingTime = getReadingTime(post.content)

  return (
    <article className="group bg-background border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {post.coverImage && (
        <Link href={`/blog/${post.slug}`}>
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      )}

      <div className="p-6 space-y-3">
        {post.category && (
          <Link
            href={`/blog/category/${post.category.slug}`}
            className="inline-block text-xs font-medium text-primary hover:underline"
          >
            {post.category.name}
          </Link>
        )}

        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
            {post.title}
          </h2>
        </Link>

        {post.excerpt && (
          <p className="text-muted-foreground line-clamp-3">
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
              {formatDate(post.publishedAt, 'dd MMM yyyy')}
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {readingTime} min de lectura
          </div>
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Link
                key={tag.slug}
                href={`/blog/tag/${tag.slug}`}
                className="px-2 py-1 text-xs bg-muted rounded-full hover:bg-muted/80"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
