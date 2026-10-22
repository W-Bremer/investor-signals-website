import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHead } from "@/components/sections/SectionHead";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { EventCards } from "@/components/events/EventCards";
import { FLICKR_ALBUM_URL, GALLERY_GRID, SIGNAL_NYC } from "@/lib/signal-nyc";

export const metadata: Metadata = {
  title: "Events",
  description:
    "The Signal Tour: investor events seated by who should meet whom. Signal SF on January 28, 2027 and Signal Alpine in Park City in early March 2027, for Synapse Network members.",
  openGraph: {
    images: [{ url: SIGNAL_NYC.crowd.src, width: SIGNAL_NYC.crowd.width, height: SIGNAL_NYC.crowd.height, alt: SIGNAL_NYC.crowd.alt }],
  },
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        label="The Signal Tour"
        title="Investor events seated by who should meet whom."
        intro="Most investor events are a room full of badges and small talk. Ours are seated by who should meet whom, and you arrive already knowing who to find. Fund managers, LPs, family offices and lenders, every member verified through a conversation."
      />

      <section>
        <div className="container-edge py-16 md:py-20">
          <EventCards />
        </div>
      </section>

      <section className="border-t border-navy/10 bg-paper-tint">
        <div className="container-edge py-20 md:py-28">
          <SectionHead
            label="Past event"
            title="Signal NYC"
            lede="Signal NYC: October 15, 2026, Reserve Padel, Hudson Yards. The first stop on the tour."
            className="mb-12"
          />

          <Reveal>
            <div className="relative aspect-[16/9] overflow-hidden bg-paper-deep md:aspect-[21/9]">
              <Image
                src={SIGNAL_NYC.crowd.src}
                alt={SIGNAL_NYC.crowd.alt}
                fill
                priority
                sizes="(min-width: 1200px) 1100px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY_GRID.map((p, i) => (
              <Reveal key={p.src} delay={(i % 3) * 90}>
                <div className="relative aspect-[3/2] overflow-hidden bg-paper-deep">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-12">
            <Button href={FLICKR_ALBUM_URL} variant="outline" external>
              See all Signal NYC photos
            </Button>
          </Reveal>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
