import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { siteConfig } from "@/config/site";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const instrument = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

export const viewport: Viewport = {
  themeColor: "#0D0D0F",
};

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "AI automation agency",
    "local business marketing",
    "website design",
    "SMS automation",
    "Google reviews",
    "small business growth",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  metadataBase: new URL(siteConfig.url),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  areaServed: "US",
  sameAs: [
    siteConfig.social.instagram,
    siteConfig.social.facebook,
    siteConfig.social.linkedin,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${instrument.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#0D0D0F] text-[#1C1C1E] font-[var(--font-geist-sans)] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div aria-hidden className="grain" />
        <ScrollProgressBar />
        <CustomCursor />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
