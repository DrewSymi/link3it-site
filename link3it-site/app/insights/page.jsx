import Link from "next/link";
import { PageHeader, CTABand } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Insights",
  description: "Field notes on privileged access, CyberArk, Entra ID, and Active Directory security — practical pieces from the work itself.",
};

function fmtDate(d) {
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function InsightsPage() {
  const posts = getAllPosts();
  const [feature, ...rest] = posts;

  return (
    <>
      <PageHeader
        eyebrow="Insights · Field Notes"
        title="What we actually find — and what to do about it."
        intro="Short, practical pieces from the work itself: the recurring gaps, the quiet failures, and the fixes that move risk the most."
      />

      <section className="pb-24">
        <div className="wrap">
          {feature && (
            <Reveal>
              <Link href={`/insights/${feature.slug}`} className="card card-hover block p-8 md:p-10 mb-4 group">
                <div className="text-xs font-bold uppercase tracking-wider text-cobalt-bright mb-3">
                  {feature.meta.category} · Featured
                </div>
                <h2 className="font-display text-[28px] md:text-[34px] font-medium leading-tight mb-3 max-w-[760px] group-hover:text-cobalt-bright transition-colors">
                  {feature.meta.title}
                </h2>
                <p className="text-ink-soft leading-relaxed max-w-[640px] mb-4 text-[16px]">{feature.meta.excerpt}</p>
                <div className="text-[13px] text-ink-muted">{fmtDate(feature.meta.date)} · {feature.meta.readingTime}</div>
              </Link>
            </Reveal>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 60}>
                <Link href={`/insights/${post.slug}`} className="card card-hover block p-7 h-full group">
                  <div className="text-xs font-bold uppercase tracking-wider text-cobalt-bright mb-3">{post.meta.category}</div>
                  <h3 className="font-display text-[22px] font-medium leading-snug mb-3 group-hover:text-cobalt-bright transition-colors">{post.meta.title}</h3>
                  <p className="text-[14.5px] text-ink-soft leading-relaxed mb-4">{post.meta.excerpt}</p>
                  <div className="text-[13px] text-ink-muted">{fmtDate(post.meta.date)} · {post.meta.readingTime}</div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Want this analysis applied to your environment?" />
    </>
  );
}
