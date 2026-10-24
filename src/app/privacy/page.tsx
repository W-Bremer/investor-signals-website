import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/sections/LegalPage";
import { SMS_SUPPORT_EMAIL } from "@/lib/sms";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Investor Signals LLC handles your information, including our text message program.",
  robots: { index: false },
};

const linkCls = "font-semibold text-navy underline decoration-gold-500/60 underline-offset-4 hover:decoration-gold-600";

export default function PrivacyPage() {
  return (
    <LegalPage label="Legal" title="Privacy" updated="October 25, 2026">
      <LegalSection heading="What we collect">
        <p>
          When you request an introduction, we collect what you give us: your
          name, email, company or fund, role, the shape of your raise, and any
          materials or links you share, such as a deck. If you choose to opt
          in to text messages, we also collect your mobile number and a record
          of your consent, described below. When you request a spot at one of
          our events, including through a form on Facebook or Instagram, we
          collect your name, email, phone number, and how you describe your
          role. Our site also keeps ordinary server logs and privacy-friendly
          visit statistics.
        </p>
      </LegalSection>

      <LegalSection heading="How we use it">
        <p>
          We use your information to evaluate fit, to prepare for your
          consultation call, and, if we work together, to match your raise
          against our network and arrange introductions. If you request an
          event spot, we use it to call, text, or email you about that event.
          If you opt in to text messages, we use your mobile number as
          described in the next section. That is the whole list.
        </p>
      </LegalSection>

      <LegalSection heading="Text messages">
        <p>
          Investor Signals LLC runs one text message program. If you give us
          your mobile number and check the consent box on our{" "}
          <Link href="/request-an-introduction" className={linkCls}>
            inquiry form
          </Link>{" "}
          or our{" "}
          <Link href="/sms-opt-in" className={linkCls}>
            text message opt-in page
          </Link>
          , we will send you automated text messages about your inquiry, such
          as follow-ups to a request you made, and about appointments, such as
          confirmations, reminders and scheduling notes for your consultation
          call. We do not send marketing texts, and we do not text anyone who
          has not opted in. Message frequency varies. Message and data rates
          may apply. Consent is not a condition of purchase.
        </p>
        <p>
          You can opt out at any time by replying STOP to any message. Reply
          HELP for help, or email{" "}
          <a href={`mailto:${SMS_SUPPORT_EMAIL}`} className={linkCls}>
            {SMS_SUPPORT_EMAIL}
          </a>
          . The consent box is never pre-checked, and you can send us an
          inquiry without checking it.
        </p>
        <p>
          When you opt in, we keep a record of it: your name, email and mobile
          number, the date and time, the page you were on, the version of the
          disclosure you were shown, and technical details such as your IP
          address and browser. We keep that record in our contact system and
          in our inbox for as long as we may text you and for a reasonable
          period afterwards, so that we can show your consent if asked.
        </p>
        <p>
          Your mobile number, your opt-in, and your consent record are not
          shared with third parties or affiliates for their marketing or
          promotional purposes. The only people outside Investor Signals who
          handle them are the service providers that send our messages and
          store our contact records, and they do so only on our behalf and
          under our instructions.
        </p>
      </LegalSection>

      <LegalSection heading="Who sees it">
        <p>
          Your materials go only to investors who have been matched to your
          raise, and only with your consent. We do not sell your information,
          rent it, or trade it. For events we co-host, such as SIGNAL NYC with
          Synapse Network, your event request is shared with the co-host so
          they can confirm your spot. The service providers who host our systems
          process data on our behalf and under our instructions. Text message
          opt-in data and consent are excluded from all of this: they are
          never shared with any third party or affiliate for marketing or
          promotional purposes.
        </p>
      </LegalSection>

      <LegalSection heading="Keeping and removing it">
        <p>
          We keep submissions for as long as they are useful for the purpose
          you sent them. If you would like your information corrected or
          deleted, ask through the contact form and we will take care of it.
          Replying STOP to a text removes your number from the text program;
          we keep the record of your opt-in and opt-out so we can honor it.
        </p>
      </LegalSection>

      <LegalSection heading="Questions">
        <p>
          This page is written to be read, not to impress lawyers. If anything
          is unclear, ask us directly through the contact form or at{" "}
          <a href={`mailto:${SMS_SUPPORT_EMAIL}`} className={linkCls}>
            {SMS_SUPPORT_EMAIL}
          </a>
          . Investor Signals LLC, Miami, Florida.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
