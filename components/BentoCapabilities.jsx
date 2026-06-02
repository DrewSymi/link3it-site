"use client";

import Reveal from "@/components/Reveal";

// Bento grid: asymmetric, modular capability cards. Visual hierarchy through
// size — the flagship cell is largest. The pattern Apple/MS/Google standardized.

function Icon({ d, multi }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-cobalt-bright">
      {multi || <path d={d} />}
    </svg>
  );
}

export default function BentoCapabilities() {
  return (
    <section className="py-24">
      <div className="wrap">
        <Reveal className="max-w-[680px] mb-12">
          <span className="eyebrow block mb-4">Full-Spectrum Identity Security</span>
          <h2 className="shead-h mb-4">Everything that touches privileged access.</h2>
          <p className="text-lg text-ink-soft leading-relaxed">
            One specialist across the entire identity estate — so the seams between platforms become
            controls, not gaps.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(0,1fr)] gap-4">
          {/* Flagship — large cell spanning 2 cols + 2 rows */}
          <Reveal className="md:col-span-2 md:row-span-2">
            <div className="card card-shine h-full p-8 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-cobalt/10 blur-3xl group-hover:bg-cobalt/20 transition-colors duration-700" />
              <div className="relative-z">
                <div className="w-12 h-12 rounded-xl bg-cobalt-soft flex items-center justify-center mb-5">
                  <Icon multi={<><path d="M12 2l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V5l8-3z" /><path d="M9 12l2 2 4-4" /></>} />
                </div>
                <h3 className="font-display text-[26px] font-medium mb-3">Privileged Access Management</h3>
                <p className="text-ink-soft leading-relaxed max-w-[420px]">
                  CyberArk vault, CPM rotation, PSM session isolation, and least-privilege safe design —
                  deployed, hardened, and verified. The credentials that can end your business, brought
                  fully under control.
                </p>
              </div>
              <div className="relative-z flex flex-wrap gap-2 mt-6">
                {["Vault & policy", "CPM rotation", "PSM recording", "JIT elevation"].map((t) => (
                  <span key={t} className="text-[12px] font-medium text-ink-soft bg-base border border-hair px-3 py-1.5 rounded-full">{t}</span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Cloud identity */}
          <Reveal delay={60}>
            <div className="card card-shine h-full p-6 group">
              <div className="w-11 h-11 rounded-xl bg-cobalt-soft flex items-center justify-center mb-4">
                <Icon multi={<><path d="M12 2l8.5 5v10L12 22l-8.5-5V7L12 2z" /><path d="M12 8v8M8 10l8 4" /></>} />
              </div>
              <h3 className="text-[18px] mb-2">Cloud Identity</h3>
              <p className="text-[14px] text-ink-soft leading-relaxed">Entra ID hardening — Conditional Access, PIM, MFA coverage, legacy-auth lockdown.</p>
            </div>
          </Reveal>

          {/* Directory */}
          <Reveal delay={120}>
            <div className="card card-shine h-full p-6 group">
              <div className="w-11 h-11 rounded-xl bg-cobalt-soft flex items-center justify-center mb-4">
                <Icon multi={<><circle cx="12" cy="5" r="2.5" /><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="M12 7.5v3M12 10.5L6.5 15.5M12 10.5l5.5 5" /></>} />
              </div>
              <h3 className="text-[18px] mb-2">Active Directory</h3>
              <p className="text-[14px] text-ink-soft leading-relaxed">Attack-path review — privileged groups, delegation, Kerberoast exposure, tiering.</p>
            </div>
          </Reveal>

          {/* Governance — wide cell */}
          <Reveal delay={60} className="md:col-span-2">
            <div className="card card-shine h-full p-6 flex items-start gap-5 group">
              <div className="w-11 h-11 rounded-xl bg-cobalt-soft flex items-center justify-center shrink-0">
                <Icon multi={<><path d="M4 4h16v16H4z" opacity="0" /><path d="M9 11l3 3L22 4M21 12v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h11" /></>} />
              </div>
              <div>
                <h3 className="text-[18px] mb-2">Identity Governance &amp; Lifecycle</h3>
                <p className="text-[14px] text-ink-soft leading-relaxed">
                  Joiner-mover-leaver automation with verified deprovisioning, access certification, and
                  audit-ready evidence — so access stays clean and provable over time.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Zero Trust */}
          <Reveal delay={120}>
            <div className="card card-shine h-full p-6 group">
              <div className="w-11 h-11 rounded-xl bg-cobalt-soft flex items-center justify-center mb-4">
                <Icon multi={<><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="M8 11l8-4M8 13l8 4" /></>} />
              </div>
              <h3 className="text-[18px] mb-2">Zero Trust Strategy</h3>
              <p className="text-[14px] text-ink-soft leading-relaxed">Board-ready, identity-centered roadmap — sequenced so it won&apos;t break operations.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
