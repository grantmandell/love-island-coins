"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const FAQS = [
  {
    q: "What is Love Island Coins?",
    a: "Love Island Coins is a meme coin platform on Solana where every Love Island contestant has their own token. Think of it like a prediction market meets fantasy sports — but for reality TV.",
  },
  {
    q: "How do I buy a contestant token?",
    a: "Click any 'Buy' button on a contestant card to open their token on Pump.fun. You'll need a Solana wallet (like Phantom) and some SOL. Connect your wallet, set your amount, and trade.",
  },
  {
    q: "What is $LOVEISLAND?",
    a: "$LOVEISLAND is the hub token for the entire ecosystem. Holding it gives you villa access, early drops on new contestant tokens, and future governance votes.",
  },
  {
    q: "Are these tokens official?",
    a: "These are community meme tokens on Solana, not officially affiliated with the Love Island TV show or ITV/Peacock. They are speculative assets for entertainment. Never invest more than you can afford to lose.",
  },
  {
    q: "Why does the price change every 15 seconds?",
    a: "The live market data updates automatically every 15 seconds to reflect real trading activity on-chain. Prices can be volatile — especially during live episodes!",
  },
  {
    q: "What happens to tokens when a contestant is eliminated?",
    a: "Eliminated contestants get marked with 💔 'Dumped from the Villa'. Their tokens still trade — some dumped islanders have cult followings and strong price action.",
  },
  {
    q: "How do I save my favorite islanders?",
    a: "Click the heart (🤍) on any card to favorite an islander. Your favorites are saved locally in your browser.",
  },
  {
    q: "Is this safe?",
    a: "Meme coins are highly speculative and volatile. This is not financial advice. Do your own research. Only use funds you can afford to lose completely.",
  },
];

function FAQItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between gap-4 text-left hover:text-pink-soft transition-colors"
      >
        <span className="font-body font-semibold text-white/90">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          className="text-pink-neon text-2xl flex-shrink-0"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-white/50 font-body leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-pink-neon font-body text-sm tracking-widest uppercase mb-3">
            Got Questions?
          </p>
          <h2 className="font-display font-black text-5xl md:text-6xl text-white">
            FAQ
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass rounded-3xl px-8 py-2"
        >
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              q={faq.q}
              a={faq.a}
              open={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
