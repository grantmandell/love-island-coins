import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        pink: {
          neon: "#FF2D78",
          hot: "#FF006E",
          soft: "#FF8FAB",
          light: "#FFB3C6",
        },
        purple: {
          deep: "#1A0533",
          rich: "#3B0764",
          mid: "#6B21A8",
          glow: "#A855F7",
        },
        gold: {
          bright: "#FFD700",
          warm: "#F59E0B",
          pale: "#FDE68A",
        },
        villa: {
          dark: "#0A0010",
          card: "#12001F",
          border: "#2D0052",
        },
      },
      animation: {
        "float-heart": "floatHeart 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "ticker-scroll": "tickerScroll 30s linear infinite",
        "flip-in": "flipIn 0.6s ease-out",
        "count-up": "countUp 0.8s ease-out",
        shimmer: "shimmer 1.5s ease-in-out infinite",
        "border-spin": "borderSpin 3s linear infinite",
        confetti: "confetti 1s ease-out forwards",
      },
      keyframes: {
        floatHeart: {
          "0%, 100%": { transform: "translateY(0) rotate(-10deg) scale(1)" },
          "50%": { transform: "translateY(-20px) rotate(10deg) scale(1.1)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.7", filter: "brightness(1)" },
          "50%": { opacity: "1", filter: "brightness(1.3)" },
        },
        tickerScroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        flipIn: {
          "0%": { transform: "rotateX(-90deg)", opacity: "0" },
          "100%": { transform: "rotateX(0deg)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        borderSpin: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        confetti: {
          "0%": { transform: "scale(0) rotate(0deg)", opacity: "1" },
          "100%": { transform: "scale(2) rotate(720deg)", opacity: "0" },
        },
      },
      backgroundImage: {
        "tropical-sunset":
          "linear-gradient(135deg, #0A0010 0%, #1A0533 30%, #3B0764 60%, #FF006E22 100%)",
        "card-glass":
          "linear-gradient(135deg, rgba(255,45,120,0.08) 0%, rgba(107,33,168,0.12) 100%)",
        "neon-border":
          "linear-gradient(90deg, #FF2D78, #A855F7, #FF2D78, #FFD700, #FF2D78)",
        "gold-shimmer":
          "linear-gradient(90deg, transparent, #FFD70033, transparent)",
      },
      boxShadow: {
        "neon-pink": "0 0 20px #FF2D7866, 0 0 60px #FF2D7822",
        "neon-purple": "0 0 20px #A855F766, 0 0 60px #A855F722",
        "neon-gold": "0 0 20px #FFD70066, 0 0 60px #FFD70022",
        "card-hover":
          "0 20px 60px #FF2D7822, 0 0 0 1px #FF2D7833, inset 0 1px 0 #ffffff11",
      },
    },
  },
  plugins: [],
};

export default config;
