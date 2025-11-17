import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth-config'
import { prisma } from '@/lib/db/prisma'
import { postSchema } from '@/lib/validations/post'

// GET /api/posts/[id] - Obtener un post por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        tags: true,
      },
    })

    if (!post) {
      return NextResponse.json(
        { error: 'Post no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { error: 'Error al obtener el post' },
      { status: 500 }
    )
  }
}

// PATCH /api/posts/[id] - Actualizar un post
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = postSchema.parse(body)

    // Verificar que el post existe
    const existingPost = await prisma.post.findUnique({
      where: { id: params.id },
    })

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Post no encontrado' },
        { status: 404 }
      )
    }

    // Verificar que el slug no esté en uso por otro post
    if (validatedData.slug !== existingPost.slug) {
      const slugInUse = await prisma.post.findUnique({
        where: { slug: validatedData.slug },
      })

      if (slugInUse) {
        return NextResponse.json(
          { error: 'Ya existe un post con este slug' },
          { status: 400 }
        )
      }
    }

    const post = await prisma.post.update({
      where: { id: params.id },
      data: {
        title: validatedData.title,
        slug: validatedData.slug,
        content: validatedData.content,
        excerpt: validatedData.excerpt || null,
        coverImage: validatedData.coverImage || null,
        published: validatedData.published,
        publishedAt: validatedData.published
          ? (validatedData.publishedAt ? new Date(validatedData.publishedAt) : new Date())
          : null,
        featured: validatedData.featured || false,
        author: validatedData.author || null,
        metaTitle: validatedData.metaTitle || null,
        metaDescription: validatedData.metaDescription || null,
        categoryId: validatedData.categoryId || null,
        tags: {
          set: [],
          connect: validatedData.tags.map(id => ({ id })),
        },
      },
      include: {
        category: true,
        tags: true,
      },
    })

    return NextResponse.json(post)
  } catch (error: any) {
    console.error('Error updating post:', error)

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Error al actualizar el post' },
      { status: 500 }
    )
  }
}

// DELETE /api/posts/[id] - Eliminar un post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      )
    }

    const post = await prisma.post.findUnique({
      where: { id: params.id },
    })

    if (!post) {
      return NextResponse.json(
        { error: 'Post no encontrado' },
        { status: 404 }
      )
    }

    await prisma.post.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Post eliminado exitosamente' })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { error: 'Error al eliminar el post' },
      { status: 500 }
    )
  }
}
