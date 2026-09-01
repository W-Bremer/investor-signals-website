import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Disclosures",
  description: "Required disclosures for Investor Signals LLC.",
  robots: { index: false },
};

export default function DisclosuresPage() {
  return (
    <LegalPage label="Legal" title="Disclosures" updated="September 2026">
      <LegalSection heading="What we are, and what we are not">
        <p>
          Investor Signals is not a broker-dealer and does not provide
          investment advice. We arrange introductions; all investment decisions
          are made solely by the parties involved.
        </p>
        <p>
          Nothing on this site is an offer to sell, or a solicitation of an
          offer to buy, any security. Nothing on this site should be read as a
          recommendation of any investment, investor, company, or fund.
        </p>
      </LegalSection>

      <LegalSection heading="No guarantee of outcome">
        <p>
          We arrange meetings with investors who have reviewed a client&rsquo;s
          materials and confirmed interest in a conversation. We do not
          guarantee that any introduction will lead to an investment, and we
          put that in writing with every engagement. Be careful with anyone in
          this industry who promises otherwise.
        </p>
      </LegalSection>

      <LegalSection heading="How we are compensated">
        <p>
          Investor Signals charges a fixed engagement fee, scoped and agreed
          before work begins. We take no success fees, no commissions, no
          percentage of any raise, and no equity or warrants. Our compensation
          never depends on whether an investment occurs.
        </p>
      </LegalSection>

      <LegalSection heading="The firm">
        <p>
          This site is operated by Investor Signals LLC, Miami, Florida.
          Questions about anything on this page belong on your consultation
          call, or through the contact form.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
