import type {Metadata} from "next";
import {Geist, Outfit} from "next/font/google";
import {getLocale} from "next-intl/server";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Garage de la Largue",
    template: "%s · Garage de la Largue",
  },
  description: "Agent Renault à Seppois-le-Bas — occasions, atelier mécanique, location.",
};

export default async function RootLayout({children}: {children: React.ReactNode}) {
  let locale = "fr";
  try {
    locale = await getLocale();
  } catch {
    locale = "fr";
  }

  return (
    <html lang={locale} className={`${geistSans.variable} ${outfit.variable} h-full antialiased`}>
      <body className="min-h-full bg-background font-sans text-foreground">{children}</body>
    </html>
  );
}
