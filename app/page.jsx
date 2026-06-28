import Link from "next/link";
import Hero from "@/components/Hero";
import PlatformGrid from "@/components/PlatformGrid";
import CapabilityBand from "@/components/CapabilityBand";
import BentoCapabilities from "@/components/BentoCapabilities";
import LiveTerminal from "@/components/LiveTerminal";
import AttackPath from "@/components/AttackPath";
import CaseStudy from "@/components/CaseStudy";
import Tiers from "@/components/Tiers";
import ComplianceStrip from "@/components/ComplianceStrip";
import BreachTimeline from "@/components/BreachTimeline";
import ExposureAreas from "@/components/ExposureAreas";
import EnvironmentSnapshot from "@/components/EnvironmentSnapshot";
import BuiltFor from "@/components/BuiltFor";
import Principal from "@/components/Principal";
import RightSized from "@/components/RightSized";
import Kinetic from "@/components/Kinetic";
import Reveal from "@/components/Reveal";
import { SectionHead, CTABand, Check } from "@/components/ui";
import { SERVICES } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";

const PROBLEMS = [
  { n: "01", h: "Tool sprawl", p: "Each platform solves a slice of identity. Stitched together without a control strategy, the seams between them become the gaps attackers exploit." },
  { n: "02", h: "Misconfiguration", p: "Powerful platforms ship with permissive defaults. Conditional Access gaps, unrotated credentials, and over-scoped roles quietly accumulate risk." },
  { n: "03", h: "Privilege drift", p: "Access is granted faster than it's removed. Standing privilege builds up over years until one compromised account owns the environment." },
];

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <Hero />

      {/* Platform marquee */}
      <PlatformGrid />

      {/* Animated capability band */}
      <CapabilityBand />

      {/* Bento grid — full-spectrum capabilities */}
      <BentoCapabilities />

      {/* Identity exposure areas matrix */}
      <ExposureAreas />

      {/* Environment visibility dashboard showcase */}
      <EnvironmentSnapshot />

      {/* Problem narrative */}
      <section className="py-24 bg-base-panel2">
        <div className="wrap">
          <SectionHead
            eyebrow="The Identity Problem"
            title="The perimeter moved. Most defenses didn't."
            intro="Identity is where modern attacks land and escalate — yet most organizations still secure it with fragmented tools and manual process. Here's why that keeps failing."
          />
          <div className="grid md:grid-cols-3 gap-10">
            {PROBLEMS.map((p, i) => (
              <Reveal key={p.n} delay={i * 80} className="border-t-2 border-coral/40 pt-6">
                <div className="font-display text-[15px] font-semibold text-coral mb-4">{p.n}</div>
                <h3 className="text-[19px] mb-2">{p.h}</h3>
                <p className="text-[14.5px] text-ink-muted leading-relaxed">{p.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Live operations feel */}
      <section className="py-24 border-t border-hair">
        <div className="wrap grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="eyebrow block mb-4">What Good Looks Like</span>
            <h2 className="shead-h mb-5">Privileged access, observed and under control.</h2>
            <p className="text-ink-soft leading-relaxed mb-4">
              When identity is done right, every privileged action is brokered, rotated, recorded, and
              attributable. No standing credentials waiting to be stolen. No session anyone can&apos;t
              reconstruct. This is the operational posture a Link3IT engagement moves you toward.
            </p>
            <ul className="space-y-2.5 mt-6">
              {["Credentials vaulted and auto-rotated", "Sessions isolated and recorded", "Just-in-time elevation, dual-controlled", "Every event audit-ready and attributable"].map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15px] text-ink-soft">
                  <span className="text-signal-emerald mt-0.5 shrink-0"><Check className="w-[18px] h-[18px]" /></span>{t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="dark-zone p-4">
              <LiveTerminal />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Interactive attack path */}
      <section className="py-24 bg-base-panel2 border-y border-hair">
        <div className="wrap">
          <SectionHead
            eyebrow="The Threat, Visualized"
            title="See exactly where the chain breaks."
            intro="Click through how a real intrusion escalates — and the specific control that stops it at each stage."
          />
          <Reveal><div className="dark-zone p-5 md:p-7"><AttackPath /></div></Reveal>
        </div>
      </section>

      {/* How breaches actually happen — drawing timeline */}
      <section className="py-24">
        <div className="wrap">
          <SectionHead
            eyebrow="The Anatomy Of A Breach"
            title="How breaches actually happen."
            intro="Identity intrusions follow a chain. Each link is a control that can break it — and each is something a Link3IT review finds and closes."
            center
          />
          <BreachTimeline />
        </div>
      </section>

      {/* Built for complex environments */}
      <BuiltFor />

      {/* Representative case study */}
      <CaseStudy />

      {/* Who you work with — named principal */}
      <Principal />

      {/* Compliance / framework alignment trust strip */}
      <ComplianceStrip />

      {/* Services preview */}
      <section className="py-24">
        <div className="wrap">
          <SectionHead
            eyebrow="Consulting Services"
            title="Structured engagements, scoped to outcomes."
            intro="Each engagement defines the problem, the approach, and the outcome before work begins — so you know exactly what you're buying and what you'll have at the end."
          />
          <div className="grid md:grid-cols-2 gap-4">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={i * 60}>
                <Link href={`/services/${s.slug}`} className="card card-hover card-shine block p-7 h-full group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="eyebrow">{s.tag}</span>
                    {s.flag && (
                      <span className="pill border-signal-amber/30 bg-signal-amber/10 text-signal-amber">★ {s.flag}</span>
                    )}
                  </div>
                  <h3 className="font-display text-[24px] font-medium mb-3 group-hover:text-cobalt-bright transition-colors">{s.title}</h3>
                  <p className="text-[15px] text-ink-soft leading-relaxed mb-5">{s.short}</p>
                  <span className="text-[14px] font-semibold text-cobalt-bright inline-flex items-center gap-1.5">
                    Explore service
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SMB / startup on-ramp */}
      <RightSized />

      {/* Tiered engagements */}
      <Tiers />

      {/* Method teaser */}
      <section className="py-24 bg-base-panel border-y border-hair">
        <div className="wrap grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <span className="eyebrow block mb-4">The Link3IT Method</span>
            <h2 className="shead-h mb-5">A repeatable framework — not improvisation.</h2>
            <p className="text-ink-soft leading-relaxed mb-4">
              Generic consultants improvise each engagement. Every Link3IT review runs the same disciplined
              five-phase method, built on published frameworks and validated in a controlled lab — so the rigor
              is consistent whether you&apos;re the first client of the month or the tenth.
            </p>
            <Link href="/method" className="btn btn-sec mt-2">Walk through the method</Link>
          </Reveal>
          <Reveal delay={120}>
            <ol className="space-y-3">
              {["Establish the baseline", "Evidence collection", "Analysis against attack paths", "Prioritized remediation", "Executive translation"].map((step, i) => (
                <li key={step} className="card flex items-center gap-4 p-4">
                  <span className="w-9 h-9 rounded-full bg-cobalt text-white font-display text-sm font-semibold flex items-center justify-center shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] text-ink">{step}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Insights preview */}
      {posts.length > 0 && (
        <section className="py-24">
          <div className="wrap">
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <SectionHead
                eyebrow="Field Notes"
                title="What we actually find — and what to do about it."
                className="mb-0"
              />
              <Reveal><Link href="/insights" className="btn btn-sec">All insights</Link></Reveal>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {posts.map((post, i) => (
                <Reveal key={post.slug} delay={i * 70}>
                  <Link href={`/insights/${post.slug}`} className="card card-hover card-shine block p-6 h-full group">
                    <div className="text-xs font-bold uppercase tracking-wider text-cobalt-bright mb-3">{post.meta.category}</div>
                    <h3 className="font-display text-[20px] font-medium leading-snug mb-3 group-hover:text-cobalt-bright transition-colors">{post.meta.title}</h3>
                    <p className="text-[14px] text-ink-soft leading-relaxed">{post.meta.excerpt}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand />
    </>
  );
}
