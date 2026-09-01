import type { Metadata } from "next";
import { Source_Serif_4, Source_Sans_3 } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import "./globals.css";

const serif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://investorsignals.co";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Investor Signals | Confirmed investor introductions",
    template: "%s | Investor Signals",
  },
  description:
    "We connect founders and fund managers with a private network of angels, family offices, and venture funds. Every introduction is accepted by the investor before it is booked.",
  openGraph: {
    type: "website",
    siteName: "Investor Signals",
    url: SITE_URL,
    title: "Investor Signals | Confirmed investor introductions",
    description:
      "Every introduction we make has already been accepted. Investor introductions and fundraising advisory for founders and fund managers.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Investor Signals" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Investor Signals | Confirmed investor introductions",
    description:
      "Every introduction we make has already been accepted. Investor introductions and fundraising advisory for founders and fund managers.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Investor Signals LLC",
  url: SITE_URL,
  description:
    "Investor introduction and fundraising advisory firm. Every introduction is accepted by the investor before it is booked.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Miami",
    addressRegion: "FL",
    addressCountry: "US",
  },
  areaServed: "US",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`no-js ${serif.variable} ${sans.variable}`}>
      <body className="grain min-h-screen font-sans antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.replace('no-js','js');",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-navy focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
