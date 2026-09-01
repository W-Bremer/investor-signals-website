import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { LedgerList } from "@/components/sections/LedgerList";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Reveal, RuleDraw } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "For Startups",
  description:
    "Warm investor meetings that start with the investor's yes, plus the research and coaching to win them. For founders raising pre-seed to growth.",
};

const HELP_ITEMS = [
  "Meet only investors whose thesis fits your round, each meeting accepted before it hits your calendar",
  "Walk in holding a cited dossier on the person across the table",
  "Rebuild your narrative and deck with an operator, not a template",
  "Know your competitive landscape better than the investor asking about it",
  "Rehearse the ten hardest questions your category is getting right now",
  "Price your ask against 15 to 30 recent rounds like yours",
  "Debrief every meeting and get sharper before the next one",
];

export default function ForStartupsPage() {
  return (
    <>
      <PageHero
        label="For startups"
        title="Raise like someone who has done this before."
        intro="Because with us in the room, you have. Our team has sat inside hundreds of raises, and the difference between a funded round and a stalled one is rarely the product. It is who you meet, and how you show up. We fix both: introductions the investor has already said yes to, and the preparation to make each one count."
      />

      <LedgerList label="The work" title="What you get from us" items={HELP_ITEMS} />

      <section className="border-t border-navy/10 bg-paper-tint">
        <div className="container-edge py-24 md:py-28">
          <Reveal className="flex items-center gap-5">
            <span className="eyebrow whitespace-nowrap">Who this is for</span>
            <RuleDraw className="flex-1 text-navy/15" delay={150} />
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-10 max-w-4xl font-serif text-display-md font-medium leading-[1.4] text-navy">
              Pre-seed through growth, with a real business and a clear ask.
              Founders who would rather have five conversations that matter
              than five hundred that do not.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-7 max-w-[44rem] font-sans text-[1.0625rem] leading-[1.75] text-navy/70">
              That includes mission-driven and scientific ventures, where the
              right investor cares about the outcome as much as the return. And
              if what you actually want is a blast list, we are the wrong firm,
              and we will tell you so on the call.
            </p>
          </Reveal>
        </div>
      </section>

      <ClosingCta ctaLabel="Tell us about your raise" ctaHref="/request-an-introduction" />
    </>
  );
}
