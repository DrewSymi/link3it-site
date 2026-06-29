"use client";

import Link from "next/link";
import ScanConsole from "@/components/ScanConsole";
import CursorGlow from "@/components/CursorGlow";
import IdentityField from "@/components/IdentityField";
import Magnetic from "@/components/Magnetic";

export default function Hero() {
  return (
    <header className="relative pt-24 pb-20 md:pt-28 md:pb-28 overflow-hidden">
      <div className="hero-aura" aria-hidden="true" />
      <div className="hero-tree" aria-hidden="true"><IdentityField /></div>
      <CursorGlow />

      <div className="wrap relative-z grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
        <div>
          <span className="eyebrow block mb-6 hero-line" style={{ "--i": 0 }}>
            Independent Identity Security Advisory
          </span>
          <h1 className="font-display font-medium text-ink leading-[1.02] text-balance"
              style={{ fontSize: "clamp(40px,5.6vw,68px)" }}>
            <span className="hero-line block" style={{ "--i": 1 }}>Secure the most powerful</span>
            <span className="hero-line block" style={{ "--i": 2 }}>accounts in your <em className="italic text-cobalt-bright">organization.</em></span>
          </h1>

          <div className="hero-line mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] text-ink-muted font-medium" style={{ "--i": 3 }}>
            <span>Not endpoints.</span><span className="text-hair">·</span>
            <span>Not laptops.</span><span className="text-hair">·</span>
            <span className="text-ink">Identities.</span>
          </div>

          <p className="text-[18px] leading-relaxed text-ink-soft max-w-[540px] mt-6 hero-line" style={{ "--i": 4 }}>
            Link3IT performs independent identity security reviews that uncover hidden privilege-escalation
            paths, PAM weaknesses, identity sprawl, and administrative exposure — before attackers do.
          </p>

          <div className="flex items-center gap-2.5 text-[13.5px] text-ink-muted mt-7 mb-8 hero-line" style={{ "--i": 5 }}>
            <span className="w-1.5 h-1.5 rounded-full bg-signal-green shrink-0 hero-dot" />
            CyberArk · Idira · Microsoft Entra ID · Active Directory · Identity Governance
          </div>

          <div className="flex flex-wrap gap-4 hero-line" style={{ "--i": 6 }}>
            <Magnetic><Link href="/contact" className="btn btn-pri btn-lg">Request Executive Review</Link></Magnetic>
            <Magnetic><Link href="/services/cyberark-health-check" className="btn btn-sec btn-lg">View Sample Report</Link></Magnetic>
          </div>
        </div>

        <div className="hero-line" style={{ "--i": 3 }}>
          <div className="shadow-lift rounded-2xl">
            <ScanConsole />
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-aura {
          position: absolute; top: -20%; right: -10%; width: 70%; height: 120%;
          background: radial-gradient(ellipse 50% 50% at 60% 30%, rgba(255,84,54,0.07), transparent 65%);
          pointer-events: none; z-index: 0; animation: auraFloat 12s ease-in-out infinite;
        }
        .hero-tree {
          position: absolute; top: 0; bottom: 0; left: 28%; right: -6%; z-index: 0; pointer-events: none;
          opacity: 0.9;
          mask-image: radial-gradient(ellipse 80% 75% at 70% 50%, rgba(0,0,0,1) 35%, transparent 78%);
          -webkit-mask-image: radial-gradient(ellipse 80% 75% at 70% 50%, rgba(0,0,0,1) 35%, transparent 78%);
        }
        @keyframes auraFloat { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-3%,3%) scale(1.08); } }
        @keyframes heroIn { 0% { opacity: 0; transform: translateY(22px); } 100% { opacity: 1; transform: translateY(0); } }
        .hero-line { opacity: 0; animation: heroIn 0.8s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: calc(var(--i) * 0.09s); }
        @keyframes dotPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(6,182,127,0.5); } 50% { box-shadow: 0 0 0 5px rgba(6,182,127,0); } }
        .hero-dot { animation: dotPulse 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hero-aura, .hero-line, .hero-dot { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </header>
  );
}
