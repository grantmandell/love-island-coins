# 🌴 Love Island Coins

> Trade your favorite Islanders. The villa meets the blockchain.

A production-ready Next.js 15 meme coin tracking platform for Love Island contestants, built with TypeScript, TailwindCSS, and Framer Motion.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
love-island-coins/
├── app/                    # Next.js 15 App Router
│   ├── page.tsx            # Main single-page app
│   ├── layout.tsx          # Root layout + metadata
│   ├── globals.css         # Global styles
│   └── api/token/[address] # Token data API route
├── components/             # React components
│   ├── NavBar.tsx
│   ├── HeroSection.tsx
│   ├── TickerTape.tsx
│   ├── HubTokenSection.tsx
│   ├── TrendingSection.tsx
│   ├── ContestantBoard.tsx
│   ├── ContestantCard.tsx
│   ├── LeaderboardSection.tsx
│   ├── EpisodeCountdown.tsx
│   ├── FAQSection.tsx
│   ├── Footer.tsx
│   └── ConfettiBurst.tsx
├── config/
│   ├── site.ts             # ← Master toggle (USE_MOCK_DATA)
│   └── tokens.ts           # ← All contract addresses here
├── data/
│   ├── contestants.ts      # ← Contestant data
│   └── hubToken.ts         # ← Hub token data
├── services/
│   ├── tokenData.ts        # Service abstraction layer
│   ├── dexscreener.ts      # Future live integration
│   └── pumpfun.ts          # Future live integration
└── utils/
    ├── format.ts           # Number formatting helpers
    └── mockMarketUpdates.ts # Simulated price updates
```

---

## 🔧 Adding Real Token Addresses

When contestant tokens launch on Pump.fun:

### Step 1 — Add contract addresses

Edit `config/tokens.ts`:

```ts
export const TOKEN_MAP = {
  leah: {
    contract: "ACTUAL_SOLANA_ADDRESS_HERE",
    pumpfun: "https://pump.fun/ACTUAL_SOLANA_ADDRESS_HERE",
    dexscreener: "https://dexscreener.com/solana/ACTUAL_SOLANA_ADDRESS_HERE",
  },
  // ...
};
```

### Step 2 — Update contestant data

Edit `data/contestants.ts` — set `contractAddress`, `buyLink`, and `dexLink` for each contestant.

### Step 3 — Switch to live data

Edit `config/site.ts`:

```ts
export const SITE_CONFIG = {
  USE_MOCK_DATA: false,  // ← Change this
  // ...
};
```

That's it. No component rewrites needed.

---

## 🎨 Customization

| File | What to change |
|------|----------------|
| `config/site.ts` | Episode date, site name, social links |
| `data/contestants.ts` | Contestant names, countries, mock prices |
| `data/hubToken.ts` | Hub token details |
| `app/globals.css` | Global styles |
| `tailwind.config.ts` | Colors, fonts, animations |

---

## 📅 Updating Episode Countdown

Edit `config/site.ts`:

```ts
nextEpisodeDate: "2025-07-21T21:00:00.000Z",  // ISO datetime
episodeChannel: "ITV2 / Peacock",
```

---

## 🚢 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect your GitHub repo at vercel.com
```

No environment variables required for mock mode.

---

## 🎯 Features

- ✅ Dark luxury aesthetic — black, pink neon, purple gradients, gold
- ✅ Real-time mock market simulation (updates every 15s)
- ✅ Animated ticker tape
- ✅ Hub token card with copy contract button
- ✅ 3-column contestant board (USA | Villa | UK)
- ✅ Search, sort, and filter contestants
- ✅ Individual contestant cards with hover stats
- ✅ Leaderboard with medals
- ✅ Top gainers / losers / volume / holders panels
- ✅ Animated episode countdown flip clock
- ✅ Confetti burst when token gains >20%
- ✅ Favorites saved in localStorage
- ✅ Eliminated ("Dumped from Villa") section
- ✅ Mobile-first responsive design
- ✅ Framer Motion animations throughout
- ✅ SEO metadata + OpenGraph + Twitter cards
- ✅ Edge-ready API route

---

## 📜 License

MIT — not affiliated with ITV or Love Island.
