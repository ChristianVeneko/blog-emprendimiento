import { z } from 'zod'

export const postSchema = z.object({
  title: z.string().min(1, 'El título es requerido').max(200, 'El título es demasiado largo'),
  slug: z.string().min(1, 'El slug es requerido').max(200, 'El slug es demasiado largo'),
  content: z.string().min(1, 'El contenido es requerido'),
  excerpt: z.string().max(500, 'El extracto es demasiado largo').optional(),
  coverImage: z.string().url('URL de imagen inválida').optional().or(z.literal('')),
  published: z.boolean().default(false),
  publishedAt: z.string().optional().or(z.literal('')),
  featured: z.boolean().default(false),
  author: z.string().max(100, 'El nombre del autor es demasiado largo').optional(),
  categoryId: z.string().optional().or(z.literal('')),
  tags: z.array(z.string()).default([]),
  metaTitle: z.string().max(60, 'El meta título es demasiado largo').optional(),
  metaDescription: z.string().max(160, 'La meta descripción es demasiado larga').optional(),
})

export type PostFormData = z.infer<typeof postSchema>

export const categorySchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(50, 'El nombre es demasiado largo'),
  slug: z.string().min(1, 'El slug es requerido').max(50, 'El slug es demasiado largo'),
  description: z.string().max(200, 'La descripción es demasiado larga').optional(),
})

export type CategoryFormData = z.infer<typeof categorySchema>

export const tagSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(30, 'El nombre es demasiado largo'),
  slug: z.string().min(1, 'El slug es requerido').max(30, 'El slug es demasiado largo'),
})

export type TagFormData = z.infer<typeof tagSchema>
