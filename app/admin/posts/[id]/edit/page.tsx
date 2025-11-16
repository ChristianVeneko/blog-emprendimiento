import { prisma } from '@/lib/db/prisma'
import { PostForm } from '@/components/admin/post-form'
import { notFound } from 'next/navigation'

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const [post, categories, tags] = await Promise.all([
    prisma.post.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        tags: true,
      },
    }),
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
    prisma.tag.findMany({ orderBy: { name: 'asc' } }),
  ])

  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Editar Post</h1>
        <p className="text-muted-foreground">
          Actualiza el contenido de tu artículo
        </p>
      </div>

      <PostForm post={post} categories={categories} tags={tags} />
    </div>
  )
}
