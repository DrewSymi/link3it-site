"use client";

import { useState } from "react";

// Interactive "how a breach moves" visualizer. Click a stage to see how an
// attacker escalates — and the control that breaks the chain. Educational,
// on-theme, and signals real domain understanding.

const STAGES = [
  {
    key: "foothold", label: "Initial foothold", x: 8,
    attacker: "Phished credentials or a vulnerable edge service give an attacker a first, low-privilege account.",
    control: "MFA + Conditional Access reduce the odds a stolen password alone gets in.",
    sev: "low",
  },
  {
    key: "recon", label: "Discovery", x: 30,
    attacker: "From inside, they enumerate the directory — users, groups, service accounts, and where privilege lives.",
    control: "Tiered AD design and least-privilege limit what a single account can even see.",
    sev: "low",
  },
  {
    key: "escalate", label: "Privilege escalation", x: 53,
    attacker: "A Kerberoastable service account or an over-permissive group lets them climb toward admin.",
    control: "Vaulted, rotated service credentials and trimmed privileged groups remove the rungs.",
    sev: "high",
  },
  {
    key: "lateral", label: "Lateral movement", x: 75,
    attacker: "With elevated rights they pivot across hosts, reusing credentials to spread.",
    control: "PSM session isolation and just-in-time access mean there's no standing credential to reuse.",
    sev: "high",
  },
  {
    key: "domain", label: "Domain dominance", x: 95,
    attacker: "Domain Admin or tier-0 credentials hand them the entire environment.",
    control: "Dual-control retrieval and full session recording make tier-0 access controlled and auditable.",
    sev: "crit",
  },
];

const SEV = {
  low: { ring: "#5b8def", chip: "text-cobalt-bright border-cobalt-line bg-cobalt-soft" },
  high: { ring: "#d4a017", chip: "text-signal-amber border-signal-amber/40 bg-signal-amber/10" },
  crit: { ring: "#dc2626", chip: "text-signal-red border-signal-red/40 bg-signal-red/10" },
};

export default function AttackPath() {
  const [sel, setSel] = useState(0);
  const stage = STAGES[sel];

  return (
    <div className="card p-6 md:p-8">
      <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
        <h3 className="font-display text-[22px] font-medium">How a breach actually moves</h3>
        <span className="text-[12px] text-ink-muted font-mono">click a stage →</span>
      </div>
      <p className="text-ink-soft text-[14.5px] mb-7">Most breaches don&apos;t break in — they log in, then escalate. Here&apos;s the chain, and where the right control breaks it.</p>

      {/* the path */}
      <div className="relative mb-8" style={{ height: 70 }}>
        <svg viewBox="0 0 100 16" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <line x1="8" y1="8" x2="95" y2="8" stroke="#23262e" strokeWidth="0.6" />
          <line x1="8" y1="8" x2={stage.x} y2="8" stroke="url(#apg)" strokeWidth="0.8" className="ap-progress" />
          <defs>
            <linearGradient id="apg" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#5b8def" /><stop offset="1" stopColor="#dc2626" />
            </linearGradient>
          </defs>
        </svg>
        {STAGES.map((s, idx) => {
          const on = idx <= sel;
          return (
            <button
              key={s.key}
              onClick={() => setSel(idx)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${s.x}%`, top: "50%" }}
              aria-label={s.label}
              aria-pressed={idx === sel}
            >
              <span
                className="block rounded-full transition-all duration-300"
                style={{
                  width: idx === sel ? 22 : 14, height: idx === sel ? 22 : 14,
                  background: on ? SEV[s.sev].ring : "#23262e",
                  boxShadow: idx === sel ? `0 0 0 6px ${SEV[s.sev].ring}22` : "none",
                }}
              />
              <span className={`absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-medium transition-colors ${idx === sel ? "text-ink" : "text-ink-muted group-hover:text-ink-soft"}`}>
                {s.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* detail */}
      <div className="grid md:grid-cols-2 gap-4" key={sel}>
        <div className="ap-fade rounded-xl border border-hair bg-base-black/30 p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[10px] font-bold tracking-wide px-2 py-0.5 rounded border ${SEV[stage.sev].chip}`}>ATTACKER</span>
            <span className="text-[11px] text-ink-muted font-mono">stage {sel + 1}/5</span>
          </div>
          <p className="text-[14px] text-ink-soft leading-relaxed">{stage.attacker}</p>
        </div>
        <div className="ap-fade rounded-xl border border-signal-emerald/30 bg-signal-emerald/5 p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold tracking-wide px-2 py-0.5 rounded border text-signal-emerald border-signal-emerald/40 bg-signal-emerald/10">LINK3IT CONTROL</span>
          </div>
          <p className="text-[14px] text-ink-soft leading-relaxed">{stage.control}</p>
        </div>
      </div>

      <style jsx>{`
        .ap-progress { transition: all 0.5s cubic-bezier(0.22,1,0.36,1); }
        .ap-fade { animation: apFade 0.4s ease both; }
        @keyframes apFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) { .ap-fade { animation: none; } }
      `}</style>
    </div>
  );
}
