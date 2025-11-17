import { marked } from 'marked'
import hljs from 'highlight.js'

// Configure marked
marked.setOptions({
  breaks: true,
  gfm: true,
})

// Custom renderer para agregar syntax highlighting y mejorar tablas
const renderer = new marked.Renderer()
const originalCodeRenderer = renderer.code.bind(renderer)
const originalTableRenderer = renderer.table.bind(renderer)
const originalListItemRenderer = renderer.listitem.bind(renderer)

renderer.code = function(code: string, language: string | undefined, isEscaped: boolean) {
  if (language && hljs.getLanguage(language)) {
    try {
      const highlighted = hljs.highlight(code, { language }).value
      return `<pre class="code-block"><code class="hljs language-${language}">${highlighted}</code></pre>`
    } catch (err) {
      console.error('Error highlighting code:', err)
    }
  }

  // Fallback a auto-detect
  try {
    const highlighted = hljs.highlightAuto(code).value
    return `<pre class="code-block"><code class="hljs">${highlighted}</code></pre>`
  } catch (err) {
    console.error('Error auto-highlighting code:', err)
    return originalCodeRenderer(code, language, isEscaped)
  }
}

// Mejorar renderizado de tablas con clases CSS
renderer.table = function(header: string, body: string) {
  return `<div class="table-wrapper"><table class="markdown-table">${header}${body}</table></div>`
}

// Soporte para listas de tareas (checkboxes)
renderer.listitem = function(text: string, task: boolean, checked: boolean) {
  if (task) {
    const checkbox = checked
      ? '<input type="checkbox" disabled checked class="task-list-item-checkbox" />'
      : '<input type="checkbox" disabled class="task-list-item-checkbox" />'
    return `<li class="task-list-item">${checkbox} ${text}</li>`
  }
  return originalListItemRenderer(text, task, checked)
}

marked.use({ renderer })

export async function parseMarkdown(markdown: string): Promise<string> {
  return marked.parse(markdown)
}

export function extractExcerpt(markdown: string, maxLength: number = 160): string {
  // Remove markdown syntax
  const plainText = markdown
    .replace(/^#+\s+/gm, '') // Remove headers
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.+?)\*/g, '$1') // Remove italic
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links
    .replace(/`(.+?)`/g, '$1') // Remove inline code
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/!\[.*?\]\(.+?\)/g, '') // Remove images
    .trim()

  if (plainText.length <= maxLength) {
    return plainText
  }

  return plainText.substring(0, maxLength).trim() + '...'
}
