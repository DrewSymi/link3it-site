import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { CTABand, Check } from "@/components/ui";
import { SERVICES, getService } from "@/lib/site";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const s = getService(params.slug);
  if (!s) return {};
  return { title: s.title, description: s.short };
}

export default function ServiceDetail({ params }) {
  const s = getService(params.slug);
  if (!s) notFound();

  const others = SERVICES.filter((x) => x.slug !== s.slug);

  return (
    <>
      <header className="relative pt-24 pb-14 md:pt-28 overflow-hidden border-b border-hair">
        <div className="wrap relative-z">
          <Reveal>
            <Link href="/services" className="text-[13px] font-semibold text-ink-muted hover:text-ink inline-flex items-center gap-1.5 mb-6">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
              All services
            </Link>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="eyebrow">{s.tag}</span>
              {s.flag && <span className="pill border-signal-amber/30 bg-signal-amber/10 text-signal-amber text-[11px]">★ {s.flag}</span>}
            </div>
            <h1 className="font-display font-medium text-ink leading-[1.06] text-balance" style={{ fontSize: "clamp(32px,4.6vw,52px)" }}>{s.title}</h1>
            <p className="text-lg md:text-xl text-ink-soft leading-relaxed mt-5 max-w-[640px]">{s.short}</p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/contact" className="btn btn-pri btn-lg">Book this engagement</Link>
              <Link href="/method" className="btn btn-sec btn-lg">See our method</Link>
            </div>
          </Reveal>
        </div>
      </header>

      <section className="py-20">
        <div className="wrap grid lg:grid-cols-[1fr_320px] gap-14">
          {/* Main column */}
          <div className="space-y-12">
            <Reveal>
              <h2 className="font-display text-[26px] font-medium mb-4">The problem</h2>
              <p className="text-ink-soft leading-relaxed text-[17px]">{s.problem}</p>
            </Reveal>
            <Reveal>
              <h2 className="font-display text-[26px] font-medium mb-4">The approach</h2>
              <p className="text-ink-soft leading-relaxed text-[17px]">{s.approach}</p>
            </Reveal>
            <Reveal>
              <h2 className="font-display text-[26px] font-medium mb-4">The outcome</h2>
              <p className="text-ink-soft leading-relaxed text-[17px]">{s.outcome}</p>
            </Reveal>
            <Reveal>
              <h2 className="font-display text-[26px] font-medium mb-5">Example findings</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {s.findings.map((f) => (
                  <div key={f} className="card p-4 flex items-start gap-3">
                    <span className="text-signal-amber mt-0.5 shrink-0">▸</span>
                    <span className="text-[14.5px] text-ink-soft leading-snug">{f}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Sticky sidebar */}
          <aside className="lg:sticky lg:top-24 self-start space-y-4">
            <Reveal>
              <div className="card p-6">
                <h3 className="text-[13px] font-bold uppercase tracking-wider text-ink-muted mb-4">What you receive</h3>
                <ul className="space-y-3">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-[14px] text-ink-soft leading-snug">
                      <span className="text-signal-emerald mt-0.5 shrink-0"><Check className="w-4 h-4" /></span>{d}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-hair mt-5 pt-5 space-y-3">
                  <div className="flex justify-between text-[13px]"><span className="text-ink-muted">Duration</span><span className="text-ink font-medium">{s.timeline}</span></div>
                  <div className="flex justify-between text-[13px]"><span className="text-ink-muted">Format</span><span className="text-ink font-medium">Remote · Collaborative</span></div>
                  <div className="flex justify-between text-[13px]"><span className="text-ink-muted">Access</span><span className="text-ink font-medium">Read-only, scoped</span></div>
                </div>
                <Link href="/contact" className="btn btn-pri btn-block mt-6">Request this engagement</Link>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Other services */}
      <section className="py-16 border-t border-hair bg-base-panel">
        <div className="wrap">
          <h2 className="font-display text-[22px] font-medium mb-6">Other engagements</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {others.map((o) => (
              <Link key={o.slug} href={`/services/${o.slug}`} className="card card-hover block p-5 group">
                <span className="eyebrow">{o.tag}</span>
                <h3 className="font-display text-[18px] font-medium mt-2 mb-2 group-hover:text-cobalt-bright transition-colors">{o.title}</h3>
                <p className="text-[13.5px] text-ink-muted leading-relaxed line-clamp-3">{o.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand secondary={null} title="Ready to scope this engagement?" />
    </>
  );
}
