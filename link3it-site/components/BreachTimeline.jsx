"use client";

import { useEffect, useRef, useState } from "react";

// "How breaches actually happen" — a vertical attack chain that draws itself as
// it scrolls into view, ending on the Link3IT intervention. Educational and
// on-theme; signals real understanding of identity-based intrusion.

const CHAIN = [
  { stage: "Phishing", detail: "A user surrenders credentials to a convincing lure.", sev: "low" },
  { stage: "Token theft", detail: "Session tokens are stolen, sidestepping the password entirely.", sev: "low" },
  { stage: "MFA bypass", detail: "Legacy auth or a gap in Conditional Access slips past MFA.", sev: "mid" },
  { stage: "Privilege escalation", detail: "An over-permissive group or service account opens the climb.", sev: "high" },
  { stage: "Standing Global Admin", detail: "Persistent elevated access becomes the attacker's foothold.", sev: "high" },
  { stage: "Domain compromise", detail: "Tier-0 control — the whole environment is theirs.", sev: "crit" },
];

const DOT = {
  low: "#5b8def", mid: "#d4a017", high: "#e8852f", crit: "#dc2626",
};

export default function BreachTimeline() {
  const ref = useRef(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setShown(CHAIN.length + 1); return; }
    const io = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) {
        let i = 0;
        const iv = setInterval(() => {
          i += 1; setShown(i);
          if (i >= CHAIN.length + 1) clearInterval(iv);
        }, 380);
        io.disconnect();
      }
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="max-w-[640px] mx-auto">
      <ol className="relative">
        {/* the spine */}
        <span className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-hair" aria-hidden="true" />
        <span className="absolute left-[15px] top-2 w-0.5 bg-gradient-to-b from-cobalt via-signal-amber to-signal-red transition-all duration-700"
              style={{ height: `${Math.min(shown, CHAIN.length) / CHAIN.length * 100}%` }} aria-hidden="true" />

        {CHAIN.map((c, i) => {
          const on = i < shown;
          return (
            <li key={c.stage} className="relative pl-12 pb-7 transition-all duration-500"
                style={{ opacity: on ? 1 : 0.25, transform: on ? "translateX(0)" : "translateX(8px)" }}>
              <span className="absolute left-[8px] top-1 w-4 h-4 rounded-full border-2 border-base transition-transform duration-500"
                    style={{ background: DOT[c.sev], transform: on ? "scale(1)" : "scale(0)" }} />
              <div className="font-display text-[19px] font-medium text-ink">{c.stage}</div>
              <div className="text-[14px] text-ink-soft leading-relaxed mt-0.5">{c.detail}</div>
            </li>
          );
        })}

        {/* intervention */}
        <li className="relative pl-12 transition-all duration-500"
            style={{ opacity: shown > CHAIN.length ? 1 : 0, transform: shown > CHAIN.length ? "translateY(0)" : "translateY(8px)" }}>
          <span className="absolute left-[6px] top-1 w-5 h-5 rounded-full bg-signal-emerald flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="#04140d" strokeWidth="3" className="w-3 h-3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>
          </span>
          <div className="card p-5 border-signal-emerald/30 bg-signal-emerald/5">
            <div className="font-display text-[18px] font-medium text-ink mb-1">Link3IT cuts the chain early.</div>
            <div className="text-[14px] text-ink-soft leading-relaxed">
              Every engagement maps these paths in your environment and closes the rungs — MFA gaps, standing
              privilege, escalation routes — before an adversary can climb them.
            </div>
          </div>
        </li>
      </ol>
    </div>
  );
}
