import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Reveal } from "@/components/motion/Reveal";

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

      <ClosingCta />
    </>
  );
}
