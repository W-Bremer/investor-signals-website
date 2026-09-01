import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { LedgerList } from "@/components/sections/LedgerList";
import { ClosingCta } from "@/components/sections/ClosingCta";

export const metadata: Metadata = {
  title: "For Fund Managers",
  description:
    "We introduce emerging managers to family offices and allocators whose mandate matches the fund, confirmed in advance. LP capital moves on trust.",
};

const HELP_ITEMS = [
  "Meet family offices and allocators whose mandate matches your fund, confirmed in advance",
  "Prepare for each allocator conversation with a briefing on their portfolio and preferences",
  "Refine your fund narrative, positioning, and materials for an LP audience",
  "Understand how your terms and track record sit relative to comparable funds",
  "Run a disciplined process across your engagement, with support between meetings",
];

export default function ForFundManagersPage() {
  return (
    <>
      <PageHero
        label="For fund managers"
        title="LP capital moves on trust. Start with introductions built on it."
        intro="Emerging managers face the hardest cold start in the industry: allocators do not take unsolicited meetings, and databases do not tell you who is actually deploying. We maintain relationships with family offices and allocators who have told us what they want to see. When a manager fits, we make the introduction, and only after the allocator has said yes."
      />

      <LedgerList label="The work" title="What we help you do" items={HELP_ITEMS} />

      <ClosingCta ctaLabel="Tell us about your fund" ctaHref="/request-an-introduction?about=fund-manager" />
    </>
  );
}
