// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CookieBar from "@/components/CookieBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hvnotebooky.cz"),
  
  title: {
    default: "Svoz notebooků po celé ČR | HV Notebooky",
    template: "%s | HV Notebooky",
  },
  
  description:
    "Svoz notebooků zdarma nebo výhodně po celé České republice. Profesionální opravy všech značek – diagnostika zdarma, oprava až po schválení ceny, záruka na práci.",

  keywords: [
    "svoz notebooku",
    "oprava notebooku svoz",
    "servis notebooků ČR",
    "doprava notebooku do servisu",
    "výměna displeje notebooku",
    "čištění chlazení notebooku",
    "oprava notebooku Praha",
    "oprava notebooku Brno",
    "oprava notebooku Ostrava",
  ],

  authors: [{ name: "HV Notebooky", url: "https://www.hvnotebooky.cz" }],
  creator: "HV Notebooky",
  publisher: "HV Notebooky",

  openGraph: {
    title: "Svoz notebooků po celé ČR | HV Notebooky",
    description:
      "Rychlý svoz notebooků + profesionální opravy. Diagnostika zdarma, transparentní ceny, záruka.",
    url: "https://www.hvnotebooky.cz",
    siteName: "HV Notebooky",
    locale: "cs_CZ",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "HV Notebooky - Svoz a oprava notebooků po celé ČR",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Svoz notebooků po celé ČR | HV Notebooky",
    description: "Profesionální svoz a oprava notebooků bez starostí.",
    images: ["/og.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://www.hvnotebooky.cz",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-white text-slate-950 antialiased min-h-screen flex flex-col">
        {children}
        <CookieBar />
      </body>
    </html>
  );
}