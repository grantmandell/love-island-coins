"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import type { Contestant } from "@/data/contestants";

interface ConfettiBurstProps {
  contestants: Contestant[];
  prevContestants: Contestant[];
}

const EMOJIS = ["💖", "✨", "🌟", "💰", "🚀", "🎉", "💛", "🏝️"];

export default function ConfettiBurst({
  contestants,
  prevContestants,
}: ConfettiBurstProps) {
  const [bursts, setBursts] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const gainers = contestants.filter((c) => {
      const prev = prevContestants.find((p) => p.id === c.id);
      if (!prev) return false;
      return c.change24h >= 20 && prev.change24h < 20;
    });

    if (gainers.length > 0) {
      setBursts(gainers.map((c) => ({ id: c.id, name: c.name })));
      setTimeout(() => setBursts([]), 3000);
    }
  }, [contestants, prevContestants]);

  return (
    <AnimatePresence>
      {bursts.map((b) => (
        <motion.div
          key={b.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
        >
          {/* Confetti particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-2xl"
              initial={{
                x: 0,
                y: 0,
                opacity: 1,
                scale: 0,
              }}
              animate={{
                x: (Math.random() - 0.5) * 400,
                y: (Math.random() - 0.5) * 400,
                opacity: 0,
                scale: Math.random() * 2 + 0.5,
                rotate: Math.random() * 720,
              }}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              {EMOJIS[i % EMOJIS.length]}
            </motion.span>
          ))}

          {/* Toast */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            className="bg-gradient-to-r from-pink-neon to-gold-bright text-white px-8 py-4 rounded-2xl font-display font-bold text-xl shadow-2xl"
          >
            🚀 {b.name} is up 20%+!
          </motion.div>
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
