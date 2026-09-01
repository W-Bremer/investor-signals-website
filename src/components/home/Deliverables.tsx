import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/sections/SectionHead";
import { DossierGraphic } from "@/components/graphics/DossierGraphic";

const ITEMS = [
  {
    title: "Confirmed introductions",
    body: "Warm, double opt-in meetings with investors matched to your stage, sector, and check size. Each one accepted by the investor before it is booked.",
  },
  {
    title: "Investor prep dossiers",
    body: "A cited one-pager on every investor you meet: their recent checks, their stated thesis, and the talking points most likely to land.",
  },
  {
    title: "Investor alignment report",
    body: "Your shortlist, mapped. Who fits, how well, and exactly why each name made the cut.",
  },
  {
    title: "Competitive landscape report",
    body: "Every direct and adjacent competitor, their funding history, and the gap your deck should be claiming. Built to fix the competition slide.",
  },
  {
    title: "Category objection playbook",
    body: "The ten questions investors in your space are asking right now, with receipts, and drafted answers you can rehearse until they are yours.",
  },
  {
    title: "Comparable rounds benchmark",
    body: "15 to 30 recent rounds in your sector and stage: size, instrument, who led. Price your ask off data, not guesswork.",
  },
  {
    title: "Advisory sessions",
    body: "Working sessions with an operator who has been inside hundreds of raises. Deck, narrative, positioning. Blunt notes, real fixes.",
  },
  {
    title: "Executive check-ins",
    body: "After your meetings we debrief the tape together: what worked, what stalled, and what to change before the next room.",
  },
];

export function Deliverables() {
  return (
    <section id="engagements" className="scroll-mt-24 border-t border-navy/10 bg-paper-tint">
      <div className="container-edge py-24 md:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHead
              label="The engagement"
              title="Everything an engagement includes"
              lede="No mystery retainers. Every engagement is assembled from the pieces below, scoped to your raise on the first call."
            />
          </div>
          <Reveal delay={200} className="hidden lg:col-span-4 lg:col-start-9 lg:block">
            <DossierGraphic />
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-14 gap-y-12 md:grid-cols-2">
          {ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 100} className="border-t border-navy/15 pt-6">
              <div className="flex items-baseline justify-between">
                <h3 className="font-serif text-[1.25rem] font-semibold text-navy">{item.title}</h3>
                <span className="font-serif text-[0.9rem] tabular-nums text-gold-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-3 max-w-[32rem] font-sans text-[0.9375rem] leading-[1.7] text-navy/65">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-16 border-l-2 border-gold-500 pl-6">
          <p className="max-w-2xl font-sans text-[0.9375rem] leading-[1.7] text-navy/70">
            Pricing is scoped on the consultation call, fixed before we start,
            and never tied to how your round ends. If an investor passes during
            review, that introduction does not count toward your engagement.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
