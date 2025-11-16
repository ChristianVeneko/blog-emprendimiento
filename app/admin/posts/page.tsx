import { prisma } from '@/lib/db/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, Pencil } from 'lucide-react'
import { formatDate } from '@/lib/utils/date'
import { DeletePostDialog } from '@/components/admin/delete-post-dialog'

export default async function PostsListPage() {
  const posts = await prisma.post.findMany({
    include: {
      category: true,
      author: {
        select: {
          name: true,
          email: true,
        },
      },
      _count: {
        select: { tags: true },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Posts</h1>
          <p className="text-muted-foreground mt-1">
            Gestiona todos tus artículos
          </p>
        </div>
        <Link href="/admin/posts/new">
          <Button className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Post
          </Button>
        </Link>
      </div>

      {/* Mobile card view */}
      <div className="lg:hidden space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-background border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-medium truncate">{post.title}</h3>
                <p className="text-sm text-muted-foreground truncate">/{post.slug}</p>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full whitespace-nowrap shrink-0 ${
                  post.published
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}
              >
                {post.published ? 'Publicado' : 'Borrador'}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              {post.category && (
                <span className="truncate">{post.category.name}</span>
              )}
              <span>{post._count.tags} tags</span>
              <span>{formatDate(post.updatedAt, 'dd/MM/yyyy')}</span>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Link href={`/admin/posts/${post.id}/edit`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  <Pencil className="w-4 h-4 mr-2" />
                  Editar
                </Button>
              </Link>
              <DeletePostDialog postId={post.id} postTitle={post.title} />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table view */}
      <div className="hidden lg:block bg-background border rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left text-sm font-medium">Título</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Estado</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Categoría</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Tags</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Fecha</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b last:border-0 hover:bg-muted/50">
                  <td className="px-4 py-3">
                    <div className="font-medium">{post.title}</div>
                    <div className="text-sm text-muted-foreground">
                      /{post.slug}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        post.published
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}
                    >
                      {post.published ? 'Publicado' : 'Borrador'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {post.category?.name || '-'}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {post._count.tags} tags
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {formatDate(post.updatedAt, 'dd/MM/yyyy')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/posts/${post.id}/edit`}>
                        <Button variant="ghost" size="icon">
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </Link>
                      <DeletePostDialog postId={post.id} postTitle={post.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
