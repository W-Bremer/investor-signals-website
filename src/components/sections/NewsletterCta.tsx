import { Reveal } from "@/components/motion/Reveal";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

/** End-of-post subscribe band. Sits above the closing "Bring us the raise" block. */
export function NewsletterCta() {
  return (
    <section className="border-t border-navy/10 bg-paper-tint">
      <div className="container-edge py-16 md:py-20">
        <div className="mx-auto max-w-[46rem]">
          <Reveal>
            <p className="eyebrow mb-4">Newsletter</p>
            <h2 className="font-serif text-display-sm font-semibold text-navy">Get the next issue.</h2>
            <p className="mt-3 max-w-[38rem] font-sans text-[0.9375rem] leading-[1.7] text-navy/65">
              Every week: what we are hearing from investors, what is working
              in raises right now, and the data behind it. No fluff. Honest
              odds.
            </p>
          </Reveal>
          <Reveal delay={100} className="mt-8">
            <NewsletterForm variant="inline" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
