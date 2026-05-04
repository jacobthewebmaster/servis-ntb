import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CookieBar from "@/components/CookieBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Opravy notebooků | HVnotebooky.cz",
  description:
    "Rychlé opravy notebooků po celé ČR. Diagnostika zdarma při realizaci opravy. Oprava až po schválení ceny.",

  openGraph: {
    title: "Opravy notebooků | HVnotebooky.cz",
    description:
      "Rychlé opravy notebooků bez starostí. Diagnostika zdarma.",
    url: "https://www.hvnotebooky.cz",
    siteName: "HVnotebooky.cz",
    locale: "cs_CZ",
    type: "website",
    images: [
      {
        url: "/og.png", // dej si sem obrázek (1200x630)
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className="text-slate-950 antialiased">
        {children}
        <CookieBar />
      </body>
    </html>
  );
}