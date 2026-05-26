"use client";

import { motion } from "framer-motion";
import type { Contestant } from "@/data/contestants";
import { formatMarketCap, formatChange } from "@/utils/format";

interface LeaderboardSectionProps {
  contestants: Contestant[];
}

const MEDALS = ["🥇", "🥈", "🥉"];

export default function LeaderboardSection({
  contestants,
}: LeaderboardSectionProps) {
  const ranked = [...contestants]
    .filter((c) => !c.eliminated)
    .sort((a, b) => b.marketCap - a.marketCap)
    .slice(0, 10);

  return (
    <section id="leaderboard" className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-gold-bright font-body text-sm tracking-widest uppercase mb-3">
            Rankings
          </p>
          <h2 className="font-display font-black text-5xl md:text-6xl text-white">
            Leaderboard
          </h2>
        </motion.div>

        <div className="glass rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 px-6 py-3 border-b border-white/10 text-white/30 text-xs font-body uppercase tracking-wider">
            <span>#</span>
            <span>Islander</span>
            <span className="text-right">Market Cap</span>
            <span className="text-right">24h</span>
          </div>

          {ranked.map((c, i) => {
            const { text, colorClass } = formatChange(c.change24h);
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="grid grid-cols-[auto_1fr_auto_auto] gap-4 px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors items-center"
              >
                {/* Rank */}
                <span className="text-xl w-8 text-center">
                  {i < 3 ? MEDALS[i] : (
                    <span className="text-white/30 font-mono text-sm">
                      {i + 1}
                    </span>
                  )}
                </span>

                {/* Avatar + name */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-display font-bold text-white"
                    style={{
                      background: `radial-gradient(circle, hsl(${c.name.charCodeAt(0) * 17 % 360}, 60%, 40%), hsl(${(c.name.charCodeAt(0) * 17 + 60) % 360}, 50%, 20%))`,
                    }}
                  >
                    {c.name.slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-white font-semibold font-body">
                      {c.name}
                    </div>
                    <div className="text-white/40 text-xs font-mono">
                      {c.ticker}
                    </div>
                  </div>
                  <span className="text-lg">{c.country === "USA" ? "🇺🇸" : "🇬🇧"}</span>
                </div>

                {/* Market Cap */}
                <span className="text-white font-mono text-sm text-right">
                  {formatMarketCap(c.marketCap)}
                </span>

                {/* Change */}
                <span className={`${colorClass} font-semibold text-sm text-right`}>
                  {text}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
