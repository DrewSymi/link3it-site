import Link from "next/link";
import Reveal from "@/components/Reveal";

export function SectionHead({ eyebrow, title, intro, center = false, className = "" }) {
  return (
    <Reveal className={`${center ? "text-center mx-auto" : ""} max-w-[680px] mb-12 ${className}`}>
      {eyebrow && <span className="eyebrow block mb-4">{eyebrow}</span>}
      <h2 className="shead-h mb-4">{title}</h2>
      {intro && <p className="text-lg text-ink-soft leading-relaxed">{intro}</p>}
    </Reveal>
  );
}

// Big page header used at the top of interior pages.
export function PageHeader({ eyebrow, title, intro }) {
  return (
    <header className="relative pt-24 pb-16 md:pt-28 md:pb-20 overflow-hidden">
      <div className="wrap relative-z">
        <Reveal>
          {eyebrow && <span className="eyebrow block mb-4">{eyebrow}</span>}
          <h1 className="font-display font-medium text-ink leading-[1.06] text-balance"
              style={{ fontSize: "clamp(34px,5vw,56px)" }}>
            {title}
          </h1>
          {intro && <p className="text-lg md:text-xl text-ink-soft leading-relaxed mt-6 max-w-[640px]">{intro}</p>}
        </Reveal>
      </div>
    </header>
  );
}

export function CTABand({
  title = "Reduce identity risk — start with a conversation.",
  body = "A focused discussion of your privileged access and identity priorities, and where Link3IT can reduce risk fastest. No pitch, no obligation.",
  primary = { href: "/contact", label: "Schedule a consultation" },
  secondary = { href: "/services/cyberark-health-check", label: "Explore the Health Check" },
}) {
  return (
    <section className="py-24 border-t border-hair bg-gradient-to-b from-base-panel to-base">
      <div className="wrap text-center">
        <Reveal>
          <h2 className="shead-h mb-4 max-w-[640px] mx-auto text-balance">{title}</h2>
          <p className="text-lg text-ink-soft leading-relaxed max-w-[540px] mx-auto mb-8">{body}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={primary.href} className="btn btn-pri btn-lg">{primary.label}</Link>
            {secondary && <Link href={secondary.href} className="btn btn-sec btn-lg">{secondary.label}</Link>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Check({ className = "w-[18px] h-[18px]" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
         strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}
