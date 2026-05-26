"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import type { Contestant } from "@/data/contestants";
import ContestantCard from "./ContestantCard";

interface ContestantBoardProps {
  contestants: Contestant[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

type SortKey =
  | "marketCap"
  | "volume24h"
  | "price"
  | "change24h"
  | "holders"
  | "name";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "marketCap", label: "Market Cap" },
  { value: "volume24h", label: "Volume" },
  { value: "price", label: "Price" },
  { value: "change24h", label: "Trending" },
  { value: "holders", label: "Most Holders" },
  { value: "name", label: "Alphabetical" },
];

export default function ContestantBoard({
  contestants,
  favorites,
  onToggleFavorite,
}: ContestantBoardProps) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("marketCap");
  const [showEliminated, setShowEliminated] = useState(false);
  const [countryFilter, setCountryFilter] = useState<"ALL" | "USA" | "UK">(
    "ALL"
  );

  const processed = useMemo(() => {
    let list = contestants.filter(
      (c) => showEliminated || !c.eliminated
    );

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.ticker.toLowerCase().includes(q)
      );
    }

    if (countryFilter !== "ALL") {
      list = list.filter((c) => c.country === countryFilter);
    }

    list = [...list].sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name);
      const av = a[sortKey] as number;
      const bv = b[sortKey] as number;
      return bv - av;
    });

    return list;
  }, [contestants, search, sortKey, showEliminated, countryFilter]);

  const usaList = processed.filter((c) => c.country === "USA");
  const ukList = processed.filter((c) => c.country === "UK");

  // For ranking badges, use overall marketCap rank across all contestants
  const allRanked = useMemo(
    () =>
      [...contestants]
        .filter((c) => !c.eliminated)
        .sort((a, b) => b.marketCap - a.marketCap)
        .reduce<Record<string, number>>((acc, c, i) => {
          acc[c.id] = i + 1;
          return acc;
        }, {}),
    [contestants]
  );

  return (
    <section id="contestants" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-pink-neon font-body text-sm tracking-widest uppercase mb-3">
            The Villa Market
          </p>
          <h2 className="font-display font-black text-5xl md:text-6xl text-white mb-4">
            Islander Tokens
          </h2>
          <p className="text-white/50 font-body max-w-xl mx-auto">
            Every contestant has a token. Pick your winners.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-4 items-center justify-between mb-8"
        >
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search islanders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-pink-neon/50 focus:outline-none text-white placeholder-white/30 font-body text-sm transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            {/* Country filter */}
            <div className="flex rounded-xl overflow-hidden border border-white/10">
              {(["ALL", "USA", "UK"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCountryFilter(c)}
                  className={`px-3 py-2 text-sm font-body transition-all ${
                    countryFilter === c
                      ? "bg-pink-neon text-white"
                      : "bg-white/5 text-white/50 hover:bg-white/10"
                  }`}
                >
                  {c === "USA" ? "🇺🇸 USA" : c === "UK" ? "🇬🇧 UK" : "All"}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-body text-sm focus:outline-none focus:border-pink-neon/50 cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="bg-[#1A0533]">
                  {o.label}
                </option>
              ))}
            </select>

            {/* Eliminated toggle */}
            <button
              onClick={() => setShowEliminated((v) => !v)}
              className={`px-4 py-2.5 rounded-xl border text-sm font-body transition-all ${
                showEliminated
                  ? "border-red-500/50 bg-red-500/10 text-red-400"
                  : "border-white/10 bg-white/5 text-white/50 hover:bg-white/10"
              }`}
            >
              💔 Eliminated
            </button>
          </div>
        </motion.div>

        {/* Board: 3-column desktop layout */}
        {countryFilter === "ALL" ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-start">
            {/* USA column */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">🇺🇸</span>
                <h3 className="font-display font-bold text-2xl text-white">
                  USA
                </h3>
                <span className="ml-auto text-white/30 text-sm">
                  {usaList.length} islanders
                </span>
              </div>
              <div className="flex flex-col gap-4">
                {usaList.map((c, i) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <ContestantCard
                      contestant={c}
                      rank={allRanked[c.id]}
                      isFavorite={favorites.includes(c.id)}
                      onToggleFavorite={onToggleFavorite}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:flex flex-col items-center py-8">
              <div className="w-px flex-1 bg-gradient-to-b from-transparent via-pink-neon/30 to-transparent" />
              <div className="my-4 text-3xl">🏝️</div>
              <div className="w-px flex-1 bg-gradient-to-b from-transparent via-pink-neon/30 to-transparent" />
            </div>

            {/* UK column */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">🇬🇧</span>
                <h3 className="font-display font-bold text-2xl text-white">
                  UK
                </h3>
                <span className="ml-auto text-white/30 text-sm">
                  {ukList.length} islanders
                </span>
              </div>
              <div className="flex flex-col gap-4">
                {ukList.map((c, i) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <ContestantCard
                      contestant={c}
                      rank={allRanked[c.id]}
                      isFavorite={favorites.includes(c.id)}
                      onToggleFavorite={onToggleFavorite}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Single-country grid
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {processed.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <ContestantCard
                  contestant={c}
                  rank={allRanked[c.id]}
                  isFavorite={favorites.includes(c.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {processed.length === 0 && (
          <div className="text-center py-20 text-white/30 font-body">
            <div className="text-5xl mb-4">🔍</div>
            <p>No islanders found</p>
          </div>
        )}
      </div>
    </section>
  );
}
