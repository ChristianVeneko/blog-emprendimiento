import { prisma } from '@/lib/db/prisma'
import { PostForm } from '@/components/admin/post-form'

export default async function NewPostPage() {
  const [categories, tags] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
    prisma.tag.findMany({ orderBy: { name: 'asc' } }),
  ])

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Nuevo Post</h1>
        <p className="text-muted-foreground mt-1">
          Crea un nuevo artículo para tu blog
        </p>
      </div>

      <PostForm categories={categories} tags={tags} />
    </div>
  )
}
