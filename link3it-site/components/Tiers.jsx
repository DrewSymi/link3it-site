"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import { Check } from "@/components/ui";
import { TIERS } from "@/lib/site";

// Tiered engagements: gives SMB a clear entry point and enterprise a scaled path.
// "Fixed-scope" / "Custom" framing sets pricing expectations without locking a
// number — final scope is agreed on the first call.

export default function Tiers() {
  return (
    <section className="py-24" id="engagements">
      <div className="wrap">
        <Reveal className="max-w-[680px] mb-12">
          <span className="eyebrow block mb-4">Engagements</span>
          <h2 className="shead-h mb-4">An entry point for every stage.</h2>
          <p className="text-lg text-ink-soft leading-relaxed">
            Whether you&apos;re a growing team getting identity under control for the first time or an
            enterprise hardening a mature program, there&apos;s a right-sized way to start. Every engagement
            is fixed-scope and agreed before any work begins — no surprises.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4 items-stretch">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 80} className="h-full">
              <div className={`relative h-full flex flex-col rounded-2xl border p-7 transition-all duration-300
                ${t.featured
                  ? "border-cobalt-line bg-gradient-to-b from-cobalt-soft to-base-panel shadow-glow"
                  : "border-hair bg-base-panel hover:border-cobalt-line"}`}>
                {t.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-cobalt text-white">
                    Most popular
                  </span>
                )}
                <div className="mb-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-cobalt-bright">{t.audience}</div>
                <h3 className="font-display text-[24px] font-medium mb-1">{t.name}</h3>
                <p className="text-[14px] text-ink-soft mb-5">{t.tagline}</p>

                <div className="mb-5 pb-5 border-b border-hair">
                  <div className="font-display text-[22px] font-semibold text-ink">{t.priceLabel}</div>
                  <div className="text-[13px] text-ink-muted">{t.priceNote}</div>
                </div>

                <ul className="space-y-2.5 mb-7 flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[14px] text-ink-soft leading-snug">
                      <span className="text-signal-emerald mt-0.5 shrink-0"><Check className="w-[16px] h-[16px]" /></span>{f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/contact?interest=${encodeURIComponent(t.interest)}`}
                  className={`btn btn-block ${t.featured ? "btn-pri" : "btn-sec"}`}
                >
                  {t.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <p className="text-center text-[14px] text-ink-muted">
            Not sure which fits? <Link href="/contact" className="text-cobalt-bright font-semibold arrow-link inline-flex items-center gap-1">
              Tell us your situation
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link> — the first call points you to the right starting point, even if it isn&apos;t with us.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
