import slugify from 'slugify'

export function generateSlug(text: string): string {
  return slugify(text, {
    lower: true,
    strict: true,
    locale: 'es',
    remove: /[*+~.()'"!:@]/g,
  })
}

export function ensureUniqueSlug(slug: string, existingSlugs: string[]): string {
  let uniqueSlug = slug
  let counter = 1

  while (existingSlugs.includes(uniqueSlug)) {
    uniqueSlug = `${slug}-${counter}`
    counter++
  }

  return uniqueSlug
}
