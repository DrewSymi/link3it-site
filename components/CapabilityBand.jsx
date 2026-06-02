"use client";

import { useEffect, useRef, useState } from "react";

// Animated capability strip. Numbers count up when scrolled into view.
// These describe SCOPE of practice, not fabricated client metrics.
const STATS = [
  { value: 4, suffix: "", label: "Identity domains in scope", sub: "PAM · Cloud · Directory · Governance" },
  { value: 5, suffix: "-phase", label: "Repeatable engagement method", sub: "Baseline to executive translation" },
  { value: 31, suffix: "+", label: "Control checks per health check", sub: "Mapped to CIS & NIST 800-53" },
  { value: 1, suffix: "–2 wk", label: "Typical health check duration", sub: "Remote, collaborative, low-lift" },
];

function useCountUp(target, run) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    // Respect reduced-motion: jump straight to the final value.
    if (typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }
    let raf, start;
    const dur = 1100;
    const tick = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);
  return n;
}

function Stat({ stat, run, delay }) {
  const n = useCountUp(stat.value, run);
  return (
    <div className="text-center px-4" style={{ animation: run ? `statPop 0.6s ${delay}ms both` : "none" }}>
      <div className="font-display text-[44px] md:text-[52px] font-semibold text-ink leading-none">
        {n}<span className="text-cobalt-bright text-[26px] md:text-[30px]">{stat.suffix}</span>
      </div>
      <div className="text-[14px] font-semibold text-ink mt-3">{stat.label}</div>
      <div className="text-[12.5px] text-ink-muted mt-1">{stat.sub}</div>
    </div>
  );
}

export default function CapabilityBand() {
  const ref = useRef(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) { setRun(true); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 border-y border-hair bg-base-panel/40">
      <div className="wrap">
        <div className="rule-draw mb-12 max-w-[120px] mx-auto" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 divide-cobalt-line/0 lg:divide-x lg:divide-hair">
          {STATS.map((s, i) => (
            <Stat key={s.label} stat={s} run={run} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
