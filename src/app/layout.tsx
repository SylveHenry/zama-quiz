import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CryptoQuiz - Test Your Cryptocurrency Knowledge",
  description: "Interactive cryptocurrency quiz with 20 questions. Test your knowledge of Bitcoin, Ethereum, DeFi, and blockchain technology. Powered by Zama Protocol.",
  keywords: "cryptocurrency, bitcoin, ethereum, blockchain, quiz, defi, crypto education",
  authors: [{ name: "CryptoQuiz Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#fbbf24",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
