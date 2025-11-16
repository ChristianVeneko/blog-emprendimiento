'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { PostFormData, postSchema } from '@/lib/validations/post'
import { generateSlug } from '@/lib/utils/slug'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MarkdownEditor } from './editor/markdown-editor'
import { ImageUpload } from './image-upload'
import { toast } from '@/components/ui/use-toast'

interface PostFormProps {
  post?: any
  categories: any[]
  tags: any[]
}

export function PostForm({ post, categories, tags }: PostFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>(
    post?.tags?.map((t: any) => t.id) || []
  )

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: post ? {
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt || '',
      coverImage: post.coverImage || '',
      published: post.published,
      publishedAt: post.publishedAt ? new Date(post.publishedAt).toISOString().slice(0, 16) : '',
      categoryId: post.categoryId || '',
      tags: post.tags?.map((t: any) => t.id) || [],
      metaTitle: post.metaTitle || '',
      metaDescription: post.metaDescription || '',
    } : {
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      coverImage: '',
      published: false,
      publishedAt: '',
      categoryId: '',
      tags: [],
      metaTitle: '',
      metaDescription: '',
    },
  })

  const title = watch('title')
  const content = watch('content')

  // Auto-generar slug desde el título
  useEffect(() => {
    if (title && !post) {
      setValue('slug', generateSlug(title))
    }
  }, [title, post, setValue])

  const onSubmit = async (data: PostFormData) => {
    setLoading(true)
    setError('')

    try {
      const url = post ? `/api/posts/${post.id}` : '/api/posts'
      const method = post ? 'PATCH' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, tags: selectedTags }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al guardar el post')
      }

      toast({
        title: post ? "Post actualizado" : "Post creado",
        description: `El post "${data.title}" se ha guardado correctamente.`,
      })

      router.push('/admin/posts')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Título *</Label>
          <Input
            id="title"
            {...register('title')}
            placeholder="Título del post"
          />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            {...register('slug')}
            placeholder="slug-del-post"
          />
          {errors.slug && (
            <p className="text-sm text-destructive">{errors.slug.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Contenido *</Label>
        <MarkdownEditor
          value={content}
          onChange={(value) => setValue('content', value)}
        />
        {errors.content && (
          <p className="text-sm text-destructive">{errors.content.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Extracto</Label>
        <Textarea
          id="excerpt"
          {...register('excerpt')}
          placeholder="Breve descripción del post..."
          rows={3}
        />
        {errors.excerpt && (
          <p className="text-sm text-destructive">{errors.excerpt.message}</p>
        )}
      </div>

      <ImageUpload
        value={watch('coverImage') || ''}
        onChange={(url) => setValue('coverImage', url)}
        label="Imagen de Portada"
      />
      {errors.coverImage && (
        <p className="text-sm text-destructive">{errors.coverImage.message}</p>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="categoryId">Categoría</Label>
          <Select
            value={watch('categoryId') || undefined}
            onValueChange={(value) => setValue('categoryId', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sin categoría (opcional)" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => toggleTag(tag.id)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedTags.includes(tag.id)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="metaTitle">Meta Título (SEO)</Label>
          <Input
            id="metaTitle"
            {...register('metaTitle')}
            placeholder="Título para SEO (max 60 caracteres)"
          />
          {errors.metaTitle && (
            <p className="text-sm text-destructive">{errors.metaTitle.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="publishedAt">Fecha de Publicación</Label>
          <Input
            id="publishedAt"
            type="datetime-local"
            {...register('publishedAt')}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="metaDescription">Meta Descripción (SEO)</Label>
        <Textarea
          id="metaDescription"
          {...register('metaDescription')}
          placeholder="Descripción para SEO (max 160 caracteres)"
          rows={2}
        />
        {errors.metaDescription && (
          <p className="text-sm text-destructive">{errors.metaDescription.message}</p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 pt-4">
        <Button
          type="submit"
          disabled={loading}
          onClick={() => setValue('published', true)}
          className="w-full sm:w-auto"
        >
          {loading ? 'Guardando...' : post ? 'Actualizar y Publicar' : 'Publicar'}
        </Button>

        <Button
          type="submit"
          variant="outline"
          disabled={loading}
          onClick={() => setValue('published', false)}
          className="w-full sm:w-auto"
        >
          Guardar como Borrador
        </Button>

        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          className="w-full sm:w-auto"
        >
          Cancelar
        </Button>
      </div>
    </form>
  )
}
