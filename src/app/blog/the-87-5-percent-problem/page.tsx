import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { NewsletterCta } from "@/components/sections/NewsletterCta";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { ArrowRight, Check } from "@/components/ui/icons";
import { getPost } from "@/lib/posts";
import { REQUEST_INVITE_URL } from "@/lib/signal-nyc";

/*
 * Newsletter Issue 02 as a blog post. The body is the text of the GHL
 * campaign "Newsletter #2 - The 87.5% Problem" word for word, minus the
 * email-only preheader, masthead and footer address line.
 */

const post = getPost("the-87-5-percent-problem")!;

const PITCHBOOK_URL = "https://nvca.org/research/pitchbook-nvca-venture-monitor";
const CARTA_URL = "https://carta.com/data/state-of-private-markets-q1-2026-full-report/";
const LISTING_URL =
  "https://www.compass.com/homedetails/500-Greenwich-St-Unit-202-Manhattan-NY-10013/2217896404871616313_lid/";

export const metadata: Metadata = {
  title: post.title,
  description: post.seoDescription ?? post.description,
};

/* ------------------------------------------------------------------ */
/* Local article primitives (shared style with the other posts)        */
/* ------------------------------------------------------------------ */

function Section({ label, title, children }: { label?: string; title: string; children: ReactNode }) {
  return (
    <section className="mt-14 border-t border-navy/10 pt-10">
      <Reveal>
        {label && <p className="eyebrow mb-4">{label}</p>}
        <h2 className="mb-6 font-serif text-display-sm font-semibold text-navy">{title}</h2>
      </Reveal>
      <Reveal delay={80}>{children}</Reveal>
    </section>
  );
}

function P({ children }: { children: ReactNode }) {
  return <p className="mb-5 font-sans text-[1.0625rem] leading-[1.8] text-navy/75">{children}</p>;
}

function B({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-navy">{children}</strong>;
}

const linkCls =
  "text-navy underline decoration-gold-500/60 decoration-1 underline-offset-4 transition-colors duration-300 hover:decoration-gold-600";

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkCls}>
      {children}
    </a>
  );
}

function ArrowLink({ href, external = false, children }: { href: string; external?: boolean; children: ReactNode }) {
  const cls =
    "link-arrow group inline-flex items-center gap-2.5 font-sans text-[0.9375rem] font-semibold text-navy transition-colors duration-300 hover:text-navy-600";
  const inner = (
    <>
      <span className="link-quiet">{children}</span>
      <ArrowRight className="arrow-slide h-[0.8em] w-[0.8em] text-gold-600" />
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

function Source({ href, children }: { href: string; children: ReactNode }) {
  return (
    <p className="mt-4 font-sans text-[0.75rem] uppercase tracking-[0.14em] text-navy/45">
      Source: <Ext href={href}>{children}</Ext>
    </p>
  );
}

/** Two horizontal bars sized to a share of the whole. */
function Bars({ rows, onNavy = false }: { rows: { label: string; value: string; share: number }[]; onNavy?: boolean }) {
  return (
    <div className="mt-6 space-y-3">
      {rows.map((r, i) => (
        <div key={r.label}>
          <div className={`flex items-baseline justify-between gap-4 font-sans text-[0.875rem] ${onNavy ? "text-paper/70" : "text-navy/65"}`}>
            <span>{r.label}</span>
            <span className={`font-semibold tabular-nums ${onNavy ? "text-ivory" : "text-navy"}`}>{r.value}</span>
          </div>
          <div className={`mt-1.5 h-2.5 w-full overflow-hidden rounded-[2px] ${onNavy ? "bg-paper/10" : "bg-navy/10"}`}>
            <div
              className={`h-full rounded-[2px] ${i === 0 ? "bg-gold-500" : onNavy ? "bg-paper/40" : "bg-navy/35"}`}
              style={{ width: `${Math.max(r.share, 1.5)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: post.title,
  description: post.seoDescription ?? post.description,
  datePublished: post.date,
  author: { "@type": "Organization", name: "Investor Signals LLC" },
  publisher: { "@type": "Organization", name: "Investor Signals LLC" },
};

const STEPS: { lead: string; body: ReactNode }[] = [
  {
    lead: "Find who’s actually writing checks at your size.",
    body: (
      <P>
        Pull up five companies in your space that are one stage ahead of you
        and look at who backed their last round. Crunchbase lists investors on
        announced rounds. SEC Form D filings on EDGAR show which companies
        recently raised, often before any announcement. The names that repeat
        are your list.
      </P>
    ),
  },
  {
    lead: "Qualify before you pitch.",
    body: (
      <>
        <P>Ask three questions in the first ten minutes:</P>
        <ul className="mb-5 space-y-2">
          {[
            "When did you last invest at this stage?",
            "What’s your typical check size?",
            "Who else has to say yes?",
          ].map((q) => (
            <li key={q} className="flex items-start gap-3 font-sans text-[1.0625rem] leading-[1.7] text-navy/75">
              <Check className="mt-[0.45em] h-[0.8em] w-[0.8em] shrink-0 text-gold-600" />
              <span>{q}</span>
            </li>
          ))}
        </ul>
        <P>You’ll save weeks chasing investors who were never going to write the check.</P>
      </>
    ),
  },
  {
    lead: "Pitch each investor type differently.",
    body: (
      <>
        <P>
          <B>Angels</B> often decide quickly and bet heavily on the founder.
        </P>
        <P>
          <B>Family offices</B> move on their own timeline and tend to value
          fewer, deeper relationships, so expect more than one conversation.
        </P>
        <P>
          <B>Micro-VCs</B> need you to fit their thesis and ownership targets,
          so know their portfolio before the call.
        </P>
      </>
    ),
  },
  {
    lead: "Build the round, not just the lead.",
    body: (
      <>
        <P>
          Without a big fund leading, most rounds under $5M come together as
          several checks. Land one committed anchor first, then use it.
        </P>
        <p className="mb-5 border-l-2 border-gold-500 pl-5 font-serif text-[1.2rem] italic leading-relaxed text-navy">
          “We have $500K committed from a family office” moves the next
          conversation faster than any deck slide.
        </p>
      </>
    ),
  },
  {
    lead: "Benchmark against the median, not the outliers.",
    body: (
      <P>
        The valuations in the headlines belong to a small group at the top.
        Pricing your round off them can stall this raise and make the next one
        harder.
      </P>
    ),
  },
  {
    lead: "Keep the “not yets” warm.",
    body: (
      <P>
        Send a short monthly update to every investor who passed for now: what
        happened, two or three key numbers, one specific ask.{" "}
        <B>A “not yet” from March is often a yes by September.</B>
      </P>
    ),
  },
];

export default function IssueTwoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <PageHero label={post.tag} title={post.title}>
        <p className="font-sans text-[0.875rem] text-navy/55">
          By the Investor Signals team · {formatDate(post.date)} · {post.readingTime}
        </p>
      </PageHero>

      <article>
        <div className="container-edge py-12 md:py-16">
          <div className="mx-auto max-w-[46rem]">
            {/* Stat hero */}
            <div className="hero-fade rounded-[3px] bg-navy px-8 py-10 text-paper md:px-12 md:py-12" style={{ "--hf-delay": "520ms" } as React.CSSProperties}>
              <p className="eyebrow !text-gold-400">US venture · H1 2026</p>
              <p className="mt-5 font-serif text-[4.5rem] font-semibold leading-none text-ivory md:text-[5.5rem]">87.5%</p>
              <p className="mt-4 max-w-[30rem] font-sans text-[1.0625rem] leading-[1.7] text-paper/75">
                of the $412.7 billion deployed went to megadeals of $100M or more.
              </p>
              <Bars
                onNavy
                rows={[
                  { label: "Rounds of $100M+", value: "$361B", share: 87.5 },
                  { label: "Every round under $100M", value: "$52B", share: 12.5 },
                ]}
              />
              <p className="mt-6 font-sans text-[0.75rem] uppercase tracking-[0.14em] text-paper/45">
                Source:{" "}
                <a href={PITCHBOOK_URL} target="_blank" rel="noopener noreferrer" className="text-paper/70 underline decoration-gold-500/60 underline-offset-4 hover:text-paper">
                  PitchBook-NVCA Venture Monitor
                </a>
              </p>
            </div>

            <Section label="This week" title="The headlines aren’t about you">
              <P>
                Every week brings another nine- or ten-figure round. AI labs
                raising tens of billions. Seed rounds priced like Series Bs. If
                you’re raising $2M right now, it can feel like showing up to a
                yacht party in a kayak.
              </P>
              <P>The data tells a different story.</P>
              <P>
                Megadeals of $100M or more captured 87.5% of the $412.7 billion
                deployed in US venture in H1 2026, and AI alone took 86% of the
                dollars (<Ext href={PITCHBOOK_URL}>PitchBook-NVCA Venture Monitor</Ext>).
              </P>
              <P>Read that again.</P>
              <P>
                Roughly <B>one dollar in eight</B> went to every round under
                $100 million combined.
              </P>
            </Section>

            <Section label="The data" title="More money, fewer winners">
              <P>
                Underneath the headlines, fewer companies are getting funded.
                Seed startups on Carta raised $2.7 billion across 381 rounds in
                Q1 2026, versus $2.2 billion across 481 rounds a year before (
                <Ext href={CARTA_URL}>Carta</Ext>). <B>More dollars. A hundred fewer companies.</B>
              </P>

              <div className="my-8 border border-navy/10 bg-paper-tint px-6 py-6 md:px-8">
                <p className="eyebrow mb-5">Seed rounds on Carta, Q1</p>
                <table className="w-full font-sans text-[1rem]">
                  <thead>
                    <tr className="text-left text-[0.75rem] uppercase tracking-[0.14em] text-navy/45">
                      <th className="pb-3 font-semibold"></th>
                      <th className="pb-3 text-right font-semibold">2025</th>
                      <th className="pb-3 text-right font-semibold">2026</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy/10">
                    <tr>
                      <td className="py-3 text-navy/70">Dollars raised</td>
                      <td className="py-3 text-right tabular-nums text-navy">$2.2B</td>
                      <td className="py-3 text-right tabular-nums font-semibold text-navy">
                        $2.7B <span className="text-gold-600">▲</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-navy/70">Companies funded</td>
                      <td className="py-3 text-right tabular-nums text-navy">481</td>
                      <td className="py-3 text-right tabular-nums font-semibold text-navy">
                        381 <span className="text-navy/50">▼</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Source href={CARTA_URL}>Carta</Source>
              </div>

              <P>
                The fund side looks the same. Three firms raised 48.1% of all
                new US venture capital, while first-time fund formation is on
                pace for its weakest year since 2016 (<Ext href={PITCHBOOK_URL}>PitchBook</Ext>).
              </P>

              <div className="my-8 grid gap-4 border-l-2 border-gold-500 bg-paper-tint px-7 py-7 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8">
                <span className="font-serif text-[4rem] font-semibold leading-none text-gold-600 sm:text-[4.5rem]">3</span>
                <div>
                  <p className="font-sans text-[1.0625rem] leading-[1.6] text-navy/75">
                    firms raised <B>48.1%</B> of all new US venture capital.
                  </p>
                  <Bars
                    rows={[
                      { label: "3 firms", value: "48.1%", share: 48.1 },
                      { label: "Every other US venture firm", value: "51.9%", share: 51.9 },
                    ]}
                  />
                </div>
              </div>
            </Section>

            <Section label="From the field" title="What it looks like from where we sit">
              <P>
                Most of the investors in our network will never write a $100
                million check. They’re angels, family offices, micro-VCs and
                syndicates, and they’re the real market for nearly every
                founder reading this.
              </P>
              <P>
                That’s the part the headlines miss. When the biggest funds crowd
                into the same handful of names, everything below the line gets
                less crowded. But fewer rounds closing means the bar went up,
                not down. <B>A smaller check isn’t an easier check.</B>
              </P>
            </Section>

            <Section label="The playbook" title="A playbook for raising below the megadeal line">
              <ol className="divide-y divide-navy/10">
                {STEPS.map((step, i) => (
                  <li key={step.lead} className="flex gap-6 py-7 first:pt-0">
                    <span className="w-8 shrink-0 font-serif text-[1.9rem] font-semibold leading-none text-gold-600">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="mb-3 font-serif text-[1.25rem] font-semibold leading-snug text-navy">{step.lead}</h3>
                      <div className="[&>p:last-child]:mb-0">{step.body}</div>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-8 border border-navy/10 bg-paper-tint px-7 py-6">
                <p className="eyebrow mb-3">If you’re investing</p>
                <p className="font-sans text-[1.0625rem] leading-[1.75] text-navy/75">
                  The same data reads the other way. When capital piles up at
                  the top, the companies below the megadeal line face less
                  competition for your check.
                </p>
              </div>
            </Section>

            <Section label="Investor Signals" title="Where we come in">
              <P>
                This is the market we work in every day. Investor Signals
                connects founders with the angels, family offices, VCs and
                syndicates writing checks below the megadeal line, through
                warm, pre-confirmed introductions.
              </P>
              <div className="my-8 grid grid-cols-3 divide-x divide-navy/10 border border-navy/10 bg-white/60">
                {[
                  ["100+", "successful engagements this year"],
                  ["0%", "success fees"],
                  ["0", "equity taken"],
                ].map(([n, l]) => (
                  <div key={l} className="px-4 py-5 text-center">
                    <span className="block font-serif text-[1.9rem] font-semibold text-navy">{n}</span>
                    <span className="mt-1 block font-sans text-[0.8125rem] leading-snug text-navy/60">{l}</span>
                  </div>
                ))}
              </div>
              <div className="my-8 border-l-2 border-gold-500 bg-paper-tint px-7 py-6">
                <p className="mb-3 font-serif text-[1.3rem] font-semibold text-navy">Raising a round?</p>
                <ArrowLink href="/request-an-introduction">
                  Talk to our team about setting up investor conversations
                </ArrowLink>
              </div>
              <P>More next week.</P>
              <p className="font-serif text-[1.1rem] italic text-navy">The Investor Signals team</p>
            </Section>

            <Section label="For our New York readers" title="Greenwich Street, Hudson Square">
              <a
                href={LISTING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative mb-6 block aspect-[3/2] overflow-hidden bg-paper-deep"
                aria-label="500 Greenwich Street, Unit 202, listing on Compass"
              >
                <Image
                  src="/newsletter/issue-02-greenwich-street.jpg"
                  alt="Loft at 500 Greenwich Street, Hudson Square, with exposed timber beams and an open living and dining space"
                  fill
                  sizes="(min-width: 768px) 736px, 100vw"
                  className="object-cover"
                />
              </a>
              <P>
                If you’ve been thinking about a move, or looking to invest in
                New York real estate, this one is worth a look. A 3-bed, 3-bath
                loft with exposed timber beams, a wide-open living and dining
                space and a large kitchen island, listed at <B>$7.1M</B>.
              </P>
              <div className="mb-5">
                <ArrowLink href={LISTING_URL} external>
                  See the listing
                </ArrowLink>
              </div>
              <P>
                For details or a viewing, reach our friend Nick Green at{" "}
                <a href="tel:+14017411943" className={linkCls}>
                  (401) 741-1943
                </a>
                .
              </P>
            </Section>

            <Section label="Sister company" title="Synapse Network">
              <P>
                Our sister company, <Ext href="https://synapsenetwork.co/">Synapse Network</Ext>, is
                an invitation-only network for fund managers, LPs, family
                offices and lenders.
              </P>
              <ArrowLink href={REQUEST_INVITE_URL} external>
                Request an invitation
              </ArrowLink>
            </Section>

            <p className="mt-16 border-t border-navy/10 pt-8 font-sans text-[0.8125rem] leading-[1.7] text-navy/50">
              Investor Signals and Synapse Network arrange introductions and are
              not broker-dealers or investment advisers. Nothing here is
              investment advice. All investment decisions are made solely by
              the parties involved.
            </p>
          </div>
        </div>
      </article>

      <NewsletterCta />
      <ClosingCta />
    </>
  );
}
