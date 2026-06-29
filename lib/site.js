// Single source of truth for site-wide content.
// Service data here feeds /services (listing) AND /services/[slug] (detail pages).

export const SITE = {
  name: "Link3IT",
  legal: "LJSTECH LLC DBA Link3IT",
  email: "asymister1@gmail.com",
  tagline: "Identity Security & Privileged Access",
  url: "https://link3it.com",
};

export const NAV = [
  { href: "/services", label: "Services" },
  { href: "/#engagements", label: "Engagements" },
  { href: "/method", label: "Method" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const SERVICES = [
  {
    slug: "cyberark-health-check",
    tag: "Flagship",
    flag: "Most requested starting point",
    title: "CyberArk Health Check",
    short: "A structured review of your CyberArk deployment — now Idira, part of Palo Alto Networks — against leading practice, the fastest way to see your true privileged-access risk.",
    problem:
      "PAM platforms drift. Policies loosen, accounts quietly fall out of management, and reconciliation fails without anyone noticing. A deployment that passed its go-live review two years ago can be silently degraded today — and the recent move under Palo Alto Networks has many teams unsure who now owns their platform health.",
    approach:
      "A disciplined review across vault configuration, CPM credential rotation, PSM session management, PVWA, platform policies, and safe design — measured against CIS Controls, NIST 800-53, and vendor leading practice, using read-only evidence. The methodology is unchanged by the Idira rebrand: the Vault, CPM, PVWA, PSM, and PSMP components — and the engineering that secures them — are the same.",
    outcome:
      "A prioritized findings report and risk-ranked remediation roadmap. You get a precise picture of privileged-access risk and the fastest path to closing it — typically in one to two weeks.",
    deliverables: [
      "Prioritized findings report (risk-ranked, with evidence)",
      "Remediation roadmap sequenced by risk-reduction-per-effort",
      "Configuration leading-practice gap analysis",
      "Executive summary for leadership",
    ],
    findings: [
      "Service accounts vaulted but excluded from rotation",
      "CPM reconciliation failing silently",
      "Over-permissive membership on tier-0 safes",
      "PSM session recording gaps on a subset of targets",
    ],
    timeline: "1–2 weeks",
  },
  {
    slug: "entra-id-assessment",
    tag: "Assessment",
    title: "Entra ID Security Assessment",
    short: "Harden your Microsoft cloud identity against the gaps attackers exploit most — Conditional Access, MFA coverage, and privileged roles.",
    problem:
      "Cloud directories are a primary target, and the gaps usually hide in the exceptions: legacy authentication that bypasses modern controls, Conditional Access exclusions that grew over time, and standing privileged roles with no just-in-time elevation.",
    approach:
      "A review of Conditional Access policies, MFA coverage, privileged role assignments and PIM, hybrid sync, legacy authentication, and guest access — assessed against current adversary techniques, not a generic checklist.",
    outcome:
      "A hardened cloud-identity posture with prioritized fixes for the gaps most likely to be exploited, and a coverage map you can actually produce on demand for auditors.",
    deliverables: [
      "Conditional Access gap analysis",
      "Privileged role & PIM review",
      "MFA coverage map",
      "Prioritized hardening plan",
    ],
    findings: [
      "Conditional Access exclusion groups beyond intended scope",
      "Legacy authentication still permitted",
      "Global Admins beyond recommended count",
      "Guest access without governance or expiry",
    ],
    timeline: "1–2 weeks",
  },
  {
    slug: "active-directory-review",
    tag: "Review",
    title: "Active Directory Security Review",
    short: "Close the directory weaknesses attackers reach for first — privileged groups, delegation, and known AD attack paths.",
    problem:
      "Active Directory is the foundation almost everything trusts, and it's frequently the part that has never been hardened since it was stood up. Attackers know it, and they target it first to escalate and move laterally.",
    approach:
      "A security review of privileged groups, delegation, GPO security, Kerberos configuration, stale and orphaned accounts, and known AD attack-path exposure — mapped to how an adversary would actually use each weakness.",
    outcome:
      "A clear, tiered remediation plan that closes the directory weaknesses used to escalate and move laterally — prioritized so the highest-risk paths are cut first.",
    deliverables: [
      "Privileged group & delegation review",
      "AD attack-path findings",
      "Stale / orphaned account inventory",
      "Tiered remediation roadmap",
    ],
    findings: [
      "Excessive Domain Admin membership",
      "Unconstrained delegation present",
      "Stale privileged accounts still active",
      "Kerberoastable service accounts",
    ],
    timeline: "1–2 weeks",
  },
  {
    slug: "zero-trust-architecture-review",
    tag: "Strategy",
    title: "Zero Trust Architecture Review",
    short: "A credible, board-ready Zero Trust roadmap — identity-centered and sequenced so it won't break operations.",
    problem:
      "Zero Trust is widely mandated and rarely sequenced well. Teams stall on where to begin, buy tools before defining the control strategy, or attempt too much at once and break the business in the process.",
    approach:
      "Assess current maturity across identity, device, and access, then build a phased, identity-centered roadmap aligned to a recognized Zero Trust model — with each phase scoped so operations keep running.",
    outcome:
      "A credible, board-ready Zero Trust plan with clear phases, owners, and milestones — something leadership can fund and your team can actually execute.",
    deliverables: [
      "Current-state maturity assessment",
      "Target-state architecture (identity-centered)",
      "Phased, sequenced roadmap",
      "Board-ready executive briefing",
    ],
    findings: [
      "No clear control strategy across identity tools",
      "Implicit trust inside the network perimeter",
      "Standing privilege with no JIT model",
      "No continuous verification of access",
    ],
    timeline: "2–3 weeks",
  },
];

export function getService(slug) {
  return SERVICES.find((s) => s.slug === slug) || null;
}

// Tiered engagement structure. Research shows 58% of buyers want pricing context
// up front; tiers position a practice (not a freelancer) and give SMB an entry
// point while enterprise sees scale. "Starting at" framing keeps it honest and
// negotiable — final scope/price is always agreed on the first call.
export const TIERS = [
  {
    name: "Starter Health Check",
    audience: "Growing teams & SMB",
    priceLabel: "Fixed-scope",
    priceNote: "Single-domain focused review",
    tagline: "One environment, one clear verdict.",
    features: [
      "One focus area (CyberArk, Entra ID, or AD)",
      "Prioritized findings report",
      "Risk-ranked remediation roadmap",
      "Executive summary",
      "One readout call",
    ],
    cta: "Start here",
    interest: "CyberArk Health Check",
    featured: false,
  },
  {
    name: "Professional Assessment",
    audience: "Mid-market",
    priceLabel: "Fixed-scope",
    priceNote: "Multi-domain, deeper engagement",
    tagline: "The full picture across your identity estate.",
    features: [
      "Multiple domains assessed together",
      "Cross-domain maturity baseline",
      "Attack-path analysis",
      "Phased remediation roadmap",
      "Remediation support options",
      "Evidence pack for audit",
    ],
    cta: "Most popular",
    interest: "IAM Program Design",
    featured: true,
  },
  {
    name: "Enterprise Program",
    audience: "Enterprise & regulated",
    priceLabel: "Custom",
    priceNote: "Scoped to your program",
    tagline: "Ongoing partnership, board-ready outcomes.",
    features: [
      "Full-estate identity security program",
      "Zero Trust architecture & roadmap",
      "PAM deployment / migration support",
      "Retained advisory & escalations",
      "Audit & compliance alignment",
      "Quarterly posture reviews",
    ],
    cta: "Let's talk",
    interest: "Zero Trust Architecture Review",
    featured: false,
  },
];

// Compliance / framework alignment — the trust signal that gets SMB past
// enterprise procurement gates. Framed as ALIGNMENT (honest), not certification.
export const COMPLIANCE = [
  { name: "NIST 800-53", note: "Controls mapped to findings" },
  { name: "CIS Controls v8", note: "Benchmark-aligned reviews" },
  { name: "ISO 27001", note: "ISMS-aware engagements" },
  { name: "SOC 2", note: "Evidence supports your audit" },
];
