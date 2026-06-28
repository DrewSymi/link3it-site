"use client";

import { useEffect, useRef, useState } from "react";

// A simulated privileged-access audit stream. Pure presentation — illustrative
// events, no real data — but it makes the page *feel* like security operations.
// Lines type in, status pills resolve, and the stream auto-scrolls. Pauses when
// off-screen and respects reduced-motion.

const EVENTS = [
  { t: "vault.session", msg: "PSM session opened · admin→DC01", tag: "RECORDED", tone: "ok" },
  { t: "cpm.rotate", msg: "Credential rotated · svc-sql-prod", tag: "OK", tone: "ok" },
  { t: "policy.eval", msg: "Conditional Access · risk=low · grant", tag: "ALLOW", tone: "ok" },
  { t: "pam.request", msg: "JIT elevation requested · tier-0", tag: "PENDING", tone: "warn" },
  { t: "pam.approve", msg: "Dual-control approval · break-glass", tag: "APPROVED", tone: "ok" },
  { t: "recon.scan", msg: "Reconciliation sweep · 0 drift", tag: "CLEAN", tone: "ok" },
  { t: "alert.deny", msg: "Legacy auth attempt blocked", tag: "DENIED", tone: "bad" },
  { t: "iga.leaver", msg: "Termination verified · sessions revoked", tag: "VERIFIED", tone: "ok" },
  { t: "audit.export", msg: "Evidence pack generated · NIST 800-53", tag: "SIGNED", tone: "ok" },
  { t: "vault.session", msg: "PSM session closed · 04:12 recorded", tag: "RECORDED", tone: "ok" },
];

const TONE = {
  ok: "text-signal-emerald border-signal-emerald/40 bg-signal-emerald/10",
  warn: "text-signal-amber border-signal-amber/40 bg-signal-amber/10",
  bad: "text-signal-red border-signal-red/40 bg-signal-red/10",
};

export default function LiveTerminal() {
  const [lines, setLines] = useState([]);
  const [active, setActive] = useState(false);
  const boxRef = useRef(null);
  const i = useRef(0);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => setActive(e[0].isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const reduce = typeof window !== "undefined" && window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setLines(EVENTS.map((e, idx) => ({ ...e, id: idx, ts: ts(idx) }))); return; }
    if (!active) return;
    const iv = setInterval(() => {
      const e = EVENTS[i.current % EVENTS.length];
      const id = i.current;
      setLines((prev) => [...prev.slice(-7), { ...e, id, ts: ts(id) }]);
      i.current += 1;
    }, 1400);
    return () => clearInterval(iv);
  }, [active]);

  return (
    <div ref={boxRef} className="term card overflow-hidden">
      {/* title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-hair bg-base-black/40">
        <span className="w-3 h-3 rounded-full bg-signal-red/70" />
        <span className="w-3 h-3 rounded-full bg-signal-amber/70" />
        <span className="w-3 h-3 rounded-full bg-signal-green/70" />
        <span className="ml-3 font-mono text-[12px] text-ink-muted">link3it — privileged-access audit stream</span>
        <span className="ml-auto flex items-center gap-1.5 text-[11px] font-mono text-signal-emerald">
          <span className="w-1.5 h-1.5 rounded-full bg-signal-emerald term-live" /> LIVE
        </span>
      </div>

      {/* stream */}
      <div className="p-4 font-mono text-[12.5px] leading-relaxed min-h-[280px] flex flex-col justify-end gap-1.5">
        {lines.map((l) => (
          <div key={l.id} className="term-line flex items-center gap-3">
            <span className="text-ink-faint shrink-0">{l.ts}</span>
            <span className="text-cobalt-bright shrink-0 w-[96px] truncate">{l.t}</span>
            <span className="text-ink-soft truncate flex-1">{l.msg}</span>
            <span className={`shrink-0 text-[10px] font-bold tracking-wide px-2 py-0.5 rounded border ${TONE[l.tone]}`}>{l.tag}</span>
          </div>
        ))}
        <div className="term-cursor flex items-center gap-2 text-ink-muted">
          <span className="text-signal-emerald">›</span>
          <span className="w-2 h-4 bg-cobalt-bright term-blink" />
        </div>
      </div>

      <style jsx>{`
        .term { background: linear-gradient(180deg, #0c0e12, #0a0a0a); }
        .term-line { animation: termIn 0.4s ease both; }
        @keyframes termIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .term-blink { animation: blink 1.1s steps(2) infinite; }
        @keyframes blink { 50% { opacity: 0; } }
        .term-live { animation: pulse 1.6s ease-in-out infinite; }
        @keyframes pulse { 0%,100% { opacity: 1; box-shadow: 0 0 0 0 rgba(16,224,160,0.5);} 50% { opacity: .5; box-shadow: 0 0 0 4px rgba(16,224,160,0);} }
        @media (prefers-reduced-motion: reduce) {
          .term-line, .term-blink, .term-live { animation: none; }
        }
      `}</style>
    </div>
  );
}

function ts(n) {
  const base = 9 * 3600 + 14 * 60; // 09:14:00 baseline
  const s = base + n * 7;
  const hh = String(Math.floor(s / 3600) % 24).padStart(2, "0");
  const mm = String(Math.floor(s / 60) % 60).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}
