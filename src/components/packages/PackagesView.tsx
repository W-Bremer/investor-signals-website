import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Check } from "@/components/ui/icons";

// Unlisted pricing pages, shared directly after a consultation call. Kept out
// of the sitemap and the navigation, and marked noindex.
export const PACKAGES_METADATA: Metadata = {
  title: "Packages",
  description: "Engagement packages for curated investor introductions and fundraising strategy.",
  robots: { index: false, follow: false },
};

type Feature = { title: string; detail?: string; inline?: boolean };

const DOSSIERS: Feature = {
  title: "Investor prep dossiers",
  detail:
    "A one-page cited brief on each investor covering their stated thesis, check size, sector focus, and suggested talking points, delivered before you walk in",
};
const LANDSCAPE: Feature = {
  title: "Competitive landscape report",
  detail:
    "A fully sourced map of your direct and adjacent competitors, their funding history, and the gaps in your market, structured to strengthen the competition slide in your deck",
};
const OBJECTIONS: Feature = {
  title: "Category objection playbook",
  detail:
    "The ten hardest questions investors in your category are asking founders right now, with evidence of investors raising them and drafted answers for you to rehearse",
};
const COMPARABLES: Feature = {
  title: "Comparable rounds benchmark",
  detail:
    "Market data on 15 to 30 recent raises in your sector and stage, covering round size, instrument, and lead investors, so you know exactly where your ask sits relative to the market",
};
const ALIGNMENT: Feature = {
  title: "Investor alignment report",
  detail: "matched profiles with thesis fit, check size, and sector focus",
  inline: true,
};
const ASYNC: Feature = {
  title: "Async support",
  detail: "from our team throughout your engagement",
  inline: true,
};

function introductions(count: number): Feature {
  return {
    title: `${count} curated investor introductions`,
    detail: "double opt-in, thesis-aligned, and prepared with your materials in advance",
    inline: true,
  };
}

const PACKAGES: {
  name: string;
  price: string;
  duration: string;
  recommended?: boolean;
  features: Feature[];
}[] = [
  {
    name: "Momentum",
    price: "$14,800",
    duration: "90-day engagement",
    recommended: true,
    features: [
      introductions(13),
      DOSSIERS,
      LANDSCAPE,
      OBJECTIONS,
      COMPARABLES,
      {
        title: "3 advisory sessions with Jordan Goldberg",
        detail:
          "Ongoing pitch optimization, narrative coaching, and investor-ready positioning across multiple sessions",
      },
      ALIGNMENT,
      ASYNC,
    ],
  },
  {
    name: "Accelerate",
    price: "$24,800",
    duration: "90-day engagement",
    features: [
      introductions(23),
      DOSSIERS,
      LANDSCAPE,
      OBJECTIONS,
      COMPARABLES,
      {
        title: "5 advisory sessions with Jordan Goldberg",
        detail:
          "Deep-dive pitch optimization, narrative coaching, and ongoing strategic refinement across your full engagement",
      },
      {
        title: "Bi-weekly executive check-ins",
        detail:
          "Live feedback on your investor conversations, call performance review, pitch refinement, and strategic adjustments to improve your close rate as conversations progress",
      },
      ALIGNMENT,
      ASYNC,
    ],
  },
];

function FeatureItem({ feature, onNavy }: { feature: Feature; onNavy: boolean }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className={`mt-[0.2rem] flex h-[1.125rem] w-[1.125rem] shrink-0 items-center justify-center rounded-full ${
          onNavy ? "bg-gold-500/15 text-gold-400" : "bg-gold-500/15 text-gold-700"
        }`}
      >
        <Check className="h-[0.625rem] w-[0.625rem]" strokeWidth={2.2} />
      </span>
      <div className={`font-sans text-[0.9375rem] leading-[1.55] ${onNavy ? "text-paper/75" : "text-navy/75"}`}>
        <strong className={`font-semibold ${onNavy ? "text-ivory" : "text-navy"}`}>{feature.title}</strong>
        {feature.detail &&
          (feature.inline ? (
            <> &mdash; {feature.detail}</>
          ) : (
            <p className={`mt-1 text-[0.8125rem] leading-[1.55] ${onNavy ? "text-paper/55" : "text-navy/55"}`}>
              {feature.detail}
            </p>
          ))}
      </div>
    </li>
  );
}

function SideCard({
  icon,
  label,
  title,
  children,
}: {
  icon: ReactNode;
  label: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="px-6 py-7 text-center">
      <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gold-500/15 text-gold-700">
        {icon}
      </span>
      <p className="mt-4 font-sans text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-gold-700">{label}</p>
      <div className="mt-2 font-serif font-semibold leading-[1.15] text-navy">{title}</div>
      <p className="mt-2 font-sans text-[0.875rem] leading-[1.6] text-navy/60">{children}</p>
    </div>
  );
}

/** `withOffer` adds the 72-hour discount and money back guarantee panel. */
export function PackagesView({ withOffer = false }: { withOffer?: boolean }) {
  return (
    <>
      <PageHero
        label="Packages"
        title="Curated investor introductions & fundraising strategy."
        intro="We identify, vet, and introduce you to investors aligned with your raise, then equip you with the strategy, feedback, and pitch optimization to convert those conversations into capital."
      />

      <section>
        <div className="container-edge py-16 md:py-24">
          <div className={withOffer ? "grid gap-6 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start" : ""}>
            <div className={`grid gap-6 md:grid-cols-2 ${withOffer ? "" : "mx-auto max-w-[60rem]"}`}>
              {PACKAGES.map((pkg, i) => {
                const onNavy = !!pkg.recommended;
                return (
                  <Reveal key={pkg.name} delay={i * 90} className="h-full">
                    <article
                      className={`relative flex h-full flex-col rounded-[4px] border px-6 pb-8 pt-9 sm:px-8 ${
                        onNavy
                          ? "border-gold-500 bg-navy text-paper shadow-note-deep"
                          : "border-navy/15 bg-white/60 shadow-lift"
                      }`}
                    >
                      {pkg.recommended && (
                        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-gold-500 px-3.5 py-1 font-sans text-[0.625rem] font-bold uppercase tracking-[0.16em] text-navy">
                          Most popular
                        </span>
                      )}
                      <h2
                        className={`font-sans text-[0.75rem] font-semibold uppercase tracking-[0.18em] ${
                          onNavy ? "text-gold-400" : "text-navy/55"
                        }`}
                      >
                        {pkg.name}
                      </h2>
                      <p
                        className={`mt-3 font-serif text-[2.75rem] font-semibold leading-none tracking-[-0.01em] ${
                          onNavy ? "text-ivory" : "text-navy"
                        }`}
                      >
                        {pkg.price}
                      </p>
                      <p className={`mt-2 font-sans text-[0.875rem] ${onNavy ? "text-paper/55" : "text-navy/50"}`}>
                        {pkg.duration}
                      </p>
                      <span className={`my-6 block h-px ${onNavy ? "bg-paper/15" : "bg-navy/10"}`} />
                      <p
                        className={`font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.16em] ${
                          onNavy ? "text-paper/50" : "text-navy/45"
                        }`}
                      >
                        What&rsquo;s included
                      </p>
                      <ul className="mt-5 space-y-4">
                        {pkg.features.map((feature) => (
                          <FeatureItem key={feature.title} feature={feature} onNavy={onNavy} />
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                );
              })}
            </div>

            {withOffer && (
              <Reveal delay={180}>
                <aside className="overflow-hidden rounded-[4px] border border-gold-500/40">
                  <p className="bg-gold-500 px-4 py-2.5 text-center font-sans text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-navy">
                    Available this week
                  </p>
                  <div className="grid divide-y divide-gold-500/20 bg-ivory sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-1 lg:divide-x-0 lg:divide-y">
                    <SideCard
                      label="72-hour discount"
                      title={<span className="text-[1.75rem]">20% off</span>}
                      icon={
                        <svg viewBox="0 0 24 24" aria-hidden className="h-[1.375rem] w-[1.375rem]" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                        </svg>
                      }
                    >
                      <strong className="font-semibold text-navy/80">Purchase within 72 hours</strong> of your consultation
                      call and receive 20% off your selected package.
                    </SideCard>
                    <SideCard
                      label="Risk free"
                      title={<span className="text-[1.25rem]">10-day money back guarantee</span>}
                      icon={
                        <svg viewBox="0 0 24 24" aria-hidden className="h-[1.375rem] w-[1.375rem]" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M9 12l2 2 4-4" />
                        </svg>
                      }
                    >
                      <strong className="font-semibold text-navy/80">Available when paid in full.</strong> If you&rsquo;re
                      not satisfied within the first 10 days of your engagement, we&rsquo;ll refund your investment.
                    </SideCard>
                  </div>
                </aside>
              </Reveal>
            )}
          </div>

          <Reveal>
            <div
              className={`mt-6 rounded-[4px] border border-navy/10 bg-paper-tint px-6 py-8 text-center sm:px-8 sm:text-left ${
                withOffer ? "" : "mx-auto max-w-[60rem]"
              }`}
            >
              <p className="eyebrow">Advisory partner</p>
              <div className="relative mx-auto mt-5 h-28 w-28 overflow-hidden rounded-full bg-paper-deep sm:mx-0">
                <Image src="/team/jordan.jpg" alt="Jordan Goldberg" fill sizes="112px" className="object-cover" />
              </div>
              <h2 className="mt-5 font-serif text-[1.35rem] font-semibold text-navy">Jordan Goldberg</h2>
              <p className="mt-2 max-w-[48rem] font-sans text-[0.9375rem] leading-[1.65] text-navy/65">
                Yale behavioral scientist, multi-exit founder, and fund manager (Frago Investments). Expert in
                narrative strategy and human decision-making, helping you build the most compelling offer investors
                can&rsquo;t ignore.
              </p>
              <p className="mt-2 font-sans text-[0.8125rem] leading-[1.6] text-navy/50">
                Additional advisory sessions beyond your package can be purchased at $500/hour.
              </p>
            </div>
          </Reveal>

          <div className="mx-auto mt-12 max-w-2xl text-center">
            <p className="font-sans text-[0.9375rem] leading-[1.7] text-navy/60">
              All introductions are <strong className="font-semibold text-gold-700">double opt-in</strong> and curated
              for stage, sector, check size, and thesis alignment.
            </p>
            {withOffer && (
              <p className="mt-3 font-sans text-[0.75rem] leading-[1.5] text-navy/40">
                Money back guarantee provides a pro-rated refund on services not yet rendered as of the date of
                cancellation request.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
