import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { SmsOptInForm } from "@/components/forms/SmsOptInForm";
import { SMS_DISCLOSURE_VERSION, SMS_SENDER, SMS_SUPPORT_EMAIL } from "@/lib/sms";

export const metadata: Metadata = {
  title: "Text message opt-in",
  description:
    "Opt in to automated text messages from Investor Signals LLC about your inquiry and appointments. Message frequency varies, message and data rates may apply, reply STOP to opt out.",
};

const linkCls = "font-semibold text-navy underline decoration-gold-500/60 underline-offset-4 hover:decoration-gold-600";

const TERMS: { heading: string; body: React.ReactNode }[] = [
  { heading: "Who is texting you", body: <>{SMS_SENDER}, the firm behind investorsignals.co.</> },
  {
    heading: "What you may receive",
    body: (
      <>
        Follow-ups about an inquiry you made with us, and confirmations,
        reminders and scheduling notes for appointments such as your
        consultation call. Nothing else.
      </>
    ),
  },
  { heading: "How often", body: <>Message frequency varies with your inquiry and your appointments.</> },
  { heading: "What it costs", body: <>Message and data rates may apply, depending on your carrier and plan.</> },
  {
    heading: "Opting out",
    body: <>Reply STOP to any message and we will stop texting you. Consent is not a condition of purchase.</>,
  },
  {
    heading: "Getting help",
    body: (
      <>
        Reply HELP to any message, or email{" "}
        <a href={`mailto:${SMS_SUPPORT_EMAIL}`} className={linkCls}>
          {SMS_SUPPORT_EMAIL}
        </a>
        .
      </>
    ),
  },
];

export default function SmsOptInPage() {
  return (
    <>
      <PageHero
        label="Text messages"
        title="Opt in to text messages from Investor Signals."
        intro="If you have been in touch with us by email or phone and would like inquiry follow-ups and appointment reminders by text, confirm it here. This is separate from anything else you do with us, and you can stop at any time."
      />

      <section>
        <div className="container-edge grid gap-14 py-16 md:py-20 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-6">
            <SmsOptInForm />
          </Reveal>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="eyebrow">What you are agreeing to</p>
            </Reveal>
            <dl className="mt-7">
              {TERMS.map((t, i) => (
                <Reveal key={t.heading} delay={160 + i * 70} className="border-t border-navy/10 py-5 first:border-t-0 first:pt-0">
                  <dt className="font-serif text-[1.1rem] font-semibold text-navy">{t.heading}</dt>
                  <dd className="mt-1.5 font-sans text-[0.9375rem] leading-[1.7] text-navy/65">{t.body}</dd>
                </Reveal>
              ))}
            </dl>
            <Reveal delay={600} className="mt-6">
              <p className="font-sans text-[0.8125rem] leading-relaxed text-navy/50">
                Full details are in our{" "}
                <Link href="/privacy" className={linkCls}>
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/terms" className={linkCls}>
                  Terms
                </Link>
                . Disclosure version {SMS_DISCLOSURE_VERSION}.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
