"use client";

import { useEffect, useRef, useState } from "react";

// Kinetic typography: splits a headline into words that rise + fade in,
// staggered, when the heading scrolls into view. Reduced-motion safe.
export default function Kinetic({ text, className = "", as: Tag = "h2", highlight = [] }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      (e) => { if (e[0].isIntersecting) { setOn(true); io.disconnect(); } },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ");
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => {
        const hi = highlight.includes(w.replace(/[.,—]/g, ""));
        return (
          <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden="true">
            <span
              className={`inline-block ${hi ? "italic text-cobalt-bright" : ""}`}
              style={{
                transform: on ? "translateY(0)" : "translateY(110%)",
                opacity: on ? 1 : 0,
                transition: `transform 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 70}ms, opacity 0.7s ease ${i * 70}ms`,
              }}
            >
              {w}
            </span>
            {i < words.length - 1 && "\u00A0"}
          </span>
        );
      })}
    </Tag>
  );
}
