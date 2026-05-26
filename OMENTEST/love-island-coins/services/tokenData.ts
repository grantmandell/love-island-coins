// ============================================================
// TOKEN DATA SERVICE
// ============================================================
// All components import from HERE — never directly from mock
// data files. This is what makes the live-data switch trivial.
//
// To go live:
//   1. Set SITE_CONFIG.USE_MOCK_DATA = false
//   2. Fill in contract addresses in config/tokens.ts
//   3. Done.
// ============================================================

import { SITE_CONFIG } from "@/config/site";
import { contestants as mockContestants } from "@/data/contestants";
import { hubToken as mockHubToken } from "@/data/hubToken";
import type { Contestant } from "@/data/contestants";
import type { HubToken } from "@/data/hubToken";

// ── Live data imports (inactive until USE_MOCK_DATA=false) ──
// import { fetchTokenFromDexScreener } from "@/services/dexscreener";
// import { fetchTokenFromPumpFun } from "@/services/pumpfun";

export async function getAllContestants(): Promise<Contestant[]> {
  if (SITE_CONFIG.USE_MOCK_DATA) {
    return mockContestants;
  }

  // Future integration point
  // const live = await Promise.all(
  //   mockContestants.map((c) =>
  //     c.contractAddress
  //       ? fetchTokenFromDexScreener(c.contractAddress).then((data) => ({
  //           ...c,
  //           ...data,
  //         }))
  //       : c
  //   )
  // );
  // return live;

  return mockContestants;
}

export async function getContestant(id: string): Promise<Contestant | null> {
  const all = await getAllContestants();
  return all.find((c) => c.id === id) ?? null;
}

export async function getHubToken(): Promise<HubToken> {
  if (SITE_CONFIG.USE_MOCK_DATA) {
    return mockHubToken;
  }

  // Future integration point
  // if (TOKEN_MAP.LOVEISLAND.contract) {
  //   const data = await fetchTokenFromDexScreener(TOKEN_MAP.LOVEISLAND.contract);
  //   return { ...mockHubToken, ...data };
  // }

  return mockHubToken;
}
