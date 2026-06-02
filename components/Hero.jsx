"use client";

import Link from "next/link";
import HeroMark from "@/components/HeroMark";
import CursorGlow from "@/components/CursorGlow";
import Magnetic from "@/components/Magnetic";

export default function Hero() {
  return (
    <header className="relative pt-24 pb-20 md:pt-28 md:pb-28 overflow-hidden">
      {/* ambient aurora behind hero */}
      <div className="hero-aura" aria-hidden="true" />
      <CursorGlow />

      <div className="wrap relative-z grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        <div>
          <span className="eyebrow block mb-6 hero-line" style={{ "--i": 0 }}>
            Identity Security &amp; Privileged Access
          </span>
          <h1 className="font-display font-medium text-ink leading-[1.04] text-balance"
              style={{ fontSize: "clamp(38px,5.4vw,64px)" }}>
            <span className="hero-line block" style={{ "--i": 1 }}>Expert identity security —</span>
            <span className="hero-line block italic text-cobalt-bright" style={{ "--i": 2 }}>
              without hiring a big firm.
            </span>
          </h1>
          <p className="text-[19px] leading-relaxed text-ink-soft max-w-[520px] mt-6 hero-line" style={{ "--i": 3 }}>
            Identity is now the primary attack surface. Most breaches don&apos;t break in — they log in,
            then move through privileged accounts no one is watching.
          </p>
          <p className="text-[19px] leading-relaxed text-ink font-medium max-w-[520px] mt-4 hero-line" style={{ "--i": 4 }}>
            Link3IT brings privileged access under control, hardens your directories, and gives you a
            clear path to Zero Trust — at a scale that fits your organization.
          </p>
          <div className="flex items-center gap-2.5 text-sm text-ink-muted mt-8 mb-8 hero-line" style={{ "--i": 5 }}>
            <span className="w-1.5 h-1.5 rounded-full bg-signal-green shrink-0 hero-dot" />
            CyberArk · Microsoft Entra ID · Active Directory · Identity Governance
          </div>
          <div className="flex flex-wrap gap-4 hero-line" style={{ "--i": 6 }}>
            <Magnetic><Link href="/services/cyberark-health-check" className="btn btn-pri btn-lg">Book a Health Check</Link></Magnetic>
            <Magnetic><Link href="/method" className="btn btn-sec btn-lg">See how we work</Link></Magnetic>
          </div>
        </div>

        <div className="order-first lg:order-last hero-line" style={{ "--i": 2 }}>
          <HeroMark />
        </div>
      </div>

      <style jsx>{`
        .hero-aura {
          position: absolute; top: -20%; right: -10%; width: 70%; height: 120%;
          background: radial-gradient(ellipse 50% 50% at 60% 30%, rgba(37,99,235,0.18), transparent 65%);
          pointer-events: none; z-index: 0;
          animation: auraFloat 12s ease-in-out infinite;
        }
        @keyframes auraFloat { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-3%,3%) scale(1.08); } }

        @keyframes heroIn { 0% { opacity: 0; transform: translateY(22px); } 100% { opacity: 1; transform: translateY(0); } }
        .hero-line { opacity: 0; animation: heroIn 0.8s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: calc(var(--i) * 0.09s); }

        @keyframes dotPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(16,224,160,0.5); } 50% { box-shadow: 0 0 0 5px rgba(16,224,160,0); } }
        .hero-dot { animation: dotPulse 2.4s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .hero-aura, .hero-line, .hero-dot { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </header>
  );
}
