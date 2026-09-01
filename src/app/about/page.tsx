import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why we built Investor Signals: a smaller network, known personally. Fewer introductions, each one accepted in advance. Based in Miami, active in New York.",
};

const FACTS = [
  { figure: "Hundreds", caption: "of startups supported through our team’s prior ventures" },
  { figure: "Nine figures", caption: "raised across those engagements" },
  { figure: "Miami", caption: "based here, active in New York" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero label="About the firm" title="Why we built it this way" />

      <section>
        <div className="container-edge grid gap-14 py-20 md:py-28 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-serif text-[1.5rem] font-medium leading-[1.5] text-navy md:text-[1.75rem]">
                Before Investor Signals, our team spent years inside the
                fundraising machine, helping hundreds of companies raise. We
                watched founders pay agencies for warm intros that were cold
                emails wearing a suit.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-9 max-w-[42rem] font-sans text-[1.0625rem] leading-[1.8] text-navy/75">
                So we built the opposite. A smaller network, known personally.
                Fewer introductions, each one accepted in advance. Advisory work
                that treats your raise as a campaign to be won, not a list to be
                blasted. It is slower work than sending ten thousand emails, and
                it is the only version of this business we would put our name
                on.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-12 border-l-2 border-gold-500 pl-6 font-serif text-[1.3rem] italic leading-relaxed text-navy">
                We are based in Miami, active in New York, and we answer our own
                phones.
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

      <ClosingCta />
    </>
  );
}
