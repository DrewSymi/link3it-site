"use client";

import { useEffect, useRef, useState } from "react";

// Animated privileged-access control plane — the architecture Link3IT secures,
// as a living schematic on the dark hero stage. Pure SVG + CSS (precise, light,
// no WebGL). Identities -> Vault (broker/rotate/record) -> Target estate, with
// credential pulses flowing through continuously and session lines drawing in.

const IDENTITIES = ["Administrators", "Service accounts", "Third parties", "Machine identities"];
const VAULT = ["Broker & isolate", "Rotate credentials", "Record sessions", "Just-in-time access"];
const TARGETS = ["Servers", "Databases", "Cloud · Entra ID", "Network · infra"];

export default function ControlPlane() {
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) setOn(true); }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // geometry
  const rowY = (i) => 70 + i * 58;          // node row centers
  const idX = 70, idW = 150;                 // identity column
  const tgX = 460, tgW = 150;                // target column
  const vaultX = 250, vaultW = 180, vaultCx = vaultX + vaultW / 2;

  return (
    <div ref={ref} className="cp-wrap" aria-hidden="true">
      <svg viewBox="0 0 680 360" className="cp-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="cpCore" cx="0.5" cy="0.42" r="0.6">
            <stop offset="0" stopColor="#26ffc0" />
            <stop offset="0.5" stopColor="#10e0a0" />
            <stop offset="1" stopColor="#0a8a66" />
          </radialGradient>
          <linearGradient id="cpEdgeIn" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#2563eb" stopOpacity="0.05" />
            <stop offset="1" stopColor="#5b8def" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="cpEdgeOut" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#16f0ad" stopOpacity="0.55" />
            <stop offset="1" stopColor="#16f0ad" stopOpacity="0.05" />
          </linearGradient>
          <filter id="cpGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3.2" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="cpSoft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* connection edges: identities -> vault */}
        {IDENTITIES.map((_, i) => {
          const y = rowY(i);
          const d = `M ${idX + idW} ${y} C ${vaultX - 36} ${y}, ${vaultX - 24} 180, ${vaultX} 180`;
          return (
            <g key={"ein" + i}>
              <path d={d} fill="none" stroke="url(#cpEdgeIn)" strokeWidth="1.1" opacity={on ? 0.7 : 0}
                    style={{ transition: `opacity .8s ${0.2 + i * 0.1}s` }} />
              <circle r="2.4" fill="#9ec1f7" className={on ? "cp-pkt" : ""} style={{ offsetPath: `path("${d}")`, animationDelay: `${i * 0.5}s` }} />
            </g>
          );
        })}

        {/* connection edges: vault -> targets */}
        {TARGETS.map((_, i) => {
          const y = rowY(i);
          const d = `M ${vaultX + vaultW} 180 C ${vaultX + vaultW + 24} 180, ${tgX - 36} ${y}, ${tgX} ${y}`;
          return (
            <g key={"eout" + i}>
              <path d={d} fill="none" stroke="url(#cpEdgeOut)" strokeWidth="1.1" opacity={on ? 0.7 : 0}
                    style={{ transition: `opacity .8s ${0.5 + i * 0.1}s` }} />
              <circle r="2.4" fill="#3df0c0" className={on ? "cp-pkt" : ""} style={{ offsetPath: `path("${d}")`, animationDelay: `${0.6 + i * 0.5}s` }} />
            </g>
          );
        })}

        {/* identity nodes */}
        {IDENTITIES.map((label, i) => (
          <g key={"id" + i} className="cp-node" style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateX(-8px)", transition: `all .6s ${i * 0.08}s` }}>
            <rect x={idX} y={rowY(i) - 19} width={idW} height="38" rx="9" fill="#0e1420" stroke="#223049" strokeWidth="1" />
            <circle cx={idX + 18} cy={rowY(i)} r="3" fill="#5b8def" />
            <text x={idX + 34} y={rowY(i)} fill="#c4d2e8" fontSize="12.5" dominantBaseline="central" fontFamily="var(--font-inter), sans-serif">{label}</text>
          </g>
        ))}

        {/* target nodes */}
        {TARGETS.map((label, i) => (
          <g key={"tg" + i} className="cp-node" style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateX(8px)", transition: `all .6s ${0.3 + i * 0.08}s` }}>
            <rect x={tgX} y={rowY(i) - 19} width={tgW} height="38" rx="9" fill="#0e1420" stroke="#223049" strokeWidth="1" />
            <circle cx={tgX + 16} cy={rowY(i)} r="3" fill="#16f0ad" />
            <text x={tgX + 30} y={rowY(i)} fill="#c4d2e8" fontSize="12.5" dominantBaseline="central" fontFamily="var(--font-inter), sans-serif">{label}</text>
          </g>
        ))}

        {/* vault core */}
        <g style={{ opacity: on ? 1 : 0, transition: "opacity .8s .2s" }}>
          <ellipse cx={vaultCx} cy="180" rx="120" ry="120" fill="#10e0a0" opacity="0.10" filter="url(#cpSoft)" className="cp-halo" />
          <rect x={vaultX} y="74" width={vaultW} height="212" rx="16" fill="#0c1119" stroke="#1c3a30" strokeWidth="1.2" />
          <rect x={vaultX} y="74" width={vaultW} height="212" rx="16" fill="none" stroke="#10e0a0" strokeWidth="1" opacity="0.35" className="cp-vaultedge" />

          {/* core orb */}
          <circle cx={vaultCx} cy="112" r="15" fill="url(#cpCore)" filter="url(#cpGlow)" className="cp-core" />
          <path d={`M ${vaultCx - 6} 112 l 4 4 l 7 -8`} fill="none" stroke="#04140d" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

          <text x={vaultCx} y="142" textAnchor="middle" fill="#eaf7f1" fontSize="14" fontWeight="600" fontFamily="var(--font-fraunces), serif">Vault</text>
          <text x={vaultCx} y="160" textAnchor="middle" fill="#5fae93" fontSize="11" letterSpacing="0.08em" fontFamily="var(--font-inter), sans-serif">CYBERARK · IDIRA</text>

          {VAULT.map((label, i) => (
            <text key={"v" + i} x={vaultCx} y={186 + i * 22} textAnchor="middle" fill="#9fc7b8" fontSize="11.5"
                  fontFamily="var(--font-inter), sans-serif" className="cp-vline" style={{ animationDelay: `${0.6 + i * 0.12}s`, opacity: on ? undefined : 0 }}>
              {label}
            </text>
          ))}
        </g>

        {/* zone captions */}
        <text x={idX + idW / 2} y="36" textAnchor="middle" fill="#6b7a90" fontSize="11" letterSpacing="0.14em" fontFamily="var(--font-inter), sans-serif">IDENTITIES</text>
        <text x={vaultCx} y="36" textAnchor="middle" fill="#ff7a63" fontSize="11" letterSpacing="0.14em" fontWeight="600" fontFamily="var(--font-inter), sans-serif">CONTROL PLANE</text>
        <text x={tgX + tgW / 2} y="36" textAnchor="middle" fill="#6b7a90" fontSize="11" letterSpacing="0.14em" fontFamily="var(--font-inter), sans-serif">TARGET ESTATE</text>
        <text x={(idX + idW + vaultX) / 2} y="330" textAnchor="middle" fill="#4d5a6e" fontSize="10.5" fontFamily="var(--font-mono), monospace">request</text>
        <text x={(vaultX + vaultW + tgX) / 2} y="330" textAnchor="middle" fill="#4d5a6e" fontSize="10.5" fontFamily="var(--font-mono), monospace">brokered</text>
      </svg>

      <style jsx>{`
        .cp-wrap { width: 100%; }
        .cp-svg { width: 100%; height: auto; display: block; overflow: visible; }
        .cp-pkt { offset-rotate: 0deg; animation: cpFlow 2.6s linear infinite; }
        @keyframes cpFlow { from { offset-distance: 0%; opacity: 0; } 8% { opacity: 1; } 92% { opacity: 1; } to { offset-distance: 100%; opacity: 0; } }
        .cp-core { animation: cpPulse 2.6s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
        @keyframes cpPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.14); } }
        .cp-halo { animation: cpHalo 4s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
        @keyframes cpHalo { 0%,100% { opacity: 0.08; } 50% { opacity: 0.16; } }
        .cp-vaultedge { animation: cpEdge 3.5s ease-in-out infinite; }
        @keyframes cpEdge { 0%,100% { opacity: 0.25; } 50% { opacity: 0.5; } }
        .cp-vline { animation: cpFade 0.7s ease both; }
        @keyframes cpFade { from { opacity: 0; } to { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) {
          .cp-pkt, .cp-core, .cp-halo, .cp-vaultedge, .cp-vline { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
