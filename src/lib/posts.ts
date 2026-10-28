export type Post = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, used for display and structured data. */
  date: string;
  readingTime: string;
  tag: string;
  /** Meta description, when it should differ from the card summary. */
  seoDescription?: string;
  /** Header image, served from /public. Also used for social cards. */
  image?: { src: string; alt: string; width: number; height: number };
};

/** Newest first. Add each week's post to the top of this list. */
export const POSTS: Post[] = [
  {
    slug: "the-87-5-percent-problem",
    title: "The 87.5% problem",
    description:
      "Megadeals took 87.5% of US venture dollars in H1 2026. Here’s how to raise below the megadeal line, where nearly every founder actually raises.",
    seoDescription:
      "87.5% of US venture dollars went to $100M+ rounds in H1 2026. A six-step playbook for founders raising below the megadeal line.",
    date: "2026-10-28",
    readingTime: "6 min read",
    tag: "Newsletter · Issue 02",
  },
  {
    slug: "signal-nyc-and-the-10-percent-problem",
    title: "Investors don't fund pitches. They fund people they already know.",
    description:
      "Signal NYC recap, plus why only 1 in 10 VC deals come in cold and three things to do before your next raise.",
    seoDescription:
      "Only 10% of VC deals come inbound from founders. What that means for your next raise, from the Investor Signals newsletter.",
    date: "2026-10-21",
    readingTime: "5 min read",
    tag: "Newsletter · Issue 01",
    image: {
      src: "/signal-nyc/signal-nyc-team.jpg",
      alt: "Signal NYC, Reserve Padel Hudson Yards: Investor Signals team in front of the step-and-repeat banner",
      width: 2000,
      height: 1333,
    },
  },
  {
    slug: "the-investor-relations-playbook",
    title: "The Investor Relations Playbook for Early-Stage Founders",
    description:
      "The complete outreach methodology we refined across nearly a decade and hundreds of raises: investor segmentation, messaging, follow-up cadence, meeting conversion, and the honest numbers behind cold outreach. Nothing held back.",
    date: "2026-09-17",
    readingTime: "18 min read",
    tag: "Playbook",
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
