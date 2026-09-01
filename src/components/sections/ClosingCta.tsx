import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export function ClosingCta({
  ctaLabel = "Request an Introduction",
  ctaHref = "/request-an-introduction",
}: {
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <svg
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-full hidden -translate-x-1/2 -translate-y-1/2 md:block"
        width="1100"
        height="1100"
        viewBox="0 0 1100 1100"
        fill="none"
      >
        <circle cx="550" cy="550" r="280" stroke="#C5A55A" strokeOpacity="0.16" />
        <circle cx="550" cy="550" r="400" stroke="#C5A55A" strokeOpacity="0.1" />
        <circle cx="550" cy="550" r="520" stroke="#0A1F3F" strokeOpacity="0.06" />
      </svg>
      <div className="container-edge relative flex flex-col items-center py-28 text-center md:py-36">
        <Reveal>
          <span aria-hidden className="mx-auto mb-10 block h-10 w-px bg-gold-500" />
        </Reveal>
        <Reveal delay={100}>
          <h2 className="max-w-3xl font-serif text-display-lg font-semibold text-navy">
            Start with a conversation, not a contract.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mx-auto mt-6 max-w-xl font-sans text-[1.0625rem] leading-[1.75] text-navy/70">
            Tell us about your raise. If we are not the right fit, we will say
            so in the first call and point you somewhere better.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-10">
            <Button href={ctaHref}>{ctaLabel}</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
