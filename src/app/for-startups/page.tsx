import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { LedgerList } from "@/components/sections/LedgerList";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Reveal, RuleDraw } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "For Startups",
  description:
    "From pre-seed to growth, we introduce founders to angels, family offices, and venture funds whose thesis matches the raise, confirmed before the meeting is booked.",
};

const HELP_ITEMS = [
  "Meet investors whose thesis matches your raise, confirmed before the meeting is booked",
  "Walk into every meeting prepared, with a cited dossier on the investor in hand",
  "Sharpen your narrative, deck, and positioning with advisory sessions led by an experienced operator",
  "Understand your competitive landscape and the gaps your deck needs to answer",
  "Anticipate the hardest questions investors in your category are asking, with rehearsed answers",
  "Benchmark your ask against recent comparable rounds in your sector and stage",
  "Improve meeting to meeting, with feedback on your investor conversations as they progress",
];

export default function ForStartupsPage() {
  return (
    <>
      <PageHero
        label="For startups"
        title="Raise from investors who asked to meet you."
        intro="Fundraising rewards preparation and relationships, and punishes everything else. We bring both. Our network of angels, family offices, and venture funds is signed, mapped, and matched to your raise across stage, check size, sector, geography, and thesis. When you meet an investor through us, they have already read your materials and confirmed they want the conversation."
      />

      <LedgerList label="The work" title="What we help you do" items={HELP_ITEMS} />

      <section className="border-t border-navy/10 bg-paper-tint">
        <div className="container-edge py-24 md:py-28">
          <Reveal className="flex items-center gap-5">
            <span className="eyebrow whitespace-nowrap">Who this is for</span>
            <RuleDraw className="flex-1 text-navy/15" delay={150} />
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-10 max-w-4xl font-serif text-display-md font-medium leading-[1.4] text-navy">
              Founders from pre-seed through growth who have a real business and
              a clear raise, and who want fewer, better investor conversations
              rather than a bigger spray.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-7 max-w-[44rem] font-sans text-[1.0625rem] leading-[1.75] text-navy/70">
              We also work with mission-driven companies, including medical and
              scientific ventures, where the right investor cares about the
              outcome as much as the return.
            </p>
          </Reveal>
        </div>
      </section>

      <ClosingCta ctaLabel="Tell us about your raise" ctaHref="/request-an-introduction" />
    </>
  );
}
