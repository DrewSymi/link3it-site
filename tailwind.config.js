/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light institutional palette. ink = text (dark), base = surfaces (light).
        ink: {
          DEFAULT: "#0f1115",   // near-black headings/text
          soft: "#3f4651",      // body copy
          muted: "#6a7280",     // secondary labels (AA on white)
          faint: "#9aa1ab",     // captions / fine print
        },
        base: {
          black: "#0a0a0a",     // for explicit dark zones
          DEFAULT: "#fafaf9",   // warm off-white canvas
          panel: "#ffffff",     // cards
          panel2: "#f4f3f0",    // alt panel / subtle fill
        },
        hair: {
          DEFAULT: "#e4e2dc",   // light hairline borders
          soft: "#eeece6",
        },
        cobalt: {
          DEFAULT: "#2563eb",   // trust — links, accents
          bright: "#1d4ed8",    // stronger blue on light bg
          deep: "#1e40af",
          soft: "rgba(37,99,235,0.08)",
          line: "rgba(37,99,235,0.28)",
        },
        coral: {
          DEFAULT: "#ff5436",   // the pop — CTAs, urgency
          deep: "#e63e22",
          soft: "rgba(255,84,54,0.08)",
          line: "rgba(255,84,54,0.30)",
        },
        signal: {
          green: "#0f9d6b",
          emerald: "#06b67f",   // verified — darker for contrast on white
          amber: "#b8860b",
          red: "#dc2626",
          cyan: "#0e7490",
        },
        // dark-zone internals (cinematic console panels on light pages)
        zone: {
          base: "#0a0a0a",
          panel: "#101114",
          panel2: "#15171c",
          hair: "#23262e",
          ink: "#f5f7fa",
          soft: "#aab2bd",
          muted: "#828b98",
          bright: "#5b8def",
          emerald: "#10e0a0",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "1180px",
        prose: "720px",
      },
      borderRadius: {
        xl2: "22px",
      },
      boxShadow: {
        card: "0 8px 30px -14px rgba(15,17,21,0.16)",
        lift: "0 30px 70px -42px rgba(15,17,21,0.28)",
        glow: "0 12px 30px -10px rgba(255,84,54,0.42)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        drawIn: {
          "0%": { strokeDashoffset: "var(--len)" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both",
        fadeIn: "fadeIn 0.6s ease both",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22,1,0.36,1)",
      },
    },
  },
  plugins: [],
};
