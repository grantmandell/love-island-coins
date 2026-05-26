import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ address: string }> }
) {
  const { address } = await context.params;

  try {
    const res = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${address}`,
      {
        headers: { "User-Agent": "Mozilla/5.0" },
        next: { revalidate: 30 },
      }
    );

    if (!res.ok) return NextResponse.json({ error: "not found" }, { status: 404 });

    const data = await res.json();
    const pair = data?.pairs?.[0];
    if (!pair) return NextResponse.json({ error: "no pairs" }, { status: 404 });

    return NextResponse.json({
      price:     parseFloat(pair.priceUsd ?? "0"),
      marketCap: pair.marketCap ?? 0,
      volume24h: pair.volume?.h24 ?? 0,
      liquidity: pair.liquidity?.usd ?? 0,
      fdv:       pair.fdv ?? 0,
      change24h: pair.priceChange?.h24 ?? 0,
      txns24h:   (pair.txns?.h24?.buys ?? 0) + (pair.txns?.h24?.sells ?? 0),
      buys24h:   pair.txns?.h24?.buys ?? 0,
      sells24h:  pair.txns?.h24?.sells ?? 0,
    }, {
      headers: { "Cache-Control": "public, max-age=30" },
    });
  } catch {
    return NextResponse.json({ error: "fetch failed" }, { status: 500 });
  }
}
