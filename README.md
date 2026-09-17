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
`/about` (with the team grid), `/blog` (post registry in
`src/lib/posts.ts`; the playbook is the first post), `/faq`,
`/request-an-introduction` (booking calendar + form), plus
`/disclosures`, `/privacy`, `/terms` and a designed 404.

The header and footer also link out to the startup directory
(separate repo/deploy) and the Luma events page.

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

## Content rules (from the client brief)

- No pricing, guarantees, refunds, or discounts anywhere on the site
- No em dashes, no emojis, no exclamation points in copy
- Never describe the service as cold outreach, lead generation, or mass
  email; the differentiator is that every introduction is accepted by the
  investor before it is booked
- Never state the size of the investor network as a number
- The only legal entity named is Investor Signals LLC
- Every page footer carries the broker-dealer disclosure line
