import { prisma } from '@/lib/db/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CreateCategoryDialog } from '@/components/admin/create-category-dialog'
import { CreateTagDialog } from '@/components/admin/create-tag-dialog'
import { Folder, Tag as TagIcon } from 'lucide-react'

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { posts: true },
      },
    },
    orderBy: {
      name: 'asc',
    },
  })

  const tags = await prisma.tag.findMany({
    include: {
      _count: {
        select: { posts: true },
      },
    },
    orderBy: {
      name: 'asc',
    },
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Categorías y Tags</h1>
        <p className="text-muted-foreground">
          Gestiona la organización de tu contenido
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Categorías */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Folder className="w-5 h-5" />
                <CardTitle>Categorías</CardTitle>
              </div>
              <CreateCategoryDialog />
            </div>
            <CardDescription>
              {categories.length} {categories.length === 1 ? 'categoría' : 'categorías'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {categories.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No hay categorías creadas aún
              </p>
            ) : (
              <div className="space-y-2">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-start justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="font-medium">{category.name}</div>
                      <div className="text-xs text-muted-foreground">
                        /{category.slug}
                      </div>
                      {category.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {category.description}
                        </p>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                      {category._count.posts} {category._count.posts === 1 ? 'post' : 'posts'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tags */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TagIcon className="w-5 h-5" />
                <CardTitle>Tags</CardTitle>
              </div>
              <CreateTagDialog />
            </div>
            <CardDescription>
              {tags.length} {tags.length === 1 ? 'tag' : 'tags'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {tags.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No hay tags creados aún
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <div
                    key={tag.id}
                    className="px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-full text-sm transition-colors cursor-default"
                    title={`Slug: ${tag.slug}`}
                  >
                    {tag.name} ({tag._count.posts})
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
