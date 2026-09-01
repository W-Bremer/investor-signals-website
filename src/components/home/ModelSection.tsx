import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/sections/SectionHead";

const COLUMNS = [
  {
    heading: "What you pay",
    rows: [
      {
        lead: "One engagement price, agreed up front.",
        body: "You know the full cost before we begin. It does not change based on how your round goes.",
      },
      {
        lead: "Nothing on your outcome.",
        body: "No success fees, no percentage of the raise, no equity, no warrants.",
      },
      {
        lead: "Nothing for introductions that do not happen.",
        body: "If an investor passes during review, it does not count toward your engagement. That risk is ours.",
      },
    ],
  },
  {
    heading: "What we will not do",
    rows: [
      {
        lead: "No cold outreach in your name.",
        body: "We never send mass email or LinkedIn sequences on your behalf, and we never spin up lookalike domains.",
      },
      {
        lead: "No selling your information.",
        body: "Your materials go only to investors who have been matched to your raise, and only with your consent.",
      },
      {
        lead: "No promises we cannot keep.",
        body: "We arrange meetings with interested investors. Investment decisions belong to them, and we say so in writing.",
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
          title="Our model, stated plainly"
          lede="Trust is easier when the incentives are on the table. Here is exactly how we make money, and the lines we will not cross."
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
