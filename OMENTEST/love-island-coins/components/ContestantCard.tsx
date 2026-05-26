"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import type { Contestant } from "@/data/contestants";
import { formatPrice, formatMarketCap, formatChange, formatHolders } from "@/utils/format";

interface ContestantCardProps {
  contestant: Contestant;
  rank?: number;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

function usePumpFunImage(contractAddress: string) {
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

function GradientFallback({ name }: { name: string }) {
  const hue = name.charCodeAt(0) * 17 % 360;
  return (
    <div
      className="w-full h-full flex items-center justify-center text-3xl font-display font-black text-white/80"
      style={{ background: `radial-gradient(circle at 40% 40%, hsl(${hue}, 70%, 40%), hsl(${(hue + 60) % 360}, 60%, 20%))` }}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

function ComingSoonOverlay({ name }: { name: string }) {
  const hue = name.charCodeAt(0) * 17 % 360;
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-2"
      style={{ background: `radial-gradient(circle at 40% 40%, hsl(${hue}, 50%, 25%), hsl(${(hue + 60) % 360}, 40%, 12%))` }}
    >
      <span className="text-3xl">🔜</span>
      <span className="text-white/60 text-xs font-body font-semibold uppercase tracking-widest">
        Coming Soon
      </span>
    </div>
  );
}

export default function ContestantCard({ contestant: c, rank, isFavorite, onToggleFavorite }: ContestantCardProps) {
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const imageUrl = usePumpFunImage(c.contractAddress);
  const { text: changeText, colorClass: changeColor } = formatChange(c.change24h);
  const isGainer = c.change24h >= 20;
  const isLive = !!c.contractAddress && !c.comingSoon;
  const hasData = c.price > 0;

  const copyAddress = useCallback(() => {
    navigator.clipboard.writeText(c.contractAddress || "TBA");
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }, [c.contractAddress]);

  return (
    <motion.div
      className="relative neon-border"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={!c.comingSoon ? { scale: 1.02, y: -3 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {c.eliminated && (
        <div className="absolute inset-0 z-20 rounded-3xl bg-black/70 flex items-center justify-center pointer-events-none">
          <div className="bg-red-500/20 border border-red-500/40 px-3 py-1.5 rounded-full text-red-400 font-body font-semibold text-xs rotate-[-12deg]">
            💔 Dumped from the Villa
          </div>
        </div>
      )}

      <div className={`glass rounded-3xl overflow-hidden transition-all duration-300 ${
        hovered && isLive ? "shadow-[0_20px_60px_#FF2D7822,0_0_0_1px_#FF2D7833]" : "shadow-[0_4px_20px_#00000033]"
      } ${c.eliminated ? "opacity-60" : ""} ${c.comingSoon ? "opacity-75" : ""}`}>

        {/* Avatar */}
        <div className="relative w-full aspect-[3/2] overflow-hidden bg-gradient-to-br from-purple-rich to-villa-dark">
          {c.comingSoon ? (
            <ComingSoonOverlay name={c.name} />
          ) : imageUrl && !imgFailed ? (
            <img src={imageUrl} alt={c.name} className="w-full h-full object-cover" onError={() => setImgFailed(true)} />
          ) : (
            <GradientFallback name={c.name} />
          )}

          {rank && (
            <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-gold-bright/20 border border-gold-bright/50 flex items-center justify-center">
              <span className="text-gold-bright text-xs font-mono font-bold">#{rank}</span>
            </div>
          )}

          {!c.comingSoon && (
            <button
              onClick={() => onToggleFavorite(c.id)}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-pink-neon/20 transition-all hover:scale-110 active:scale-95"
            >
              <span className="text-sm">{isFavorite ? "❤️" : "🤍"}</span>
            </button>
          )}

          {isGainer && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-full bg-gold-bright/20 border border-gold-bright/40 text-gold-bright text-xs font-body font-semibold">
              🔥 HOT
            </motion.div>
          )}

          {/* Live badge */}
          {isLive && !c.comingSoon && (
            <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-body flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-display font-bold text-base text-white leading-tight">{c.name}</h3>
              <span className="text-pink-soft text-xs font-mono">{c.ticker}</span>
            </div>
            <span className="text-lg">{c.country === "USA" ? "🇺🇸" : "🇬🇧"}</span>
          </div>

          {c.comingSoon ? (
            <div className="py-3 text-center">
              <span className="text-white/30 text-xs font-body">Token launching soon 🌴</span>
            </div>
          ) : (
            <>
              {/* Price */}
              <div className="flex items-baseline gap-2 mb-3">
                {hasData ? (
                  <>
                    <span className="font-mono font-bold text-lg text-white">{formatPrice(c.price)}</span>
                    <span className={`${changeColor} text-xs font-semibold`}>{changeText}</span>
                  </>
                ) : (
                  <div className="skeleton h-6 w-28 rounded" />
                )}
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-1.5 mb-3">
                {[
                  { label: "Mkt Cap", value: hasData ? formatMarketCap(c.marketCap) : null },
                  { label: "Vol 24h", value: hasData ? formatMarketCap(c.volume24h) : null },
                  { label: "Holders", value: hasData ? formatHolders(c.holders) : null },
                  { label: "Liquidity", value: hasData ? formatMarketCap(c.liquidity) : null },
                ].map((s) => (
                  <div key={s.label} className="bg-black/30 rounded-lg p-2">
                    <div className="text-white/40 text-xs leading-none mb-0.5">{s.label}</div>
                    {s.value ? (
                      <div className="text-white text-xs font-semibold">{s.value}</div>
                    ) : (
                      <div className="skeleton h-3 w-12 rounded mt-0.5" />
                    )}
                  </div>
                ))}
              </div>

              <AnimatePresence>
                {hovered && hasData && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-3 gap-1.5 mb-3 pt-2 border-t border-white/10">
                      {[
                        { label: "Txns", value: c.txns24h, color: "text-white/60" },
                        { label: "Buys", value: c.buys24h, color: "text-emerald-400" },
                        { label: "Sells", value: c.sells24h, color: "text-red-400" },
                      ].map((s) => (
                        <div key={s.label} className="text-center">
                          <div className={`${s.color} text-xs`}>{s.label}</div>
                          <div className={`${s.color} text-xs font-mono`}>{s.value}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex gap-1.5">
                <a href={c.buyLink} target="_blank" rel="noopener noreferrer"
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-pink-neon to-pink-hot text-white text-xs font-body font-semibold text-center hover:brightness-110 transition-all active:scale-95">
                  Buy 🚀
                </a>
                <a href={c.dexLink} target="_blank" rel="noopener noreferrer"
                  className="py-2 px-2.5 rounded-xl border border-purple-glow/30 bg-purple-glow/10 text-white text-xs font-body hover:bg-purple-glow/20 transition-all active:scale-95"
                  title="DexScreener">📊</a>
                <button onClick={copyAddress}
                  className="py-2 px-2.5 rounded-xl border border-white/20 bg-white/5 text-white text-xs font-body hover:bg-white/10 transition-all active:scale-95"
                  title="Copy contract">
                  {copied ? "✓" : "📋"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
