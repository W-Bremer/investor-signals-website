import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/sections/SectionHead";
import { ArrowRight } from "@/components/ui/icons";

const AUDIENCES = [
  {
    kicker: "Founders",
    title: "Raising pre-seed to growth",
    body: "You have a real business and a clear ask, and you would rather have five conversations that matter than five hundred that do not. We match your round to angels, family offices, and funds whose thesis actually fits, mission-driven and scientific ventures included.",
    href: "/for-startups",
    cta: "How founders raise with us",
  },
  {
    kicker: "Emerging managers",
    title: "Raising your first funds",
    body: "Allocators do not answer cold decks, and nobody will sell you a list that says who is writing checks this quarter. We keep relationships with family offices who tell us what they want to see. When your fund fits, you meet the ones who said yes.",
    href: "/for-fund-managers",
    cta: "How managers raise with us",
  },
];

export function AudienceSplit() {
  return (
    <section className="border-t border-navy/10">
      <div className="container-edge py-24 md:py-32">
        <SectionHead label="Who we serve" title="Built for two kinds of raisers" />

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
                <span aria-hidden className="absolute right-8 top-8 opacity-70 transition-opacity duration-500 group-hover:opacity-100 md:right-10 md:top-10">
                  {i === 0 ? (
                    /* A round, building: hairline bars, the last one gold */
                    <svg width="64" height="52" viewBox="0 0 64 52" fill="none">
                      <rect x="1" y="33" width="12" height="18" rx="1" stroke="#0A1F3F" strokeOpacity="0.25" />
                      <rect x="17" y="24" width="12" height="27" rx="1" stroke="#0A1F3F" strokeOpacity="0.25" />
                      <rect x="33" y="14" width="12" height="37" rx="1" stroke="#0A1F3F" strokeOpacity="0.25" />
                      <rect x="49" y="1" width="12" height="50" rx="1" fill="#C5A55A" fillOpacity="0.18" stroke="#B08F42" strokeOpacity="0.7" />
                    </svg>
                  ) : (
                    /* An allocation finding its slot */
                    <svg width="64" height="52" viewBox="0 0 64 52" fill="none">
                      <rect x="1" y="1" width="18" height="14" rx="1" stroke="#0A1F3F" strokeOpacity="0.25" />
                      <rect x="23" y="1" width="40" height="14" rx="1" stroke="#0A1F3F" strokeOpacity="0.25" />
                      <rect x="1" y="19" width="28" height="14" rx="1" stroke="#0A1F3F" strokeOpacity="0.25" />
                      <rect x="33" y="19" width="30" height="14" rx="1" fill="#C5A55A" fillOpacity="0.18" stroke="#B08F42" strokeOpacity="0.7" />
                      <rect x="1" y="37" width="46" height="14" rx="1" stroke="#0A1F3F" strokeOpacity="0.25" />
                    </svg>
                  )}
                </span>
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
