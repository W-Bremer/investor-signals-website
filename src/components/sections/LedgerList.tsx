import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/sections/SectionHead";

/**
 * A numbered ledger of plain statements. Used for the "what we help you do"
 * sections on the audience pages.
 */
export function LedgerList({
  label,
  title,
  items,
}: {
  label: string;
  title: string;
  items: string[];
}) {
  return (
    <section>
      <div className="container-edge grid gap-14 py-24 md:py-28 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHead label={label} title={title} />
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <ol className="border-b border-navy/10">
            {items.map((item, i) => (
              <Reveal
                as="li"
                key={item}
                delay={Math.min(i * 70, 280)}
                className="grid grid-cols-[3rem_1fr] items-baseline gap-4 border-t border-navy/10 py-6"
              >
                <span className="font-serif text-[1rem] tabular-nums text-gold-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-serif text-[1.2rem] leading-[1.5] text-navy md:text-[1.3rem]">
                  {item}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
