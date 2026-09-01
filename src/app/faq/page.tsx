import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { FaqList } from "@/components/faq/FaqList";
import { Reveal } from "@/components/motion/Reveal";
import { FAQ_ITEMS } from "@/lib/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "How Investor Signals is different from an outreach agency, how we charge, what we need to start, and what happens when an investor passes.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHero
        label="FAQ"
        title="Questions we hear on most first calls"
        intro="If yours is not answered here, ask it on the consultation call. You will get a straight answer there too."
      />
      <section>
        <div className="container-edge py-20 md:py-24">
          <Reveal className="mx-auto max-w-4xl">
            <FaqList items={FAQ_ITEMS} defaultOpen={0} />
          </Reveal>
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
