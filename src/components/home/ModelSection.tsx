import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/sections/SectionHead";

const COLUMNS = [
  {
    heading: "What you pay",
    rows: [
      {
        lead: "One flat engagement fee.",
        body: "Agreed on the first call, before any work starts. It does not move with your round.",
      },
      {
        lead: "Zero percent of your raise.",
        body: "No success fees, no commissions, no equity, no warrants. Your cap table stays yours.",
      },
      {
        lead: "Passes are on us.",
        body: "If an investor declines during review, that introduction does not count toward your engagement. The risk of a no sits on our side of the table.",
      },
    ],
  },
  {
    heading: "What we will never do",
    rows: [
      {
        lead: "Send email pretending to be you.",
        body: "No mass sequences, no lookalike domains, no outreach in your name. Ever.",
      },
      {
        lead: "Shop your deck around.",
        body: "Your materials go to matched investors only, and only after you sign off.",
      },
      {
        lead: "Promise you a closed round.",
        body: "Anyone who guarantees funding is selling you something else. We arrange the meeting and get you ready to win it. The decision belongs to the investor, and we put that in writing.",
      },
    ],
  },
];

export function ModelSection() {
  return (
    <section className="bg-navy text-paper">
      <div className="container-edge py-24 md:py-32">
        <SectionHead
          onNavy
          label="Our model"
          title="How we get paid, in plain English"
          lede="You should not have to guess at an advisor’s incentives. Ours fit in six lines."
        />

        <div className="mt-16 grid gap-14 md:grid-cols-2 md:gap-10 lg:gap-20">
          {COLUMNS.map((col, ci) => (
            <div key={col.heading}>
              <Reveal delay={ci * 100}>
                <p className="eyebrow !text-gold-400">{col.heading}</p>
              </Reveal>
              <div className="mt-7">
                {col.rows.map((row, ri) => (
                  <Reveal
                    key={row.lead}
                    delay={ci * 100 + ri * 110}
                    className="border-t border-paper/15 py-7 first:border-t-0 first:pt-0 last:pb-0"
                  >
                    <h3 className="font-serif text-[1.3rem] font-semibold leading-snug text-ivory">
                      {row.lead}
                    </h3>
                    <p className="mt-3 max-w-[30rem] font-sans text-[0.9375rem] leading-[1.7] text-paper/65">
                      {row.body}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
