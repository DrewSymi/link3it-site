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
        // Institutional dark palette
        ink: {
          DEFAULT: "#f5f7fa",
          soft: "#aab2bd",
          muted: "#6b7480",
          faint: "#474e58",
        },
        base: {
          black: "#000000",
          DEFAULT: "#0a0a0a",
          panel: "#101114",
          panel2: "#15171c",
        },
        hair: {
          DEFAULT: "#23262e",
          soft: "#1a1c22",
        },
        cobalt: {
          DEFAULT: "#2563eb",
          bright: "#5b8def",
          deep: "#1d4ed8",
          soft: "rgba(37,99,235,0.12)",
          line: "rgba(37,99,235,0.35)",
        },
        signal: {
          green: "#10b981",
          emerald: "#10e0a0",
          amber: "#d4a017",
          red: "#dc2626",
          cyan: "#22a3c4",
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
        card: "0 10px 30px -12px rgba(0,0,0,0.6)",
        lift: "0 30px 70px -40px rgba(0,0,0,0.85)",
        glow: "0 10px 30px -8px rgba(37,99,235,0.5)",
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
