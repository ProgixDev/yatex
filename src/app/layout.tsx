import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/i18n/LangContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "YATEX — Recyclage et tri de friperie en Tunisie",
  description:
    "YATEX, partenaire tunisien en importation, tri, valorisation et export de vêtements et chaussures de seconde main.",
  icons: {
    icon: {
      url:
        "data:image/svg+xml," +
        encodeURIComponent(
          "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 50'><rect width='40' height='50' fill='#283618'/><g fill='none' stroke='#FEFAE0' stroke-width='3' stroke-linecap='round'><path d='M5 8 Q14 8 20 17 Q26 8 35 8'/><path d='M20 17 L20 40'/></g><line x1='3' y1='45' x2='37' y2='45' stroke='#DDA15E' stroke-width='2' stroke-linecap='round'/></svg>"
        ),
      type: "image/svg+xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} ${dmSerif.variable}`}>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
