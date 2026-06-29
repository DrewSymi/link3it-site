"use client";

import { useEffect, useRef } from "react";

// "Privileged-access tree" — a cinematic 3D scene built on Three.js (CDN).
// Concept (CyberArk / PAM): a glowing vault CORE at the base, BRANCHES growing
// upward as privileged paths, WIREFRAME nodes at the tips = the systems/identities
// in the estate, and bright PARTICLES flowing up the branches = credentials being
// brokered and rotated outward. Designed for a DARK stage so the glow blooms.

const THREE_SRC = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";

function loadThree() {
  return new Promise((resolve, reject) => {
    if (window.THREE) return resolve(window.THREE);
    const ex = document.querySelector(`script[src="${THREE_SRC}"]`);
    if (ex) { ex.addEventListener("load", () => resolve(window.THREE)); ex.addEventListener("error", reject); return; }
    const s = document.createElement("script");
    s.src = THREE_SRC; s.async = true;
    s.onload = () => resolve(window.THREE); s.onerror = reject;
    document.head.appendChild(s);
  });
}

export default function PrivilegedTree({ className = "" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer, scene, camera, frame, ro, disposed = false;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    loadThree().then((THREE) => {
      if (disposed || !THREE) return;
      const W = () => mount.clientWidth || 1;
      const H = () => mount.clientHeight || 1;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(55, W() / H(), 0.1, 200);
      camera.position.set(0, 4, 38);
      camera.lookAt(0, 6, 0);

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(W(), H());
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      const root = new THREE.Group();
      root.position.y = -8;
      scene.add(root);

      const COBALT = new THREE.Color(0x3b82f6);
      const COBALT_BRIGHT = new THREE.Color(0x7ba4f2);
      const CORAL = new THREE.Color(0xff5436);
      const EMERALD = new THREE.Color(0x16f0ad);

      // ---------- generate tree skeleton ----------
      const segPts = [];          // for branch point-cloud
      const segCol = [];
      const paths = [];           // root->leaf polylines (for flowing particles)
      const leaves = [];          // tip positions for wireframe nodes
      const tmp = new THREE.Vector3();

      function addSegmentPoints(a, b, depth) {
        const steps = Math.max(6, Math.floor(a.distanceTo(b) * 3));
        for (let i = 0; i <= steps; i++) {
          tmp.lerpVectors(a, b, i / steps);
          // slight jitter for organic feel
          const j = depth * 0.04;
          segPts.push(tmp.x + (Math.random() - 0.5) * j, tmp.y + (Math.random() - 0.5) * j, tmp.z + (Math.random() - 0.5) * j);
          const c = depth >= 4 ? COBALT_BRIGHT : COBALT;
          segCol.push(c.r, c.g, c.b);
        }
      }

      function grow(start, dir, len, depth, path) {
        const end = start.clone().add(dir.clone().multiplyScalar(len));
        addSegmentPoints(start, end, depth);
        const newPath = path.concat([end.clone()]);
        if (depth <= 0) { leaves.push(end.clone()); paths.push(newPath); return; }
        const n = depth > 3 ? 2 : (Math.random() > 0.35 ? 2 : 1);
        for (let i = 0; i < n; i++) {
          const ax = (Math.random() - 0.5) * 1.1;
          const az = (Math.random() - 0.5) * 1.1;
          const nd = dir.clone();
          nd.x += ax; nd.z += az; nd.y += 0.35; // upward bias
          nd.normalize();
          grow(end, nd, len * (0.72 + Math.random() * 0.08), depth - 1, newPath);
        }
      }

      const origin = new THREE.Vector3(0, 0, 0);
      grow(origin, new THREE.Vector3(0, 1, 0), 5.2, 6, [origin.clone()]);

      // ---------- branch point cloud (the glowing tree) ----------
      const branchGeo = new THREE.BufferGeometry();
      branchGeo.setAttribute("position", new THREE.Float32BufferAttribute(segPts, 3));
      branchGeo.setAttribute("color", new THREE.Float32BufferAttribute(segCol, 3));
      const branchMat = new THREE.PointsMaterial({
        size: 0.13, vertexColors: true, transparent: true, opacity: 0.85,
        blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
      });
      root.add(new THREE.Points(branchGeo, branchMat));

      // ---------- vault core (glowing base) ----------
      const coreGroup = new THREE.Group();
      const coreMat = new THREE.MeshBasicMaterial({ color: EMERALD, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending });
      const core = new THREE.Mesh(new THREE.SphereGeometry(0.9, 24, 24), coreMat);
      coreGroup.add(core);
      const haloMat = new THREE.MeshBasicMaterial({ color: EMERALD, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending });
      const halo = new THREE.Mesh(new THREE.SphereGeometry(2.1, 24, 24), haloMat);
      coreGroup.add(halo);
      const halo2 = new THREE.Mesh(new THREE.SphereGeometry(3.6, 24, 24), new THREE.MeshBasicMaterial({ color: COBALT, transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending }));
      coreGroup.add(halo2);
      root.add(coreGroup);

      // ---------- wireframe system nodes at tips ----------
      const cubes = [];
      const pick = leaves.filter((_, i) => i % 2 === 0).slice(0, 26);
      pick.forEach((p, i) => {
        const size = 0.5 + Math.random() * 0.7;
        const geo = new THREE.BoxGeometry(size, size, size);
        const edges = new THREE.EdgesGeometry(geo);
        const accent = i % 7 === 0 ? CORAL : i % 5 === 0 ? EMERALD : COBALT_BRIGHT;
        const mat = new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending });
        const cube = new THREE.LineSegments(edges, mat);
        cube.position.copy(p);
        cube.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        cube.userData.spin = (Math.random() - 0.5) * 0.01;
        root.add(cube);
        cubes.push(cube);
      });

      // ---------- flowing credential particles ----------
      const PCOUNT = 220;
      const pPos = new Float32Array(PCOUNT * 3);
      const pCol = new Float32Array(PCOUNT * 3);
      const particles = [];
      for (let i = 0; i < PCOUNT; i++) {
        const path = paths[Math.floor(Math.random() * paths.length)];
        const t = Math.random();
        const speed = 0.06 + Math.random() * 0.12;
        const r = Math.random();
        const col = r > 0.88 ? CORAL : r > 0.7 ? EMERALD : COBALT_BRIGHT;
        particles.push({ path, t, speed, col });
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute("color", new THREE.BufferAttribute(pCol, 3));
      const pMat = new THREE.PointsMaterial({
        size: 0.3, vertexColors: true, transparent: true, opacity: 0.95,
        blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
      });
      const pSystem = new THREE.Points(pGeo, pMat);
      root.add(pSystem);

      function samplePath(path, t) {
        // t in [0,1] across whole polyline
        const segCount = path.length - 1;
        const f = t * segCount;
        const idx = Math.min(segCount - 1, Math.floor(f));
        const localT = f - idx;
        return tmp.lerpVectors(path[idx], path[idx + 1], localT);
      }

      // faint ambient star dust for depth
      const dust = [];
      for (let i = 0; i < 140; i++) dust.push((Math.random() - 0.5) * 90, Math.random() * 60 - 5, (Math.random() - 0.5) * 60 - 15);
      const dustGeo = new THREE.BufferGeometry();
      dustGeo.setAttribute("position", new THREE.Float32BufferAttribute(dust, 3));
      const dustMat = new THREE.PointsMaterial({ color: 0x2c4a86, size: 0.16, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false });
      scene.add(new THREE.Points(dustGeo, dustMat));

      // ---------- interaction ----------
      const onMove = (e) => {
        const rect = mount.getBoundingClientRect();
        mouse.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouse.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      let t = 0;
      const posAttr = pGeo.getAttribute("position");
      function animate() {
        if (disposed) return;
        t += 0.01;
        mouse.x += (mouse.tx - mouse.x) * 0.04;
        mouse.y += (mouse.ty - mouse.y) * 0.04;

        root.rotation.y = t * 0.12 + mouse.x * 0.4;
        root.rotation.z = Math.sin(t * 0.3) * 0.02;
        camera.position.y = 4 + mouse.y * -2;
        camera.lookAt(0, 6, 0);

        // vault pulse
        const pulse = 1 + Math.sin(t * 2.2) * 0.12;
        core.scale.setScalar(pulse);
        halo.scale.setScalar(1 + Math.sin(t * 1.6) * 0.18);
        coreMat.opacity = 0.8 + Math.sin(t * 2.2) * 0.15;

        // flow particles up the branches
        for (let i = 0; i < PCOUNT; i++) {
          const pt = particles[i];
          pt.t += pt.speed * 0.016;
          if (pt.t > 1) { pt.t = 0; pt.path = paths[Math.floor(Math.random() * paths.length)]; }
          const v = samplePath(pt.path, pt.t);
          posAttr.array[i * 3] = v.x;
          posAttr.array[i * 3 + 1] = v.y;
          posAttr.array[i * 3 + 2] = v.z;
        }
        posAttr.needsUpdate = true;

        for (const c of cubes) { c.rotation.y += c.userData.spin; c.rotation.x += c.userData.spin * 0.6; }

        renderer.render(scene, camera);
        frame = requestAnimationFrame(animate);
      }

      if (reduce) renderer.render(scene, camera);
      else animate();

      ro = new ResizeObserver(() => {
        if (!renderer) return;
        camera.aspect = W() / H(); camera.updateProjectionMatrix();
        renderer.setSize(W(), H());
      });
      ro.observe(mount);

      mount._cleanup = () => {
        window.removeEventListener("pointermove", onMove);
        if (ro) ro.disconnect();
        cancelAnimationFrame(frame);
        renderer.dispose();
        if (renderer.domElement?.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      };
    }).catch(() => {});

    return () => { disposed = true; if (mount && mount._cleanup) mount._cleanup(); };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden="true" style={{ width: "100%", height: "100%" }} />;
}
