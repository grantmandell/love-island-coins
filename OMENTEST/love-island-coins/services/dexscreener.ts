// ============================================================
// DEXSCREENER SERVICE (INACTIVE — ready for live integration)
// ============================================================
// Uncomment and use when USE_MOCK_DATA = false.
// ============================================================

const DEXSCREENER_BASE = "https://api.dexscreener.com/latest/dex";

export type DexScreenerPair = {
  price: number;
  marketCap: number;
  volume24h: number;
  liquidity: number;
  fdv: number;
  change24h: number;
  txns24h: number;
  buys24h: number;
  sells24h: number;
};

// Future integration point
// export async function fetchTokenFromDexScreener(
//   contractAddress: string
// ): Promise<Partial<DexScreenerPair>> {
//   try {
//     const res = await fetch(`${DEXSCREENER_BASE}/tokens/${contractAddress}`, {
//       next: { revalidate: 30 },
//     });
//     if (!res.ok) throw new Error(`DexScreener error: ${res.status}`);
//     const data = await res.json();
//
//     const pair = data.pairs?.[0];
//     if (!pair) return {};
//
//     return {
//       price: parseFloat(pair.priceUsd ?? "0"),
//       marketCap: pair.marketCap ?? 0,
//       volume24h: pair.volume?.h24 ?? 0,
//       liquidity: pair.liquidity?.usd ?? 0,
//       fdv: pair.fdv ?? 0,
//       change24h: pair.priceChange?.h24 ?? 0,
//       txns24h: (pair.txns?.h24?.buys ?? 0) + (pair.txns?.h24?.sells ?? 0),
//       buys24h: pair.txns?.h24?.buys ?? 0,
//       sells24h: pair.txns?.h24?.sells ?? 0,
//     };
//   } catch (err) {
//     console.error("DexScreener fetch failed:", err);
//     return {};
//   }
// }

export {};
