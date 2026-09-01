import { Reveal } from "@/components/motion/Reveal";

const ITEMS = [
  {
    title: "Built on a decade of raises.",
    body: "Our team has supported hundreds of startups through prior ventures, with nine figures raised across those engagements.",
  },
  {
    title: "A signed, mapped network.",
    body: "Every investor in our network has joined by agreement. We know their check sizes, stages, sectors, and how they actually decide.",
  },
  {
    title: "Advisory, not just access.",
    body: "Every engagement pairs confirmed introductions with the research, preparation, and coaching to convert them. No success fees, no commissions, no equity.",
  },
];

export function TrustStrip() {
  return (
    <section className="border-y border-navy/10 bg-paper-tint">
      <div className="container-edge grid gap-10 py-14 md:grid-cols-3 md:gap-0 md:py-16">
        {ITEMS.map((item, i) => (
          <Reveal
            key={item.title}
            delay={i * 110}
            className={`md:px-9 ${i === 0 ? "md:pl-0" : ""} ${i === ITEMS.length - 1 ? "md:pr-0" : ""} ${
              i > 0 ? "md:border-l md:border-navy/10" : ""
            }`}
          >
            <h3 className="font-serif text-[1.3rem] font-semibold leading-snug text-navy">
              {item.title}
            </h3>
            <p className="mt-3.5 font-sans text-[0.9375rem] leading-[1.7] text-navy/65">
              {item.body}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
