export type TeamMember = {
  name: string;
  role: string;
  photo: string;
  linkedin?: string;
  bio: string;
  /** Optional link woven into the bio, rendered after it. */
  bioLink?: { label: string; href: string };
};

/** Display order set by the client: do not reorder. */
export const TEAM: TeamMember[] = [
  {
    name: "Bryce Holloway",
    role: "Chief Executive Officer",
    photo: "/team/bryce.jpg",
    linkedin: "https://www.linkedin.com/in/bryce-holloway123/",
    bio: "Founder of Holloway Solutions, where he helped biotech startups navigate fundraising. Brings deep life-sciences expertise and connects emerging companies with investors who genuinely understand the space.",
  },
  {
    name: "Zain Yaqub",
    role: "Co-Founder",
    photo: "/team/zain.jpg",
    linkedin: "https://www.linkedin.com/in/zainyaqub/",
    bio: "Former operator turned investor advocate. Built fundraising infrastructure for more than 500 companies, and believes access to capital should be direct, not gated by geography or connections.",
  },
  {
    name: "Jordan Goldberg",
    role: "Startup Advisor",
    photo: "/team/jordan.jpg",
    linkedin: "https://www.linkedin.com/in/jordanagoldberg/",
    bio: "Entrepreneur, applied behavioral scientist, and early-stage investor. Co-founded stickK and scaled it from concept to profitability, and is Managing Member of Frago Investments, an angel group backing early-stage startups. He has appeared on NBC's TODAY Show and CBS Sunday Morning, and lectures in MBA programs including NYU and Wharton.",
  },
  {
    name: "Yarden Hofer",
    role: "Co-Founder",
    photo: "/team/yarden.jpg",
    linkedin: "https://www.linkedin.com/in/yarden-hofer-a26855a1/",
    bio: "Product-obsessed technologist with a background in scaling platforms. Focused on making fundraising more transparent and efficient for both sides of the table.",
  },
  {
    name: "Ibraheem Kamal Al Ani",
    role: "Co-Founder",
    photo: "/team/ibraheem.jpg",
    linkedin: "https://www.linkedin.com/in/ibraheem-kamal-al-ani-86927736b/",
    bio: "Investor and advisor with deep networks across venture capital, private equity, and real estate. Spent years connecting founders to capital and realized the process needed to be productized.",
  },
  {
    name: "Chayce Lucca",
    role: "Network Partner",
    photo: "/team/chayce.jpg",
    linkedin: "https://www.linkedin.com/in/chaycelucca/",
    bio: "CEO of the Synapse Network, the capital-markets fund network we partner with. He has helped investment firms, real estate syndicators, and business brokers generate over $70M in qualified pipeline, and facilitates warm, relevant introductions between founders and active investors.",
    bioLink: { label: "The Synapse Network", href: "https://synapsenetwork.co/" },
  },
  {
    // TODO(client): confirm Sam's full name, title, and bio with Bryce.
    name: "Sam",
    role: "Investor Signals Team",
    photo: "/team/sam.jpg",
    bio: "Works across the network to keep every introduction warm, relevant, and moving, so founders spend their time in real conversations instead of chasing them.",
  },
  {
    // TODO(client): confirm Aaron's title and bio with Bryce.
    name: "Aaron Sharif",
    role: "Investor Signals Team",
    photo: "/team/aaron.jpg",
    linkedin: "https://www.linkedin.com/in/aaronsharif/",
    bio: "Works with founders and investors across the network, helping match raises to the people most likely to say yes and keeping both sides prepared for the room.",
  },
];
