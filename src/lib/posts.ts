export type Post = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, used for display and structured data. */
  date: string;
  readingTime: string;
  tag: string;
};

/** Newest first. Add each week's post to the top of this list. */
export const POSTS: Post[] = [
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
