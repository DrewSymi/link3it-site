import { PageHeader, CTABand } from "@/components/ui";
import Reveal from "@/components/Reveal";
import Logo from "@/components/Logo";

export const metadata = {
  title: "About",
  description:
    "Link3IT is an identity security specialist practice founded by Andrew Symister — senior, specialized attention without big-firm overhead.",
};

// Verified-safe certifications only. Do not add unearned certs.
const CERTS = [
  { name: "CyberArk Trustee", status: "Earned", tone: "green" },
  { name: "CyberArk Defender (PAM)", status: "In Progress", tone: "amber" },
  { name: "CompTIA Security+ (SY0-701)", status: "In Progress", tone: "amber" },
];

const VALUES = [
  { h: "Specialist, not generalist", p: "The focus stays deliberately narrow — CyberArk, Entra ID, Active Directory, and the governance that ties them together. Depth beats breadth in identity security." },
  { h: "Senior attention, direct", p: "You work with the engineer doing the work, not a sales team and a junior bench. No translation layer, no hand-off to someone who's never seen your environment." },
  { h: "Operator's perspective", p: "Grounded in day-to-day identity operations inside a regulated, audit-intensive environment — so the advice reflects how these systems actually behave in production." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Link3IT"
        title="The specialist you call when you need depth — not a big firm's overhead."
        intro="Link3IT is an independent identity security practice built around a simple idea: mid-market and enterprise organizations deserve senior, specialized attention sized to their needs."
      />

      <section className="pb-20">
        <div className="wrap grid lg:grid-cols-[0.85fr_1.15fr] gap-14 items-start">
          {/* Founder card */}
          <Reveal>
            <div className="card p-8 lg:sticky lg:top-24">
              <div className="w-16 h-16 rounded-2xl bg-base border border-hair flex items-center justify-center mb-5">
                <Logo size={40} />
              </div>
              <h2 className="text-[22px] mb-1">Andrew Symister</h2>
              <div className="text-[14px] font-semibold text-cobalt-bright mb-5">Founder &amp; Identity Security Consultant</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-ink-muted mb-3">Certifications</div>
              {CERTS.map((c) => (
                <div key={c.name} className="flex justify-between items-center py-3 border-t border-hair text-[14.5px] text-ink">
                  <span>{c.name}</span>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                    c.tone === "green" ? "bg-signal-green/12 text-signal-green" : "bg-signal-amber/12 text-signal-amber"
                  }`}>{c.status}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Narrative */}
          <Reveal delay={100}>
            <div className="space-y-5">
              <p className="text-[17px] text-ink-soft leading-relaxed">
                Link3IT was founded by Andrew Symister, an identity engineer working in identity operations
                at a global financial-services firm — a regulated, audit-intensive environment where privileged
                access and governance are not optional.
              </p>
              <p className="text-[17px] text-ink-soft leading-relaxed">
                That operational reality shapes how Link3IT works: practical, control-focused, and grounded in
                how these systems actually behave in production — built and proven in a full hybrid-identity lab,
                not slideware.
              </p>
              <blockquote className="font-display text-[21px] italic text-ink leading-snug border-l-[3px] border-cobalt pl-6 my-8">
                &ldquo;The fastest way to reduce identity risk is rarely a new tool. It&apos;s getting disciplined
                about the privileged access you already have.&rdquo;
              </blockquote>
              <p className="text-[17px] text-ink-soft leading-relaxed">
                The expertise is grounded in hands-on engineering and technical certification rather than a
                particular pedigree — controlled reference environments, identity automation, and documented
                architectures that demonstrate the work rather than just describe it.
              </p>

              <div className="grid sm:grid-cols-1 gap-4 pt-6">
                {VALUES.map((v) => (
                  <div key={v.h} className="card p-6">
                    <h3 className="text-[18px] mb-2">{v.h}</h3>
                    <p className="text-[14.5px] text-ink-soft leading-relaxed">{v.p}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand secondary={{ href: "/method", label: "See how we work" }} />
    </>
  );
}
