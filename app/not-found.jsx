import Link from "next/link";
import Logo from "@/components/Logo";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center py-24">
      <div className="wrap text-center max-w-[560px]">
        <div className="flex justify-center mb-8">
          <Logo size={72} animated />
        </div>
        <div className="font-display text-cobalt-bright text-[15px] font-semibold tracking-[0.14em] uppercase mb-4">
          Error 404 · Access path not found
        </div>
        <h1 className="font-display font-medium text-ink leading-tight mb-4" style={{ fontSize: "clamp(32px,5vw,52px)" }}>
          This route didn&apos;t resolve.
        </h1>
        <p className="text-ink-soft text-[17px] leading-relaxed mb-8">
          The page you&apos;re looking for isn&apos;t here — it may have moved, or the link
          was mistyped. Let&apos;s get you back to a verified path.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/" className="btn btn-pri btn-lg">Back to home</Link>
          <Link href="/services" className="btn btn-sec btn-lg">Browse services</Link>
        </div>
      </div>
    </section>
  );
}
