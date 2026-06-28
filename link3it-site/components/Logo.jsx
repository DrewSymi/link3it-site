"use client";

/**
 * Link3IT mark — "The Privileged Path"
 *
 * The numeral 3 is built as an access path: identities (the terminal nodes)
 * flow along it and converge at a single secured core at the pinch — the one
 * verified control point every privileged action must pass through. That single
 * chokepoint IS privileged access management.
 *
 * One glance reads three ways at once:
 *   · the 3 in Link3IT            (brand)
 *   · an access path with nodes   (identity security)
 *   · one verified core at center (PAM — the privileged control point)
 *
 * Props:
 *   size      px dimension (square)
 *   tone      "default" | "mono"  (mono = solid cobalt tile for dark footers)
 *   animated  play the story-telling draw-on sequence, then idle-pulse the core
 */
export default function Logo({ size = 32, tone = "default", animated = false }) {
  const tile = tone === "mono" ? "#2563eb" : "#0a0a0a";
  const tileStroke = tone === "mono" ? "none" : "#23262e";
  const stroke = tone === "mono" ? "#dbe6fb" : "url(#l3grad)";
  const node = tone === "mono" ? "#eaf1fd" : "#7ba4f2";
  const checkColor = tone === "mono" ? "#0a2540" : "#04140d";

  // The "3" as one continuous access path. Terminals at (34,30) and (34,70);
  // pinch (the convergence/control point) at center ~(50,50).
  const PATH = "M34 30 C34 21 43 19 51 20 C64 21 69 31 67 40 C65 48 57 50 50 50 C57 50 65 52 67 60 C69 69 64 79 51 80 C43 81 34 79 34 70";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      role="img"
      aria-label="Link3IT mark"
      className={animated ? "l3-anim" : "l3-static"}
    >
      <defs>
        <linearGradient id="l3grad" x1="28" y1="20" x2="72" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5b8def" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
        <radialGradient id="l3core" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor="#16f0ad" />
          <stop offset="1" stopColor="#0a8a66" />
        </radialGradient>
      </defs>

      <rect width="100" height="100" rx="24" fill={tile} stroke={tileStroke} />

      {/* the access path that forms the 3 */}
      <path
        className="l3-path"
        style={{ "--len": 150 }}
        d={PATH}
        stroke={stroke}
        strokeWidth="7.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* identity nodes at the path terminals */}
      <circle className="l3-node n1" cx="34" cy="29" r="4.6" fill={node} />
      <circle className="l3-node n2" cx="34" cy="71" r="4.6" fill={node} />

      {/* verified core at the pinch — the single privileged control point */}
      <circle className="l3-corering" cx="50" cy="50" r="13.5" fill="none" stroke="url(#l3core)" strokeWidth="1.6" opacity="0.5" />
      <circle className="l3-core" cx="50" cy="50" r="9.5" fill="url(#l3core)" />
      <path className="l3-check" d="M45.5 50 L49 53.5 L55 47" stroke={checkColor} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      <style jsx>{`
        @keyframes l3draw { to { stroke-dashoffset: 0; } }
        @keyframes l3pop { 0% { opacity: 0; transform: scale(0); } 60% { transform: scale(1.3); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes l3glow { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.85; transform: scale(1.08); } }
        @keyframes l3check { from { stroke-dashoffset: 16; } to { stroke-dashoffset: 0; } }

        .l3-static .l3-path, .l3-static .l3-check { stroke-dasharray: none; }

        .l3-anim .l3-path { stroke-dasharray: var(--len); stroke-dashoffset: var(--len); animation: l3draw 1.1s cubic-bezier(0.6,0,0.2,1) forwards; }
        .l3-anim .l3-node { opacity: 0; transform-origin: center; animation: l3pop 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .l3-anim .n1 { animation-delay: 0.15s; }
        .l3-anim .n2 { animation-delay: 0.95s; }
        .l3-anim .l3-corering { opacity: 0; transform-origin: 50px 50px; animation: l3pop 0.5s 1.05s cubic-bezier(0.34,1.56,0.64,1) forwards, l3glow 4s 1.7s ease-in-out infinite; }
        .l3-anim .l3-core { opacity: 0; transform-origin: 50px 50px; animation: l3pop 0.5s 1.15s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .l3-anim .l3-check { stroke-dasharray: 16; stroke-dashoffset: 16; animation: l3check 0.4s 1.45s ease forwards; }

        @media (prefers-reduced-motion: reduce) {
          .l3-anim .l3-path, .l3-anim .l3-node, .l3-anim .l3-corering,
          .l3-anim .l3-core, .l3-anim .l3-check {
            animation: none !important; opacity: 1 !important;
            stroke-dashoffset: 0 !important; transform: none !important;
          }
          .l3-anim .l3-corering { opacity: 0.5 !important; }
        }
      `}</style>
    </svg>
  );
}
