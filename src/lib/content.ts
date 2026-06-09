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
