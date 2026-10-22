import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { NewsletterCta } from "@/components/sections/NewsletterCta";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { ArrowRight } from "@/components/ui/icons";
import { getPost } from "@/lib/posts";
import { FLICKR_ALBUM_URL, NEWSLETTER_ROW, REQUEST_INVITE_URL } from "@/lib/signal-nyc";

/*
 * Newsletter Issue 01 as a blog post. The body is the text of the GHL
 * campaign "Newsletter #1 - Signal NYC + The 10% Problem" (sent October 21,
 * 2026) word for word, minus the email-only masthead, preheader and footer
 * address line. The closing disclaimer is kept.
 */

const post = getPost("signal-nyc-and-the-10-percent-problem")!;

export const metadata: Metadata = {
  title: post.title,
  description: post.seoDescription ?? post.description,
  openGraph: post.image
    ? { images: [{ url: post.image.src, width: post.image.width, height: post.image.height, alt: post.image.alt }] }
    : undefined,
};

/* ------------------------------------------------------------------ */
/* Local article primitives (shared style with the playbook post)      */
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

const linkCls =
  "text-navy underline decoration-gold-500/60 decoration-1 underline-offset-4 transition-colors duration-300 hover:decoration-gold-600";

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkCls}>
      {children}
    </a>
  );
}

/** A standalone arrow link, the email's "→" call-outs. */
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
  image: post.image ? [post.image.src] : undefined,
  author: { "@type": "Organization", name: "Investor Signals LLC" },
  publisher: { "@type": "Organization", name: "Investor Signals LLC" },
};

const STEPS: { lead: string; body: string }[] = [
  {
    lead: "Start before the ask.",
    body: "Get on investors’ radar months before you need the money. Short, real updates beat a cold pitch every time.",
  },
  {
    lead: "Get vouched for.",
    body: "A referral from another investor or a portfolio founder is one of the biggest ways deals get done. Ask the people who already believe in you.",
  },
  {
    lead: "Pick rooms, not lists.",
    body: "Twenty investors whose thesis fits you will outperform two hundred who don’t. Go where the right ones already are.",
  },
];

export default function IssueOnePage() {
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
        <div className="container-edge pt-12 md:pt-16">
          {post.image && (
            <figure className="hero-fade" style={{ "--hf-delay": "520ms" } as React.CSSProperties}>
              <a
                href={FLICKR_ALBUM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Signal NYC photo album on Flickr"
                className="relative block aspect-[16/9] overflow-hidden bg-paper-deep md:aspect-[2/1]"
              >
                <Image
                  src={post.image.src}
                  alt={post.image.alt}
                  fill
                  priority
                  sizes="(min-width: 1200px) 1100px, 100vw"
                  className="object-cover"
                />
              </a>
              <figcaption className="mt-3 font-sans text-[0.8125rem] text-navy/50">
                The Investor Signals team at Signal NYC, Reserve Padel, Hudson Yards.
              </figcaption>
            </figure>
          )}
        </div>

        <div className="container-edge py-10 md:py-14">
          <div className="mx-auto max-w-[46rem]">
            <Section label="Signal NYC · Recap" title="Thank you to everyone who came out to Signal NYC">
              <P>
                On October 15, we hosted our first investor event at Reserve
                Padel in Hudson Yards. GPs, family offices, angel and syndicate
                leads, LPs and emerging fund managers spent the afternoon
                playing padel, talking shop and meeting people they should have
                met years ago.
              </P>
              <P>
                Thank you for showing up, and for making it an afternoon where
                nobody pitched and everybody connected.
              </P>
              <div className="my-8 grid grid-cols-3 gap-3">
                {NEWSLETTER_ROW.map((p) => (
                  <div key={p.src} className="relative aspect-[3/2] overflow-hidden bg-paper-deep">
                    <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 240px, 33vw" className="object-cover" />
                  </div>
                ))}
              </div>
              <P>The photos are up.</P>
              <ArrowLink href={FLICKR_ALBUM_URL} external>
                Browse the Signal NYC gallery and find yours
              </ArrowLink>
            </Section>

            <Section label="Welcome" title="Welcome to our newsletter">
              <P>
                This is the first issue. Every week we’ll share what we’re
                hearing from investors, what’s working in raises right now, and
                the data behind it. No fluff. Honest odds.
              </P>
              <P>Which brings us to this week’s topic.</P>
            </Section>

            <Section label="This week" title="Investors don’t fund pitches. They fund people they already know.">
              <P>
                Most founders run fundraising like sales. Build a list. Write
                the pitch. Send it to everyone. It feels productive. It’s also
                the narrowest door into a venture firm.
              </P>
              <P>
                In the largest survey of VC decision-making we know of, covering
                hundreds of institutional firms, only 10% of deals came inbound
                from company management. Over 30% came through VCs’
                professional networks, another 20% were referred by other
                investors, and 8% came from portfolio companies (
                <Ext href="https://www.nber.org/papers/22587">
                  Gompers et al., Journal of Financial Economics
                </Ext>
                ).
              </P>
              <div className="my-8 grid gap-4 border-l-2 border-gold-500 bg-paper-tint px-7 py-7 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8">
                <span className="font-serif text-[4rem] font-semibold leading-none text-gold-600 sm:text-[4.5rem]">
                  10%
                </span>
                <p className="font-sans text-[1.0625rem] leading-[1.6] text-navy/75">
                  of VC deals came inbound from company management.
                </p>
              </div>
              <P>Read that again. One in ten.</P>
              <P>
                The funnel is brutal even after you’re in it. The average firm
                screened more than 400 companies and made only five investments
                in a year, and for each deal a firm closed, it considered
                roughly 100 opportunities.
              </P>
              <P>
                And in 2026, the room is getting smaller. US startups on Carta
                raised $3.19 billion across more than 11,500 pre-seed SAFEs and
                notes in Q2 2026, versus $3.22 billion across 14,825
                instruments a year earlier. The average instrument hit
                $276,000, up 27% year over year and a record high (
                <Ext href="https://carta.com/data/state-of-pre-seed-q2-2026/">Carta</Ext>
                ). <strong className="font-semibold text-navy">Same money. Fewer founders getting it.</strong>
              </P>
            </Section>

            <Section label="From the field" title="What it looks like from the other side of the table">
              <P>
                We’ve worked on more than 300 raises, and the pattern is hard to
                miss. The founder who closes in eight weeks and the one who
                grinds for nine months usually have similar products. What’s
                different is who vouched for them before they walked in.
              </P>
              <P>
                There’s a reason that matters so much. In that same survey, VCs
                ranked the management team as the most important factor in
                deciding whether to invest, named by 47% of firms as their top
                factor. Investors are betting on you. A relationship is how
                they get to know you before the deck does the talking.
              </P>
              <P>
                The flip side is real too. Investors talk to each other. A
                mass-blasted raise gets noticed, and a bad first impression
                rarely gets a second chance.
              </P>
            </Section>

            <Section title="Three things to do before your next raise">
              <ol className="divide-y divide-navy/10">
                {STEPS.map((step, i) => (
                  <li key={step.lead} className="flex gap-6 py-6 first:pt-0">
                    <span className="w-8 shrink-0 font-serif text-[1.9rem] font-semibold leading-none text-gold-600">
                      {i + 1}
                    </span>
                    <p className="font-sans text-[1.0625rem] leading-[1.75] text-navy/75">
                      <strong className="font-semibold text-navy">{step.lead}</strong> {step.body}
                    </p>
                  </li>
                ))}
              </ol>
            </Section>

            <Section label="Investor Signals" title="Where we come in">
              <P>
                Investor Signals was built on exactly this. Nearly a decade of
                relationships with HNWIs, family offices, VCs, micro-VCs, angel
                networks and syndicates, built by hand by a team with five
                combined exits and 300+ startup raises behind it.
              </P>
              <P>
                This year we passed 100+ successful engagements, connecting
                startups with investors through warm, pre-confirmed
                introductions.{" "}
                <strong className="font-semibold text-navy">Flat fee per meeting. No success fees. No equity.</strong>
              </P>
              <P>
                We’re not a database. We talk to investors every week, and we
                know what they’re actually looking for.
              </P>
              <div className="my-8 border-l-2 border-gold-500 bg-paper-tint px-7 py-6">
                <p className="mb-3 font-serif text-[1.3rem] font-semibold text-navy">Raising a round?</p>
                <ArrowLink href="/request-an-introduction">
                  Talk to our team about setting up investor conversations
                </ArrowLink>
              </div>
              <P>Thanks again for being part of this. More next week.</P>
              <p className="font-serif text-[1.1rem] italic text-navy">The Investor Signals team</p>
            </Section>

            <Section label="Sister company" title="Synapse Network">
              <P>
                Our sister company,{" "}
                <Ext href="https://synapsenetwork.co/">Synapse Network</Ext>, is
                an invitation-only network for fund managers, LPs, family
                offices and lenders. Membership comes with a 60-day free trial.
              </P>
              <ArrowLink href={REQUEST_INVITE_URL} external>
                Request an invitation
              </ArrowLink>
            </Section>

            <p className="mt-16 border-t border-navy/10 pt-8 font-sans text-[0.8125rem] leading-[1.7] text-navy/50">
              Investor Signals and Synapse Network arrange introductions and are
              not broker-dealers or investment advisers. All investment
              decisions are made solely by the parties involved.
            </p>
          </div>
        </div>
      </article>

      <NewsletterCta />
      <ClosingCta />
    </>
  );
}
