"use client";

import Reveal from "@/components/Reveal";

// Platform capability grid. Each tile names a tool we work ACROSS, with an
// ORIGINAL glyph treatment (not the vendor's trademarked logo) and a category
// label. Tool names are factual; the marks are our own. Framed as scope of
// practice, never partnership — with a trademark disclaimer below.

const PLATFORMS = [
  { name: "CyberArk · Idira", cat: "Privileged Access", glyph: "shield" },
  { name: "Microsoft Entra ID", cat: "Cloud Identity", glyph: "hex" },
  { name: "Active Directory", cat: "Directory", glyph: "tree" },
  { name: "Okta", cat: "Identity Provider", glyph: "ring" },
  { name: "HashiCorp Vault", cat: "Secrets", glyph: "vault" },
  { name: "Zero Trust", cat: "Architecture", glyph: "node" },
];

const FRAMEWORKS = ["NIST 800-53", "CIS Controls v8", "ISO 27001", "SOC 2"];

const GLYPHS = {
  shield: <path d="M12 2l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V5l8-3z" />,
  hex: <path d="M12 2l8.5 5v10L12 22l-8.5-5V7L12 2z" />,
  tree: <><circle cx="12" cy="5" r="2.5" /><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="M12 7.5v4M12 11.5L6 15.5M12 11.5l6 4" /></>,
  ring: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /></>,
  vault: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="12" cy="12" r="4" /><path d="M12 8v8M8 12h8" /></>,
  node: <><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="M8 11l8-4M8 13l8 4" /></>,
};

export default function PlatformGrid() {
  return (
    <section className="py-20 border-y border-hair bg-base-panel/30" aria-label="Platforms and frameworks we work across">
      <div className="wrap">
        <Reveal className="text-center max-w-[640px] mx-auto mb-10">
          <span className="eyebrow block mb-3">Platforms &amp; Frameworks We Work Across</span>
          <p className="text-ink-soft leading-relaxed">
            Deep, hands-on expertise across the identity stack — and the control frameworks your
            audits are measured against.
          </p>
        </Reveal>

        {/* platform tiles */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
          {PLATFORMS.map((p, i) => (
            <Reveal key={p.name} delay={i * 50}>
              <div className="group flex items-center gap-4 rounded-xl border border-hair bg-base-panel px-5 py-4 h-full transition-all duration-300 hover:border-cobalt-line hover:bg-base-panel2">
                <div className="w-11 h-11 rounded-lg bg-cobalt-soft flex items-center justify-center shrink-0 transition-colors group-hover:bg-cobalt/20">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
                       strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px] text-cobalt-bright">
                    {GLYPHS[p.glyph]}
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="font-display text-[17px] font-medium text-ink leading-tight truncate">{p.name}</div>
                  <div className="text-[12px] text-ink-muted mt-0.5">{p.cat}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* framework strip */}
        <Reveal delay={120}>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-xl border border-hair bg-base-panel2 px-5 py-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted mr-1">Aligned to</span>
            {FRAMEWORKS.map((f, i) => (
              <span key={f} className="flex items-center gap-3">
                <span className="font-mono text-[13px] text-ink-soft">{f}</span>
                {i < FRAMEWORKS.length - 1 && <span className="text-hair">·</span>}
              </span>
            ))}
          </div>
        </Reveal>

        {/* trademark disclaimer */}
        <Reveal>
          <p className="text-center text-[11.5px] text-ink-faint mt-6 max-w-[640px] mx-auto leading-relaxed">
            All product and company names are trademarks™ or registered® trademarks of their respective
            holders. Link3IT is an independent advisory and is not affiliated with, endorsed by, or a
            partner of any vendor listed. Names indicate the platforms our engagements work across.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
