"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";

// SMB / startup on-ramp. The research is clear: firms that win the most business
// give smaller buyers an explicit "you belong here too" signal so they don't
// bounce assuming the firm is enterprise-only. Enterprise-premium tone, but with
// a clear door for every stage.

const STAGES = [
  {
    tag: "Startups",
    h: "Get it right from the start.",
    p: "Build identity on solid ground before scale makes it expensive to fix. A focused first review keeps you investor- and customer-ready.",
  },
  {
    tag: "Growing teams & SMB",
    h: "Punch above your size.",
    p: "Get enterprise-grade privileged-access discipline without an enterprise budget — or a full-time hire. Fixed-scope, high-leverage.",
  },
  {
    tag: "Enterprise & regulated",
    h: "Independent assurance.",
    p: "An outside, framework-aligned read on a mature program — the kind that survives audit and vendor-risk scrutiny.",
  },
];

export default function RightSized() {
  return (
    <section className="py-24">
      <div className="wrap">
        <Reveal className="max-w-[700px] mb-12">
          <span className="eyebrow block mb-4">Right-Sized For Your Stage</span>
          <h2 className="shead-h mb-4">Enterprise-grade — at any size.</h2>
          <p className="text-lg text-ink-soft leading-relaxed">
            Identity risk doesn&apos;t wait until you&apos;re big. Whether you&apos;re a five-person startup
            or a regulated enterprise, there&apos;s a right-sized way to bring privileged access under
            control — scoped to where you actually are.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4">
          {STAGES.map((s, i) => (
            <Reveal key={s.tag} delay={i * 70}>
              <div className="card card-shine h-full p-7 flex flex-col group">
                <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-cobalt-bright mb-3">{s.tag}</div>
                <h3 className="font-display text-[21px] font-medium mb-2.5 group-hover:text-cobalt-bright transition-colors">{s.h}</h3>
                <p className="text-[14.5px] text-ink-soft leading-relaxed">{s.p}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <p className="text-center text-[14px] text-ink-muted">
            Not sure where you fit? <Link href="/contact" className="text-cobalt-bright font-semibold arrow-link inline-flex items-center gap-1">
              Start a conversation
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link> — the first call sizes the right starting point for your stage.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
