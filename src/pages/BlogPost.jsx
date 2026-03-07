import { Link, Navigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { formatPostDate, getNeighborPosts, getPostBySlug } from '../lib/blog'
import './Blog.css'

export default function BlogPost() {
  const { slug = '' } = useParams()
  const post = getPostBySlug(slug)

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const { previous, next } = getNeighborPosts(slug)

  return (
    <main className="blog-page blog-page--detail" aria-label="Blog post">
      <article className="blog-post">
        <header className="blog-post__header">
          <p className="blog-post__meta">{formatPostDate(post.date)}</p>
          <h1 className="blog-post__title">{post.title}</h1>
          <p className="blog-post__summary">{post.summary}</p>
          <div className="blog-entry__tags" aria-label="Post tags">
            {post.tags.map(tag => (
              <span key={tag} className="blog-entry__tag">{tag}</span>
            ))}
          </div>
        </header>

        <section className="blog-markdown">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </section>

        <nav className="blog-post__nav" aria-label="Post navigation">
          <div>
            {previous ? (
              <Link to={`/blog/${previous.slug}`} className="blog-post__link">← {previous.title}</Link>
            ) : null}
          </div>
          <Link to="/blog" className="blog-post__link">all posts</Link>
          <div>
            {next ? (
              <Link to={`/blog/${next.slug}`} className="blog-post__link">{next.title} →</Link>
            ) : null}
          </div>
        </nav>
      </article>
    </main>
  )
}
