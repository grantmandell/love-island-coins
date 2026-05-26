// ============================================================
// MOCK MARKET UPDATER
// ============================================================
// Simulates realistic price / volume / holder fluctuations
// every 15 seconds so the UI feels live.
// This module is ONLY used when SITE_CONFIG.USE_MOCK_DATA=true.
// ============================================================

import type { Contestant } from "@/data/contestants";
import type { HubToken } from "@/data/hubToken";

/** Apply random realistic drift to a number */
function drift(value: number, maxPct = 0.015): number {
  const change = 1 + (Math.random() * 2 - 1) * maxPct;
  return value * change;
}

/** Clamp a number between min and max */
function clamp(val: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, val));
}

export function updateContestant(c: Contestant): Contestant {
  const newPrice = clamp(drift(c.price, 0.02), 0.000001, 100);
  const priceRatio = newPrice / c.price;

  return {
    ...c,
    price: newPrice,
    marketCap: Math.round(c.marketCap * priceRatio),
    fdv: Math.round(c.fdv * priceRatio),
    volume24h: Math.round(drift(c.volume24h, 0.05)),
    holders: Math.max(1, Math.round(c.holders + (Math.random() > 0.6 ? 1 : 0))),
    change24h: clamp(drift(c.change24h, 0.1), -99, 200),
    txns24h: Math.round(drift(c.txns24h, 0.05)),
    buys24h: Math.round(drift(c.buys24h, 0.05)),
    sells24h: Math.round(drift(c.sells24h, 0.05)),
    liquidity: Math.round(drift(c.liquidity, 0.01)),
  };
}

export function updateHubToken(h: HubToken): HubToken {
  const newPrice = clamp(drift(h.price, 0.015), 0.000001, 100);
  const priceRatio = newPrice / h.price;

  return {
    ...h,
    price: newPrice,
    marketCap: Math.round(h.marketCap * priceRatio),
    fdv: Math.round(h.fdv * priceRatio),
    volume24h: Math.round(drift(h.volume24h, 0.04)),
    holders: Math.max(1, h.holders + (Math.random() > 0.7 ? 1 : 0)),
    change24h: clamp(drift(h.change24h, 0.08), -99, 200),
    liquidity: Math.round(drift(h.liquidity, 0.01)),
  };
}
