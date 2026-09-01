# investorsignals.co

Marketing site for Investor Signals LLC, an investor introduction and
fundraising advisory firm. Built to feel like an established advisory
practice: paper-white ground, deep navy ink, gold hairlines, serif
headlines, restrained motion.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS 3
- Lenis for inertial scrolling; all reveals are hand-rolled
  IntersectionObserver + CSS (no animation framework)
- Source Serif 4 (headlines) and Source Sans 3 (body) via `next/font`
- Supabase (server-side only) for storing introduction requests

## Pages

`/` home, `/for-startups`, `/for-fund-managers`, `/about`, `/faq`,
`/request-an-introduction` (form), plus `/disclosures`, `/privacy`,
`/terms` and a designed 404.

Case Studies and Advisors pages from the brief are intentionally not
built yet: their copy, bios, and photography are supplied by the client
per the content brief.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build
```

## The introduction-request form

Submissions POST to `/api/request-introduction`, are validated with zod,
and insert into the `introduction_requests` table using the service role
key (never exposed to the browser). Set `SUPABASE_URL` and
`SUPABASE_SERVICE_ROLE_KEY` (see `.env.example`) and run
`supabase/migrations/0002_introduction_requests.sql` once in the Supabase
SQL editor. Without configuration the API returns a clear error rather
than silently dropping submissions.

## Content rules (from the client brief)

- No pricing, guarantees, refunds, or discounts anywhere on the site
- No em dashes, no emojis, no exclamation points in copy
- Never describe the service as cold outreach, lead generation, or mass
  email; the differentiator is that every introduction is accepted by the
  investor before it is booked
- Never state the size of the investor network as a number
- The only legal entity named is Investor Signals LLC
- Every page footer carries the broker-dealer disclosure line
