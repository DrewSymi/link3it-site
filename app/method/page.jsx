import { PageHeader, CTABand } from "@/components/ui";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Our Method",
  description:
    "The Link3IT engagement method: a repeatable five-phase framework built on CIS Controls and NIST 800-53, from baseline through executive translation.",
};

const PHASES = [
  {
    n: "01", name: "Establish the baseline",
    fw: "Scoping aligned to CIS Controls v8 & NIST 800-53",
    body: "Before any finding, we agree what \u201Cgood\u201D means for your environment — the control set, the risk appetite, and the systems in scope. Everything downstream is measured against that baseline, not a generic checklist. This is the step most rushed engagements skip, and it's why their findings read as noise.",
    artifacts: ["Scoping document", "In-scope asset register", "Control baseline"],
  },
  {
    n: "02", name: "Evidence collection",
    fw: "Read-only, least-privilege access",
    body: "We gather configuration evidence directly from the platforms — vault policies, CPM rotation state, Conditional Access, privileged group membership — using scoped, read-only access. Findings are grounded in what the systems actually report, not in interviews or assumptions. Every claim in the final report traces back to an artifact.",
    artifacts: ["Evidence pack", "Configuration exports", "Access-path map"],
  },
  {
    n: "03", name: "Analysis against attack paths",
    fw: "Mapped to real adversary techniques",
    body: "Each gap is assessed for how an attacker would actually use it — credential theft, privilege escalation, lateral movement — and scored by exploitability and blast radius. The result reflects real risk, not just deviation from a standard. A misconfiguration that can't be reached matters less than one that hands over the domain.",
    artifacts: ["Risk-ranked findings", "Attack-path analysis", "Severity matrix"],
  },
  {
    n: "04", name: "Prioritized remediation",
    fw: "Sequenced by risk reduction per unit effort",
    body: "The roadmap orders fixes so the work that removes the most risk fastest comes first. Each item names the owner, the effort, and the control it satisfies — something your team can execute and your auditor can trace. Phase 1 is deliberately high-impact and low-effort: contain first, harden second, institutionalize third.",
    artifacts: ["Remediation roadmap", "Quick-wins list", "Owner assignments"],
  },
  {
    n: "05", name: "Executive translation",
    fw: "Board-ready, business-framed",
    body: "Finally, the technical reality is translated into a one-page narrative leadership can act on: where identity risk lives, what closing it costs, and what it buys. No jargon, no fear — just a decision-ready picture. Security work that leadership can't understand doesn't get funded.",
    artifacts: ["Executive summary", "Risk-posture snapshot", "Investment view"],
  },
];

const PRINCIPLES = [
  { h: "Evidence over opinion", p: "Every finding is grounded in configuration the platform actually reports — not what a questionnaire claims." },
  { h: "Least privilege, always", p: "We work with scoped, read-only access wherever possible. The review never expands your attack surface." },
  { h: "No lock-in", p: "Reports, evidence, and roadmaps are yours. They're built so your own team can execute without us." },
  { h: "Built in a lab, proven in production", p: "The method is refined against controlled reference environments before it ever touches a client." },
];

export default function MethodPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Link3IT Method"
        title="A repeatable framework — not improvisation."
        intro="Generic consultants improvise each engagement. Every Link3IT review runs the same disciplined five-phase method, built on published frameworks and validated in a controlled lab — so the rigor is consistent every time."
      />

      <section className="pb-12">
        <div className="wrap max-w-[860px]">
          {PHASES.map((p, i) => (
            <Reveal key={p.n} className="grid grid-cols-[56px_1fr] gap-6 md:gap-8">
              <div className="flex flex-col items-center">
                <span className="w-12 h-12 rounded-full bg-cobalt border border-cobalt-line text-white font-display text-[18px] font-semibold flex items-center justify-center shrink-0">{p.n}</span>
                {i < PHASES.length - 1 && <span className="flex-1 w-0.5 bg-hair my-2 min-h-[24px]" />}
              </div>
              <div className="pb-12">
                <div className="text-[11px] font-bold uppercase tracking-[0.07em] text-cobalt-bright mb-1.5">{p.fw}</div>
                <h2 className="font-display text-[24px] font-medium mb-3">{p.name}</h2>
                <p className="text-ink-soft leading-relaxed mb-4 max-w-[640px] text-[16px]">{p.body}</p>
                <div className="flex flex-wrap gap-2">
                  {p.artifacts.map((a) => (
                    <span key={a} className="text-xs font-semibold text-ink-soft bg-base border border-hair px-3 py-1.5 rounded-full">{a}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="py-20 bg-base-panel border-y border-hair">
        <div className="wrap">
          <Reveal className="max-w-[680px] mb-12">
            <span className="eyebrow block mb-4">What stays constant</span>
            <h2 className="shead-h">Principles that hold on every engagement.</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-4">
            {PRINCIPLES.map((pr, i) => (
              <Reveal key={pr.h} delay={i * 60}>
                <div className="card p-6 h-full">
                  <h3 className="text-[18px] mb-2">{pr.h}</h3>
                  <p className="text-[14.5px] text-ink-soft leading-relaxed">{pr.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="See the method applied to your environment." secondary={{ href: "/services", label: "Browse services" }} />
    </>
  );
}
