import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth-config'
import { prisma } from '@/lib/db/prisma'
import { categorySchema } from '@/lib/validations/post'

// GET /api/categories
export async function GET() {
  try {
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

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Error al obtener las categorías' },
      { status: 500 }
    )
  }
}

// POST /api/categories
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
    const validatedData = categorySchema.parse(body)

    const category = await prisma.category.create({
      data: validatedData,
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error: any) {
    console.error('Error creating category:', error)

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Ya existe una categoría con este nombre o slug' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Error al crear la categoría' },
      { status: 500 }
    )
  }
}
