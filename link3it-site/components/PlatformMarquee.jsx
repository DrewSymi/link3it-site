"use client";

// Original typographic wordmark treatments of the platforms/frameworks we work
// ACROSS — deliberately not the vendors' trademarked logos. Framed as scope of
// practice, never as partnership. Rendered as a seamless infinite marquee.

const PLATFORMS = [
  { name: "CyberArk · Idira", glyph: "shield" },
  { name: "Microsoft Entra ID", glyph: "hex" },
  { name: "Active Directory", glyph: "tree" },
  { name: "Okta", glyph: "ring" },
  { name: "HashiCorp Vault", glyph: "vault" },
  { name: "NIST 800-53", glyph: "doc" },
  { name: "CIS Controls", glyph: "check" },
  { name: "ISO 27001", glyph: "globe" },
  { name: "SOC 2", glyph: "lock" },
  { name: "Zero Trust", glyph: "node" },
];

const GLYPHS = {
  shield: <path d="M12 2l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V5l8-3z" />,
  hex: <path d="M12 2l8.5 5v10L12 22l-8.5-5V7L12 2z" />,
  tree: <><circle cx="12" cy="5" r="2.5" /><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="M12 7.5v4M12 11.5L6 15.5M12 11.5l6 4" /></>,
  ring: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /></>,
  vault: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="12" cy="12" r="4" /><path d="M12 8v8M8 12h8" /></>,
  doc: <><path d="M6 2h9l5 5v15H6z" /><path d="M14 2v6h6" /></>,
  check: <><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
  lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  node: <><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="M8 11l8-4M8 13l8 4" /></>,
};

function Item({ p }) {
  return (
    <div className="flex items-center gap-2.5 px-7 shrink-0">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
           strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] text-cobalt-bright/70">
        {GLYPHS[p.glyph]}
      </svg>
      <span className="font-display text-[19px] font-medium text-ink-soft whitespace-nowrap tracking-tight">
        {p.name}
      </span>
    </div>
  );
}

export default function PlatformMarquee() {
  // duplicated track for a seamless loop
  const track = [...PLATFORMS, ...PLATFORMS];
  return (
    <section className="relative py-10 border-y border-hair bg-base-panel/30 overflow-hidden" aria-label="Platforms and frameworks we work across">
      <p className="text-center text-[11px] font-semibold tracking-[0.18em] uppercase text-ink-muted mb-7">
        Platforms &amp; frameworks we work across
      </p>
      <div className="marquee-mask relative">
        <div className="marquee-track flex items-center">
          {track.map((p, i) => <Item key={i} p={p} />)}
        </div>
      </div>

      <style jsx>{`
        .marquee-mask {
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
        }
        .marquee-track { width: max-content; animation: marquee 42s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; flex-wrap: wrap; justify-content: center; }
        }
      `}</style>
    </section>
  );
}
