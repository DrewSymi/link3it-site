"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import { NAV } from "@/lib/site";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (href) => pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-md transition-colors duration-300 ${
        scrolled ? "bg-base/95 border-b border-hair" : "bg-base/90 border-b border-hair/60"
      }`}
      aria-label="Primary"
    >
      <div className="wrap flex items-center justify-between h-[72px]">
        <Link href="/" className="flex items-center gap-3 group" aria-label="Link3IT home">
          <span className="transition-transform duration-500 group-hover:rotate-[360deg]">
            <Logo size={32} animated />
          </span>
          <span className="font-display text-[21px] font-semibold text-ink">
            Link<span className="text-cobalt-bright">3</span>IT
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              data-active={isActive(l.href)}
              className={`nav-underline text-[14.5px] font-medium transition-colors ${
                isActive(l.href) ? "text-ink" : "text-ink-soft hover:text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden sm:inline-flex text-[14px] font-semibold text-white bg-coral px-[18px] py-[10px] rounded-lg hover:bg-coral-deep transition-colors"
          >
            Schedule Consultation
          </Link>
          <button
            className="md:hidden p-2"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block w-[22px] h-0.5 bg-ink mb-1.5" />
            <span className="block w-[22px] h-0.5 bg-ink mb-1.5" />
            <span className="block w-[22px] h-0.5 bg-ink" />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-base-panel border-b border-hair px-6 py-6 flex flex-col gap-5 shadow-lift">
          {NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-[15px] font-medium ${isActive(l.href) ? "text-ink" : "text-ink-soft"}`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-pri btn-block mt-1">
            Schedule Consultation
          </Link>
        </div>
      )}
    </nav>
  );
}
