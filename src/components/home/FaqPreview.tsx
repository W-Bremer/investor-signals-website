import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/sections/SectionHead";
import { FaqList } from "@/components/faq/FaqList";
import { TextLink } from "@/components/ui/Button";
import { FAQ_ITEMS } from "@/lib/faq";

export function FaqPreview() {
  return (
    <section className="border-t border-navy/10 bg-paper-tint">
      <div className="container-edge grid gap-14 py-24 md:py-32 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <SectionHead
            label="Questions"
            title="Asked on most first calls"
            lede="Straight answers to the questions founders and managers ask before working with us."
          />
          <Reveal delay={240} className="mt-8">
            <TextLink href="/faq">Read all questions</TextLink>
          </Reveal>
        </div>
        <Reveal delay={150} className="lg:col-span-7 lg:col-start-6">
          <FaqList items={FAQ_ITEMS.slice(0, 3)} />
        </Reveal>
      </div>
    </section>
  );
}
