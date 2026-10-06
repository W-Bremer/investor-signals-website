import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import {
  ASYNC,
  COMPARABLES,
  DOSSIERS,
  DoubleOptInNote,
  FeatureItem,
  JordanCard,
  LANDSCAPE,
  OBJECTIONS,
  type Feature,
} from "@/components/packages/PackagesView";

const GROUPS: { label: string; features: Feature[] }[] = [
  {
    label: "Introductions & research",
    features: [
      {
        title: "34 curated investor introductions",
        detail: "Double opt-in, thesis-aligned, and prepared with your materials in advance",
      },
      DOSSIERS,
      LANDSCAPE,
      OBJECTIONS,
      COMPARABLES,
      {
        title: "Investor alignment report",
        detail: "Matched profiles with thesis fit, check size, and sector focus",
      },
    ],
  },
  {
    label: "Advisory, support & access",
    features: [
      {
        title: "8 advisory sessions with Jordan Goldberg",
        detail:
          "Deep-dive pitch optimization, narrative coaching, behavioral strategy, and ongoing refinement across your full engagement",
      },
      {
        title: "Bi-weekly executive check-ins",
        detail:
          "Live feedback on your investor conversations, call performance review, pitch refinement, and strategic adjustments to improve your close rate as conversations progress",
      },
      {
        title: "6-month Synapse Network membership",
        detail:
          "Access to our invitation-only capital network for fund managers, LPs, family offices, and lenders. Every member verified. Introductions matched to your stated needs by our AI agent, delivered to your inbox",
      },
      {
        title: "Quarterly investor event invitations for 1 year",
        detail:
          "Private, closed-door events with VCs, family offices, and HNWIs. Seated by needs and assets, not name badges. Cocktails, connections, and the conversations that don’t happen over LinkedIn",
      },
      ASYNC,
    ],
  },
];

export function FoundersCircleView() {
  return (
    <>
      <PageHero
        label="Founder's Circle"
        title="Curated investor introductions & fundraising strategy."
        intro="We identify, vet, and introduce you to investors aligned with your raise, then equip you with the strategy, feedback, and pitch optimization to convert those conversations into capital."
      />

      <section>
        <div className="container-edge py-16 md:py-24">
          <div className="mx-auto max-w-[60rem]">
            <Reveal>
              <article className="relative rounded-[4px] border border-gold-500 bg-navy px-6 pb-8 pt-11 text-paper shadow-note-deep sm:px-10 md:px-12 md:pb-12">
                <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-gold-500 px-5 py-1.5 font-sans text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-navy">
                  Founder&rsquo;s Circle
                </span>

                <div className="text-center">
                  <h2 className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-gold-400">
                    Full-service capital strategy
                  </h2>
                  <p className="mt-3 font-serif text-[2.75rem] font-semibold leading-none tracking-[-0.01em] text-ivory md:text-[3.5rem]">
                    $49,800
                  </p>
                  <p className="mt-2 font-sans text-[0.875rem] text-paper/55">6-month engagement</p>
                </div>

                <span
                  aria-hidden
                  className="my-8 block h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent"
                />

                <div className="grid gap-10 md:grid-cols-2 md:gap-x-10">
                  {GROUPS.map((group) => (
                    <div key={group.label}>
                      <h3 className="border-b border-gold-500/20 pb-2.5 font-sans text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-gold-400">
                        {group.label}
                      </h3>
                      <ul className="mt-5 space-y-4">
                        {group.features.map((feature) => (
                          <FeatureItem key={feature.title} feature={feature} onNavy />
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-col items-center gap-4 rounded-[4px] border border-gold-500/20 bg-gold-500/[0.06] px-5 py-6 text-center sm:flex-row sm:items-start sm:px-6 sm:text-left">
                  <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-[4px] border border-gold-500/30 bg-gold-500/10 text-gold-400">
                    <span className="font-sans text-[0.5625rem] font-bold uppercase leading-none tracking-[0.12em]">Oct</span>
                    <span className="font-serif text-[1.25rem] font-semibold leading-[1.1]">15</span>
                  </div>
                  <div>
                    <p className="font-sans text-[0.9375rem] font-semibold text-ivory">Your first event: SIGNAL NYC</p>
                    <p className="mt-1 font-sans text-[0.8125rem] leading-[1.6] text-paper/60">
                      Reserve Padel, Hudson Yards. 100+ VCs, family offices, and HNWIs. Cocktails, food, padel, live
                      DJ, and curated introductions in one evening. Presented by Synapse Network and Investor Signals.
                    </p>
                    <span className="mt-3 inline-block rounded-[3px] bg-gold-500/15 px-2 py-1 font-sans text-[0.6875rem] font-semibold tracking-[0.02em] text-gold-400">
                      Included in your membership
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>

            <Reveal>
              <JordanCard className="mt-6" />
            </Reveal>

            <div className="mx-auto mt-12 max-w-2xl text-center">
              <DoubleOptInNote />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
