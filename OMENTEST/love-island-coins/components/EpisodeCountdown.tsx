"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { SITE_CONFIG } from "@/config/site";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function FlipUnit({ value, label }: { value: string; label: string }) {
  const [prev, setPrev] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      setFlipping(true);
      const t = setTimeout(() => {
        setPrev(value);
        setFlipping(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [value, prev]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-20 h-20 md:w-28 md:h-28">
        {/* Card */}
        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-purple-rich to-villa-dark border border-pink-neon/20 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={value}
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="font-display font-black text-4xl md:text-5xl text-white"
            >
              {value}
            </motion.span>
          </AnimatePresence>
        </div>
        {/* Middle fold line */}
        <div className="absolute left-0 right-0 top-1/2 h-px bg-black/50" />
        {/* Glow */}
        <div className="absolute inset-0 rounded-2xl shadow-[0_0_30px_#FF2D7815]" />
      </div>
      <span className="text-white/40 text-xs font-body uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

export default function EpisodeCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const target = new Date(SITE_CONFIG.nextEpisodeDate).getTime();

    function update() {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="countdown" className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-deep/30 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-pink-neon/4 blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-pink-neon font-body text-sm tracking-widest uppercase mb-3">
            Next Episode
          </p>
          <h2 className="font-display font-black text-5xl md:text-6xl text-white mb-2">
            {expired ? "🔴 LIVE NOW" : "The Villa Opens In"}
          </h2>
          <p className="text-white/40 font-body mb-12">
            {SITE_CONFIG.episodeChannel}
          </p>
        </motion.div>

        {!expired ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex justify-center gap-4 md:gap-8"
          >
            <FlipUnit value={pad(timeLeft.days)} label="Days" />
            <div className="flex items-center pb-8">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="font-display font-black text-4xl md:text-5xl text-pink-neon"
              >
                :
              </motion.span>
            </div>
            <FlipUnit value={pad(timeLeft.hours)} label="Hours" />
            <div className="flex items-center pb-8">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="font-display font-black text-4xl md:text-5xl text-pink-neon"
              >
                :
              </motion.span>
            </div>
            <FlipUnit value={pad(timeLeft.minutes)} label="Minutes" />
            <div className="flex items-center pb-8">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="font-display font-black text-4xl md:text-5xl text-pink-neon"
              >
                :
              </motion.span>
            </div>
            <FlipUnit value={pad(timeLeft.seconds)} label="Seconds" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-8xl"
          >
            🏝️
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-white/30 text-sm font-body"
        >
          Token prices tend to surge during live episodes 📈
        </motion.p>
      </div>
    </section>
  );
}
