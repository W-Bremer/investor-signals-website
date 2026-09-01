import Link from "next/link";

const NAVIGATE = [
  { href: "/for-startups", label: "For Startups" },
  { href: "/for-fund-managers", label: "For Fund Managers" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

const LEGAL = [
  { href: "/disclosures", label: "Disclosures" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/request-an-introduction", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-navy/10 bg-paper-tint">
      <div className="container-edge pb-10 pt-16 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-serif text-[2rem] font-semibold leading-none text-navy md:text-[2.5rem]">
              Investor Signals<span className="text-gold-600">.</span>
            </p>
            <p className="mt-5 max-w-sm font-sans text-[0.9375rem] leading-relaxed text-navy/65">
              Confirmed investor introductions and fundraising advisory for
              founders and fund managers.
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
              {LEGAL.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-quiet font-sans text-[0.9375rem] text-navy/75 hover:text-navy">
                    {l.label}
                  </Link>
                </li>
              ))}
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
