"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import type { HubToken } from "@/data/hubToken";
import { formatPrice, formatMarketCap, formatChange, shortAddress } from "@/utils/format";

function Skeleton() {
  return <div className="skeleton h-8 w-32 rounded-lg" />;
}

function StatBox({ label, value, loading }: { label: string; value: string; loading: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-white/40 text-xs font-body uppercase tracking-widest">{label}</span>
      {loading ? <Skeleton /> : (
        <span className="text-white font-display font-bold text-2xl">{value}</span>
      )}
    </div>
  );
}

// Fetches pump.fun image for hub token
function useHubImage(contractAddress: string) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!contractAddress) return;
    fetch(`/api/token-image/${contractAddress}`)
      .then((r) => r.json())
      .then((d) => { if (d.image) setImageUrl(d.image); })
      .catch(() => {});
  }, [contractAddress]);
  return imageUrl;
}

export default function HubTokenSection({
  token,
  loading,
}: {
  token: HubToken;
  loading: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const imageUrl = useHubImage(token.contractAddress);
  const { text: changeText, colorClass: changeColor } = formatChange(token.change24h);
  const isLoading = loading || token.price === 0;

  const copyAddress = useCallback(() => {
    navigator.clipboard.writeText(token.contractAddress || "TBA");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [token.contractAddress]);

  return (
    <section id="hub" className="relative py-24 px-4 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-pink-neon/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-pink-neon font-body text-sm tracking-widest uppercase mb-3">Hub Token</p>
          <div className="flex items-center justify-center gap-4 mb-4">
            {imageUrl && !imgFailed ? (
              <img
                src={imageUrl}
                alt="$LOVEISLAND"
                className="w-16 h-16 rounded-full object-cover border-2 border-pink-neon/40"
                onError={() => setImgFailed(true)}
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-neon to-purple-glow flex items-center justify-center text-2xl">
                🌴
              </div>
            )}
            <h2 className="font-display font-black text-5xl md:text-6xl text-white">$LOVEISLAND</h2>
          </div>
          <p className="text-white/50 mt-2 max-w-xl mx-auto font-body">{token.description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="neon-border glass rounded-3xl p-8 md:p-10"
        >
          {/* Price row */}
          <div className="flex flex-wrap items-start justify-between gap-6 mb-10">
            <div>
              <div className="text-white/40 text-sm font-body mb-1">Price</div>
              {isLoading ? (
                <div className="skeleton h-12 w-48 rounded-lg" />
              ) : (
                <div className="font-display font-black text-5xl text-white">
                  {formatPrice(token.price)}
                </div>
              )}
              {!isLoading && (
                <div className={`${changeColor} text-xl font-semibold mt-1`}>
                  {changeText} today
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-xs font-body">
                {isLoading ? "Loading..." : "Live"}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <StatBox label="Market Cap" value={formatMarketCap(token.marketCap)} loading={isLoading} />
            <StatBox label="24h Volume" value={formatMarketCap(token.volume24h)} loading={isLoading} />
            <StatBox label="Liquidity" value={formatMarketCap(token.liquidity)} loading={isLoading} />
            <StatBox label="FDV" value={formatMarketCap(token.fdv)} loading={isLoading} />
          </div>

          {/* Contract */}
          <div className="bg-black/40 rounded-2xl p-4 flex items-center justify-between gap-4 mb-8">
            <div>
              <div className="text-white/40 text-xs font-body mb-1">Contract Address</div>
              <div className="font-mono text-white/80 text-sm break-all">
                {token.contractAddress || "TBA — launching soon"}
              </div>
            </div>
            <button
              onClick={copyAddress}
              className="flex-shrink-0 px-4 py-2 rounded-xl border border-white/20 hover:border-pink-neon/50 hover:bg-pink-neon/10 transition-all text-sm font-body text-white/70 hover:text-white"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span key="copied" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    ✓ Copied!
                  </motion.span>
                ) : (
                  <motion.span key="copy">Copy</motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={token.buyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-pink-neon to-pink-hot text-white font-body font-semibold text-center text-lg hover:brightness-110 hover:scale-[1.02] transition-all active:scale-95"
            >
              Buy on Pump.fun 🚀
            </a>
            <a
              href={token.dexLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-4 rounded-2xl border border-purple-glow/40 bg-purple-glow/10 text-white font-body font-semibold text-center text-lg hover:bg-purple-glow/20 hover:border-purple-glow/60 transition-all hover:scale-[1.02] active:scale-95"
            >
              View on DexScreener 📊
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
