import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexus Consumer Care | Premium Detergent & Cleaning Products",
  description: "India's trusted manufacturer of premium liquid detergents, detergent powders, and floor cleaners. 17+ years of excellence in contract manufacturing and private label solutions.",
  keywords: ["Nexus Consumer Care", "detergent manufacturer", "cleaning products", "private label", "contract manufacturing", "liquid detergent", "floor cleaner", "India"],
  authors: [{ name: "Nexus Consumer Care" }],
  icons: {
    icon: "\public\images\nexus\logo.png",
  },
  openGraph: {
    title: "Nexus Consumer Care | Quality You Trust. Scale You Need.",
    description: "Premium detergent and cleaning products manufacturer with 17+ years of trust.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${playfairDisplay.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
