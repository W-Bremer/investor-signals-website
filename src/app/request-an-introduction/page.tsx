import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { IntroductionForm } from "@/components/forms/IntroductionForm";
import { BookingCalendar } from "@/components/forms/BookingCalendar";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Request an Introduction",
  description:
    "Book your consultation call directly, or tell us about your raise in writing. Either way, we will tell you honestly whether we can help.",
};

const NEXT_STEPS = [
  {
    title: "A real read",
    body: "Your deck gets read before we reply. Not skimmed, read.",
  },
  {
    title: "One working call",
    body: "We go through the raise together, scope the engagement, and fix the price before any work starts.",
  },
  {
    title: "A straight answer",
    body: "Not the right fit? We will say it on the call and point you at someone better for it.",
  },
];

export default function RequestIntroductionPage() {
  return (
    <>
      <PageHero
        label="Request an introduction"
        title="Tell us about your raise."
        intro="Book the consultation call directly below, or write to us first. Either way, one honest conversation and you will know exactly where you stand."
      />

      <section className="border-b border-navy/10 bg-paper-tint">
        <div className="container-edge py-16 md:py-20">
          <Reveal>
            <p className="eyebrow">Schedule your consultation</p>
            <p className="mt-5 max-w-[42rem] font-sans text-[1rem] leading-[1.75] text-navy/70">
              Pick a time that works and come as you are. Bring the deck if you
              have one; bring the questions either way.
            </p>
          </Reveal>
          <Reveal delay={140} className="mx-auto mt-10 max-w-4xl">
            <BookingCalendar />
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container-edge grid gap-16 py-20 md:py-24 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow mb-8">Prefer to write first?</p>
            <IntroductionForm />
          </Reveal>

          <div className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-32">
              <Reveal delay={150}>
                <p className="eyebrow">What happens next</p>
              </Reveal>
              <ol className="mt-7">
                {NEXT_STEPS.map((step, i) => (
                  <Reveal
                    as="li"
                    key={step.title}
                    delay={200 + i * 110}
                    className="border-t border-navy/10 py-6 first:border-t-0 first:pt-0"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-serif text-[0.95rem] tabular-nums text-gold-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-serif text-[1.15rem] font-semibold text-navy">{step.title}</h3>
                        <p className="mt-2 font-sans text-[0.9375rem] leading-[1.7] text-navy/65">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
