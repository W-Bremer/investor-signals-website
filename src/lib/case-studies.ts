export type CaseStudy = {
  slug: string;
  name: string;
  company: string;
  title: string;
  result: string;
  quote: string;
  /** Paragraphs of the full story. A leading and trailing quote may appear inside. */
  story: string[];
  closing?: string;
  youtubeId?: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "smb-value-partners",
    name: "Debb Deetsz",
    company: "SMB Value Partners",
    title: "Founder & CEO",
    result: "Active investor conversations within one week of her first call",
    quote:
      "The investors that Investor Signals connected me with were amazing. They were curated, warm, and informed. Every person I connected with had a real reason to be at the table. These are people who will write a check if they believe in the mission.",
    story: [
      "SMB Value Partners is a lifelong learning company empowering people across the entire circle of life with online training and education, from birth through end of life, leveraging technology, AI, and virtual reality to make education accessible at scale.",
      "Debb wasn't looking for just any check. She needed an investor who understood EdTech, had operating experience, had ideally exited a business, and genuinely believed in expanding global access to learning. She also had a tight timing window: an engagement letter from an investment bank outlining a seed round, and a need to close a bridge or pre-seed first to maintain momentum.",
      "Investor Signals asked the right question from the start: what does the right investor actually look like for you? That shaped everything. Rather than pushing generic introductions, the team built a profile around Debb's real criteria and identified matches immediately. Both sides were briefed before every call, turning 30-minute investor meetings into substantive conversations about fit and strategy.",
      "Within a week of her first call, Debb was already in active conversations with qualified investors and feels confident about closing the bridge round on an accelerated timeline.",
    ],
    closing:
      "The team is really sharp. They know what they're doing. They're very well connected. If you're raising and you want introductions that actually go somewhere, forget the lists and the cold outreach. Connect with Investor Signals.",
    youtubeId: "wzV3xHm8tJk",
  },
  {
    slug: "zipin-mail",
    name: "Vijay Chetty",
    company: "Zipin Mail",
    title: "Founder & CEO",
    result: "100% qualified intro rate: three matched investor meetings, two actively evaluating",
    quote:
      "My experience with Investor Signals has been positive. They followed through with what they said they would do. I like the flow, the process, the meetings, and the quality of the appointments. All of it has been great.",
    story: [
      "Zipin Mail is an address-based digital delivery platform built to eliminate paper mail and bring the postal system into the cloud. After raising roughly $2.25M from friends, family, angels, and a StartEngine campaign, founder Vijay Chetty turned to Investor Signals to connect with serious investors for his next round.",
      "What stood out to Vijay was the deliberate decision to stay small. Investor Signals vets every investor by stage focus, check size, category interest, and, critically, confirms they are actively deploying capital.",
      "Investor Signals set up three investor meetings for Zipin Mail. All three matched the criteria promised upfront. One investor passed, a healthy, normal outcome, and two remain actively evaluating the opportunity. Two more introductions followed, with meetings being scheduled.",
      "For Vijay, a 100% qualification rate on introductions is the metric that matters most: no wasted calls, no chasing dead leads, no re-explaining the company to someone who was never going to invest.",
    ],
    closing:
      "I recommend Investor Signals to anyone who is looking to raise capital, whether you are early stage or any stage.",
    youtubeId: "OJYYsxcpyG0",
  },
  {
    slug: "zenvoya",
    name: "Swapil",
    company: "Zenvoya",
    title: "Strategy & Partnerships",
    result: "Connected with curated angel investors through structured warm introductions",
    quote:
      "If you are a founder raising capital and looking for warm introductions to credible, relevant investors, Investor Signals is a worthwhile platform to consider.",
    story: [
      "Zenvoya is an AI-powered travel platform that helps users plan, book, and manage trips end to end through a conversational interface. Swapil leads strategy and partnerships at the company.",
      "Like most early-stage founders, the Zenvoya team faced a familiar fundraising problem: getting in front of the right investors. Cold outreach is noisy, warm introductions are hard to scale, and not every investor conversation produces signal worth the time spent. Zenvoya needed access to credible, relevant angels who understood early-stage bets and could engage substantively with the product.",
      "Investor Signals introduced the team to a set of angels drawn from its network, handling the coordination end to end. The investors were clearly curated rather than blasted. Each had meaningful angel investing experience and came into conversations prepared, having done their homework on Zenvoya ahead of time.",
      "Rather than surface-level pitches, the discussions produced thoughtful questions and useful feedback. Every call helped the team sharpen how it thinks about product direction and market positioning, which is rare in investor meetings and valuable independent of whether a check follows.",
      "For founders in active fundraising, the value comes down to two things: whether the introductions are actually curated, and whether the process saves time rather than adding to it. On both counts, Zenvoya's experience suggests the model works as intended.",
    ],
    youtubeId: "BX9XE80NIOM",
  },
  {
    slug: "fanup-ai",
    name: "Eric Spitz",
    company: "FanUp AI",
    title: "Co-founder & CEO",
    result: "In active conversations with multiple aligned investors, starting three steps ahead",
    quote:
      "If you're building something that requires patient, category-level thinking from your investors, I'd start here.",
    story: [
      "FanUp AI builds fan asset management studios for sports teams and leagues, helping them monetize fan databases that have been sitting dormant for years. As a category creator, FanUp isn't just selling a product. It is introducing an entirely new way for rights holders to think about fan data as a revenue-generating asset.",
      "Launching a brand-new category comes with a specific fundraising problem: most investor conversations start from zero. Founders spend the first three meetings explaining what the category even is, before they can talk about traction, model, or vision. Eric needed a way past what he calls the fundraising black hole: a way to reach investors capable of patient, category-level thinking without burning months on cold outreach and misaligned intros.",
      "Eric recognized the model immediately because it mirrors his own thesis: flip the incentive structure. Traditional warm intros are free for investors and expensive, in time and dignity, for founders, which means founders chase and investors half-listen. Investor Signals inverts that dynamic. Investors opt in. They show up because they want to be there. Roles are clear from the first minute.",
      "The conversations started three steps ahead of where they normally would. Instead of explaining the category, Eric was fielding sharp questions from investors who had already done the work to understand why FanUp's approach mattered. The process was organized, the communication was clean, and the investors were the right fit: sophisticated, prepared, and asking the right questions.",
    ],
    youtubeId: "lJFE8uJkrDk",
  },
  {
    slug: "bower-software",
    name: "Todd Bower",
    company: "Bower Software",
    title: "Founder",
    result: "Entered his raise with warmer, better-matched conversations and real technical pushback",
    quote:
      "They were able to understand where we were in our positioning and explain how we're not an AI startup or a SaaS product. Those intros were really curated well, and they came in with some early stage protocol plays. I wasn't starting from zero every time, and that mattered more than having a volume of calls.",
    story: [
      "Bower Software is an agency building native AI solutions and enterprise advisory services. The company recently developed the Principal Agent Protocol, a governance layer for the agentic web. Todd describes it as analogous to what HTTP and TLS are today, but structured around a programmable delegation model.",
      "The difficulty wasn't the vision itself. It was finding investors who could actually understand the problem space. Bower Software doesn't fit neatly into familiar buckets. It isn't an AI startup in the conventional sense, and it isn't a SaaS product. That ambiguity creates real friction in fundraising, where pattern-matching drives most early conversations.",
      "Investor Signals took the time to understand Bower Software's positioning and could articulate why the company sat outside standard categories. That translated into curated introductions with investors already oriented toward early-stage protocol plays. Todd noted that he wasn't starting from zero in each conversation, which he considered more valuable than a high volume of calls.",
      "The quality of dialogue shifted as a result. He received substantive pushback on architecture decisions, on which leads the team was engaging, and on how the business model would play out given the unusual nature of the product. That kind of friction, coming from informed investors, is more useful than polite enthusiasm.",
    ],
    closing:
      "Thank you to Investor Signals for putting everything together. It made this process less frictional and got us right in front of the people who will make our raise a lot more successful.",
    youtubeId: "8Fzfi2A5V0M",
  },
  {
    slug: "team-logic-it",
    name: "Jamie Jones",
    company: "Team Logic IT",
    title: "Founder & CEO",
    result: "Moving through a pre-seed raise with substantive conversations and a clear thesis",
    quote:
      "They understand what early stage companies need to have and connect with a strong network of investors. Most importantly, the conversations have been real. I've been able to clearly communicate the why behind why I'm building, and that led to meaningful, productive discussions.",
    story: [
      "Jamie is building a trusted IT partnership model for businesses that need cybersecurity protection for their operations, and is raising pre-seed capital while running into the challenges most founders face at this stage.",
      "For early-stage founders, fundraising is rarely the hard part in isolation. The harder part is doing it effectively: finding investors who understand the category, communicating the thesis clearly, and turning conversations into something productive rather than performative. Jamie's thesis, that cybersecurity is no longer optional and every business needs a trusted IT partner, resonates with investors in principle. But principle alone doesn't close a round. The work is in the conversations.",
      "Investor Signals came in as a key part of the journey. Jamie highlighted two things that mattered: they understand what early-stage companies need to have in place, and they have a strong network of investors to connect founders with.",
      "What stood out most was the quality of the conversations themselves. They were real. Jamie was able to clearly communicate the why behind the company, and that led to meaningful, productive discussions rather than surface-level pitch meetings.",
    ],
    closing:
      "Overall, it's been a great experience, and I'd recommend Investor Signals to any technical founder raising pre-seed capital.",
    youtubeId: "hsBTApAhKyw",
  },
];
