"use client";

import Reveal from "@/components/Reveal";

// Anonymized, illustrative engagement walkthrough — the "case study" pattern that
// is the #1 trust mechanism for security consultancies. Clearly framed as a
// representative engagement (no real client named), so it builds credibility
// without overclaiming.

const PHASES = [
  { tag: "Situation", color: "text-ink-soft", body: "A mid-market financial-services firm had run CyberArk for three years. It passed its original go-live review, but no one had assessed it since. Leadership wanted assurance before an upcoming audit." },
  { tag: "What we found", color: "text-signal-amber", body: "Of 31 findings, 3 were critical: 14 accounts vaulted but silently not rotating, a tier-0 safe reachable by 23 identities, and a class of sessions bypassing recording entirely. The platform looked healthy on the dashboard — the risk was underneath it." },
  { tag: "What we did", color: "text-cobalt-bright", body: "A phased remediation: restore reconciliation and force rotation, re-baseline safe membership to a named set, route bypassed targets through PSM, and add alerting so drift surfaces immediately next time." },
  { tag: "Outcome", color: "text-signal-emerald", body: "Both critical rotation findings closed in the first 30-day phase using configuration change alone — no downtime. The firm walked into its audit with evidence, a roadmap, and a posture it could defend." },
];

const METRICS = [
  { v: "31", l: "findings, risk-ranked", s: "3 critical · 9 high" },
  { v: "~40%", l: "of weighted risk closed", s: "in phase one alone" },
  { v: "0", l: "hours of downtime", s: "config-only remediation" },
  { v: "1–2", l: "week engagement", s: "remote, collaborative" },
];

export default function CaseStudy() {
  return (
    <section className="py-24 border-y border-hair bg-base-panel">
      <div className="wrap">
        <Reveal className="max-w-[680px] mb-12">
          <span className="eyebrow block mb-4">Representative Engagement</span>
          <h2 className="shead-h mb-4">A CyberArk Health Check, start to finish.</h2>
          <p className="text-lg text-ink-soft leading-relaxed">
            An anonymized walkthrough of a typical engagement — the situation, what surfaced, and the
            outcome. Details are redacted and illustrative; the shape is real.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 items-start">
          {/* Narrative timeline */}
          <Reveal>
            <ol className="relative border-l border-hair ml-3 space-y-8">
              {PHASES.map((p) => (
                <li key={p.tag} className="relative pl-8">
                  <span className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-cobalt border-2 border-base" />
                  <div className={`text-[11px] font-bold uppercase tracking-[0.08em] mb-1.5 ${p.color}`}>{p.tag}</div>
                  <p className="text-ink-soft leading-relaxed text-[15.5px]">{p.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* Metrics panel */}
          <Reveal delay={120}>
            <div className="card p-7 lg:sticky lg:top-24">
              <div className="text-[11px] font-bold uppercase tracking-wider text-ink-muted mb-5">Engagement at a glance</div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                {METRICS.map((m) => (
                  <div key={m.l}>
                    <div className="font-display text-[34px] font-semibold text-ink leading-none">{m.v}</div>
                    <div className="text-[13px] text-ink-soft font-medium mt-1.5">{m.l}</div>
                    <div className="text-[12px] text-ink-muted">{m.s}</div>
                  </div>
                ))}
              </div>
              <div className="border-t border-hair mt-6 pt-5">
                <p className="text-[13px] text-ink-muted leading-relaxed italic">
                  &ldquo;The report told us exactly what to fix first — and why. We closed the critical items
                  before the auditors arrived.&rdquo;
                </p>
                <p className="text-[12px] text-ink-faint mt-2">— Representative client outcome</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
