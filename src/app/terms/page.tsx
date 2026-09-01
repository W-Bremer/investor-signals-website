import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for the Investor Signals LLC website.",
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <LegalPage label="Legal" title="Terms of Use" updated="September 2026">
      <LegalSection heading="Using this site">
        <p>
          This site is published by Investor Signals LLC for general
          information about our services. By using it, you accept these terms.
          Client engagements are governed by a separate written agreement,
          which controls if anything here conflicts with it.
        </p>
      </LegalSection>

      <LegalSection heading="Not advice">
        <p>
          Nothing on this site is investment, legal, accounting, or tax advice,
          and nothing here creates an advisory or client relationship. Investor
          Signals is not a broker-dealer. We arrange introductions; all
          investment decisions are made solely by the parties involved.
        </p>
      </LegalSection>

      <LegalSection heading="Our content">
        <p>
          The text, design, and marks on this site belong to Investor Signals
          LLC. You are welcome to read, quote, and link. Please do not copy the
          site wholesale or present our work as your own.
        </p>
      </LegalSection>

      <LegalSection heading="No warranties">
        <p>
          The site is provided as it is. We work to keep it accurate and
          available, but we make no warranty that it will be, and we are not
          liable for damages arising from its use to the fullest extent the
          law allows.
        </p>
      </LegalSection>

      <LegalSection heading="Governing law">
        <p>
          These terms are governed by the laws of the State of Florida. If we
          update them, the date at the top of this page changes and the new
          version applies from then on.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
