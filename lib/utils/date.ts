import { format, formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

export function formatDate(date: Date | string, formatStr: string = 'PPP'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, formatStr, { locale: es })
}

export function formatRelativeDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return formatDistanceToNow(dateObj, { addSuffix: true, locale: es })
}

export function getReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.trim().split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}
