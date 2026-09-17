import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRight } from "@/components/ui/icons";
import { POSTS } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes from inside the raise: how introductions actually happen, what investors respond to, and the playbooks we use every week, written by the Investor Signals team.",
};

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogPage() {
  return (
    <>
      <PageHero
        label="Blog"
        title="Notes from inside the raise."
        intro="What we learn running introductions and advisory every week, written down. New pieces publish regularly; everything here is free and nothing is gated."
      />

      <section>
        <div className="container-edge py-16 md:py-20">
          {POSTS.map((post, i) => (
            <Reveal key={post.slug} delay={i * 90}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block border-t border-navy/10 py-10 first:border-t-0 first:pt-0 md:py-12"
              >
                <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
                  <div className="lg:col-span-3">
                    <p className="eyebrow">{post.tag}</p>
                    <p className="mt-3 font-sans text-[0.875rem] text-navy/55">
                      {formatDate(post.date)} · {post.readingTime}
                    </p>
                  </div>
                  <div className="lg:col-span-8">
                    <h2 className="max-w-3xl font-serif text-display-sm font-semibold text-navy transition-colors duration-300 group-hover:text-navy-600">
                      {post.title}
                    </h2>
                    <p className="mt-4 max-w-[44rem] font-sans text-[0.9375rem] leading-[1.75] text-navy/65">
                      {post.description}
                    </p>
                    <span className="link-arrow mt-6 inline-flex items-center gap-2.5 font-sans text-[0.9375rem] font-semibold text-navy">
                      <span className="link-quiet">Read the piece</span>
                      <ArrowRight className="arrow-slide h-[0.8em] w-[0.8em] text-gold-600" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
