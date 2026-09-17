import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHead } from "@/components/sections/SectionHead";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Reveal } from "@/components/motion/Reveal";
import { TeamGrid } from "@/components/about/TeamGrid";
import { ArrowRight } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "The firm we kept wishing existed: a network small enough to know personally, introductions that only exist once the investor says yes, and advisory that treats a raise like a campaign.",
};

const FACTS = [
  { figure: "Hundreds", caption: "of raises our team has worked inside" },
  { figure: "Nine figures", caption: "raised across that work" },
  { figure: "Miami", caption: "home base, with New York in constant rotation" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero label="About the firm" title="We built the firm we kept wishing existed." />

      <section>
        <div className="container-edge grid gap-14 py-20 md:py-28 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-serif text-[1.5rem] font-medium leading-[1.5] text-navy md:text-[1.75rem]">
                Our team spent years inside other people&rsquo;s raises,
                hundreds of them. The same trick kept showing up: founders
                paying for warm introductions that turned out to be cold email
                with better fonts.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-9 max-w-[42rem] font-sans text-[1.0625rem] leading-[1.8] text-navy/75">
                So this firm runs on the opposite bet. A network small enough
                to know personally. Introductions that only exist once the
                investor says yes. Research and coaching that treat your raise
                like a campaign, not a mailing list. It is slower. It converts
                better. And it is the only version of this business we were
                willing to put our name on.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-12 border-l-2 border-gold-500 pl-6 font-serif text-[1.3rem] italic leading-relaxed text-navy">
                Miami based, active in New York, and we answer our own phones.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-32">
              {FACTS.map((fact, i) => (
                <Reveal
                  key={fact.figure}
                  delay={i * 120}
                  className="border-t border-navy/10 py-7 first:border-t-0 first:pt-2"
                >
                  <p className="font-serif text-[2rem] font-semibold leading-none text-navy">
                    {fact.figure}
                  </p>
                  <p className="mt-2.5 font-sans text-[0.9375rem] leading-snug text-navy/60">
                    {fact.caption}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-navy/10 bg-paper-tint">
        <div className="container-edge py-20 md:py-28">
          <SectionHead
            label="The team"
            title="The people behind the network"
            lede="Every introduction we make carries one of these names with it. That is the whole model: a network built by hand, by people who answer for it."
            className="mb-16"
          />
          <TeamGrid />
        </div>
      </section>

      <section className="border-t border-navy/10">
        <div className="container-edge py-16 md:py-20">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow">From the team</p>
                <h2 className="mt-5 max-w-2xl font-serif text-display-sm font-semibold text-navy">
                  We published our entire outreach playbook. Every step, nothing
                  held back.
                </h2>
                <p className="mt-4 max-w-[38rem] font-sans text-[0.9375rem] leading-[1.7] text-navy/65">
                  If you are going to run investor outreach yourself, this is
                  how we would do it: the segmentation, the messaging, the
                  follow-up cadence, and the honest numbers behind all of it.
                </p>
              </div>
              <Link
                href="/blog/the-investor-relations-playbook"
                className="link-arrow group inline-flex shrink-0 items-center gap-3 font-sans text-[0.9375rem] font-semibold text-navy transition-colors duration-300 hover:text-navy-600"
              >
                <span className="link-quiet">Read the playbook</span>
                <ArrowRight className="arrow-slide h-[0.8em] w-[0.8em] text-gold-600" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
