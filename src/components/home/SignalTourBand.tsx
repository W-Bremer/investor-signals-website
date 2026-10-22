import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SIGNAL_NYC } from "@/lib/signal-nyc";

/** Full-width band near the foot of the homepage pointing at /events. */
export function SignalTourBand() {
  return (
    <section className="relative overflow-hidden bg-navy text-paper">
      <Image
        src={SIGNAL_NYC.crowd.src}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[50%_35%]"
      />
      <div aria-hidden className="absolute inset-0 bg-navy/80" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "linear-gradient(90deg, rgba(10,31,63,0.55) 0%, rgba(10,31,63,0.1) 100%)" }}
      />
      <div className="container-edge relative py-24 md:py-32">
        <Reveal>
          <p className="eyebrow !text-gold-400">Events</p>
        </Reveal>
        <Reveal delay={90}>
          <h2 className="mt-6 max-w-3xl font-serif text-display-lg font-semibold text-ivory">
            The Signal Tour: San Francisco, January 28 · Park City, March.
            Signal NYC was the first.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-10">
            <Button href="/events" variant="onNavy">
              See upcoming events
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
