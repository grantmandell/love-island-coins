"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const HEARTS = ["💗", "💖", "💓", "💝", "🌺", "🌴", "✨", "💛"];

function FloatingHeart({ delay, x }: { delay: number; x: number }) {
  return (
    <motion.div
      className="absolute text-2xl pointer-events-none select-none"
      style={{ left: `${x}%`, bottom: "-10%" }}
      animate={{
        y: [0, -600],
        x: [0, (Math.random() - 0.5) * 80],
        opacity: [0, 0.7, 0],
        scale: [0.5, 1.2, 0.8],
        rotate: [0, 360],
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {HEARTS[Math.floor(Math.random() * HEARTS.length)]}
    </motion.div>
  );
}

export default function HeroSection({ liveCount }: { liveCount: number }) {
  const heartPositions = useRef(
    Array.from({ length: 20 }, (_, i) => ({
      x: Math.random() * 100,
      delay: (i / 20) * 8,
    }))
  );

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#0A0010]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A0533] via-[#0A0010] to-[#0A0010]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#FF006E08] via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-pink-neon/5 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-glow/8 blur-[100px]" />
      <div className="absolute bottom-0 left-0 text-[180px] leading-none opacity-10 select-none pointer-events-none">🌴</div>
      <div className="absolute bottom-0 right-0 text-[180px] leading-none opacity-10 select-none pointer-events-none scale-x-[-1]">🌴</div>

      {heartPositions.current.map((h, i) => (
        <FloatingHeart key={i} delay={h.delay} x={h.x} />
      ))}

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-neon/30 bg-pink-neon/10 text-pink-soft text-sm font-body mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-pink-neon animate-pulse" />
          {liveCount} Coins Live on Solana · Season 11
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-black leading-none mb-4"
        >
          <span className="block text-[clamp(3.5rem,12vw,9rem)] bg-gradient-to-r from-white via-pink-light to-pink-neon bg-clip-text text-transparent">
            LOVE ISLAND
          </span>
          <span className="block text-[clamp(2.5rem,9vw,7rem)] bg-gradient-to-r from-gold-bright via-gold-warm to-gold-pale bg-clip-text text-transparent">
            COINS
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl md:text-2xl text-white/60 font-body font-light mb-12 max-w-2xl mx-auto"
        >
          Trade your favorite Islanders.{" "}
          <span className="text-pink-soft">The villa meets the blockchain.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a href="#hub" className="group relative px-8 py-4 rounded-2xl font-body font-semibold text-lg overflow-hidden transition-transform hover:scale-105 active:scale-95">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-neon to-pink-hot" />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-neon to-purple-glow opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative text-white flex items-center gap-2">Buy $LOVEISLAND <span className="text-xl">🚀</span></span>
          </a>
          <a href="#contestants" className="group px-8 py-4 rounded-2xl font-body font-semibold text-lg border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/40 transition-all hover:scale-105 active:scale-95">
            View Contestants 🌴
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-8 mt-16"
        >
          {[
            { label: "Coins Live", value: `${liveCount}` },
            { label: "USA Coins", value: "Coming Soon" },
            { label: "Network", value: "Solana" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display font-bold text-3xl text-white">{s.value}</div>
              <div className="text-white/40 text-sm font-body mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-xs font-body tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
