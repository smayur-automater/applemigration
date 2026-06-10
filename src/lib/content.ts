export interface Testimonial {
  quote: string;
  name: string;
  visa: string;
  country: string;
  flag: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Apple handled my entire student visa application from start to finish. They explained every step in plain English and my visa was granted in just six weeks.",
    name: "Priya Sharma",
    visa: "Student Visa 500",
    country: "India",
    flag: "🇮🇳",
    rating: 5,
  },
  {
    quote:
      "After two refused applications elsewhere, the team rebuilt my skilled migration case and got my 189 granted. I can't recommend them highly enough.",
    name: "Diego Fernández",
    visa: "Skilled Independent 189",
    country: "Chile",
    flag: "🇨🇱",
    rating: 5,
  },
  {
    quote:
      "The partner visa process felt overwhelming until we found Apple. They prepared everything meticulously and kept us informed the whole way through.",
    name: "Mei Lin & James Carter",
    visa: "Partner Visa 820/801",
    country: "China",
    flag: "🇨🇳",
    rating: 5,
  },
  {
    quote:
      "My employer needed me on-site fast. Apple coordinated the sponsorship and nomination flawlessly — visa granted ahead of schedule.",
    name: "Tomasz Kowalski",
    visa: "Skills in Demand 482",
    country: "Poland",
    flag: "🇵🇱",
    rating: 5,
  },
  {
    quote:
      "They matched me with the right course and university, then handled my visa. One team for everything made all the difference.",
    name: "Amara Okafor",
    visa: "Student Visa 500",
    country: "Nigeria",
    flag: "🇳🇬",
    rating: 5,
  },
  {
    quote:
      "Professional, honest, and incredibly responsive. They told me upfront what was realistic and delivered exactly what they promised.",
    name: "Sarah Thompson",
    visa: "Parent Visa 143",
    country: "United Kingdom",
    flag: "🇬🇧",
    rating: 5,
  },
];

export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  displayDate: string;
  slug: string;
  category: string;
  readTime: string;
  body: string[];
}

export const blogPosts: BlogPost[] = [
  {
    title: "Student Visa Changes in 2026: What Applicants Need to Know",
    excerpt:
      "Genuine Student requirement updates, new financial capacity thresholds, and what they mean for your application this year.",
    date: "2026-05-28",
    displayDate: "28 May 2026",
    slug: "student-visa-changes-2026",
    category: "Student Visas",
    readTime: "6 min read",
      body: [
      "The Genuine Student requirement continues to be the deciding factor in most student visa refusals. In 2026, case officers are placing increased weight on the coherence of your study plan: how your chosen course connects to your previous education and your stated career goals. Applications where the course choice appears driven primarily by migration outcomes face significantly more scrutiny.",
      "Financial capacity thresholds were indexed again this year. Applicants must now demonstrate access to funds covering twelve months of living costs at the updated rate, plus first-year tuition and travel. Evidence quality matters as much as the amount — recently deposited lump sums without a clear source attract requests for further information, which add weeks to processing.",
      "Our advice: prepare your Genuine Student statement before you apply, not as an afterthought. A clear, truthful narrative supported by consistent documents remains the single best predictor of a smooth grant. If your situation has complications — previous refusals, gaps in study, or limited funds — get professional advice before lodging, not after a refusal.",
    ],
  },
  {
    title: "189 vs 190 vs 491: Choosing the Right Skilled Visa Pathway",
    excerpt:
      "A plain-English comparison of Australia's three points-tested skilled visas — eligibility, obligations, and processing realities.",
    date: "2026-05-14",
    displayDate: "14 May 2026",
    slug: "skilled-visa-pathways-compared",
    category: "Skilled Migration",
    readTime: "8 min read",
      body: [
      "The Skilled Independent (189), Skilled Nominated (190), and Skilled Work Regional (491) visas share the same points test but lead to very different journeys. The 189 grants immediate permanent residency with no strings attached — and is precisely why it requires the highest points scores, often 85 or more in popular occupations.",
      "The 190 trades a little freedom for a faster invitation: state nomination adds 5 points, but you commit to living in the nominating state for two years. Each state runs its own program with its own occupation lists and requirements, which change throughout the program year. Targeting the right state is as important as your points score.",
      "The 491 is the most accessible entry point, adding 15 points for regional nomination, but it is a five-year provisional visa. Permanent residency comes later through the 191, after three years of regional living and meeting income requirements. For many applicants in their late thirties or in borderline occupations, the 491 is not a consolation prize — it is the realistic pathway.",
      "Which is right for you depends on your occupation's demand, your points position, and your flexibility about where you live. We model all three pathways in a single consultation so you can decide with full information.",
    ],
  },
  {
    title: "Partner Visa Evidence: Building a Case That Convinces",
    excerpt:
      "The four pillars of relationship evidence and how to document each one properly — without drowning in paperwork.",
    date: "2026-04-30",
    displayDate: "30 April 2026",
    slug: "partner-visa-evidence-guide",
    category: "Partner Visas",
    readTime: "7 min read",
      body: [
      "The Department assesses partner visa relationships against four pillars: financial aspects, the nature of the household, social aspects, and the nature of your commitment. A strong application provides evidence in all four — a thin pillar is the most common reason for requests for further information and, ultimately, refusals.",
      "Financial evidence means joint accounts, shared bills, or transfers that show intermingled finances. Household evidence covers shared leases, utility bills at the same address, and how you divide domestic life. Social evidence shows the world sees you as a couple: joint invitations, photos across time, statements from family and friends. Commitment evidence includes your communication history, future plans, and knowledge of each other's lives.",
      "Quality beats quantity. Two hundred unsorted photographs help less than twenty captioned ones spanning your relationship. Statutory declarations that tell specific, dated stories outweigh generic praise. Start collecting evidence early, organise it by pillar, and keep it current while the application is processing — decisions can take many months, and updated evidence strengthens two-stage assessments.",
    ],
  },
  {
    title: "Employer Sponsorship in 2026: A Guide for Australian Businesses",
    excerpt:
      "Becoming an approved sponsor, nominating an occupation, and meeting salary requirements under the Skills in Demand framework.",
    date: "2026-04-16",
    displayDate: "16 April 2026",
    slug: "employer-sponsorship-guide",
    category: "Employer Sponsored",
    readTime: "9 min read",
      body: [
      "Sponsoring an overseas worker involves three sequential approvals: Standard Business Sponsorship for your company, nomination of the specific role, and the worker's visa application. Businesses new to sponsorship are often surprised that the first two stages carry most of the risk — visa refusals usually trace back to weaknesses in the nomination.",
      "The Skills in Demand framework ties salary requirements to defined income thresholds, updated annually. Your nominated salary must meet both the applicable threshold and the market rate for the role — paying above the threshold does not help if local employees in equivalent roles earn more. Genuine position requirements also receive close attention: the role must fit your business's size, industry, and organisational structure.",
      "Approved sponsors carry ongoing obligations: record keeping, notification of certain events, and ensuring sponsored workers are employed in their nominated occupation. The penalties for non-compliance include sponsorship bars that can cripple a business's ability to hire. A simple compliance calendar, set up when your sponsorship is approved, prevents nearly all of these problems.",
    ],
  },
  {
    title: "How to Choose an Australian University as an International Student",
    excerpt:
      "Rankings aren't everything. Course structure, location, costs, and post-study work rights all matter — here's how to weigh them.",
    date: "2026-04-02",
    displayDate: "2 April 2026",
    slug: "choosing-australian-university",
    category: "Education",
    readTime: "5 min read",
      body: [
      "International students often start with rankings, but rankings measure research output more than teaching quality or graduate outcomes. A university ranked 40 places lower might offer better industry placements, smaller classes, and substantially lower living costs in a regional city — differences that matter far more to your actual experience and career.",
      "Think about the full cost equation: tuition varies between institutions by tens of thousands of dollars for comparable courses, and living costs in Sydney or Melbourne run far higher than in Adelaide, Brisbane, or regional centres. Regional study can also earn extra points toward skilled migration and longer post-study work rights.",
      "Most importantly, work backwards from your goal. If permanent migration is part of your plan, course choice should align with occupations in demand — and that alignment needs checking against current lists, not the lists from three years ago. If your goal is a specific career, look at the university's industry connections and graduate employment data for that field, not its overall rank.",
    ],
  },
  {
    title: "Visa Refused? Your Options for Review and Reapplication",
    excerpt:
      "A refusal is not the end of the road. Understanding ART review, reapplication, and how to strengthen a previously refused case.",
    date: "2026-03-19",
    displayDate: "19 March 2026",
    slug: "visa-refusal-options",
    category: "General",
    readTime: "6 min read",
      body: [
      "A visa refusal is distressing, but it is rarely the end of your options. The first step is careful reading of the decision record: the specific criteria the case officer found unmet shape everything that follows. Refusals based on documentary gaps differ fundamentally from refusals based on credibility concerns.",
      "Most onshore refusals carry review rights at the Administrative Review Tribunal. The ART reconsiders your case on its merits — new evidence is allowed — but strict deadlines apply, often 21 or 28 days from the refusal notification. Missing the deadline usually extinguishes the right entirely, so act quickly even if you have not decided whether to pursue review.",
      "Sometimes reapplying is smarter than appealing: faster, cheaper, and with the opportunity to fix the weaknesses the refusal identified. But reapplying without addressing the refusal reasons practically invites a second refusal, and multiple refusals compound credibility concerns. An honest professional assessment of why you were refused — and whether it is fixable — is worth far more than hope.",
    ],
  },
];

export interface TeamMember {
  name: string;
  role: string;
  credentials?: string;
  bio: string;
  linkedIn?: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Anita Desai",
    role: "Principal Migration Agent & Founder",
    credentials: "MARN 0000000",
    bio: "With 15+ years in Australian immigration law, Anita has guided more than a thousand clients to successful visa outcomes across every major visa class.",
    linkedIn: "https://www.linkedin.com",
  },
  {
    name: "Michael O'Brien",
    role: "Senior Migration Agent",
    credentials: "MARN 0000001",
    bio: "Michael specialises in skilled and employer-sponsored migration, with deep expertise in points-tested pathways and state nomination programs.",
    linkedIn: "https://www.linkedin.com",
  },
  {
    name: "Grace Nguyen",
    role: "Education Consultant",
    credentials: "QEAC Certified",
    bio: "Grace helps international students find the right course and institution, drawing on partnerships with universities and colleges across Australia.",
    linkedIn: "https://www.linkedin.com",
  },
  {
    name: "Raj Patel",
    role: "Client Services Manager",
    bio: "Raj keeps every application on track — coordinating documents, deadlines, and communication so clients always know where their case stands.",
  },
];

export const generalFaqs = [
  {
    question: "Do I really need a migration agent to apply for a visa?",
    answer:
      "No — you can apply yourself. But Australian migration law is complex and changes frequently. A registered agent knows the current requirements, prepares decision-ready applications, and can identify risks before they become refusals. For complicated cases, professional help often saves time and money overall.",
  },
  {
    question: "How much do your services cost?",
    answer:
      "Fees depend on the visa type and complexity of your case. We provide a complete, fixed-fee schedule in writing before you commit to anything, as required by the Migration Agents Code of Conduct. Your initial consultation is free.",
  },
  {
    question: "What does MARA registration mean?",
    answer:
      "MARA (the Office of the Migration Agents Registration Authority) regulates migration agents in Australia. Registered agents must meet professional standards, hold professional indemnity insurance, complete ongoing education, and follow a strict Code of Conduct. Only registered agents can legally provide migration advice in Australia.",
  },
  {
    question: "How long will my visa application take?",
    answer:
      "Processing times vary widely by visa type, country of application, and case complexity — from a few weeks for some student visas to several years for certain family visas. We'll give you a realistic estimate for your specific situation during your consultation.",
  },
  {
    question: "Can you help if my visa was refused?",
    answer:
      "Yes. We regularly assist with Administrative Review Tribunal (ART) applications and reapplications after refusal. The key is understanding why the refusal happened and addressing it properly — bring your refusal notice to a consultation and we'll assess your options.",
  },
  {
    question: "I'm outside Australia. Can you still help me?",
    answer:
      "Absolutely. Most of our clients start their journey from overseas. We work via video consultation, email, and phone across all time zones, and we can lodge most applications regardless of where you are.",
  },
  {
    question: "What happens at the free consultation?",
    answer:
      "We discuss your goals, review your circumstances, and outline which visa pathways are realistic for you — including timeframes, costs, and risks. There's no obligation to proceed, and you'll leave with a clear picture of your options.",
  },
  {
    question: "Is my information kept confidential?",
    answer:
      "Yes. Everything you share with us is protected under our privacy policy and the confidentiality obligations of the Migration Agents Code of Conduct. We never share your information without your consent.",
  },
];
