import { Link } from "react-router-dom";
import { getAllPosts, formatPostDate } from "../lib/blog";
import "./Blog.css";

export default function Blog() {
  const posts = getAllPosts();
  return (
    <main className="blog-page" aria-label="Blog page">
      <section className="blog-timeline" aria-label="Post timeline">
        {posts.map((post) => (
          <article className="blog-entry" key={post.slug}>
            <div
              className="blog-entry__date-rail"
              aria-label={`Published ${formatPostDate(post.date)}`}
            >
              <span className="blog-entry__date">
                {formatPostDate(post.date)}
              </span>
            </div>
            <div className="blog-entry__content">
              <h2 className="blog-entry__title">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="blog-entry__summary">{post.summary}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
