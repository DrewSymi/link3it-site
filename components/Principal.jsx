"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";

// "Who you work with" — names the principal and puts a real human behind the
// advisory. For privileged-access work, a named, accountable person reads as
// MORE trustworthy than an anonymous firm. Headshot slot is optional: if no
// /principal.jpg is present, a clean monogram placeholder shows instead.

const CREDENTIALS = [
  { label: "CyberArk Trustee", note: "Earned" },
  { label: "CyberArk Defender (PAM)", note: "In progress" },
  { label: "CompTIA Security+", note: "In progress" },
];

export default function Principal({ photo = "/principal.jpg" }) {
  return (
    <section className="py-24 border-y border-hair bg-base-panel">
      <div className="wrap">
        <Reveal className="max-w-[680px] mb-12">
          <span className="eyebrow block mb-4">Who You Work With</span>
          <h2 className="shead-h mb-4">A named principal — not a faceless queue.</h2>
          <p className="text-lg text-ink-soft leading-relaxed">
            When you hand someone the keys to your privileged access, you should know exactly who
            holds them. With Link3IT, you work directly with the person doing the work.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-[300px_1fr] gap-10 items-start">
          {/* Portrait / placeholder */}
          <Reveal>
            <div className="card overflow-hidden">
              <div className="aspect-[4/5] relative bg-gradient-to-br from-base-panel2 to-base-black flex items-center justify-center">
                {/* Drop a real photo at public/principal.jpg and it replaces this automatically */}
                <img
                  src={photo}
                  alt="Andrew Symister, Founder & Principal Advisor"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                {/* monogram fallback sits behind the img */}
                <div className="text-center px-6 pointer-events-none">
                  <div className="font-display text-[64px] font-semibold text-cobalt-bright/30 leading-none">AS</div>
                  <div className="text-[12px] text-ink-faint mt-3 uppercase tracking-[0.14em]">Principal Advisor</div>
                </div>
              </div>
              <div className="p-5 border-t border-hair">
                <div className="font-display text-[20px] font-medium text-ink">Andrew Symister</div>
                <div className="text-[13.5px] text-cobalt-bright font-semibold">Founder &amp; Principal Advisor</div>
                <div className="text-[12.5px] text-ink-muted mt-1">New York, NY</div>
              </div>
            </div>
          </Reveal>

          {/* Bio */}
          <Reveal delay={120}>
            <div className="space-y-5">
              <p className="text-[17px] text-ink-soft leading-relaxed">
                Link3IT is led by Andrew Symister, an identity engineer who works in privileged-access
                operations inside a regulated, audit-intensive enterprise environment. That day-to-day
                operational reality — not slideware — is what shapes every engagement.
              </p>
              <p className="text-[17px] text-ink-soft leading-relaxed">
                The approach is hands-on and control-focused: built and proven in a full hybrid-identity
                lab, grounded in how CyberArk, Entra ID, and Active Directory actually behave in
                production. When you engage Link3IT, there&apos;s no account team and no junior bench —
                you work with the engineer doing the work, start to finish.
              </p>

              <div className="pt-2">
                <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-ink-muted mb-3">Credentials</div>
                <div className="flex flex-wrap gap-2.5">
                  {CREDENTIALS.map((c) => (
                    <span key={c.label} className="inline-flex items-center gap-2 text-[13px] bg-base border border-hair rounded-full px-3.5 py-1.5">
                      <span className="text-ink font-medium">{c.label}</span>
                      <span className={`text-[11px] font-semibold ${c.note === "Earned" ? "text-signal-emerald" : "text-signal-amber"}`}>{c.note}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/contact" className="btn btn-pri">Request an introduction call</Link>
                <Link href="/about" className="btn btn-sec arrow-link">
                  More about the practice
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
