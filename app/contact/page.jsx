import { PageHeader } from "@/components/ui";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import EmailCopy from "@/components/EmailCopy";
import { Check } from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Contact",
  description: "Schedule a consultation with Link3IT — a focused conversation about your privileged access and identity priorities. A real person replies within one business day.",
};

const POINTS = [
  { h: "No big-firm overhead", p: "You work directly with the engineer doing the work — not a sales team and a junior bench." },
  { h: "Fixed scope, fixed price", p: "Agreed on the first call. No surprise change orders, no padded timelines." },
  { h: "You keep everything", p: "Reports, evidence, and roadmaps are yours — built so your team can execute without us." },
  { h: "Discretion by default", p: "Regulated-environment experience; scoped, read-only access and confidentiality from day one. NDAs welcome." },
];

const STEPS = [
  { n: "01", h: "You reach out", p: "Send the form or email. A real person — Andrew — reads it, not a queue." },
  { n: "02", h: "Reply within one business day", p: "You'll get a personal response to set up a short, no-pressure call." },
  { n: "03", h: "A focused 30-minute call", p: "We talk through your environment and priorities. You leave with a clear sense of the right first step — whether or not it's with Link3IT." },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get Started"
        title="Let's talk about your identity risk."
        intro="A focused conversation about your privileged access and identity priorities — and where Link3IT can reduce risk fastest. If someone referred you, mention them and we'll skip straight to your environment."
      />

      <section className="pb-20">
        <div className="wrap grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <Reveal>
            <div className="space-y-6">
              <div className="space-y-5">
                {POINTS.map((pt) => (
                  <div key={pt.h} className="flex gap-3.5 items-start">
                    <span className="text-signal-emerald mt-0.5 shrink-0"><Check className="w-[20px] h-[20px]" /></span>
                    <div>
                      <div className="text-ink font-semibold text-[15px]">{pt.h}</div>
                      <div className="text-ink-soft text-[14px] leading-relaxed">{pt.p}</div>
                    </div>
                  </div>
                ))}
              </div>
              <EmailCopy />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* What happens next */}
      <section className="py-20 border-t border-hair bg-base-panel">
        <div className="wrap">
          <Reveal className="max-w-[680px] mb-12">
            <span className="eyebrow block mb-4">What Happens Next</span>
            <h2 className="shead-h">No black box. Here&apos;s exactly how it goes.</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div className="card p-6 h-full">
                  <div className="font-display text-[32px] font-semibold text-cobalt-line leading-none mb-3">{s.n}</div>
                  <h3 className="text-[18px] mb-2">{s.h}</h3>
                  <p className="text-[14px] text-ink-soft leading-relaxed">{s.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <p className="text-center text-ink-muted text-[14px]">
              Everything is confidential. No commitment is implied by reaching out — many first calls simply
              point you in the right direction.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
