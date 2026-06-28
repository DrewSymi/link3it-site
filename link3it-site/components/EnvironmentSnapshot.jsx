"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";

// Original "environment visibility" showcase — Link3IT's own design, illustrative
// sample data. Shows a prospect the kind of plain-English clarity a review
// delivers: what's exposed, what's healthy, what to fix first. Built for SMB
// buyers who've never had a clear picture of their identity estate.

const POSTURE = [
  { k: "Privileged accounts", total: 142, flagged: 14, tone: "red" },
  { k: "Service accounts", total: 318, flagged: 57, tone: "amber" },
  { k: "Admin accounts", total: 64, flagged: 22, tone: "amber" },
  { k: "MFA coverage", total: 100, flagged: 8, tone: "red", pct: true },
];

const FINDINGS = [
  { sev: "Critical", color: "var(--red,#dc2626)", title: "14 privileged accounts not rotating", note: "Vaulted, but credentials haven't changed in 90+ days." },
  { sev: "Critical", color: "var(--red,#dc2626)", title: "5 standing Global Admins", note: "Permanent top-tier access with no just-in-time model." },
  { sev: "High", color: "var(--amber,#e8852f)", title: "Tier-0 safe reachable by 23 identities", note: "Far more access than the role needs." },
  { sev: "High", color: "var(--amber,#e8852f)", title: "Sessions bypassing recording", note: "A class of privileged sessions isn't being captured." },
  { sev: "Medium", color: "var(--cobalt-bright,#5b8def)", title: "57 stale service accounts", note: "Active, unused, and unmonitored — prime targets." },
];

function Bar({ pct, tone }) {
  const color = tone === "red" ? "#dc2626" : tone === "amber" ? "#e8852f" : "#5b8def";
  return (
    <div style={{ height: 6, borderRadius: 99, background: "#11141b", overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct}%`, borderRadius: 99, background: color, transition: "width 1s cubic-bezier(.22,1,.36,1)" }} />
    </div>
  );
}

export default function EnvironmentSnapshot() {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el); return () => io.disconnect();
  }, []);

  return (
    <section className="py-24 border-y border-hair bg-base-panel" ref={ref}>
      <div className="wrap">
        <Reveal className="max-w-[700px] mb-12">
          <span className="eyebrow block mb-4">See Your Environment Clearly</span>
          <h2 className="shead-h mb-4">A plain-English picture of your identity risk.</h2>
          <p className="text-lg text-ink-soft leading-relaxed">
            Most teams have never had one clear view of their privileged access. Every Link3IT engagement
            ends with exactly this: what you have, what&apos;s exposed, and what to fix first — no jargon,
            no 200-page PDF. Here&apos;s an illustrative example.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-5">
          {/* Posture panel */}
          <Reveal>
            <div className="card p-6 h-full">
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">Estate posture</span>
                <span className="font-mono text-[11px] text-signal-amber flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-amber" />Attention needed
                </span>
              </div>
              <div className="space-y-5">
                {POSTURE.map((p) => {
                  const pct = p.pct ? (on ? 100 - p.flagged : 0) : (on ? Math.round((p.flagged / p.total) * 100) : 0);
                  return (
                    <div key={p.k}>
                      <div className="flex items-baseline justify-between mb-1.5">
                        <span className="text-[14px] text-ink-soft">{p.k}</span>
                        <span className="font-mono text-[12.5px] text-ink">
                          {p.pct ? <span className={p.flagged > 5 ? "text-signal-red" : "text-signal-emerald"}>{on ? 100 - p.flagged : 0}%</span>
                                 : <><span className="text-signal-amber">{on ? p.flagged : 0}</span><span className="text-ink-muted"> / {p.total} flagged</span></>}
                        </span>
                      </div>
                      <Bar pct={pct} tone={p.tone} />
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 pt-5 border-t border-hair flex items-center justify-between">
                <span className="text-[13px] text-ink-muted">Overall exposure</span>
                <span className="font-display text-[28px] font-semibold text-signal-amber leading-none">{on ? "72" : "0"}<span className="text-[16px]">%</span></span>
              </div>
            </div>
          </Reveal>

          {/* Findings panel */}
          <Reveal delay={120}>
            <div className="card p-6 h-full">
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">Fix-first list</span>
                <span className="font-mono text-[11px] text-ink-muted">ranked by risk</span>
              </div>
              <div className="space-y-3">
                {FINDINGS.map((f, i) => (
                  <div key={f.title} className="flex gap-3.5 items-start pb-3 border-b border-hair last:border-0 last:pb-0"
                       style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateX(8px)", transition: `all .5s ${i * 90}ms` }}>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shrink-0 mt-0.5"
                          style={{ color: f.color, background: "rgba(255,255,255,0.04)", border: `1px solid ${f.color}33` }}>{f.sev}</span>
                    <div>
                      <div className="text-[14.5px] text-ink font-medium leading-snug">{f.title}</div>
                      <div className="text-[13px] text-ink-muted mt-0.5 leading-snug">{f.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-6">
          <p className="text-center text-[12.5px] text-ink-faint max-w-[620px] mx-auto">
            Illustrative sample data for demonstration. Your actual report reflects your real environment —
            delivered in language your whole team, and your board, can act on.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
