import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth-config'
import { prisma } from '@/lib/db/prisma'
import { postSchema } from '@/lib/validations/post'

// GET /api/posts - Listar posts (con filtros opcionales)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const published = searchParams.get('published')
    const categoryId = searchParams.get('categoryId')
    const tag = searchParams.get('tag')
    const search = searchParams.get('search')

    const where: any = {}

    if (published !== null) {
      where.published = published === 'true'
    }

    if (categoryId) {
      where.categoryId = categoryId
    }

    if (tag) {
      where.tags = {
        some: {
          slug: tag,
        },
      }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ]
    }

    const posts = await prisma.post.findMany({
      where,
      include: {
        category: true,
        tags: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Error al obtener los posts' },
      { status: 500 }
    )
  }
}

// POST /api/posts - Crear nuevo post
export async function POST(request: NextRequest) {
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

    // Verificar que el slug no exista
    const existingPost = await prisma.post.findUnique({
      where: { slug: validatedData.slug },
    })

    if (existingPost) {
      return NextResponse.json(
        { error: 'Ya existe un post con este slug' },
        { status: 400 }
      )
    }

    const post = await prisma.post.create({
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
          connect: validatedData.tags.map(id => ({ id })),
        },
      },
      include: {
        category: true,
        tags: true,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error: any) {
    console.error('Error creating post:', error)

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Error al crear el post' },
      { status: 500 }
    )
  }
}
