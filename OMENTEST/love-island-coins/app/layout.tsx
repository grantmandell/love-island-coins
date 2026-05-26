import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Love Island Coins — Trade Your Favorite Islanders",
  description:
    "The only meme coin platform where the villa meets the blockchain. Buy, trade, and track tokens for every Love Island contestant.",
  keywords: ["Love Island", "meme coins", "crypto", "Solana", "pump.fun", "trading"],
  authors: [{ name: "Love Island Coins" }],
  openGraph: {
    title: "Love Island Coins",
    description: "Trade your favorite Islanders. 🌴💰",
    url: "https://loveislandcoins.com",
    siteName: "Love Island Coins",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Love Island Coins",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Love Island Coins",
    description: "Trade your favorite Islanders. 🌴💰",
    images: ["/og-image.png"],
    creator: "@loveislandcoins",
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#FF2D78",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
