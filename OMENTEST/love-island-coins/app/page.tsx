"use client";

import { useState, useEffect, useMemo } from "react";
import { contestants as baseContestants, liveCount } from "@/data/contestants";
import { hubToken as baseHubToken } from "@/data/hubToken";
import { SITE_CONFIG } from "@/config/site";
import { useLiveMultiTokenData } from "@/hooks/useLiveTokenData";

import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import TickerTape from "@/components/TickerTape";
import HubTokenSection from "@/components/HubTokenSection";
import ContestantBoard from "@/components/ContestantBoard";
import LeaderboardSection from "@/components/LeaderboardSection";
import TrendingSection from "@/components/TrendingSection";
import EpisodeCountdown from "@/components/EpisodeCountdown";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import ConfettiBurst from "@/components/ConfettiBurst";

import type { Contestant } from "@/data/contestants";
import type { HubToken } from "@/data/hubToken";

// All live UK contract addresses + hub token
const liveAddresses = [
  baseHubToken.contractAddress,
  ...baseContestants
    .filter((c) => c.contractAddress && !c.comingSoon)
    .map((c) => c.contractAddress),
];

export default function Home() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [prevContestants, setPrevContestants] = useState<Contestant[]>(baseContestants);

  const { dataMap, loading } = useLiveMultiTokenData(liveAddresses);

  // Merge live data into contestants
  const contestants = useMemo<Contestant[]>(() => {
    return baseContestants.map((c) => {
      const live = c.contractAddress ? dataMap[c.contractAddress] : null;
      if (!live) return c;
      return { ...c, ...live };
    });
  }, [dataMap]);

  // Merge live data into hub token
  const hubToken = useMemo<HubToken>(() => {
    const live = dataMap[baseHubToken.contractAddress];
    if (!live) return baseHubToken;
    return { ...baseHubToken, ...live };
  }, [dataMap]);

  // Track previous for confetti burst detection
  useEffect(() => {
    setPrevContestants((prev) =>
      prev.length === contestants.length ? prev : contestants
    );
  }, [contestants]);

  // Favorites
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lic_favorites");
      if (saved) setFavorites(JSON.parse(saved));
    } catch {}
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id];
      try { localStorage.setItem("lic_favorites", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  // Live contestants only (for ticker + trending)
  const liveContestants = contestants.filter(
    (c) => c.contractAddress && !c.comingSoon
  );

  return (
    <main className="min-h-screen bg-[#0A0010]">
      <NavBar liveCount={liveCount} />
      <HeroSection liveCount={liveCount} />
      {liveContestants.length > 0 && (
        <TickerTape contestants={liveContestants} />
      )}
      <HubTokenSection token={hubToken} loading={loading} />
      <ContestantBoard
        contestants={contestants}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
      <LeaderboardSection contestants={liveContestants} />
      <TrendingSection contestants={liveContestants} />
      <EpisodeCountdown />
      <FAQSection />
      <Footer />
      <ConfettiBurst
        contestants={contestants}
        prevContestants={prevContestants}
      />
    </main>
  );
}
