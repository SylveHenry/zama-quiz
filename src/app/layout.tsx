import type { Metadata, Viewport } from "next";
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
  metadataBase: new URL('https://zama-quiz.vercel.app'),
  title: "Zama Ai Quiz - Test Your Privacy Knowledge",
  description: "Interactive Zama Ai Privacy quiz. Test your knowledge of Zama Protocol.",
  keywords: "zama, privacy, fhe, fully homomorphic encryption, quiz, privacy education, zama protocol",
  authors: [{ name: "Zama Quiz Team" }],
  openGraph: {
    title: "Zama Ai Quiz - Test Your Privacy Knowledge",
    description: "Interactive Zama Ai Privacy quiz. Test your knowledge of Zama Protocol.",
    images: [
      {
        url: "/image.jpg",
        width: 1200,
        height: 630,
        alt: "Zama Privacy Quiz Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zama Ai Quiz - Test Your Privacy Knowledge",
    description: "Interactive Zama Ai Privacy quiz. Test your knowledge of Zama Protocol.",
    images: ["/image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
