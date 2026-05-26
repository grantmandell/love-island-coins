import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ address: string }> }
) {
  const { address } = await context.params;

  try {
    const res = await fetch(`https://frontend-api.pump.fun/coins/${address}`, {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return NextResponse.json({ image: null });

    const data = await res.json();
    const image = data?.image_uri ?? data?.image ?? null;

    return NextResponse.json({ image }, {
      headers: { "Cache-Control": "public, max-age=3600" },
    });
  } catch {
    return NextResponse.json({ image: null });
  }
}
