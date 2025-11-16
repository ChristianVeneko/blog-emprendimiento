import { marked } from 'marked'
import hljs from 'highlight.js'

// Configure marked
marked.setOptions({
  breaks: true,
  gfm: true,
})

// Custom renderer para agregar syntax highlighting
const renderer = new marked.Renderer()
const originalCodeRenderer = renderer.code.bind(renderer)

renderer.code = function(code: string, language: string | undefined, isEscaped: boolean) {
  if (language && hljs.getLanguage(language)) {
    try {
      const highlighted = hljs.highlight(code, { language }).value
      return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`
    } catch (err) {
      console.error('Error highlighting code:', err)
    }
  }

  // Fallback a auto-detect
  try {
    const highlighted = hljs.highlightAuto(code).value
    return `<pre><code class="hljs">${highlighted}</code></pre>`
  } catch (err) {
    console.error('Error auto-highlighting code:', err)
    return originalCodeRenderer(code, language, isEscaped)
  }
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
