"use client";

import { useEffect, useState } from "react";
import type { Contestant } from "@/data/contestants";
import { formatPrice, formatChange } from "@/utils/format";

interface TickerTapeProps {
  contestants: Contestant[];
}

export default function TickerTape({ contestants }: TickerTapeProps) {
  const items = [...contestants, ...contestants]; // doubled for seamless loop

  return (
    <div className="ticker-wrap bg-black/60 border-y border-pink-neon/20 py-2 overflow-hidden">
      <div className="ticker-inner flex gap-8">
        {items.map((c, i) => {
          const { text, colorClass } = formatChange(c.change24h);
          return (
            <span
              key={`${c.id}-${i}`}
              className="inline-flex items-center gap-2 text-sm font-mono whitespace-nowrap px-4"
            >
              <span className="text-pink-soft font-semibold">{c.ticker}</span>
              <span className="text-white/70">{formatPrice(c.price)}</span>
              <span className={`${colorClass} font-semibold`}>{text}</span>
              <span className="text-white/20">·</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
