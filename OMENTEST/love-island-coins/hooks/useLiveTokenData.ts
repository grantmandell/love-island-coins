"use client";

import { useEffect, useState, useCallback } from "react";
import { SITE_CONFIG } from "@/config/site";

export type LiveTokenData = {
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

// Fetches live market data for a single contract address
export function useLiveTokenData(contractAddress: string) {
  const [data, setData] = useState<LiveTokenData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetch_ = useCallback(async () => {
    if (!contractAddress) { setLoading(false); return; }
    try {
      const res = await fetch(`/api/token/${contractAddress}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch {}
    setLoading(false);
  }, [contractAddress]);

  useEffect(() => {
    fetch_();
    const interval = setInterval(fetch_, SITE_CONFIG.refreshInterval);
    return () => clearInterval(interval);
  }, [fetch_]);

  return { data, loading };
}

// Fetches live data for multiple contracts in parallel
export function useLiveMultiTokenData(addresses: string[]) {
  const [dataMap, setDataMap] = useState<Record<string, LiveTokenData>>({});
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    if (!addresses.length) { setLoading(false); return; }
    const results = await Promise.allSettled(
      addresses.map((addr) =>
        fetch(`/api/token/${addr}`)
          .then((r) => r.json())
          .then((d) => ({ addr, data: d as LiveTokenData }))
      )
    );
    const map: Record<string, LiveTokenData> = {};
    for (const r of results) {
      if (r.status === "fulfilled" && r.value?.data?.price !== undefined) {
        map[r.value.addr] = r.value.data;
      }
    }
    setDataMap(map);
    setLoading(false);
  }, [addresses.join(",")]);

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, SITE_CONFIG.refreshInterval);
    return () => clearInterval(interval);
  }, [fetchAll]);

  return { dataMap, loading };
}
