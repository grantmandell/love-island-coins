"use client";

import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/config/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-display font-black text-3xl text-white mb-3">
              Love Island Coins
            </h3>
            <p className="text-white/40 font-body text-sm leading-relaxed">
              The only meme coin platform where the villa meets the blockchain.
              Not financial advice.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-body font-semibold text-white/70 text-sm uppercase tracking-widest mb-4">
              Navigate
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                { label: "Hub Token", href: "#hub" },
                { label: "Contestants", href: "#contestants" },
                { label: "Leaderboard", href: "#leaderboard" },
                { label: "Countdown", href: "#countdown" },
                { label: "FAQ", href: "#faq" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/50 hover:text-pink-soft transition-colors font-body text-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-body font-semibold text-white/70 text-sm uppercase tracking-widest mb-4">
              Community
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href={SITE_CONFIG.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/50 hover:text-pink-soft transition-colors font-body text-sm"
              >
                𝕏 Twitter / X
              </a>
              <a
                href={SITE_CONFIG.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/50 hover:text-pink-soft transition-colors font-body text-sm"
              >
                ✈️ Telegram
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <p className="text-white/20 text-xs font-body text-center sm:text-left">
            © 2025 Love Island Coins. Not affiliated with ITV, Peacock, or the
            Love Island show. Meme tokens are highly speculative — not financial
            advice. DYOR.
          </p>
          <div className="flex gap-4">
            <span className="text-2xl">🌴</span>
            <span className="text-2xl">💖</span>
            <span className="text-2xl">🌴</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
