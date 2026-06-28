"use client";

import Reveal from "@/components/Reveal";

// Identity exposure areas — a categorized matrix of everything a review covers.
// Density here signals comprehensiveness and makes the practice feel enterprise-scale.

const GROUPS = [
  {
    title: "Privileged Access",
    items: ["Standing admins", "Shared accounts", "Password rotation", "Safe permissions", "Session isolation"],
  },
  {
    title: "Cloud Identity",
    items: ["Conditional Access", "PIM eligibility", "Guest access", "Legacy authentication", "MFA coverage"],
  },
  {
    title: "Governance",
    items: ["Joiners / movers / leavers", "Access reviews", "Service accounts", "Secrets & key rotation", "Orphaned accounts"],
  },
  {
    title: "Machine & Workload",
    items: ["Machine identities", "Non-human accounts", "Automation credentials", "API & token sprawl", "Workload trust"],
  },
];

export default function ExposureAreas() {
  return (
    <section className="py-24 border-y border-hair bg-base-panel2">
      <div className="wrap">
        <Reveal className="max-w-[680px] mb-12">
          <span className="eyebrow block mb-4">Identity Exposure Areas</span>
          <h2 className="shead-h mb-4">Every place privilege hides — reviewed.</h2>
          <p className="text-lg text-ink-soft leading-relaxed">
            Identity risk doesn&apos;t live in one system. A Link3IT review spans the full estate, from
            the privileged vault to the machine identities most programs never inventory.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {GROUPS.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 70}>
              <div className="card h-full p-6">
                <h3 className="font-display text-[18px] font-medium mb-4 pb-3 border-b border-hair flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cobalt-bright" />
                  {g.title}
                </h3>
                <ul className="space-y-2.5">
                  {g.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-[14px] text-ink-soft">
                      <span className="text-signal-emerald/70 mt-0.5 shrink-0">▸</span>{it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
