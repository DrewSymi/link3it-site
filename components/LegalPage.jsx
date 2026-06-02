import Reveal from "@/components/Reveal";
import { LAST_UPDATED } from "@/lib/legal";

export default function LegalPage({ doc }) {
  return (
    <article className="pt-24 md:pt-28 pb-24">
      <div className="prose-wrap">
        <Reveal>
          <span className="eyebrow block mb-4">Legal</span>
          <h1 className="font-display font-medium text-ink leading-tight" style={{ fontSize: "clamp(30px,4.4vw,46px)" }}>
            {doc.title}
          </h1>
          <p className="text-ink-muted text-[14px] mt-3 mb-2">Last updated: {LAST_UPDATED}</p>
          <p className="text-ink-soft text-[17px] leading-relaxed mt-6 pb-8 border-b border-hair">{doc.intro}</p>
        </Reveal>

        <div className="mt-10 space-y-9">
          {doc.sections.map((s, i) => (
            <Reveal key={s.h} delay={i * 40}>
              <h2 className="font-display text-[22px] font-medium mb-3">{s.h}</h2>
              <p className="text-ink-soft leading-relaxed text-[16px]">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </article>
  );
}
