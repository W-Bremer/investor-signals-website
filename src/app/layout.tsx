import type { Metadata } from "next";
import { Source_Serif_4, Source_Sans_3 } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
    default: "Investor Signals | Meetings investors ask for",
    template: "%s | Investor Signals",
  },
  description:
    "We put your raise in front of angels, family offices, and venture funds we know personally. The investor reads first and says yes first, and only then is a meeting booked. Flat fee, no success fees.",
  openGraph: {
    type: "website",
    siteName: "Investor Signals",
    url: SITE_URL,
    title: "Investor Signals | Meetings investors ask for",
    description:
      "Nobody funds a cold email. Warm investor introductions and raise advisory for founders and fund managers, from a network we know personally.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Investor Signals" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Investor Signals | Meetings investors ask for",
    description:
      "Nobody funds a cold email. Warm investor introductions and raise advisory for founders and fund managers, from a network we know personally.",
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
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
