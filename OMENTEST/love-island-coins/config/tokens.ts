// ============================================================
// TOKEN CONFIGURATION
// ============================================================
// Step 1: Replace each contract address with the real one.
// Step 2: Fill in the pump.fun and dexscreener URLs.
// Step 3: Set SITE_CONFIG.USE_MOCK_DATA = false in config/site.ts
// That's it — no other code changes needed.
// ============================================================

export type TokenEntry = {
  contract: string;
  pumpfun: string;
  dexscreener: string;
};

export const TOKEN_MAP: Record<string, TokenEntry> = {
  // ── Hub Token ──────────────────────────────────────────────
  LOVEISLAND: {
    contract: "",          // e.g. "So11111111111111111111111111111111111111112"
    pumpfun:  "",          // e.g. "https://pump.fun/TOKEN_ADDRESS"
    dexscreener: "",       // e.g. "https://dexscreener.com/solana/TOKEN_ADDRESS"
  },

  // ── USA Contestants ───────────────────────────────────────
  leah:    { contract: "", pumpfun: "#", dexscreener: "#" },
  rob:     { contract: "", pumpfun: "#", dexscreener: "#" },
  miguel:  { contract: "", pumpfun: "#", dexscreener: "#" },
  serena:  { contract: "", pumpfun: "#", dexscreener: "#" },
  liv:     { contract: "", pumpfun: "#", dexscreener: "#" },
  kassy:   { contract: "", pumpfun: "#", dexscreener: "#" },
  jana:    { contract: "", pumpfun: "#", dexscreener: "#" },
  kendall: { contract: "", pumpfun: "#", dexscreener: "#" },

  // ── UK Contestants ────────────────────────────────────────
  mimii:    { contract: "", pumpfun: "#", dexscreener: "#" },
  ayo:      { contract: "", pumpfun: "#", dexscreener: "#" },
  uma:      { contract: "", pumpfun: "#", dexscreener: "#" },
  joey:     { contract: "", pumpfun: "#", dexscreener: "#" },
  grace:    { contract: "", pumpfun: "#", dexscreener: "#" },
  nicole:   { contract: "", pumpfun: "#", dexscreener: "#" },
  josh:     { contract: "", pumpfun: "#", dexscreener: "#" },
  harriett: { contract: "", pumpfun: "#", dexscreener: "#" },
};
