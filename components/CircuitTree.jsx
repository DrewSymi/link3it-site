"use client";

import { useEffect, useRef } from "react";

// Original generative "circuit tree" — branches grow upward like a root/tree
// while drawing circuit-node joints. Evokes an identity graph / attack tree.
// Cobalt lines, coral + emerald node accents. Subtle, sits behind hero content.

export default function CircuitTree({ className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf, W, H, DPR;
    const segments = []; // growing line segments
    const nodes = [];     // circuit joints

    const COBALT = "#2563eb";
    const CORAL = "#ff5436";
    const EMERALD = "#06b67f";

    function size() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    // Build a branching tree structure (precomputed), then animate the draw.
    function buildTree() {
      segments.length = 0; nodes.length = 0;
      const rng = (a, b) => a + Math.random() * (b - a);

      function branch(x, y, angle, len, depth, order) {
        if (depth <= 0 || len < 14) return;
        const x2 = x + Math.cos(angle) * len;
        const y2 = y + Math.sin(angle) * len;
        segments.push({ x1: x, y1: y, x2, y2, order, drawn: 0 });
        // node at the joint
        if (Math.random() > 0.35) {
          const r = Math.random();
          nodes.push({
            x: x2, y: y2, order: order + 1,
            color: r > 0.82 ? CORAL : r > 0.62 ? EMERALD : COBALT,
            size: rng(1.6, 3.2), t: 0,
          });
        }
        const branches = depth > 3 ? 2 : (Math.random() > 0.4 ? 2 : 1);
        for (let i = 0; i < branches; i++) {
          const spread = rng(0.28, 0.72) * (i === 0 ? -1 : 1);
          branch(x2, y2, angle + spread, len * rng(0.68, 0.82), depth - 1, order + 1);
        }
      }

      // a few trees rising from the lower-right, growing up-left (like roots of access)
      const origins = [
        { x: W * 0.82, y: H * 1.02, a: -Math.PI / 2 - 0.3, l: H * 0.13 },
        { x: W * 0.95, y: H * 0.9, a: -Math.PI / 2 - 0.6, l: H * 0.1 },
        { x: W * 0.68, y: H * 1.05, a: -Math.PI / 2 - 0.05, l: H * 0.11 },
      ];
      origins.forEach((o) => branch(o.x, o.y, o.a, o.l, 6, 0));
    }

    let progress = 0;
    const maxOrder = 9;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      progress += reduce ? maxOrder : 0.05;
      const reveal = Math.min(progress, maxOrder);

      ctx.lineCap = "round";
      for (const s of segments) {
        if (s.order > reveal) continue;
        const local = Math.min(1, (reveal - s.order));
        s.drawn += (local - s.drawn) * 0.12;
        const dx = s.x1 + (s.x2 - s.x1) * s.drawn;
        const dy = s.y1 + (s.y2 - s.y1) * s.drawn;
        const fade = Math.max(0.12, 0.5 - s.order * 0.035);
        ctx.strokeStyle = `rgba(37,99,235,${fade})`;
        ctx.lineWidth = Math.max(0.6, 1.6 - s.order * 0.12);
        ctx.beginPath();
        ctx.moveTo(s.x1, s.y1);
        ctx.lineTo(dx, dy);
        ctx.stroke();
      }

      const tnow = performance.now() / 1000;
      for (const n of nodes) {
        if (n.order > reveal) continue;
        n.t = Math.min(1, n.t + 0.04);
        const pulse = 0.6 + 0.4 * Math.sin(tnow * 1.6 + n.x * 0.01);
        ctx.globalAlpha = n.t * (0.35 + 0.4 * pulse);
        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fill();
        // faint ring
        ctx.globalAlpha = n.t * 0.18 * pulse;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size * 2.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      if (!reduce) raf = requestAnimationFrame(draw);
    }

    function init() { size(); buildTree(); progress = 0; draw(); }
    init();
    let to;
    const onResize = () => { clearTimeout(to); to = setTimeout(init, 200); };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); clearTimeout(to); };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" style={{ width: "100%", height: "100%", display: "block" }} />;
}
