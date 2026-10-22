# investorsignals.co

Marketing site for Investor Signals LLC, an investor introduction and
fundraising advisory firm. Built to feel like an established advisory
practice: paper-white ground, deep navy ink, gold hairlines, serif
headlines, restrained motion.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS 3
- Native scrolling; all reveals are hand-rolled
  IntersectionObserver + CSS (no animation framework)
- Source Serif 4 (headlines) and Source Sans 3 (body) via `next/font`
- No database. The contact form is delivered by email (Resend)

## Pages

`/` home, `/for-startups`, `/for-fund-managers`, `/case-studies`,
`/about` (with the team grid and the Signal NYC team photo), `/blog`
(post registry in `src/lib/posts.ts`, newest first; Newsletter Issue 01
leads, then the playbook), `/events` (the Signal Tour cards and the
Signal NYC gallery; photos and event data in `src/lib/signal-nyc.ts`),
`/newsletter` (subscribe page), `/faq`, `/request-an-introduction`
(booking calendar + form), plus `/disclosures`, `/privacy`, `/terms`
and a designed 404.

The header carries a "Subscribe" link to `/newsletter`; the footer links
to `/events` and carries the inline subscribe form. The startup directory
(separate repo/deploy) is not linked yet.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build
```

## The introduction-request form

Submissions POST to `/api/request-introduction`, are validated with zod,
and are emailed to `REQUEST_INBOX` through Resend using `RESEND_API_KEY`
(see `.env.example`; keys live only on the server). Each email carries the
requester's address as reply-to, so replying starts the conversation.
Without configuration the API returns a clear error rather than silently
dropping submissions. There is no database.

## The newsletter form

The subscribe form (`src/components/forms/NewsletterForm.tsx`) appears on
`/newsletter`, in the footer, and at the end of every blog post. It POSTs
to `/api/newsletter`, which upserts the contact in GHL and adds the tag
`newsletter subscriber` using `GHL_API_KEY` (+ `GHL_LOCATION_ID` for API
v2). Without GHL configured, sign-ups are emailed to `REQUEST_INBOX`
through Resend so nothing is lost.

## Signal NYC photos

`public/signal-nyc/` holds eight photos from the Signal NYC Flickr album
(Bryce's account, album 72177720336252460), resized to 2000 px wide and
compressed under 300 KB. Alt text and placements live in
`src/lib/signal-nyc.ts`.

## Content rules (from the client brief)

- No pricing, guarantees, refunds, or discounts anywhere on the site
- No em dashes, no emojis, no exclamation points in copy
- Never describe the service as cold outreach, lead generation, or mass
  email; the differentiator is that every introduction is accepted by the
  investor before it is booked
- Never state the size of the investor network as a number
- The only legal entity named is Investor Signals LLC
- Every page footer carries the broker-dealer disclosure line
