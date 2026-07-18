import type { Metadata } from "next";
import { DM_Mono, Nunito, Fraunces } from "next/font/google";
import "./globals.css";
const sans=Nunito({variable:"--font-sans",subsets:["latin"]});const mono=DM_Mono({variable:"--font-mono",subsets:["latin"],weight:["300","400","500"]});const display=Fraunces({variable:"--font-display",subsets:["latin"]});
export const metadata:Metadata={title:"Keybloom — Your 3D Desk Friend",description:"A cute, hand-built interactive 3D mechanical keyboard and monitor."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${sans.variable} ${mono.variable} ${display.variable}`}>{children}</body></html>}
