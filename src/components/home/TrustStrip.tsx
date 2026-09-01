import { Reveal } from "@/components/motion/Reveal";

const ITEMS = [
  {
    title: "The yes comes before the meeting.",
    body: "Every investor we bring you has read your materials and asked for the conversation before anything is scheduled. You never pitch a room that did not want you in it.",
  },
  {
    title: "We have sat where you sit.",
    body: "Our team worked inside hundreds of raises before building this firm, with nine figures raised across that work. We know what a stalled round feels like from the inside.",
  },
  {
    title: "Flat fee. No cut of your round.",
    body: "One price, agreed before we start. No success fees, no commissions, no equity. If an investor passes during review, that introduction never counts against you.",
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
