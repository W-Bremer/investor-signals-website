import Link from "next/link";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

const NAVIGATE = [
  { href: "/for-startups", label: "For Startups" },
  { href: "/for-fund-managers", label: "For Fund Managers" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

const LEGAL = [
  { href: "/request-an-introduction", label: "Contact" },
  { href: "/events", label: "Events" },
  { href: "/disclosures", label: "Disclosures" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as { href: string; label: string; external?: boolean }[];

export function Footer() {
  return (
    <footer className="border-t border-navy/10 bg-paper-tint">
      <div className="container-edge pb-10 pt-16 md:pt-20">
        <div className="mb-14 grid gap-8 border-b border-navy/10 pb-12 md:mb-16 md:grid-cols-12 md:gap-10 md:pb-14 lg:items-end">
          <div className="md:col-span-5">
            <p className="eyebrow mb-4">Newsletter</p>
            <h2 className="font-serif text-display-sm font-semibold text-navy">Get the next issue.</h2>
            <p className="mt-3 max-w-sm font-sans text-[0.9375rem] leading-relaxed text-navy/65">
              Every week: what we are hearing from investors, what is working
              in raises right now, and the data behind it.
            </p>
          </div>
          <div className="md:col-span-7">
            <NewsletterForm variant="inline" />
          </div>
        </div>

        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-serif text-[2rem] font-semibold leading-none text-navy md:text-[2.5rem]">
              Investor Signals<span className="text-gold-600">.</span>
            </p>
            <p className="mt-5 max-w-sm font-sans text-[0.9375rem] leading-relaxed text-navy/65">
              Warm investor introductions and raise advisory. The investor says
              yes before the meeting exists.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow mb-5">Navigate</p>
            <ul className="space-y-3">
              {NAVIGATE.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-quiet font-sans text-[0.9375rem] text-navy/75 hover:text-navy">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow mb-5">The firm</p>
            <ul className="space-y-3">
              {LEGAL.map((l) =>
                l.external ? (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-quiet font-sans text-[0.9375rem] text-navy/75 hover:text-navy"
                    >
                      {l.label}
                    </a>
                  </li>
                ) : (
                  <li key={l.href}>
                    <Link href={l.href} className="link-quiet font-sans text-[0.9375rem] text-navy/75 hover:text-navy">
                      {l.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-navy/10 pt-7">
          <p className="font-sans text-[0.8125rem] text-navy/60">
            Investor Signals LLC. Miami, Florida.
          </p>
          <p className="mt-3 max-w-3xl font-sans text-[0.8125rem] leading-relaxed text-navy/50">
            Investor Signals is not a broker-dealer and does not provide
            investment advice. We arrange introductions; all investment
            decisions are made solely by the parties involved.
          </p>
        </div>
      </div>
    </footer>
  );
}
