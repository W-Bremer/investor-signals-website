import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Investor Signals LLC handles your information.",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <LegalPage label="Legal" title="Privacy" updated="September 2026">
      <LegalSection heading="What we collect">
        <p>
          When you request an introduction, we collect what you give us: your
          name, email, company or fund, role, the shape of your raise, and any
          materials or links you share, such as a deck. Our site also keeps
          ordinary server logs.
        </p>
      </LegalSection>

      <LegalSection heading="How we use it">
        <p>
          We use your information to evaluate fit, to prepare for your
          consultation call, and, if we work together, to match your raise
          against our network and arrange introductions. That is the whole
          list.
        </p>
      </LegalSection>

      <LegalSection heading="Who sees it">
        <p>
          Your materials go only to investors who have been matched to your
          raise, and only with your consent. We do not sell your information,
          rent it, or trade it. The service providers who host our systems
          process data on our behalf and under our instructions.
        </p>
      </LegalSection>

      <LegalSection heading="Keeping and removing it">
        <p>
          We keep submissions for as long as they are useful for the purpose
          you sent them. If you would like your information corrected or
          deleted, ask through the contact form and we will take care of it.
        </p>
      </LegalSection>

      <LegalSection heading="Questions">
        <p>
          This page is written to be read, not to impress lawyers. If anything
          is unclear, ask us directly through the contact form. Investor
          Signals LLC, Miami, Florida.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
