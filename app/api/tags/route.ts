import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth-config'
import { prisma } from '@/lib/db/prisma'
import { tagSchema } from '@/lib/validations/post'

// GET /api/tags
export async function GET() {
  try {
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

    return NextResponse.json(tags)
  } catch (error) {
    console.error('Error fetching tags:', error)
    return NextResponse.json(
      { error: 'Error al obtener los tags' },
      { status: 500 }
    )
  }
}

// POST /api/tags
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
    const validatedData = tagSchema.parse(body)

    const tag = await prisma.tag.create({
      data: validatedData,
    })

    return NextResponse.json(tag, { status: 201 })
  } catch (error: any) {
    console.error('Error creating tag:', error)

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Ya existe un tag con este nombre o slug' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Error al crear el tag' },
      { status: 500 }
    )
  }
}
