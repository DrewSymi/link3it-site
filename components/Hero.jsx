"use client";

import Link from "next/link";
import ControlPlane from "@/components/ControlPlane";
import Magnetic from "@/components/Magnetic";

export default function Hero() {
  return (
    <header className="hero-stage relative overflow-hidden">
      <div className="hero-glow" aria-hidden="true" />

      <div className="wrap relative-z">
        <div className="grid lg:grid-cols-[1.02fr_0.98fr] gap-12 lg:gap-10 items-center py-24 md:py-28">
          {/* Left: headline */}
          <div className="max-w-[620px]">
            <span className="hero-eyebrow hero-line" style={{ "--i": 0 }}>
              Independent Identity Security Advisory
            </span>

            <h1 className="hero-title font-display font-medium leading-[1.04] mt-6"
                style={{ fontSize: "clamp(38px,5vw,62px)" }}>
              <span className="hero-line block" style={{ "--i": 1 }}>Secure the most powerful</span>
              <span className="hero-line block" style={{ "--i": 2 }}>accounts in your <span className="hero-accent">organization.</span></span>
            </h1>

            <div className="hero-line mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] font-medium hero-sub" style={{ "--i": 3 }}>
              <span>Not endpoints.</span><span className="hero-dim">·</span>
              <span>Not laptops.</span><span className="hero-dim">·</span>
              <span className="hero-bright">Identities.</span>
            </div>

            <p className="hero-body text-[18px] leading-relaxed max-w-[520px] mt-6 hero-line" style={{ "--i": 4 }}>
              Link3IT performs independent identity security reviews that uncover hidden privilege-escalation
              paths, PAM weaknesses, identity sprawl, and administrative exposure — before attackers do.
            </p>

            <div className="flex items-center gap-2.5 text-[13.5px] hero-stack mt-7 mb-9 hero-line" style={{ "--i": 5 }}>
              <span className="w-1.5 h-1.5 rounded-full bg-signal-emerald shrink-0 hero-dot" />
              CyberArk · Idira · Microsoft Entra ID · Active Directory · Identity Governance
            </div>

            <div className="flex flex-wrap gap-4 hero-line" style={{ "--i": 6 }}>
              <Magnetic><Link href="/contact" className="btn btn-pri btn-lg">Request Executive Review</Link></Magnetic>
              <Magnetic><Link href="/services/cyberark-health-check" className="btn btn-ghost-light btn-lg">View Sample Report</Link></Magnetic>
            </div>
          </div>

          {/* Right: animated control plane */}
          <div className="hero-diagram hero-line" style={{ "--i": 3 }}>
            <ControlPlane />
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-stage {
          background:
            radial-gradient(ellipse 60% 55% at 78% 42%, rgba(22,240,160,0.10), transparent 60%),
            radial-gradient(ellipse 70% 60% at 60% 30%, rgba(37,99,235,0.14), transparent 62%),
            linear-gradient(180deg, #07090e 0%, #0a0d14 55%, #090b11 100%);
        }
        .hero-glow {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background: radial-gradient(circle 380px at 76% 46%, rgba(16,224,160,0.10), transparent 70%);
        }
        .relative-z { position: relative; z-index: 2; }
        .hero-eyebrow { color: #ff7a63; font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 0.16em; display: block; }
        .hero-title { color: #f7f8fb; letter-spacing: -0.02em; }
        .hero-accent { font-style: italic; color: #7ba4f2; }
        .hero-sub { color: #9aa6b6; }
        .hero-sub .hero-bright { color: #f7f8fb; }
        .hero-dim { color: #3a4252; }
        .hero-body { color: #b9c2cf; }
        .hero-stack { color: #8893a4; }
        .hero-diagram { filter: drop-shadow(0 20px 50px rgba(0,0,0,0.5)); }

        @keyframes heroIn { 0% { opacity: 0; transform: translateY(22px); } 100% { opacity: 1; transform: translateY(0); } }
        .hero-line { opacity: 0; animation: heroIn 0.85s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: calc(var(--i) * 0.09s); }
        @keyframes dotPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(22,240,160,0.5); } 50% { box-shadow: 0 0 0 5px rgba(22,240,160,0); } }
        .hero-dot { animation: dotPulse 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hero-line, .hero-dot { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </header>
  );
}
