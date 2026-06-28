"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

// Click-to-copy email with confirmation. Always falls back to a normal mailto.
export default function EmailCopy() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked — open mail client instead
      window.location.href = `mailto:${SITE.email}`;
    }
  }

  return (
    <div className="card p-5 flex items-center justify-between gap-3">
      <div>
        <div className="text-[12.5px] text-ink-muted mb-0.5">Prefer email? Reach Andrew directly</div>
        <a href={`mailto:${SITE.email}`} className="text-cobalt-bright font-semibold text-[15px] break-all">{SITE.email}</a>
      </div>
      <button
        onClick={copy}
        className="shrink-0 inline-flex items-center gap-1.5 text-[13px] font-semibold px-3 py-2 rounded-lg border border-hair hover:border-cobalt-line hover:bg-base-panel transition-colors"
        aria-label="Copy email address"
      >
        {copied ? (
          <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg><span className="text-signal-green">Copied</span></>
        ) : (
          <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></svg>Copy</>
        )}
      </button>
    </div>
  );
}
