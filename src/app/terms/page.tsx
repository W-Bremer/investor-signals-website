import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/sections/LegalPage";
import { SMS_SUPPORT_EMAIL } from "@/lib/sms";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for the Investor Signals LLC website, including our text message terms.",
  robots: { index: false },
};

const linkCls = "font-semibold text-navy underline decoration-gold-500/60 underline-offset-4 hover:decoration-gold-600";

export default function TermsPage() {
  return (
    <LegalPage label="Legal" title="Terms of Use" updated="October 25, 2026">
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

      <LegalSection heading="Text messages">
        <p>
          These terms cover text messages sent by Investor Signals LLC. You
          join the program by checking the consent box on our{" "}
          <Link href="/request-an-introduction" className={linkCls}>
            inquiry form
          </Link>{" "}
          or our{" "}
          <Link href="/sms-opt-in" className={linkCls}>
            text message opt-in page
          </Link>
          . By opting in, you agree to receive automated text messages from
          Investor Signals LLC at the mobile number you provided.
        </p>
        <p>
          The messages are about your inquiry, such as follow-ups to a request
          you made, and about appointments, such as confirmations, reminders
          and scheduling notes for your consultation call. Message frequency
          varies. Message and data rates may apply, depending on your carrier
          and plan. Carriers are not liable for delayed or undelivered
          messages. Consent is not a condition of purchase.
        </p>
        <p>
          To opt out, reply STOP to any message. We will send one message
          confirming that you have been unsubscribed, and then no more. For
          help, reply HELP to any message or email{" "}
          <a href={`mailto:${SMS_SUPPORT_EMAIL}`} className={linkCls}>
            {SMS_SUPPORT_EMAIL}
          </a>
          , which is monitored during business hours. How we handle your
          number and your consent is described in our{" "}
          <Link href="/privacy" className={linkCls}>
            Privacy Policy
          </Link>
          .
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
