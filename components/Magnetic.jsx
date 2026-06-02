"use client";

import { useRef } from "react";

// Wraps an element so it drifts slightly toward the cursor on hover — a subtle,
// premium micro-interaction. Desktop/fine-pointer only; no-op on touch & reduced-motion.
export default function Magnetic({ children, strength = 0.25, className = "" }) {
  const ref = useRef(null);

  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia && (window.matchMedia("(pointer: coarse)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }
  function reset() {
    const el = ref.current;
    if (el) el.style.transform = "translate(0,0)";
  }

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`inline-block transition-transform duration-300 ease-smooth will-change-transform ${className}`}
    >
      {children}
    </span>
  );
}
