'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, Check, X, Loader2 } from 'lucide-react'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
}

export function ImageUpload({ value, onChange, label = "Imagen" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      setError('Por favor selecciona una imagen válida')
      return
    }

    // Validar tamaño (5MB máximo)
    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen no puede pesar más de 5MB')
      return
    }

    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Error al subir la imagen')
      }

      const data = await response.json()
      onChange(data.url)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      <div className="flex gap-2">
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="flex-1"
        />

        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
            disabled={uploading}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            {uploading ? 'Subiendo...' : 'Subir'}
          </Button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <X className="w-4 h-4" />
          {error}
        </div>
      )}

      {value && !uploading && (
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
          <Check className="w-4 h-4" />
          Imagen configurada
        </div>
      )}

      {value && (
        <div className="relative h-40 border rounded-lg overflow-hidden">
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  )
}
