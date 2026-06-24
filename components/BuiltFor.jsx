"use client";

import Reveal from "@/components/Reveal";

// "Built for complex environments" — signals the practice handles the hard,
// regulated, hybrid cases, not simple shops. Framed as environment types
// (capability), not named clients.

const ENVS = [
  { h: "Hybrid Active Directory", p: "On-prem AD synchronized with cloud identity — where the seams create the risk." },
  { h: "Multi-forest environments", p: "Trust relationships and cross-forest privilege that few teams fully map." },
  { h: "Cloud-first organizations", p: "Entra-centered estates where Conditional Access and PIM are the perimeter." },
  { h: "Regulated enterprises", p: "Audit-intensive settings where evidence and control mapping are mandatory." },
  { h: "CyberArk / Idira PAM", p: "Mature privileged-access deployments that need an independent health read." },
  { h: "Financial services", p: "High-stakes environments where privileged compromise is an existential risk." },
];

export default function BuiltFor() {
  return (
    <section className="py-24">
      <div className="wrap">
        <Reveal className="max-w-[680px] mb-12">
          <span className="eyebrow block mb-4">Built For Complex Environments</span>
          <h2 className="shead-h mb-4">The hard cases are the point.</h2>
          <p className="text-lg text-ink-soft leading-relaxed">
            Link3IT is built for the environments where identity is genuinely complicated — hybrid, regulated,
            multi-forest, and privileged-access-heavy. The harder the estate, the more a disciplined review returns.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ENVS.map((e, i) => (
            <Reveal key={e.h} delay={i * 60}>
              <div className="card card-shine h-full p-6 group">
                <div className="w-10 h-10 rounded-lg bg-cobalt-soft flex items-center justify-center mb-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-cobalt-bright" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l8.5 5v10L12 22l-8.5-5V7L12 2z" /><path d="M12 8v8M8 10l8 4" />
                  </svg>
                </div>
                <h3 className="font-display text-[18px] font-medium mb-2 group-hover:text-cobalt-bright transition-colors">{e.h}</h3>
                <p className="text-[14px] text-ink-soft leading-relaxed">{e.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
