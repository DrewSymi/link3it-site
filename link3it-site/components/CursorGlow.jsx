"use client";

import { useEffect, useRef } from "react";

// A soft cobalt glow that trails the cursor within its parent section.
// Desktop + fine-pointer only; disabled for touch and reduced-motion.
export default function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const section = el.parentElement;
    if (!section) return;

    const fine = window.matchMedia && window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let raf;
    const move = (e) => {
      const r = section.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.opacity = "1";
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
    };
    const leave = () => { el.style.opacity = "0"; };

    section.addEventListener("mousemove", move);
    section.addEventListener("mouseleave", leave);
    return () => {
      section.removeEventListener("mousemove", move);
      section.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-500"
      style={{
        width: 480, height: 480, zIndex: 0,
        background: "radial-gradient(circle, rgba(37,99,235,0.10), transparent 60%)",
        marginLeft: -240, marginTop: -240,
      }}
    />
  );
}
