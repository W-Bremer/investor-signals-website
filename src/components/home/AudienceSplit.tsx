import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/sections/SectionHead";
import { ArrowRight } from "@/components/ui/icons";

const AUDIENCES = [
  {
    kicker: "Founders",
    title: "For startups",
    body: "From pre-seed to growth, we introduce founders to angels, family offices, and venture funds whose thesis genuinely matches the raise, including investors motivated by mission as much as return.",
    href: "/for-startups",
    cta: "How we work with founders",
  },
  {
    kicker: "Emerging managers",
    title: "For fund managers",
    body: "Emerging managers raising LP capital face the coldest doors in the industry. We open the ones that were already warm: family offices and allocators who have asked to see managers like you.",
    href: "/for-fund-managers",
    cta: "How we work with managers",
  },
];

export function AudienceSplit() {
  return (
    <section className="border-t border-navy/10">
      <div className="container-edge py-24 md:py-32">
        <SectionHead label="Who we serve" title="Two sides of the same room" />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {AUDIENCES.map((a, i) => (
            <Reveal key={a.href} delay={i * 120}>
              <Link
                href={a.href}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[3px] border border-navy/10 bg-[#FFFEFA] p-8 transition-all duration-500 ease-out hover:border-navy/25 hover:shadow-lift md:p-10"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gold-500 transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
                <div>
                  <p className="eyebrow">{a.kicker}</p>
                  <h3 className="mt-5 font-serif text-display-md font-semibold text-navy">
                    {a.title}
                  </h3>
                  <p className="mt-5 max-w-[30rem] font-sans text-[1rem] leading-[1.75] text-navy/70">
                    {a.body}
                  </p>
                </div>
                <span className="mt-9 inline-flex items-center gap-2.5 font-sans text-[0.9375rem] font-semibold text-navy">
                  {a.cta}
                  <ArrowRight className="h-[0.8em] w-[0.8em] text-gold-600 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
