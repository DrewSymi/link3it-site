"use client";

import { useEffect, useRef, useState } from "react";

// Cinematic "identity attack surface" console. Runs a scan sequence, then reveals
// a live exposure dashboard with animated bars and counts. Illustrative data —
// it demonstrates the kind of findings a review surfaces, not a real tenant.

const STEPS = [
  "Checking Conditional Access policies",
  "Evaluating PIM eligibility",
  "Enumerating service accounts",
  "Mapping privileged escalation paths",
  "Correlating standing admin access",
];

const METRICS = [
  { label: "Exposed privileged accounts", value: 14, tone: "red" },
  { label: "Inactive admin accounts", value: 22, tone: "amber" },
  { label: "Stale service accounts", value: 57, tone: "amber" },
  { label: "MFA exceptions", value: 8, tone: "red" },
  { label: "Standing Global Admins", value: 5, tone: "red" },
];

const TONE = {
  red: "text-signal-red",
  amber: "text-signal-amber",
};

export default function ScanConsole() {
  const ref = useRef(null);
  const [phase, setPhase] = useState("idle"); // idle | scanning | done
  const [step, setStep] = useState(0);
  const [surface, setSurface] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver((e) => {
      if (e[0].isIntersecting && phase === "idle") {
        if (reduce) { setPhase("done"); setSurface(72); setStep(STEPS.length); return; }
        setPhase("scanning");
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [phase]);

  useEffect(() => {
    if (phase !== "scanning") return;
    if (step < STEPS.length) {
      const t = setTimeout(() => setStep((s) => s + 1), 620);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase("done"), 400);
    return () => clearTimeout(t);
  }, [phase, step]);

  useEffect(() => {
    if (phase !== "done") return;
    let raf, start;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      setSurface(Math.round((1 - Math.pow(1 - p, 3)) * 72));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  return (
    <div ref={ref} className="term card overflow-hidden">
      {/* title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-hair bg-base-black/40">
        <span className="w-3 h-3 rounded-full bg-signal-red/70" />
        <span className="w-3 h-3 rounded-full bg-signal-amber/70" />
        <span className="w-3 h-3 rounded-full bg-signal-green/70" />
        <span className="ml-3 font-mono text-[12px] text-ink-muted">link3it — identity attack surface</span>
        <span className="ml-auto flex items-center gap-1.5 text-[11px] font-mono">
          {phase === "done"
            ? <><span className="w-1.5 h-1.5 rounded-full bg-signal-emerald" /><span className="text-signal-emerald">REPORT READY</span></>
            : <><span className="w-1.5 h-1.5 rounded-full bg-signal-amber term-live" /><span className="text-signal-amber">SCANNING</span></>}
        </span>
      </div>

      <div className="p-5 font-mono min-h-[340px]">
        {/* scan log */}
        <div className="space-y-1.5 mb-5">
          {STEPS.slice(0, step).map((s, i) => (
            <div key={s} className="flex items-center gap-2.5 text-[12.5px] term-line">
              <span className="text-signal-emerald shrink-0">✓</span>
              <span className="text-ink-soft">{s}</span>
            </div>
          ))}
          {phase === "scanning" && step < STEPS.length && (
            <div className="flex items-center gap-2.5 text-[12.5px]">
              <span className="text-cobalt-bright shrink-0 term-spin">▸</span>
              <span className="text-ink">{STEPS[step]}<span className="term-blink">_</span></span>
            </div>
          )}
        </div>

        {/* surface gauge + metrics — revealed when done */}
        {phase === "done" && (
          <div className="term-reveal">
            <div className="mb-5">
              <div className="flex items-end justify-between mb-2">
                <span className="text-[11px] uppercase tracking-[0.12em] text-ink-muted">Identity attack surface</span>
                <span className="font-display text-[26px] font-semibold text-signal-amber leading-none">{surface}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-base-black overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-signal-amber to-signal-red transition-[width] duration-100"
                     style={{ width: `${surface}%` }} />
              </div>
            </div>

            <div className="space-y-2.5">
              {METRICS.map((m, i) => (
                <div key={m.label} className="flex items-center justify-between text-[12.5px] term-line"
                     style={{ animationDelay: `${i * 90}ms` }}>
                  <span className="text-ink-soft">{m.label}</span>
                  <span className={`font-semibold tabular-nums ${TONE[m.tone]}`}>{m.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-hair text-[11px] text-ink-faint">
              Illustrative findings · representative of a first review
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .term { background: linear-gradient(180deg, #0c0e12, #0a0a0a); }
        .term-line { animation: termIn 0.4s ease both; }
        @keyframes termIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        .term-reveal { animation: termIn 0.5s ease both; }
        .term-blink { animation: blink 1s steps(2) infinite; }
        @keyframes blink { 50% { opacity: 0; } }
        .term-live { animation: pulse 1.4s ease-in-out infinite; }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .4; } }
        .term-spin { display: inline-block; animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          .term-line, .term-reveal, .term-blink, .term-live, .term-spin { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
