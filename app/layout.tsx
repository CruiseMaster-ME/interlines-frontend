import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SessionProvider from "@/components/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cinzel = Cinzel({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Interline Cruises Middle East",
    template: "%s | Interline Cruises Middle East",
  },
  description:
    "Exclusive cruise rates for verified Middle East travel and hospitality professionals, with registration, verification, and direct booking in one place.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://interlinecruisesme.com",
  ),
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorantGaramond.variable} ${cinzel.variable} min-h-dvh bg-white text-zinc-900 antialiased`}
      >
        <SessionProvider>
          <div className="flex min-h-dvh flex-col">
            <div className="site-header-shell">
              <SiteHeader />
            </div>
            <main className="site-main-shell flex-1">{children}</main>
            <div className="site-footer-shell">
              <SiteFooter />
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
