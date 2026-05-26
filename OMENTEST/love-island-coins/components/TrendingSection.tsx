"use client";

import { motion } from "framer-motion";
import type { Contestant } from "@/data/contestants";
import { formatMarketCap, formatPrice, formatChange } from "@/utils/format";

interface TrendingSectionProps {
  contestants: Contestant[];
}

function TrendingCard({
  title,
  emoji,
  items,
  valueKey,
  valueLabel,
}: {
  title: string;
  emoji: string;
  items: Contestant[];
  valueKey: keyof Contestant;
  valueLabel: string;
}) {
  return (
    <div className="glass rounded-3xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-2xl">{emoji}</span>
        <h3 className="font-display font-bold text-xl text-white">{title}</h3>
      </div>
      <div className="flex flex-col gap-3">
        {items.map((c, i) => {
          const raw = c[valueKey] as number;
          const { text: changeText, colorClass } = formatChange(c.change24h);

          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3"
            >
              <span className="text-white/30 font-mono text-xs w-4">
                {i + 1}
              </span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-rich to-villa-dark flex items-center justify-center text-xs font-display font-bold text-white">
                {c.name.slice(0, 2)}
              </div>
              <div className="flex-1">
                <div className="text-white text-sm font-semibold">{c.name}</div>
                <div className="text-white/40 text-xs font-mono">{c.ticker}</div>
              </div>
              <div className="text-right">
                <div className="text-white text-sm font-mono">
                  {valueKey === "price"
                    ? formatPrice(raw)
                    : formatMarketCap(raw)}
                </div>
                <div className={`${colorClass} text-xs`}>{changeText}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function TrendingSection({ contestants }: TrendingSectionProps) {
  const active = contestants.filter((c) => !c.eliminated);

  const topGainers = [...active]
    .sort((a, b) => b.change24h - a.change24h)
    .slice(0, 4);

  const topLosers = [...active]
    .sort((a, b) => a.change24h - b.change24h)
    .slice(0, 4);

  const highestVolume = [...active]
    .sort((a, b) => b.volume24h - a.volume24h)
    .slice(0, 4);

  const mostHolders = [...active]
    .sort((a, b) => b.holders - a.holders)
    .slice(0, 4);

  return (
    <section id="trending" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-pink-neon font-body text-sm tracking-widest uppercase mb-3">
            Live Rankings
          </p>
          <h2 className="font-display font-black text-5xl md:text-6xl text-white">
            Top Movers
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <TrendingCard
            title="Top Gainers"
            emoji="📈"
            items={topGainers}
            valueKey="change24h"
            valueLabel="Change"
          />
          <TrendingCard
            title="Top Losers"
            emoji="📉"
            items={topLosers}
            valueKey="change24h"
            valueLabel="Change"
          />
          <TrendingCard
            title="Highest Volume"
            emoji="💸"
            items={highestVolume}
            valueKey="volume24h"
            valueLabel="Volume"
          />
          <TrendingCard
            title="Most Holders"
            emoji="👥"
            items={mostHolders}
            valueKey="holders"
            valueLabel="Holders"
          />
        </div>
      </div>
    </section>
  );
}
