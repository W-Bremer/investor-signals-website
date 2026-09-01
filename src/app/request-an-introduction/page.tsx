import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { IntroductionForm } from "@/components/forms/IntroductionForm";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Request an Introduction",
  description:
    "Tell us about your raise. If we are not the right fit, we will say so in the first call and point you somewhere better.",
};

const NEXT_STEPS = [
  {
    title: "We read first",
    body: "Your materials get a close read before we ever reply. No form letters.",
  },
  {
    title: "A consultation call",
    body: "A working conversation about your raise. Scope and pricing are agreed there, up front, and never tied to your outcome.",
  },
  {
    title: "A straight answer",
    body: "If we are not the right fit, we say so on that call and point you somewhere better.",
  },
];

export default function RequestIntroductionPage() {
  return (
    <>
      <PageHero
        label="Request an introduction"
        title="Tell us about your raise."
        intro="Start with a conversation, not a contract. A few details below, and we will take it from there."
      />

      <section>
        <div className="container-edge grid gap-16 py-20 md:py-24 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
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
