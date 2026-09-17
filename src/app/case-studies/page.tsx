import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Reveal } from "@/components/motion/Reveal";
import { VideoEmbed } from "@/components/case-studies/VideoEmbed";
import { CASE_STUDIES } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Founders on what actually happened after they engaged Investor Signals: curated introductions, prepared investors, and conversations that started three steps ahead.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        label="Case studies"
        title="What founders say after the meetings."
        intro="No composite anecdotes, no initials-only quotes. These are real founders, on camera, describing what the process was like and where it left their raise."
      />

      <section>
        <div className="container-edge">
          {CASE_STUDIES.map((study, idx) => (
            <article
              key={study.slug}
              id={study.slug}
              className={`grid gap-12 py-20 md:py-24 lg:grid-cols-12 lg:gap-10 ${
                idx > 0 ? "border-t border-navy/10" : ""
              }`}
            >
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-32">
                  <Reveal>
                    <p className="eyebrow">
                      {String(idx + 1).padStart(2, "0")} · {study.company}
                    </p>
                    <h2 className="mt-4 font-serif text-display-sm font-semibold text-navy">
                      {study.name}
                    </h2>
                    <p className="mt-1.5 font-sans text-[0.9375rem] text-navy/60">
                      {study.title}, {study.company}
                    </p>
                  </Reveal>
                  <Reveal delay={120}>
                    <div className="mt-8 border-l-2 border-gold-500 pl-5">
                      <p className="eyebrow !text-[0.625rem]">Outcome</p>
                      <p className="mt-2 font-serif text-[1.15rem] font-medium leading-snug text-navy">
                        {study.result}
                      </p>
                    </div>
                  </Reveal>
                  {study.youtubeId && (
                    <Reveal delay={200} className="mt-8">
                      <VideoEmbed
                        youtubeId={study.youtubeId}
                        label={`${study.name} on working with Investor Signals`}
                      />
                    </Reveal>
                  )}
                </div>
              </div>

              <div className="lg:col-span-7">
                <Reveal>
                  <blockquote className="font-serif text-[1.35rem] font-medium leading-[1.55] text-navy md:text-[1.5rem]">
                    &ldquo;{study.quote}&rdquo;
                  </blockquote>
                </Reveal>
                <div className="mt-10 space-y-6">
                  {study.story.map((paragraph, i) => (
                    <Reveal key={i} delay={80 + i * 60}>
                      <p className="max-w-[44rem] font-sans text-[1rem] leading-[1.8] text-navy/75">
                        {paragraph}
                      </p>
                    </Reveal>
                  ))}
                </div>
                {study.closing && (
                  <Reveal delay={160}>
                    <p className="mt-10 max-w-[44rem] border-l-2 border-gold-500 pl-6 font-serif text-[1.15rem] italic leading-relaxed text-navy">
                      &ldquo;{study.closing}&rdquo;
                      <span className="mt-3 block font-sans text-[0.8125rem] not-italic text-navy/55">
                        {study.name}, {study.company}
                      </span>
                    </p>
                  </Reveal>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
