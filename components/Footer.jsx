import Link from "next/link";
import Logo from "@/components/Logo";
import { SITE, SERVICES } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-base-black border-t border-hair pt-20 pb-10">
      <div className="wrap">
        {/* Authority statement */}
        <div className="pb-14 mb-12 border-b border-hair">
          <Link href="/" className="inline-flex items-center gap-3 mb-5" aria-label="Link3IT home">
            <Logo size={40} tone="mono" />
            <span className="font-display text-[26px] font-semibold text-ink">
              Link<span className="text-cobalt-bright">3</span>IT
            </span>
          </Link>
          <p className="font-display text-[22px] md:text-[26px] font-medium text-ink leading-snug max-w-[620px]">
            Independent identity security advisory for the environments that can&apos;t afford to get privileged access wrong.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-[14px] text-ink-soft">
            <span>Identity Security</span><span className="text-hair">·</span>
            <span>Privileged Access Management</span><span className="text-hair">·</span>
            <span>Identity Governance</span><span className="text-hair">·</span>
            <span>Zero Trust Architecture</span>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-hair">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-faint mb-4">Services</h4>
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="block text-sm text-ink-soft py-1.5 hover:text-ink transition-colors">
                {s.title}
              </Link>
            ))}
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-faint mb-4">Company</h4>
            <Link href="/#engagements" className="block text-sm text-ink-soft py-1.5 hover:text-ink transition-colors">Engagements</Link>
            <Link href="/method" className="block text-sm text-ink-soft py-1.5 hover:text-ink transition-colors">Our Method</Link>
            <Link href="/insights" className="block text-sm text-ink-soft py-1.5 hover:text-ink transition-colors">Insights</Link>
            <Link href="/about" className="block text-sm text-ink-soft py-1.5 hover:text-ink transition-colors">About</Link>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-faint mb-4">Trust</h4>
            <Link href="/security" className="block text-sm text-ink-soft py-1.5 hover:text-ink transition-colors">Security Statement</Link>
            <Link href="/privacy" className="block text-sm text-ink-soft py-1.5 hover:text-ink transition-colors">Privacy</Link>
            <Link href="/terms" className="block text-sm text-ink-soft py-1.5 hover:text-ink transition-colors">Terms</Link>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-faint mb-4">Contact</h4>
            <Link href="/contact" className="block text-sm text-ink-soft py-1.5 hover:text-ink transition-colors">Request a review</Link>
            <a href={`mailto:${SITE.email}`} className="block text-sm text-ink-soft py-1.5 hover:text-ink transition-colors break-all">{SITE.email}</a>
            <span className="block text-sm text-ink-muted py-1.5">New York, NY</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-3 pt-8 text-[13px] text-ink-faint">
          <span>© {new Date().getFullYear()} Link3IT — {SITE.legal}. All rights reserved.</span>
          <span>Independent Identity Security Advisory</span>
        </div>
        <p className="mt-4 text-[11.5px] text-ink-faint/80 leading-relaxed max-w-[760px]">
          All product and company names are trademarks™ or registered® trademarks of their respective holders.
          Link3IT is an independent advisory and is not affiliated with, endorsed by, or a partner of any vendor
          referenced on this site. Vendor and platform names indicate the technologies our engagements work across.
        </p>
      </div>
    </footer>
  );
}
