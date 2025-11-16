import { prisma } from '@/lib/db/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
        <Card>
          <CardHeader>
            <CardTitle>Categorías</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <div className="font-medium">{category.name}</div>
                    <div className="text-sm text-muted-foreground">
                      /{category.slug}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {category._count.posts} posts
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className="px-3 py-1 bg-muted rounded-full text-sm"
                >
                  {tag.name} ({tag._count.posts})
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
