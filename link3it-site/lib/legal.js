// Legal/policy content as structured data. Plain-English, accurate for a
// solo consulting practice. Pages render from these so wording stays consistent.

export const LAST_UPDATED = "June 2026";

export const PRIVACY = {
  title: "Privacy Policy",
  intro:
    "Link3IT (a practice of LJSTECH LLC) respects your privacy. This policy explains what we collect through this website, why, and how we handle it. It is written in plain language on purpose.",
  sections: [
    {
      h: "What we collect",
      body: "We only collect the information you choose to send us — your name, email, company, and the details you include when you submit the consultation form or email us directly. We do not require an account, and we do not collect sensitive personal data through this site.",
    },
    {
      h: "How we use it",
      body: "We use what you send solely to respond to your inquiry, scope potential work, and follow up about an engagement. We do not sell, rent, or share your information with third parties for marketing.",
    },
    {
      h: "Form handling",
      body: "Consultation requests are delivered to our inbox through a form-processing service that forwards the submission by email. The contents are the information you entered; it is transmitted to deliver your message and is not used for any other purpose.",
    },
    {
      h: "Analytics & cookies",
      body: "This site is intentionally lightweight. It does not set advertising cookies or sell behavioral data. If basic, privacy-respecting analytics are used, they are limited to aggregate traffic understanding and contain no information that identifies you personally.",
    },
    {
      h: "Data retention",
      body: "We keep inquiry correspondence only as long as needed to respond and, where an engagement results, to maintain normal business records. You may ask us to delete your inquiry data at any time.",
    },
    {
      h: "Your choices",
      body: "You can request access to, correction of, or deletion of any information you have sent us by emailing asymister@link3it.com. We will respond promptly.",
    },
  ],
};

export const TERMS = {
  title: "Terms of Use",
  intro:
    "These terms govern your use of the Link3IT website. By using the site you agree to them. They are deliberately brief.",
  sections: [
    {
      h: "Informational purpose",
      body: "The content on this site — including articles, the maturity assessment, checklists, and sample materials — is provided for general information. It does not constitute a security audit, certification, legal advice, or a guarantee of any particular outcome. A formal engagement is defined by a separate written agreement.",
    },
    {
      h: "The self-assessment & sample materials",
      body: "The interactive assessment and any downloadable checklists or sample reports are indicative tools to aid understanding. They are not a substitute for a formal review of your environment and should not be relied upon as one.",
    },
    {
      h: "Intellectual property",
      body: "The site's content, design, brand mark, and written materials are the property of LJSTECH LLC unless otherwise noted. You may share links freely; please do not republish substantial content as your own.",
    },
    {
      h: "No warranty",
      body: "The site is provided \u201Cas is.\u201D While we work to keep information accurate and current, we make no warranties about completeness or fitness for a particular purpose.",
    },
    {
      h: "Limitation of liability",
      body: "To the extent permitted by law, LJSTECH LLC is not liable for indirect or consequential damages arising from use of this informational website. Engagement-specific terms are addressed in the applicable services agreement.",
    },
    {
      h: "Contact",
      body: "Questions about these terms can be sent to asymister@link3it.com.",
    },
  ],
};

export const SECURITY = {
  title: "Security Statement",
  intro:
    "Identity security is the practice — so the way we handle your information should reflect that. This statement describes how Link3IT approaches security during engagements and on this site.",
  sections: [
    {
      h: "Least-privilege access",
      body: "During engagements, access to your environment is scoped to exactly what the work requires and is read-only wherever possible. We never request standing or broad administrative access we don't need, and we document what access is granted before any work begins.",
    },
    {
      h: "Handling of findings & evidence",
      body: "Assessment evidence and findings are treated as confidential. They are shared with you and retained only as long as needed to deliver the report and roadmap. Sensitive details are never reused across clients.",
    },
    {
      h: "Confidentiality",
      body: "Engagements operate under confidentiality from day one, and a mutual non-disclosure agreement is welcomed and routine. Client identities are never disclosed without explicit permission, which is why public materials on this site are anonymized.",
    },
    {
      h: "This website",
      body: "The site is a static build with no database and no stored user accounts, which minimizes its attack surface. The only information it transmits is what you choose to send through the contact form or by email.",
    },
    {
      h: "Responsible disclosure",
      body: "If you believe you've found a security issue with this site, we'd genuinely like to know. Please email asymister@link3it.com and we'll respond quickly.",
    },
  ],
};

export const LEGAL_PAGES = { privacy: PRIVACY, terms: TERMS, security: SECURITY };
