import Link from "next/link";
import { PageHeader, CTABand } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { SERVICES } from "@/lib/site";

export const metadata = {
  title: "Services",
  description:
    "CyberArk health checks, Entra ID and Active Directory security assessments, and Zero Trust architecture reviews for mid-market and enterprise organizations.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Consulting Services"
        title="Structured engagements, scoped to outcomes."
        intro="Every engagement defines the problem, the approach, and the deliverable before work begins. You know exactly what you're buying — and what you'll hold at the end."
      />

      <section className="pb-24">
        <div className="wrap space-y-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={i * 60}>
              <Link href={`/services/${s.slug}`} className="card card-hover block group">
                <div className="grid md:grid-cols-[280px_1fr] gap-8 p-8">
                  <div>
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="eyebrow">{s.tag}</span>
                      {s.flag && <span className="pill border-signal-amber/30 bg-signal-amber/10 text-signal-amber text-[11px]">★ {s.flag}</span>}
                    </div>
                    <h2 className="font-display text-[26px] font-medium leading-tight group-hover:text-cobalt-bright transition-colors">{s.title}</h2>
                    <div className="mt-4 text-[13px] text-ink-muted">Typical duration · {s.timeline}</div>
                  </div>
                  <div>
                    <p className="text-[15px] text-ink-soft leading-relaxed mb-5">{s.short}</p>
                    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                      {s.deliverables.slice(0, 4).map((d) => (
                        <div key={d} className="flex items-start gap-2.5 text-[13.5px] text-ink-soft">
                          <span className="text-signal-emerald mt-0.5 shrink-0">▸</span>{d}
                        </div>
                      ))}
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-cobalt-bright">
                      View full scope
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand secondary={null} />
    </>
  );
}
