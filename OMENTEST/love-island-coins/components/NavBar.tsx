"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

export default function NavBar({ liveCount }: { liveCount: number }) {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "Hub", href: "#hub" },
    { label: "Islanders", href: "#contestants" },
    { label: "Rankings", href: "#leaderboard" },
    { label: "Next Episode", href: "#countdown" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <>
      <motion.header className="fixed top-0 left-0 right-0 z-50">
        <motion.div
          className="absolute inset-0 bg-[#0A0010]/90 backdrop-blur-xl border-b border-white/10"
          style={{ opacity: bgOpacity }}
        />
        <div className="relative max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 font-display font-black text-xl text-white hover:text-pink-soft transition-colors">
            🌴 LOVE ISLAND COINS
            <span className="text-xs font-body font-normal px-2 py-0.5 rounded-full bg-pink-neon/20 border border-pink-neon/30 text-pink-soft">
              {liveCount} LIVE
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <a key={l.label} href={l.href} className="text-white/60 hover:text-white font-body text-sm transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          <a href="#hub" className="hidden md:inline-flex px-4 py-2 rounded-xl bg-pink-neon text-white font-body font-semibold text-sm hover:brightness-110 transition-all">
            Buy $LOVEISLAND
          </a>

          <button onClick={() => setMobileOpen((v) => !v)} className="md:hidden text-white text-2xl">
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>

        {mobileOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            className="md:hidden bg-[#0A0010]/95 backdrop-blur-xl border-b border-white/10"
          >
            <nav className="flex flex-col px-4 py-4 gap-3">
              {links.map((l) => (
                <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
                  className="text-white/70 hover:text-white font-body text-base py-2 border-b border-white/10">
                  {l.label}
                </a>
              ))}
              <a href="#hub" onClick={() => setMobileOpen(false)}
                className="mt-2 py-3 rounded-xl bg-pink-neon text-white font-body font-semibold text-center">
                Buy $LOVEISLAND
              </a>
            </nav>
          </motion.div>
        )}
      </motion.header>
      <div className="h-[72px]" />
    </>
  );
}
