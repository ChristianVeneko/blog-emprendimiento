import { marked } from 'marked'
import hljs from 'highlight.js'

// Configure marked with syntax highlighting
marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value
      } catch (err) {
        console.error('Error highlighting code:', err)
      }
    }
    return hljs.highlightAuto(code).value
  },
  langPrefix: 'hljs language-',
  breaks: true,
  gfm: true,
})

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
