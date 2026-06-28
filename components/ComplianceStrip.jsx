"use client";

import Reveal from "@/components/Reveal";
import { COMPLIANCE } from "@/lib/site";

// Framework-alignment strip. Framed honestly as ALIGNMENT (engagements map to
// these frameworks), not as the practice holding certifications — the signal
// that helps a buyer clear enterprise procurement and vendor-risk review.

export default function ComplianceStrip() {
  return (
    <section className="py-20 border-y border-hair bg-base-panel2">
      <div className="wrap">
        <Reveal className="text-center max-w-[640px] mx-auto mb-10">
          <span className="eyebrow block mb-3">Built For Scrutiny</span>
          <h2 className="font-display text-[26px] md:text-[30px] font-medium mb-3">
            Engagements map to the frameworks your auditors use.
          </h2>
          <p className="text-ink-soft leading-relaxed">
            Findings and evidence are aligned to recognized control frameworks — so the work supports your
            compliance posture and survives a vendor-risk review, whether you&apos;re chasing your first
            enterprise contract or defending an existing one.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {COMPLIANCE.map((c, i) => (
            <Reveal key={c.name} delay={i * 70}>
              <div className="card p-5 text-center h-full flex flex-col items-center justify-center group hover:border-cobalt-line transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                     className="w-7 h-7 text-cobalt-bright/70 mb-3 group-hover:text-cobalt-bright transition-colors"
                     strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V5l8-3z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                <div className="font-display text-[17px] font-medium text-ink">{c.name}</div>
                <div className="text-[12.5px] text-ink-muted mt-1">{c.note}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6">
          <p className="text-center text-[12.5px] text-ink-faint max-w-[560px] mx-auto">
            Alignment means engagements are measured against and mapped to these frameworks. NDAs are
            routine, and access is scoped and read-only by default.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
