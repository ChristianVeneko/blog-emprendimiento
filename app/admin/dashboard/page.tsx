import { prisma } from '@/lib/db/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Eye, FolderOpen, Tag } from 'lucide-react'
import Link from 'next/link'
import { formatRelativeDate } from '@/lib/utils/date'

export default async function DashboardPage() {
  const [
    totalPosts,
    publishedPosts,
    draftPosts,
    totalCategories,
    totalTags,
    recentPosts,
  ] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { published: true } }),
    prisma.post.count({ where: { published: false } }),
    prisma.category.count(),
    prisma.tag.count(),
    prisma.post.findMany({
      take: 5,
      orderBy: { updatedAt: 'desc' },
      include: {
        category: true,
      },
    }),
  ])

  const stats = [
    {
      title: 'Total de Posts',
      value: totalPosts,
      icon: FileText,
      description: `${publishedPosts} publicados, ${draftPosts} borradores`,
    },
    {
      title: 'Categorías',
      value: totalCategories,
      icon: FolderOpen,
      description: 'Categorías activas',
    },
    {
      title: 'Tags',
      value: totalTags,
      icon: Tag,
      description: 'Tags disponibles',
    },
  ]

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Bienvenido al panel de administración
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Posts Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border rounded-lg hover:bg-muted/50 transition-colors gap-3"
              >
                <div className="space-y-1 min-w-0">
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="font-medium hover:underline block truncate"
                  >
                    {post.title}
                  </Link>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <span className="truncate">Actualizado {formatRelativeDate(post.updatedAt)}</span>
                    {post.category && (
                      <>
                        <span className="hidden sm:inline">•</span>
                        <span className="truncate">{post.category.name}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:shrink-0">
                  <span
                    className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
                      post.published
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}
                  >
                    {post.published ? 'Publicado' : 'Borrador'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
