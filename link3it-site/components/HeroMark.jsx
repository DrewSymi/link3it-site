"use client";

/**
 * Large hero rendition of "The Verified Path."
 * Orbiting satellite identities, drawn convergence paths, a pulsing verified core,
 * and a slow sweeping scan line — the story of bringing sprawl under control.
 * Pure CSS/SVG, GPU-friendly transforms, fully reduced-motion safe.
 */
export default function HeroMark() {
  return (
    <div className="hm-wrap" aria-hidden="true">
      <svg className="hm" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hmEdge" x1="60" y1="60" x2="200" y2="220" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5b8def" /><stop offset="1" stopColor="#2563eb" />
          </linearGradient>
          <radialGradient id="hmCore" cx="0.5" cy="0.45" r="0.6">
            <stop offset="0" stopColor="#16f0ad" />
            <stop offset="0.6" stopColor="#10e0a0" />
            <stop offset="1" stopColor="#0a8a66" />
          </radialGradient>
          <radialGradient id="hmHalo" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#10e0a0" stopOpacity="0.35" />
            <stop offset="1" stopColor="#10e0a0" stopOpacity="0" />
          </radialGradient>
          <filter id="hmBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* concentric guide rings */}
        <circle className="hm-ring r1" cx="160" cy="160" r="120" stroke="#23262e" strokeWidth="1" />
        <circle className="hm-ring r2" cx="160" cy="160" r="86" stroke="#23262e" strokeWidth="1" strokeDasharray="3 6" />
        <circle className="hm-ring r3" cx="160" cy="160" r="52" stroke="#2a3340" strokeWidth="1" />

        {/* convergence paths from satellites to core */}
        <g stroke="url(#hmEdge)" strokeLinecap="round" fill="none">
          <path className="hm-edge ee1" style={{ "--len": 150 }} strokeWidth="2.5" d="M70 70 C110 110, 130 130, 160 160" />
          <path className="hm-edge ee2" style={{ "--len": 130 }} strokeWidth="2.5" d="M250 96 C210 120, 190 140, 160 160" />
          <path className="hm-edge ee3" style={{ "--len": 120 }} strokeWidth="2"   d="M96 250 C124 214, 140 190, 160 160" opacity="0.7" />
          <path className="hm-edge ee4" style={{ "--len": 110 }} strokeWidth="2"   d="M240 236 C208 206, 184 184, 160 160" opacity="0.7" />
        </g>

        {/* traveling pulses along the primary paths */}
        <circle className="hm-pulse p1" r="3" fill="#7ba4f2" />
        <circle className="hm-pulse p2" r="3" fill="#7ba4f2" />

        {/* satellite identity nodes */}
        <g className="hm-sat s1"><circle cx="70" cy="70" r="8" fill="#5b8def" /><circle cx="70" cy="70" r="14" stroke="#5b8def" strokeWidth="1" opacity="0.3" /></g>
        <g className="hm-sat s2"><circle cx="250" cy="96" r="7" fill="#7ba4f2" /><circle cx="250" cy="96" r="12" stroke="#7ba4f2" strokeWidth="1" opacity="0.3" /></g>
        <g className="hm-sat s3"><circle cx="96" cy="250" r="6" fill="#7ba4f2" /></g>
        <g className="hm-sat s4"><circle cx="240" cy="236" r="6" fill="#5b8def" /></g>

        {/* verified core */}
        <circle className="hm-halo" cx="160" cy="160" r="46" fill="url(#hmHalo)" filter="url(#hmBlur)" />
        <circle className="hm-corering" cx="160" cy="160" r="30" fill="none" stroke="url(#hmCore)" strokeWidth="2.5" />
        <circle className="hm-core" cx="160" cy="160" r="20" fill="url(#hmCore)" />
        <path className="hm-check" d="M150 160 L157 167 L172 151" stroke="#04140d" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* sweeping scan line */}
        <g className="hm-scan"><line x1="160" y1="160" x2="160" y2="40" stroke="#10e0a0" strokeWidth="1.5" opacity="0.35" /></g>
      </svg>

      <style jsx>{`
        .hm-wrap { width: 100%; max-width: 420px; margin: 0 auto; }
        .hm { width: 100%; height: auto; overflow: visible; }

        @keyframes hmDraw { to { stroke-dashoffset: 0; } }
        @keyframes hmPop { 0% { opacity: 0; transform: scale(0); } 65% { transform: scale(1.25); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes hmGlow { 0%, 100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.04); } }
        @keyframes hmHaloPulse { 0%, 100% { opacity: 0.5; transform: scale(0.92); } 50% { opacity: 1; transform: scale(1.12); } }
        @keyframes hmCheck { from { stroke-dashoffset: 26; } to { stroke-dashoffset: 0; } }
        @keyframes hmSpin { to { transform: rotate(360deg); } }
        @keyframes hmDrift { 0%,100% { transform: translate(0,0); } 50% { transform: translate(3px,-4px); } }
        @keyframes hmRingDraw { from { stroke-dashoffset: 760; } to { stroke-dashoffset: 0; } }
        @keyframes hmTravel1 { 0% { offset-distance: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { offset-distance: 100%; opacity: 0; } }

        .hm-ring { transform-origin: 160px 160px; opacity: 0; animation: hmPop 0.8s ease forwards; }
        .hm-ring.r1 { animation-delay: 0.1s; }
        .hm-ring.r2 { animation-delay: 0.2s; }
        .hm-ring.r3 { animation-delay: 0.3s; }
        .hm-ring.r2 { animation: hmPop 0.8s 0.2s ease forwards, hmSpin 60s 1s linear infinite; }

        .hm-edge { stroke-dasharray: var(--len); stroke-dashoffset: var(--len); animation: hmDraw 1s cubic-bezier(0.6,0,0.2,1) forwards; }
        .ee1 { animation-delay: 0.5s; } .ee2 { animation-delay: 0.7s; } .ee3 { animation-delay: 0.9s; } .ee4 { animation-delay: 1.05s; }

        .hm-sat { transform-origin: center; opacity: 0; animation: hmPop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .s1 { animation-delay: 0.45s; } .s2 { animation-delay: 0.65s; } .s3 { animation-delay: 0.85s; } .s4 { animation-delay: 1s; }
        .hm-sat circle:first-child { animation: hmDrift 7s ease-in-out infinite; }

        .hm-halo { transform-origin: 160px 160px; opacity: 0; animation: hmPop 0.6s 1.3s ease forwards, hmHaloPulse 4s 2s ease-in-out infinite; }
        .hm-corering { transform-origin: 160px 160px; opacity: 0; animation: hmPop 0.6s 1.25s cubic-bezier(0.34,1.56,0.64,1) forwards, hmGlow 4s 2s ease-in-out infinite; }
        .hm-core { transform-origin: 160px 160px; opacity: 0; animation: hmPop 0.6s 1.4s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .hm-check { stroke-dasharray: 26; stroke-dashoffset: 26; animation: hmCheck 0.45s 1.75s ease forwards; }

        .hm-pulse { offset-rotate: 0deg; opacity: 0; }
        .p1 { offset-path: path("M70 70 C110 110, 130 130, 160 160"); animation: hmTravel1 2.4s 2.2s ease-in-out infinite; }
        .p2 { offset-path: path("M250 96 C210 120, 190 140, 160 160"); animation: hmTravel1 2.4s 3.0s ease-in-out infinite; }

        .hm-scan { transform-origin: 160px 160px; opacity: 0; animation: hmDraw 0.1s 2s forwards, hmSpin 8s 2s linear infinite; }
        .hm-scan { opacity: 1; }

        @media (prefers-reduced-motion: reduce) {
          .hm-ring, .hm-edge, .hm-sat, .hm-halo, .hm-corering, .hm-core, .hm-check, .hm-pulse, .hm-scan {
            animation: none !important; opacity: 1 !important;
            stroke-dashoffset: 0 !important; transform: none !important;
          }
          .hm-pulse { opacity: 0 !important; }
          .hm-scan { opacity: 0 !important; }
        }
      `}</style>
    </div>
  );
}
