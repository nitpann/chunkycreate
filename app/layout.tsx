import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = "https://chunkycreate.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ChunkyCreate — Digital Tools, AI Prompts, Guides & Creative Resources",
    template: "%s | ChunkyCreate",
  },
  description:
    "ChunkyCreate is a personal digital-product studio selling apps, AI prompts, PDF guides and digital art — practical, affordable, and ready in minutes.",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "ChunkyCreate",
    title: "ChunkyCreate — Digital Tools, AI Prompts, Guides & Creative Resources",
    description:
      "Apps, AI prompts, guides and digital art from ChunkyCreate — practical, affordable, and ready in minutes.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChunkyCreate",
    description: "Digital tools, AI prompts, guides and creative resources.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-body">
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
