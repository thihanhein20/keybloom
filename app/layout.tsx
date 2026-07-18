import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Mono, Manrope } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["300", "400", "500", "600"] });
const mono = DM_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["300", "400"] });
const sans = Manrope({ variable: "--font-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Astra Noctis — An Interactive Reverie",
  description: "A cinematic three-dimensional dreamscape suspended between memory and starlight.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${display.variable} ${mono.variable} ${sans.variable}`}>{children}</body></html>;
}
