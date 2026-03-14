const rawPosts = import.meta.glob('../content/blog/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
})

function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) {
    return { metadata: {}, content: markdown.trim() }
  }

  const [, frontmatter, content] = match
  const metadata = {}

  for (const rawLine of frontmatter.split('\n')) {
    const line = rawLine.trim()
    if (!line) continue

    const separatorIndex = line.indexOf(':')
    if (separatorIndex === -1) continue

    const key = line.slice(0, separatorIndex).trim()
    const rawValue = line.slice(separatorIndex + 1).trim()

    if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
      metadata[key] = rawValue
        .slice(1, -1)
        .split(',')
        .map(value => value.trim().replace(/^"|"$/g, ''))
        .filter(Boolean)
      continue
    }

    if (rawValue === 'true' || rawValue === 'false') {
      metadata[key] = rawValue === 'true'
      continue
    }

    metadata[key] = rawValue.replace(/^"|"$/g, '')
  }

  return { metadata, content: content.trim() }
}

function slugFromPath(path) {
  return path.split('/').pop().replace('.md', '')
}

function normalizePost(path, markdown) {
  const { metadata, content } = parseFrontmatter(markdown)
  const date = metadata.date ? new Date(metadata.date) : new Date(0)

  return {
    slug: slugFromPath(path),
    title: metadata.title ?? 'Untitled post',
    date: metadata.date ?? '1970-01-01',
    dateObject: date,
    summary: metadata.summary ?? '',
    featured: Boolean(metadata.featured),
    content,
  }
}

const allPosts = Object.entries(rawPosts)
  .map(([path, markdown]) => normalizePost(path, markdown))
  .sort((a, b) => b.dateObject - a.dateObject)

const postIndex = new Map(allPosts.map(post => [post.slug, post]))

export function getAllPosts() {
  return allPosts
}

export function getPostBySlug(slug) {
  return postIndex.get(slug)
}

export function getNeighborPosts(slug) {
  const index = allPosts.findIndex(post => post.slug === slug)
  if (index === -1) return { previous: null, next: null }

  return {
    previous: allPosts[index + 1] ?? null,
    next: allPosts[index - 1] ?? null,
  }
}

export function formatPostDate(dateString) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}
