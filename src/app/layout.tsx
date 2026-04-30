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
  title: "HV notebooky.cz – Opravy notebooků",
  description:
    "Rychlé opravy notebooků bez starostí. Diagnostika zdarma při realizaci opravy.",
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