import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { CTABand } from "@/components/ui";
import { getPost, getPostSlugs, getAllPosts } from "@/lib/posts";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const post = getPost(params.slug);
  if (!post) return {};
  return { title: post.meta.title, description: post.meta.excerpt };
}

function fmtDate(d) {
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function ArticlePage({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const related = getAllPosts().filter((p) => p.slug !== post.slug).slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.meta.title,
    description: post.meta.excerpt,
    datePublished: post.meta.date,
    author: { "@type": "Person", name: "Andrew Symister" },
    publisher: { "@type": "Organization", name: "Link3IT" },
    articleSection: post.meta.category,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <article className="pt-20 md:pt-24">
        <div className="prose-wrap">
          <Reveal>
            <Link href="/insights" className="text-[13px] font-semibold text-ink-muted hover:text-ink inline-flex items-center gap-1.5 mb-6">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
              All insights
            </Link>
            <div className="text-xs font-bold uppercase tracking-wider text-cobalt-bright mb-4">{post.meta.category}</div>
            <h1 className="font-display font-medium text-ink leading-[1.1] text-balance" style={{ fontSize: "clamp(30px,4.4vw,46px)" }}>
              {post.meta.title}
            </h1>
            <div className="text-[14px] text-ink-muted mt-5 pb-8 border-b border-hair">
              {fmtDate(post.meta.date)} · {post.meta.readingTime} · By Andrew Symister
            </div>
          </Reveal>

          <Reveal>
            <div className="article-body" dangerouslySetInnerHTML={{ __html: post.html }} />
          </Reveal>
        </div>
      </article>

      {related.length > 0 && (
        <section className="py-16 mt-12 border-t border-hair bg-base-panel">
          <div className="wrap">
            <h2 className="font-display text-[22px] font-medium mb-6">Keep reading</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {related.map((p) => (
                <Link key={p.slug} href={`/insights/${p.slug}`} className="card card-hover block p-6 group">
                  <div className="text-xs font-bold uppercase tracking-wider text-cobalt-bright mb-2">{p.meta.category}</div>
                  <h3 className="font-display text-[19px] font-medium group-hover:text-cobalt-bright transition-colors">{p.meta.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand />
    </>
  );
}
