"use client";

import { useState, useEffect } from "react";
import { SITE, SERVICES } from "@/lib/site";
import { Check } from "@/components/ui";

// FormSubmit endpoint. Using the email-based AJAX endpoint so no build-time
// secret is needed. On ANY failure we fall back to a pre-filled mailto so a
// lead is never silently lost — the message reaches asymister@link3it.com
// one way or another.
const ENDPOINT = `https://formsubmit.co/ajax/${SITE.email}`;

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "", email: "", company: "", size: "", interest: "", timeline: "", challenge: "", referredBy: "", _honey: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | fallback

  // Pre-fill "interest" from a ?interest= query param (set by the tier CTAs).
  // Reads window.location directly so it works with static export — no Suspense
  // boundary required. Only accepts values that match our known options.
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const want = params.get("interest");
      if (!want) return;
      const allowed = [...SERVICES.map((s) => s.title), "IAM Program Design", "Not sure yet — need guidance"];
      if (allowed.includes(want)) setForm((s) => ({ ...s, interest: want }));
    } catch {
      /* no-op */
    }
  }, []);

  const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const set = (f, v) => {
    setForm((s) => ({ ...s, [f]: v }));
    if (errors[f]) setErrors((e) => ({ ...e, [f]: false }));
  };

  function buildMailto() {
    const lines = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.company && `Company: ${form.company}`,
      form.size && `Company size: ${form.size}`,
      form.interest && `Interest: ${form.interest}`,
      form.timeline && `Timeline: ${form.timeline}`,
      form.referredBy && `Referred by: ${form.referredBy}`,
      "",
      "Challenge:",
      form.challenge,
    ].filter(Boolean).join("\n");
    return `mailto:${SITE.email}?subject=${encodeURIComponent("Consultation request — " + (form.company || form.name))}&body=${encodeURIComponent(lines)}`;
  }

  async function submit(e) {
    e.preventDefault();
    if (form._honey) return; // bot trap
    const next = {};
    if (!form.name.trim()) next.name = true;
    if (!validEmail(form.email.trim())) next.email = true;
    if (!form.challenge.trim()) next.challenge = true;
    setErrors(next);
    if (Object.keys(next).length) {
      // focus first invalid field for accessibility
      const firstBad = Object.keys(next)[0];
      const el = document.getElementById(`cf-${firstBad}`);
      if (el) el.focus();
      return;
    }

    setStatus("sending");
    const payload = {
      Name: form.name, Email: form.email, Company: form.company,
      "Company size": form.size, Interest: form.interest, Timeline: form.timeline,
      Challenge: form.challenge, "Referred by": form.referredBy,
      _subject: `New consultation request — ${form.company || form.name}`,
      _template: "table",
    };

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("non-ok");
      setStatus("sent");
    } catch {
      // Guaranteed delivery path: open the user's mail client pre-filled.
      setStatus("fallback");
      window.location.href = buildMailto();
    }
  }

  if (status === "sent") {
    return (
      <div className="card p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-signal-green/12 flex items-center justify-center mx-auto mb-5 text-signal-green">
          <Check className="w-8 h-8" />
        </div>
        <h3 className="text-[22px] mb-2">Request received.</h3>
        <p className="text-ink-soft max-w-[360px] mx-auto mb-5">
          Thank you, {form.name.split(" ")[0] || "and welcome"}. Your request is in — expect a personal
          reply from Andrew within one business day.
        </p>
        <p className="text-[13px] text-ink-muted">
          Prefer to add more? Email <a className="text-cobalt-bright font-semibold" href={`mailto:${SITE.email}`}>{SITE.email}</a> anytime.
        </p>
      </div>
    );
  }

  if (status === "fallback") {
    return (
      <div className="card p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-cobalt-soft flex items-center justify-center mx-auto mb-5 text-cobalt-bright">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8"><path d="M4 4h16v16H4z" opacity="0" /><path d="M22 6l-10 7L2 6" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>
        </div>
        <h3 className="text-[22px] mb-2">Opening your email…</h3>
        <p className="text-ink-soft max-w-[380px] mx-auto mb-5">
          We&apos;ve pre-filled a message to Andrew in your email app. Just hit send. If nothing opened,
          email us directly:
        </p>
        <a href={`mailto:${SITE.email}`} className="btn btn-pri">Email {SITE.email}</a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="card p-7 md:p-8">
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"
             value={form._honey} onChange={(e) => set("_honey", e.target.value)} className="hidden" />

      <div className="grid sm:grid-cols-2 gap-4">
        <Field id="cf-name" label="Full name" req error={errors.name} msg="Please enter your name.">
          <input id="cf-name" type="text" autoComplete="name" className={`field ${errors.name ? "field-err" : ""}`}
                 value={form.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} aria-required="true" />
        </Field>
        <Field id="cf-email" label="Work email" req error={errors.email} msg="Please enter a valid email.">
          <input id="cf-email" type="email" autoComplete="email" className={`field ${errors.email ? "field-err" : ""}`}
                 value={form.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} aria-required="true" />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        <Field id="cf-company" label="Company">
          <input id="cf-company" type="text" autoComplete="organization" className="field"
                 value={form.company} onChange={(e) => set("company", e.target.value)} />
        </Field>
        <Field id="cf-size" label="Company size">
          <select id="cf-size" className="field appearance-none" value={form.size} onChange={(e) => set("size", e.target.value)}>
            <option value="">Select…</option>
            <option>1–200</option><option>200–1,000</option><option>1,000–5,000</option><option>5,000+</option>
          </select>
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        <Field id="cf-interest" label="Primary interest">
          <select id="cf-interest" className="field appearance-none" value={form.interest} onChange={(e) => set("interest", e.target.value)}>
            <option value="">Select…</option>
            {SERVICES.map((s) => <option key={s.slug}>{s.title}</option>)}
            <option>IAM Program Design</option>
            <option>Not sure yet — need guidance</option>
          </select>
        </Field>
        <Field id="cf-timeline" label="Timeline">
          <select id="cf-timeline" className="field appearance-none" value={form.timeline} onChange={(e) => set("timeline", e.target.value)}>
            <option value="">Select…</option>
            <option>Immediate (0–30 days)</option><option>This quarter</option><option>This half</option><option>Exploring</option>
          </select>
        </Field>
      </div>

      <div className="mt-4">
        <Field id="cf-challenge" label="Most pressing identity challenge" req error={errors.challenge} msg="A sentence or two is enough.">
          <textarea id="cf-challenge" rows={3} className={`field ${errors.challenge ? "field-err" : ""}`}
                    value={form.challenge} onChange={(e) => set("challenge", e.target.value)} aria-invalid={!!errors.challenge} aria-required="true" />
        </Field>
      </div>

      <div className="mt-4">
        <Field id="cf-referredBy" label="Referred by (optional)">
          <input id="cf-referredBy" type="text" placeholder="Who pointed you to Link3IT?" className="field"
                 value={form.referredBy} onChange={(e) => set("referredBy", e.target.value)} />
        </Field>
      </div>

      <button type="submit" className="btn btn-pri btn-lg btn-block mt-6" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Request Consultation"}
      </button>
      <p className="text-[12.5px] text-ink-muted text-center mt-4">
        A real person reads every message. Typical reply within one business day.
      </p>
    </form>
  );
}

function Field({ id, label, req, error, msg, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[12.5px] font-semibold text-ink-soft mb-1.5">
        {label} {req && <span className="text-cobalt-bright">*</span>}
      </label>
      {children}
      {error && <span role="alert" className="block text-[12px] text-signal-red mt-1.5">{msg}</span>}
    </div>
  );
}
