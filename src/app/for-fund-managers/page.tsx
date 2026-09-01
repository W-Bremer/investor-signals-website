import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { LedgerList } from "@/components/sections/LedgerList";
import { ClosingCta } from "@/components/sections/ClosingCta";

export const metadata: Metadata = {
  title: "For Fund Managers",
  description:
    "LP introductions for emerging managers, made only after the allocator says yes. Family offices and allocators who told us what they want to see.",
};

const HELP_ITEMS = [
  "Meet family offices and allocators whose mandate fits your fund, confirmed before anything is scheduled",
  "Get a briefing on each allocator’s portfolio and preferences before you speak",
  "Sharpen your fund story and materials for an LP audience, which is not a founder audience",
  "See how your terms and track record stack up against comparable funds",
  "Run the raise as a process, with support between every meeting",
];

export default function ForFundManagersPage() {
  return (
    <>
      <PageHero
        label="For fund managers"
        title="Your first LPs will not come from a database."
        intro="Emerging managers get the coldest start in the business. Allocators do not answer unsolicited decks, and the lists everyone is selling go stale faster than they update. LP money moves on trust and timing. Our job is to hand you both: family offices and allocators who told us what they want to back, meeting you because they asked to."
      />

      <LedgerList label="The work" title="What you get from us" items={HELP_ITEMS} />

      <ClosingCta ctaLabel="Tell us about your fund" ctaHref="/request-an-introduction?about=fund-manager" />
    </>
  );
}
