import Link from "next/link";
import Logo from "@/components/Logo";
import { SITE, SERVICES } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-base-black border-t border-hair pt-20 pb-10">
      <div className="wrap">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 pb-12 border-b border-hair">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-2" aria-label="Link3IT home">
              <Logo size={32} tone="mono" />
              <span className="font-display text-[21px] font-semibold text-ink">
                Link<span className="text-cobalt-bright">3</span>IT
              </span>
            </Link>
            <p className="text-sm text-ink-muted leading-relaxed mt-4 max-w-[290px]">
              Identity security and privileged access consulting for mid-market and enterprise
              organizations. A practice of {SITE.legal}.
            </p>
          </div>

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
            <Link href="/method" className="block text-sm text-ink-soft py-1.5 hover:text-ink transition-colors">Our Method</Link>
            <Link href="/insights" className="block text-sm text-ink-soft py-1.5 hover:text-ink transition-colors">Insights</Link>
            <Link href="/about" className="block text-sm text-ink-soft py-1.5 hover:text-ink transition-colors">About</Link>
            <Link href="/contact" className="block text-sm text-ink-soft py-1.5 hover:text-ink transition-colors">Contact</Link>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-faint mb-4">Get Started</h4>
            <Link href="/contact" className="block text-sm text-ink-soft py-1.5 hover:text-ink transition-colors">Schedule a consultation</Link>
            <a href={`mailto:${SITE.email}`} className="block text-sm text-ink-soft py-1.5 hover:text-ink transition-colors">{SITE.email}</a>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-3 pt-8 text-[13px] text-ink-faint">
          <span>© {new Date().getFullYear()} {SITE.legal}</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-ink-soft transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-ink-soft transition-colors">Terms</Link>
            <Link href="/security" className="hover:text-ink-soft transition-colors">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
