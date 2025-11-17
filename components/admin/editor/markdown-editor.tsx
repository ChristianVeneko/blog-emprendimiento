'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  Quote,
  Table,
  Code2,
  CheckSquare
} from 'lucide-react'
import { parseMarkdown } from '@/lib/utils/markdown'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const [preview, setPreview] = useState('')
  const [activeTab, setActiveTab] = useState('edit')

  useEffect(() => {
    const updatePreview = async () => {
      const html = await parseMarkdown(value)
      setPreview(html)
    }
    updatePreview()
  }, [value])

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.getElementById('markdown-textarea') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)

    onChange(newText)

    // Restaurar selección
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      )
    }, 0)
  }

  const insertTable = () => {
    const tableMarkdown = `\n| Columna 1 | Columna 2 | Columna 3 |
| --------- | --------- | --------- |
| Celda 1   | Celda 2   | Celda 3   |
| Celda 4   | Celda 5   | Celda 6   |
\n`
    insertMarkdown(tableMarkdown, '')
  }

  const insertCodeBlock = () => {
    insertMarkdown('\n```javascript\n', '\n```\n')
  }

  const toolbarButtons = [
    { icon: Bold, action: () => insertMarkdown('**', '**'), label: 'Negrita (Ctrl+B)' },
    { icon: Italic, action: () => insertMarkdown('*', '*'), label: 'Cursiva (Ctrl+I)' },
    { icon: Strikethrough, action: () => insertMarkdown('~~', '~~'), label: 'Tachado' },
    { icon: Heading1, action: () => insertMarkdown('\n# ', ''), label: 'Título 1' },
    { icon: Heading2, action: () => insertMarkdown('\n## ', ''), label: 'Título 2' },
    { icon: Heading3, action: () => insertMarkdown('\n### ', ''), label: 'Título 3' },
    { icon: List, action: () => insertMarkdown('\n- ', ''), label: 'Lista desordenada' },
    { icon: ListOrdered, action: () => insertMarkdown('\n1. ', ''), label: 'Lista ordenada' },
    { icon: CheckSquare, action: () => insertMarkdown('\n- [ ] ', ''), label: 'Lista de tareas' },
    { icon: LinkIcon, action: () => insertMarkdown('[', '](url)'), label: 'Enlace' },
    { icon: ImageIcon, action: () => insertMarkdown('![alt](', ')'), label: 'Imagen' },
    { icon: Code, action: () => insertMarkdown('`', '`'), label: 'Código inline' },
    { icon: Code2, action: insertCodeBlock, label: 'Bloque de código' },
    { icon: Quote, action: () => insertMarkdown('\n> ', ''), label: 'Cita' },
    { icon: Table, action: insertTable, label: 'Tabla' },
  ]

  return (
    <div className="space-y-2">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between border-b">
          <TabsList>
            <TabsTrigger value="edit">Editar</TabsTrigger>
            <TabsTrigger value="preview">Vista Previa</TabsTrigger>
          </TabsList>

          {activeTab === 'edit' && (
            <div className="flex gap-1 p-2 flex-wrap items-center">
              {toolbarButtons.slice(0, 3).map((btn, index) => (
                <Button
                  key={index}
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={btn.action}
                  title={btn.label}
                  className="h-8 w-8"
                >
                  <btn.icon className="h-4 w-4" />
                </Button>
              ))}
              <div className="w-px h-6 bg-border mx-1" />
              {toolbarButtons.slice(3, 6).map((btn, index) => (
                <Button
                  key={index + 3}
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={btn.action}
                  title={btn.label}
                  className="h-8 w-8"
                >
                  <btn.icon className="h-4 w-4" />
                </Button>
              ))}
              <div className="w-px h-6 bg-border mx-1" />
              {toolbarButtons.slice(6, 9).map((btn, index) => (
                <Button
                  key={index + 6}
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={btn.action}
                  title={btn.label}
                  className="h-8 w-8"
                >
                  <btn.icon className="h-4 w-4" />
                </Button>
              ))}
              <div className="w-px h-6 bg-border mx-1" />
              {toolbarButtons.slice(9).map((btn, index) => (
                <Button
                  key={index + 9}
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={btn.action}
                  title={btn.label}
                  className="h-8 w-8"
                >
                  <btn.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          )}
        </div>

        <TabsContent value="edit" className="mt-0">
          <Textarea
            id="markdown-textarea"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || 'Escribe tu contenido en Markdown...'}
            className="min-h-[500px] font-mono text-sm"
          />
        </TabsContent>

        <TabsContent value="preview" className="mt-0">
          <div
            className="min-h-[500px] p-4 border rounded-md prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: preview }}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
