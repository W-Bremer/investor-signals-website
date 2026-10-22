import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { ArrowRight } from "@/components/ui/icons";
import { POSTS } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "The Investor Signals newsletter. Every week: what we're hearing from investors, what's working in raises right now, and the data behind it. No fluff. Honest odds.",
};

const latestIssue = POSTS.find((p) => p.tag.toLowerCase().startsWith("newsletter"));

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function NewsletterPage() {
  return (
    <>
      <PageHero
        label="Newsletter"
        title="The Investor Signals newsletter"
        intro="Every week: what we're hearing from investors, what's working in raises right now, and the data behind it. No fluff. Honest odds."
      />

      <section>
        <div className="container-edge grid gap-14 py-16 md:py-20 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-6">
            <div className="rounded-[3px] border border-navy/10 bg-[#FFFEFA] p-8 shadow-note md:p-10">
              <p className="eyebrow mb-6">Subscribe</p>
              <NewsletterForm variant="stacked" />
              <p className="mt-6 font-sans text-[0.8125rem] leading-relaxed text-navy/50">
                One email a week. Unsubscribe with one click, any time.
              </p>
            </div>
          </Reveal>

          {latestIssue && (
            <Reveal delay={120} className="lg:col-span-5 lg:col-start-8">
              <p className="eyebrow">Latest issue</p>
              <p className="mt-5 font-sans text-[0.875rem] text-navy/55">
                {latestIssue.tag} · {formatDate(latestIssue.date)}
              </p>
              <h2 className="mt-3 font-serif text-display-sm font-semibold text-navy">
                {latestIssue.title}
              </h2>
              <p className="mt-4 font-sans text-[0.9375rem] leading-[1.75] text-navy/65">
                {latestIssue.description}
              </p>
              <Link
                href={`/blog/${latestIssue.slug}`}
                className="link-arrow group mt-6 inline-flex items-center gap-2.5 font-sans text-[0.9375rem] font-semibold text-navy transition-colors duration-300 hover:text-navy-600"
              >
                <span className="link-quiet">Read Issue 01</span>
                <ArrowRight className="arrow-slide h-[0.8em] w-[0.8em] text-gold-600" />
              </Link>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
