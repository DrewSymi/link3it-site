"use client";

import { useEffect, useRef } from "react";

// Interactive 3D "identity graph" — a constellation of nodes and connections
// floating in space, slowly rotating and reacting to the cursor (parallax).
// Built on Three.js loaded from CDN at runtime, so it needs no npm dependency
// (keeps the static-export deploy clean). Cobalt nodes with coral/emerald
// accents on the light canvas. Degrades gracefully if WebGL/CDN unavailable.

const THREE_SRC = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";

function loadThree() {
  return new Promise((resolve, reject) => {
    if (window.THREE) return resolve(window.THREE);
    const existing = document.querySelector(`script[src="${THREE_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(window.THREE));
      existing.addEventListener("error", reject);
      return;
    }
    const s = document.createElement("script");
    s.src = THREE_SRC;
    s.async = true;
    s.onload = () => resolve(window.THREE);
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

export default function IdentityField({ className = "" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer, scene, camera, frame, ro;
    let disposed = false;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    loadThree().then((THREE) => {
      if (disposed || !THREE) return;

      const W = () => mount.clientWidth;
      const H = () => mount.clientHeight;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, W() / H(), 0.1, 100);
      camera.position.z = 26;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(W(), H());
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      const group = new THREE.Group();
      scene.add(group);

      // ---- build node cloud (an identity graph) ----
      const N = 150;
      const positions = [];
      const colors = [];
      const COBALT = new THREE.Color(0x2563eb);
      const CORAL = new THREE.Color(0xff5436);
      const EMERALD = new THREE.Color(0x06b67f);
      const pts = [];

      for (let i = 0; i < N; i++) {
        // distribute in a soft 3D volume, denser toward center
        const r = Math.pow(Math.random(), 0.7) * 18;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta) * 0.7;
        const z = r * Math.cos(phi);
        pts.push(new THREE.Vector3(x, y, z));
        positions.push(x, y, z);
        const roll = Math.random();
        const c = roll > 0.9 ? CORAL : roll > 0.78 ? EMERALD : COBALT;
        colors.push(c.r, c.g, c.b);
      }

      const nodeGeo = new THREE.BufferGeometry();
      nodeGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
      nodeGeo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
      const nodeMat = new THREE.PointsMaterial({
        size: 0.5, vertexColors: true, transparent: true, opacity: 0.95,
        sizeAttenuation: true, depthWrite: false,
      });
      const points = new THREE.Points(nodeGeo, nodeMat);
      group.add(points);

      // ---- connection lines between near nodes ----
      const linePos = [];
      const lineCol = [];
      const MAXD = 5.2;
      for (let i = 0; i < N; i++) {
        let links = 0;
        for (let j = i + 1; j < N && links < 4; j++) {
          if (pts[i].distanceTo(pts[j]) < MAXD) {
            linePos.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
            const a = 0.22;
            lineCol.push(0.15, 0.39, 0.92, 0.15, 0.39, 0.92);
            links++;
          }
        }
      }
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePos, 3));
      lineGeo.setAttribute("color", new THREE.Float32BufferAttribute(lineCol, 3));
      const lineMat = new THREE.LineBasicMaterial({
        vertexColors: true, transparent: true, opacity: 0.16, depthWrite: false,
      });
      const lines = new THREE.LineSegments(lineGeo, lineMat);
      group.add(lines);

      // gentle depth fade
      scene.fog = new THREE.Fog(0xfafaf9, 24, 52);

      // ---- interaction: parallax follow cursor ----
      const onMove = (e) => {
        const rect = mount.getBoundingClientRect();
        mouse.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouse.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      const clock = { t: 0 };
      function animate() {
        if (disposed) return;
        clock.t += 0.0016;
        // ease mouse
        mouse.x += (mouse.tx - mouse.x) * 0.05;
        mouse.y += (mouse.ty - mouse.y) * 0.05;
        // slow auto-rotation + cursor parallax
        group.rotation.y = clock.t + mouse.x * 0.5;
        group.rotation.x = Math.sin(clock.t * 0.6) * 0.12 + mouse.y * 0.3;
        // subtle breathing
        const s = 1 + Math.sin(clock.t * 1.4) * 0.015;
        group.scale.set(s, s, s);
        renderer.render(scene, camera);
        frame = requestAnimationFrame(animate);
      }

      if (reduce) {
        renderer.render(scene, camera);
      } else {
        animate();
      }

      // resize
      ro = new ResizeObserver(() => {
        if (!renderer) return;
        camera.aspect = W() / H();
        camera.updateProjectionMatrix();
        renderer.setSize(W(), H());
      });
      ro.observe(mount);

      // cleanup closure
      mount._cleanup = () => {
        window.removeEventListener("pointermove", onMove);
        if (ro) ro.disconnect();
        cancelAnimationFrame(frame);
        nodeGeo.dispose(); nodeMat.dispose();
        lineGeo.dispose(); lineMat.dispose();
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      };
    }).catch(() => {/* CDN/WebGL unavailable — silently no-op */});

    return () => {
      disposed = true;
      if (mount && mount._cleanup) mount._cleanup();
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden="true" style={{ width: "100%", height: "100%" }} />;
}
