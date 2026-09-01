import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/sections/SectionHead";

const ITEMS = [
  {
    title: "Confirmed introductions",
    body: "Curated, double opt-in, and thesis-aligned. Your materials go in ahead of you, and the investor accepts before anything is booked.",
  },
  {
    title: "Investor prep dossiers",
    body: "A one-page cited brief before every confirmed meeting: the investor’s recent investments, stated thesis, check size, and suggested talking points.",
  },
  {
    title: "Investor alignment report",
    body: "Matched investor profiles organized by thesis fit, check size, and sector focus, so you can see why each name is on your list.",
  },
  {
    title: "Competitive landscape report",
    body: "A fully sourced map of your direct and adjacent competitors, their funding history, and the gaps in your market, structured to strengthen the competition slide in your deck.",
  },
  {
    title: "Category objection playbook",
    body: "The ten hardest questions investors in your category are asking right now, with evidence of investors raising them and drafted answers for you to rehearse.",
  },
  {
    title: "Comparable rounds benchmark",
    body: "Market data on 15 to 30 recent raises in your sector and stage, covering round size, instrument, and lead investors, so you know exactly where your ask sits.",
  },
  {
    title: "Advisory sessions",
    body: "Working sessions with an experienced operator on narrative refinement, pitch optimization, and positioning strategy.",
  },
  {
    title: "Executive check-ins",
    body: "Live feedback on your investor conversations as they progress: call performance review, pitch refinement, and strategic adjustments to improve your close rate.",
  },
];

export function Deliverables() {
  return (
    <section id="engagements" className="scroll-mt-24 border-t border-navy/10 bg-paper-tint">
      <div className="container-edge py-24 md:py-32">
        <SectionHead
          label="The engagement"
          title="What working with us includes"
          lede="Each engagement combines confirmed introductions with the research and advisory work that helps you convert them. We scope every engagement on your consultation call."
        />

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
            Engagements are scoped individually and priced on the consultation
            call, agreed up front, and never tied to your outcome. If an
            investor passes during review, the introduction does not count
            toward your engagement.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
