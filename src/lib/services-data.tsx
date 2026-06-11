import type { ReactNode } from "react";
import {
  BookIcon,
  BriefcaseIcon,
  BuildingIcon,
  GlobeIcon,
  GraduationCapIcon,
  HeartIcon,
  SchoolIcon,
} from "@/components/ui/icons";

export interface ProcessStep {
  title: string;
  description: string;
}

export interface InfoCard {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceData {
  slug: string;
  navLabel: string;
  seoTitle: string;
  seoDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  overviewHeading: string;
  overviewParagraphs: string[];
  requirementsHeading: string;
  requirements: string[];
  processHeading: string;
  processSteps: ProcessStep[];
  infoCardsHeading?: string;
  infoCards?: InfoCard[];
  faqHeading: string;
  faqs: ServiceFaq[];
  relatedSlugs: string[];
}

export const servicesData: Record<string, ServiceData> = {
  "student-visas": {
    slug: "student-visas",
    navLabel: "Student Visas",
    seoTitle: "Student Visa Australia (Subclass 500)",
    seoDescription:
      "Expert help with Australian Student Visa (Subclass 500) applications — eligibility, Genuine Student requirement, CoE, and lodgement by MARA-registered agents.",
    heroTitle: "Australian Student Visa (Subclass 500)",
    heroSubtitle:
      "For international students enrolling in a registered Australian course — from English language programs to PhDs. Most applications are decided within four to ten weeks.",
    overviewHeading: "What is the Student Visa (Subclass 500)?",
    overviewParagraphs: [
      "The Subclass 500 visa lets you live in Australia for the duration of your study — up to five years — at a school, English language college, TAFE, vocational provider, or university registered on CRICOS.",
      "Visa holders can generally work up to 48 hours per fortnight while their course is in session, and unlimited hours during scheduled breaks. Your spouse or de facto partner and dependent children can usually be included in your application.",
      "The most common reason student visas are refused is failing to satisfy the Genuine Student requirement — convincing the Department that study is your genuine primary purpose. Getting this right the first time is where professional preparation makes the biggest difference.",
    ],
    requirementsHeading: "Key Requirements",
    requirements: [
      "Confirmation of Enrolment (CoE) from a CRICOS-registered education provider",
      "English language proficiency (IELTS, PTE, TOEFL, or an approved equivalent)",
      "Genuine Student (GS) requirement — evidence study is your primary purpose",
      "Health insurance (OSHC) plus health and character checks",
      "Financial capacity to cover tuition, living costs, and travel",
    ],
    processHeading: "How We Help You Get Your Student Visa",
    processSteps: [
      {
        title: "Initial Consultation",
        description: "A free session to understand your study goals, background, and any risk factors in your case.",
      },
      {
        title: "Eligibility Assessment",
        description: "We confirm you meet the Subclass 500 criteria and plan around the Genuine Student requirement.",
      },
      {
        title: "Document Preparation",
        description: "We compile your CoE, financial evidence, GS statement, and supporting documents to a decision-ready standard.",
      },
      {
        title: "Application Lodgement",
        description: "We lodge your application, respond to any Departmental requests, and track progress until decision.",
      },
      {
        title: "Grant & Pre-Departure Support",
        description: "Once granted, we brief you on visa conditions, work rights, and what to expect on arrival.",
      },
    ],
    infoCardsHeading: "Where You Can Study",
    infoCards: [
      { icon: <GraduationCapIcon />, title: "Universities", description: "Bachelor's, Master's, and research degrees at all Australian universities." },
      { icon: <BriefcaseIcon />, title: "TAFE & VET", description: "Practical, career-focused diplomas and certificates nationwide." },
      { icon: <GlobeIcon />, title: "English Language", description: "ELICOS programs from beginner through to academic English." },
      { icon: <SchoolIcon />, title: "Schools", description: "Primary and secondary schooling for younger students." },
    ],
    faqHeading: "Student Visa FAQs",
    faqs: [
      {
        question: "How long does student visa processing take?",
        answer:
          "Most complete applications are decided within four to ten weeks, though times vary by sector and country of application. Lodging a complete, well-documented application is the best way to avoid delays.",
      },
      {
        question: "Can I work on a student visa?",
        answer:
          "Yes — generally up to 48 hours per fortnight while your course is in session, and unlimited hours during scheduled course breaks. Work conditions are printed on your visa grant.",
      },
      {
        question: "Can my family come with me?",
        answer:
          "Your spouse or de facto partner and dependent children can usually be included as secondary applicants. They receive work and study rights subject to conditions.",
      },
      {
        question: "What is the Genuine Student requirement?",
        answer:
          "It replaced the old GTE criterion. You must show that studying in Australia is your genuine primary purpose, with a credible study plan that makes sense given your background, finances, and career goals. We help you prepare a persuasive, truthful GS statement.",
      },
      {
        question: "How much money do I need to show?",
        answer:
          "You must demonstrate access to funds covering 12 months of living costs (set by the Department and indexed regularly), plus tuition and travel. The exact figure depends on whether family members are included.",
      },
      {
        question: "Can I extend my stay after graduating?",
        answer:
          "Many graduates move to a Temporary Graduate (485) visa for post-study work, and from there to skilled or employer-sponsored pathways. We can map your long-term plan from day one.",
      },
    ],
    relatedSlugs: ["education-consulting", "partner-family-visas", "employer-sponsored"],
  },

  "skilled-migration": {
    slug: "skilled-migration",
    navLabel: "Skilled Migration",
    seoTitle: "Skilled Migration Australia (189, 190, 491)",
    seoDescription:
      "Points-tested skilled migration to Australia — subclasses 189, 190, and 491. Skills assessments, EOI strategy, and state nomination handled by MARA-registered agents.",
    heroTitle: "Skilled Migration to Australia",
    heroSubtitle:
      "Permanent residency pathways for skilled professionals through the points-tested subclasses 189, 190, and 491 — with or without a job offer.",
    overviewHeading: "What is Skilled Migration?",
    overviewParagraphs: [
      "Australia's General Skilled Migration (GSM) program selects workers whose occupations are in demand. It's points-tested: age, English, work experience, qualifications, and other factors all earn points, and higher scores receive invitations sooner.",
      "The three main visas are the Skilled Independent (189) — permanent residency with no sponsor required; the Skilled Nominated (190) — permanent residency with state or territory nomination; and the Skilled Work Regional (491) — a five-year regional visa with a pathway to permanent residency.",
      "Success depends on strategy as much as eligibility: choosing the right occupation, securing a positive skills assessment, maximising your points claim honestly, and targeting the states most likely to nominate your profession.",
    ],
    requirementsHeading: "Key Requirements",
    requirements: [
      "Occupation on the relevant skilled occupation list",
      "Positive skills assessment from the assessing authority for your occupation",
      "Competent English or higher (with points for Proficient and Superior)",
      "Points score at or above the invitation threshold (minimum 65)",
      "Under 45 years of age at invitation, plus health and character checks",
    ],
    processHeading: "Your Skilled Migration Journey With Us",
    processSteps: [
      {
        title: "Initial Consultation",
        description: "Free assessment of your occupation, points score, and realistic pathway options.",
      },
      {
        title: "Skills Assessment",
        description: "We prepare and lodge your skills assessment with the correct assessing authority.",
      },
      {
        title: "Expression of Interest",
        description: "We lodge a strategically targeted EOI in SkillSelect and pursue state nomination where it strengthens your case.",
      },
      {
        title: "Visa Application",
        description: "On invitation, we compile evidence for every points claim and lodge your application.",
      },
      {
        title: "Grant & Settlement Support",
        description: "We confirm your conditions and first-entry obligations, and plan any next steps to citizenship.",
      },
    ],
    infoCardsHeading: "Points-Tested Visa Options",
    infoCards: [
      { icon: <GlobeIcon />, title: "Skilled Independent (189)", description: "Permanent residency, live anywhere in Australia, no sponsor needed." },
      { icon: <BuildingIcon />, title: "Skilled Nominated (190)", description: "Permanent residency with nomination from a state or territory." },
      { icon: <SchoolIcon />, title: "Skilled Work Regional (491)", description: "Five-year regional visa with a permanent residency pathway via 191." },
      { icon: <BriefcaseIcon />, title: "Graduate Pathways (485)", description: "Post-study work rights that build points toward skilled visas." },
    ],
    faqHeading: "Skilled Migration FAQs",
    faqs: [
      {
        question: "How many points do I need?",
        answer:
          "The legal minimum is 65, but invitations are competitive — many occupations require 80–90+ for a 189. State nomination (190/491) adds 5 or 15 points respectively, which is often the difference between waiting and receiving an invitation.",
      },
      {
        question: "What is a skills assessment?",
        answer:
          "An evaluation by your occupation's assessing authority (e.g. Engineers Australia, ACS, VETASSESS) confirming your qualifications and experience match the Australian standard for the role. It's mandatory before invitation and often the longest step.",
      },
      {
        question: "Do I need a job offer?",
        answer:
          "No. GSM visas are not employer-sponsored — you're selected on your points score and occupation. If you do have an Australian job offer, an employer-sponsored visa may be faster; we'll compare both at your consultation.",
      },
      {
        question: "How long does the process take?",
        answer:
          "Realistically 12–24 months end to end: a few months for the skills assessment, a variable wait for invitation depending on your score, then several months of visa processing after lodgement.",
      },
      {
        question: "I'm over 45 — do I have options?",
        answer:
          "Points-tested visas close at 45, but employer-sponsored, business, and family pathways may remain open. Book a consultation and we'll review every alternative honestly.",
      },
      {
        question: "Can my family be included?",
        answer:
          "Yes — your partner and dependent children can be included in your application and receive the same permanent residency rights. A skilled partner can even add points to your score.",
      },
    ],
    relatedSlugs: ["employer-sponsored", "student-visas", "partner-family-visas"],
  },

  "partner-family-visas": {
    slug: "partner-family-visas",
    navLabel: "Partner & Family Visas",
    seoTitle: "Partner & Family Visas Australia",
    seoDescription:
      "Partner (820/801, 309/100), Prospective Marriage (300), parent, and child visa applications prepared by MARA-registered agents.",
    heroTitle: "Partner & Family Visas",
    heroSubtitle:
      "Reunite with the people who matter most. We prepare partner, parent, and child visa applications with the evidence depth these high-scrutiny visas demand.",
    overviewHeading: "Bringing Your Family to Australia",
    overviewParagraphs: [
      "Family visas let Australian citizens, permanent residents, and eligible New Zealand citizens sponsor their partner, children, or parents to live in Australia.",
      "Partner visas (820/801 onshore, 309/100 offshore) are the most common — and among the most scrutinised. The Department examines the financial, social, household, and commitment aspects of your relationship in detail. Strong, well-organised evidence is everything.",
      "Parent visas range from lengthy-queue non-contributory options to faster contributory visas, while child and prospective marriage (fiancé) visas each have their own criteria. We help you choose the right option and present an application that answers the Department's questions before they're asked.",
    ],
    requirementsHeading: "Key Requirements (Partner Visas)",
    requirements: [
      "Married or in a de facto relationship with an eligible sponsor (or engaged, for the 300 visa)",
      "Evidence across all four pillars: financial, household, social, and commitment",
      "Sponsor approval, including police checks for the sponsoring partner",
      "Health and character requirements for all applicants",
      "Genuine and continuing relationship — assessed over the life of the application",
    ],
    processHeading: "How We Manage Your Family Visa",
    processSteps: [
      {
        title: "Initial Consultation",
        description: "Free, confidential discussion of your relationship or family situation and the right visa option.",
      },
      {
        title: "Evidence Planning",
        description: "A personalised evidence checklist covering all four relationship pillars — built around what you already have.",
      },
      {
        title: "Document Preparation",
        description: "Statements, statutory declarations, and supporting documents drafted and reviewed by your agent.",
      },
      {
        title: "Lodgement & Monitoring",
        description: "We lodge, manage Departmental correspondence, and keep your evidence current during processing.",
      },
      {
        title: "Grant & Next Stages",
        description: "For two-stage visas we manage the move from provisional to permanent at the right time.",
      },
    ],
    infoCardsHeading: "Family Visa Types",
    infoCards: [
      { icon: <HeartIcon />, title: "Partner (820/801)", description: "Onshore two-stage visa for spouses and de facto partners." },
      { icon: <GlobeIcon />, title: "Partner (309/100)", description: "Offshore two-stage partner visa lodged outside Australia." },
      { icon: <SchoolIcon />, title: "Parent Visas", description: "Contributory and non-contributory options for parents of settled Australians." },
      { icon: <BookIcon />, title: "Child & Fiancé", description: "Child (101/802) and Prospective Marriage (300) visas." },
    ],
    faqHeading: "Partner & Family Visa FAQs",
    faqs: [
      {
        question: "How long do partner visas take?",
        answer:
          "Most partner visa applications are decided within 12–30 months. The provisional stage (820/309) carries full work and study rights while you wait, and the permanent stage follows about two years from lodgement.",
      },
      {
        question: "What counts as a de facto relationship?",
        answer:
          "Generally living together (or not living apart permanently) in a genuine relationship for at least 12 months before applying — though registering your relationship in an Australian state can waive the 12-month rule.",
      },
      {
        question: "What evidence do we need?",
        answer:
          "The Department looks at four pillars: finances (joint accounts, shared expenses), household (living arrangements), social (how others see your relationship), and commitment (future plans, time together). We build a checklist specific to your circumstances.",
      },
      {
        question: "Can I work while my partner visa is processing?",
        answer:
          "Onshore applicants receive a bridging visa, which normally carries full work rights once your current visa expires. Offshore applicants must wait for the visa grant before moving.",
      },
      {
        question: "My relationship is genuine but unconventional. Will that hurt us?",
        answer:
          "Not if it's presented properly. Long-distance periods, cultural differences in cohabitation, and private relationships are all manageable with honest, well-framed evidence and statements. This is exactly where experienced preparation helps.",
      },
      {
        question: "How do parent visa queues work?",
        answer:
          "Non-contributory parent visas currently have queues measured in decades. Contributory parent visas (143/173, 864/884) cost significantly more but are processed in years instead. We'll talk through both honestly, including temporary alternatives like the 870 sponsored parent visa.",
      },
    ],
    relatedSlugs: ["student-visas", "skilled-migration", "employer-sponsored"],
  },

  "employer-sponsored": {
    slug: "employer-sponsored",
    navLabel: "Employer Sponsored",
    seoTitle: "Employer Sponsored Visas Australia (482, 186, 494)",
    seoDescription:
      "Employer-sponsored visa services for Australian businesses and skilled workers — Skills in Demand (482), ENS (186), and regional (494) visas.",
    heroTitle: "Employer Sponsored Visas",
    heroSubtitle:
      "For Australian businesses that need skilled workers, and for professionals with an Australian job offer. We act for sponsors and applicants alike.",
    overviewHeading: "Sponsoring Skilled Workers in Australia",
    overviewParagraphs: [
      "When Australian employers can't find the skills they need locally, the employer-sponsored program lets them sponsor overseas workers — temporarily through the Skills in Demand (482) visa, or permanently through the Employer Nomination Scheme (186) and regional 494 visa.",
      "Sponsorship is a three-stage process: the business becomes an approved sponsor, nominates a position and salary that meet market-rate and income-threshold rules, and the worker applies for the visa against that nomination.",
      "We work with both sides of the equation — keeping businesses compliant with sponsorship obligations, and giving visa applicants certainty that their nomination and application are built to approve.",
    ],
    requirementsHeading: "Key Requirements",
    requirements: [
      "Approved Standard Business Sponsorship for the employing business",
      "Nominated occupation on the applicable skilled occupation list",
      "Salary meeting the Skills in Demand income thresholds and market rates",
      "Relevant skills, qualifications, and (for most streams) work experience",
      "English language, health, and character requirements",
    ],
    processHeading: "The Sponsorship Process, Managed End to End",
    processSteps: [
      {
        title: "Strategy Consultation",
        description: "Free assessment for employers and candidates: the right visa stream, realistic timing, and costs.",
      },
      {
        title: "Sponsorship Approval",
        description: "We prepare the business's Standard Business Sponsorship application and compliance framework.",
      },
      {
        title: "Nomination",
        description: "Position, salary benchmarking, and labour market testing documented to Departmental standards.",
      },
      {
        title: "Visa Application",
        description: "The candidate's skills, English, and experience evidenced and lodged against the nomination.",
      },
      {
        title: "Compliance & PR Planning",
        description: "Ongoing sponsor obligation support and transition planning from 482 to permanent residency.",
      },
    ],
    infoCardsHeading: "Employer Sponsored Visa Types",
    infoCards: [
      { icon: <BriefcaseIcon />, title: "Skills in Demand (482)", description: "Temporary sponsorship for up to four years with PR pathways." },
      { icon: <BuildingIcon />, title: "ENS (186)", description: "Direct permanent residency for nominated skilled workers." },
      { icon: <GlobeIcon />, title: "Regional (494)", description: "Five-year regional sponsorship with a 191 PR pathway." },
      { icon: <SchoolIcon />, title: "Training (407)", description: "Occupational training placements with Australian organisations." },
    ],
    faqHeading: "Employer Sponsored Visa FAQs",
    faqs: [
      {
        question: "How long does the 482 process take?",
        answer:
          "With a complete application, sponsorship, nomination, and visa can often be approved within two to four months — sometimes faster for accredited sponsors. We sequence the three stages to minimise total time.",
      },
      {
        question: "What does sponsorship cost a business?",
        answer:
          "Government charges include the sponsorship application fee, nomination fee, and the Skilling Australians Fund levy (scaled by business size and visa length). We provide a complete cost schedule upfront, including which costs the law requires the employer to pay.",
      },
      {
        question: "Can a 482 visa lead to permanent residency?",
        answer:
          "Yes. Most 482 holders can transition to the permanent 186 visa after two years with their sponsor, and time toward PR has become more flexible under the Skills in Demand framework.",
      },
      {
        question: "What are sponsor obligations?",
        answer:
          "Approved sponsors must pay market salary rates, keep records, notify the Department of certain events, and not recover sponsorship costs from the worker. We set up a simple compliance calendar so nothing is missed.",
      },
      {
        question: "Can I change employers on a 482 visa?",
        answer:
          "Yes, but your new employer must lodge — and have approved — a new nomination before you start. Recent rules give 482 holders more time between employers than before; we manage the transition so you stay compliant.",
      },
      {
        question: "We're a startup. Can we still sponsor?",
        answer:
          "New businesses can be approved sponsors, though the Department looks harder at financial viability and the genuineness of the role. Strong documentation matters — this is a case where preparation really pays.",
      },
    ],
    relatedSlugs: ["skilled-migration", "student-visas", "partner-family-visas"],
  },

  "new-zealand-visas": {
    slug: "new-zealand-visas",
    navLabel: "New Zealand Visas",
    seoTitle: "New Zealand Visa Consultants Australia | Student, Skilled & Work Visas",
    seoDescription:
      "Expert guidance on New Zealand visas — student visas, Skilled Migrant Category, Essential Skills work visas, and resident visas. Advice from Australian-based international migration consultants.",
    heroTitle: "New Zealand Visa Services",
    heroSubtitle:
      "Planning to study, work, or settle in New Zealand? Our internationally experienced consultants guide you through New Zealand's immigration pathways — from student visas to permanent residency.",
    overviewHeading: "Why Choose New Zealand?",
    overviewParagraphs: [
      "New Zealand offers world-class education, a strong job market, and one of the most liveable environments on the planet. Its immigration system, managed by Immigration New Zealand (INZ), uses a points-based Skilled Migrant Category alongside dedicated student, work, and resident visa streams.",
      "For many clients, New Zealand is either a complementary pathway alongside Australian immigration or the primary destination of choice. Its smaller population means skilled occupations see faster processing, and the pathway from temporary work to permanent residency is often more direct than comparable Australian streams.",
      "Because our team works across both Australian and New Zealand immigration contexts, we can map out the full picture — including how choices in one country may affect your options in the other — and give you advice that accounts for both.",
    ],
    requirementsHeading: "Key Requirements (vary by visa type)",
    requirements: [
      "Valid passport from an eligible country",
      "Evidence of funds, health insurance, and accommodation (student/visitor visas)",
      "Job offer or skills assessment for work and skilled resident categories",
      "English language proficiency (IELTS, PTE, or equivalent — varies by stream)",
      "Health and character checks (police clearances, chest X-ray where required)",
      "For skilled residence: points score under the Skilled Migrant Category (SMC)",
    ],
    processHeading: "How We Help With Your New Zealand Visa",
    processSteps: [
      {
        title: "Free Consultation",
        description: "We assess your eligibility across NZ visa streams and flag how NZ fits alongside any Australian plans.",
      },
      {
        title: "Pathway Selection",
        description: "We identify the right visa — student, Essential Skills, SMC, or resident — based on your goals, occupation, and timeline.",
      },
      {
        title: "Document Preparation",
        description: "Complete preparation of your application, supporting statements, and evidence to INZ's standard.",
      },
      {
        title: "Lodgement & Follow-Up",
        description: "We lodge via the INZ online system, manage any Requests for Information, and track progress.",
      },
      {
        title: "Grant & Next Steps",
        description: "On grant, we advise on arrival conditions, post-study or work rights, and your pathway to permanent residence.",
      },
    ],
    infoCardsHeading: "New Zealand Visa Options",
    infoCards: [
      { icon: <GraduationCapIcon />, title: "Student Visa", description: "Study at New Zealand universities, polytechnics, and schools on a fee-paying student visa." },
      { icon: <BriefcaseIcon />, title: "Essential Skills Work Visa", description: "Temporary work visa for roles where employers cannot find NZ residents for the job." },
      { icon: <GlobeIcon />, title: "Skilled Migrant Category", description: "Points-based pathway to NZ permanent residency for skilled professionals." },
      { icon: <HeartIcon />, title: "Partner & Family", description: "Partner of a New Zealander or resident? We handle partnership-based resident applications too." },
    ],
    faqHeading: "New Zealand Visa FAQs",
    faqs: [
      {
        question: "Can Australians move to New Zealand freely?",
        answer:
          "Yes — Australian citizens and permanent residents have the right to live and work in New Zealand indefinitely under the Trans-Tasman Travel Arrangement. However, they are not automatically NZ residents, which matters for some entitlements. If you're planning NZ residency for family members who aren't Australian, you'll still need to go through INZ.",
      },
      {
        question: "How does the Skilled Migrant Category work?",
        answer:
          "The SMC is a points-tested ballot. You submit an Expression of Interest (EOI) to a pool, and INZ selects the highest-scoring applicants regularly. Points are awarded for age, skilled employment in NZ, qualifications, and partner qualifications. Invitations to apply for residence follow selection from the pool.",
      },
      {
        question: "Can I study in New Zealand and then work?",
        answer:
          "Yes. Most students who complete a degree-level qualification in NZ are eligible for a Post-Study Work visa of 1–3 years, similar in concept to Australia's Temporary Graduate (485) visa. This is a strong platform toward skilled residence.",
      },
      {
        question: "Is NZ immigration faster than Australia?",
        answer:
          "For certain occupations — particularly healthcare, engineering, and trades — NZ can have shorter wait times for skilled categories. Processing times change frequently; we compare current timeframes at your consultation.",
      },
      {
        question: "Can you help with NZ immigration if we're based in Australia?",
        answer:
          "Yes. We advise NZ-bound clients from our Australian offices. Many of our clients pursue both Australia and NZ options simultaneously, or use NZ as a stepping stone. We can map both pathways in a single consultation.",
      },
      {
        question: "What is the difference between a work visa and a resident visa in NZ?",
        answer:
          "Work visas are temporary — they're tied to an employer or sector and have an expiry date. Resident visas give you the right to live, work, and study in NZ indefinitely. The SMC, some work-to-residence pathways, and family-based streams all lead to resident visas.",
      },
    ],
    relatedSlugs: ["skilled-migration", "student-visas", "employer-sponsored"],
  },

  "german-opportunity-card": {
    slug: "german-opportunity-card",
    navLabel: "German Opportunity Card",
    seoTitle: "German Opportunity Card (Chancenkarte) | Expert Visa Guidance",
    seoDescription:
      "Interested in Germany's Chancenkarte (Opportunity Card)? Our consultants guide skilled professionals through eligibility, points scoring, and application for Germany's new job-seeking visa.",
    heroTitle: "German Opportunity Card (Chancenkarte)",
    heroSubtitle:
      "Germany's new points-based job-seeker visa lets skilled professionals live in Germany for up to one year to find work — without a job offer. We guide you through every step of the application.",
    overviewHeading: "What Is the German Opportunity Card?",
    overviewParagraphs: [
      "The Chancenkarte (Opportunity Card) was introduced by Germany in June 2024 under the Skilled Immigration Act reforms. It's designed to attract qualified workers from outside the EU by letting them enter Germany to search for work — for up to one year — without needing a job offer upfront.",
      "The visa operates on a points system. Applicants are scored on qualifications, professional experience, language skills, age, and prior connection to Germany. You need either a recognised German or equivalent qualification that scores enough points, or a professionally recognised qualification from your home country combined with at least two years of relevant experience, to be eligible.",
      "During the year on the Opportunity Card, holders can work up to 20 hours per week in any job while continuing their job search in their primary field. When you receive a qualifying job offer, you can convert directly to a skilled worker visa without leaving Germany.",
    ],
    requirementsHeading: "Eligibility Requirements",
    requirements: [
      "Recognised university degree or vocational qualification (must be recognised or recognisable in Germany)",
      "Minimum 2 years of relevant professional experience in the past 5 years",
      "Basic German language skills (A1 level) or recognised English proficiency (B2+)",
      "Sufficient financial means for the stay (approx. €1,027/month or blocked account)",
      "Valid passport and clean criminal record",
      "Points score: typically 6+ points via the scoring matrix (qualifications, language, age, Germany connection, spouse qualifications)",
    ],
    processHeading: "How We Guide You Through the Chancenkarte",
    processSteps: [
      {
        title: "Eligibility Assessment",
        description: "We assess your qualifications, experience, language level, and points score to confirm whether the Chancenkarte is the right pathway for you.",
      },
      {
        title: "Qualification Recognition",
        description: "Many non-EU qualifications need an equivalency assessment. We coordinate this through anabin, ENIC-NARIC, or the relevant authority for your profession.",
      },
      {
        title: "Document Preparation",
        description: "We prepare your full application package: financial proof, qualification documents, language certificates, employment history, and personal statement.",
      },
      {
        title: "German Embassy Lodgement",
        description: "We guide you through lodging at the German embassy or consulate in your country of residence, including appointment booking and interview preparation.",
      },
      {
        title: "Arrival & Job-Search Support",
        description: "Once in Germany, we connect you with job-search resources and advise on converting your Opportunity Card to a full skilled worker visa when you receive an offer.",
      },
    ],
    infoCardsHeading: "How the Points System Works",
    infoCards: [
      { icon: <GraduationCapIcon />, title: "Qualifications (up to 4 pts)", description: "Recognised degree or vocational qualification — with bonus points for STEM fields and Germany-specific qualifications." },
      { icon: <GlobeIcon />, title: "Language Skills (up to 2 pts)", description: "German B2+ earns 2 points. German A2/B1 or English B2 earns 1 point. A1 is the minimum for eligibility." },
      { icon: <BriefcaseIcon />, title: "Professional Experience (up to 2 pts)", description: "2–5 years earns 1 point. More than 5 years of qualified experience earns 2 points." },
      { icon: <BuildingIcon />, title: "Other Factors (up to 3 pts)", description: "Age under 35 (+1), previous stay in Germany (+1), spouse also qualifies (+1). Most applicants need 6 points to qualify." },
    ],
    faqHeading: "German Opportunity Card FAQs",
    faqs: [
      {
        question: "Do I need a job offer to apply?",
        answer:
          "No — that's the defining feature of the Chancenkarte. You enter Germany to find work. This is unlike the standard skilled worker visa (Fachkräftevisum), which requires a specific job offer from a German employer before you apply.",
      },
      {
        question: "Can I work while on the Opportunity Card?",
        answer:
          "Yes, but only up to 20 hours per week in any job (i.e. not necessarily in your skilled field) while you search. Once you secure a qualifying job offer in your occupation, you apply to convert to a full skilled worker visa and can work full-time.",
      },
      {
        question: "What qualifications does Germany recognise?",
        answer:
          "German universities and vocational qualifications are automatically recognised. Foreign qualifications are assessed for equivalency — the process and authority depend on your profession. Regulated professions (medicine, law, engineering in some states) require formal recognition; others may be assessed more quickly. We manage this for you.",
      },
      {
        question: "How much money do I need to show?",
        answer:
          "You must demonstrate you can support yourself without working full-time. The standard approach is a German blocked account (Sperrkonto) with approximately €12,324 (12 months × €1,027), which is released monthly. Alternatively, a formal commitment from a person in Germany or sufficient savings documented by bank statements may be accepted.",
      },
      {
        question: "How long does the application take?",
        answer:
          "German embassy processing times vary significantly by country — from a few weeks to several months. The qualification recognition step is often the longest part of the preparation. We recommend starting 4–6 months before your intended travel date.",
      },
      {
        question: "Can I bring my family?",
        answer:
          "Yes. Spouses and minor children can accompany Opportunity Card holders to Germany. A qualifying spouse also adds 1 point to your score. Family members may work up to 10 hours per week while you're on the Opportunity Card.",
      },
      {
        question: "What happens after I find a job?",
        answer:
          "Once you receive a qualifying job offer in your skilled occupation, your employer files the relevant paperwork and you apply to convert your Opportunity Card to a Skilled Worker Visa (Fachkräftevisum) without leaving Germany. From there, after a qualifying work period, you can apply for permanent residence (Niederlassungserlaubnis) or the EU long-term resident permit.",
      },
    ],
    relatedSlugs: ["skilled-migration", "employer-sponsored", "education-consulting"],
  },

  "education-consulting": {
    slug: "education-consulting",
    navLabel: "Education Consulting",
    seoTitle: "Education Consulting for International Students",
    seoDescription:
      "Course selection, university and TAFE admissions, scholarships, and enrolment support for international students choosing to study in Australia.",
    heroTitle: "Education Consulting",
    heroSubtitle:
      "The right course at the right institution changes everything — your career, your costs, and your visa pathway. We help you choose well, then handle the admissions process.",
    overviewHeading: "More Than Admissions — A Study Strategy",
    overviewParagraphs: [
      "Choosing where and what to study in Australia is a bigger decision than most students realise. Course choice affects your tuition costs, your post-study work rights, your eligibility for skilled migration, and ultimately your career.",
      "Our education consultants work with universities, TAFEs, and colleges across Australia. We match you to institutions based on your goals and budget — not on whoever pays the highest commission — and we tell you honestly when a cheaper or better pathway exists.",
      "Because we're also a registered migration agency, your study plan and your visa strategy are designed together. That integration is what most education agents can't offer.",
    ],
    requirementsHeading: "What We Help With",
    requirements: [
      "Course and institution selection matched to career and migration goals",
      "Admission applications, including portfolios and statements of purpose",
      "Scholarship identification and applications",
      "Credit transfer, RPL, and package offers (e.g. English + degree)",
      "CoE issuance and everything needed for your student visa",
    ],
    processHeading: "From First Chat to First Day of Class",
    processSteps: [
      {
        title: "Goals Consultation",
        description: "Free session on your career goals, budget, and whether migration is part of your long-term plan.",
      },
      {
        title: "Course Shortlist",
        description: "A personalised shortlist of courses and institutions with honest pros, cons, and total costs.",
      },
      {
        title: "Applications & Offers",
        description: "We prepare and submit your admission applications and negotiate any conditions on offers.",
      },
      {
        title: "Acceptance & CoE",
        description: "Offer acceptance, tuition deposit guidance, OSHC arrangement, and CoE issuance.",
      },
      {
        title: "Visa & Pre-Departure",
        description: "Seamless handover to our migration team for your student visa, plus pre-departure briefing.",
      },
    ],
    infoCardsHeading: "Institutions We Work With",
    infoCards: [
      { icon: <GraduationCapIcon />, title: "Universities", description: "Group of Eight and quality universities Australia-wide." },
      { icon: <BriefcaseIcon />, title: "TAFE & VET", description: "Government and private vocational providers." },
      { icon: <GlobeIcon />, title: "English Colleges", description: "ELICOS centres for general and academic English." },
      { icon: <SchoolIcon />, title: "Schools", description: "Primary and secondary schools accepting international students." },
    ],
    faqHeading: "Education Consulting FAQs",
    faqs: [
      {
        question: "How much do your education consulting services cost?",
        answer:
          "For most students, nothing — like most education agents we're paid commission by institutions. Unlike most agents, we disclose this openly and recommend based on fit, including institutions that pay us nothing.",
      },
      {
        question: "Can you help me change courses or providers?",
        answer:
          "Yes. Course transfers have visa implications — especially within the first 12 months of your principal course — so it's important to get advice before you act. We handle the education and immigration sides together.",
      },
      {
        question: "Which courses help with permanent residency?",
        answer:
          "Courses aligned to occupations on the skilled lists — nursing, engineering, trades, early childhood education, and others — can support later skilled visa applications. We design study plans with that endgame in mind, while being honest that lists change.",
      },
      {
        question: "Do you help with scholarships?",
        answer:
          "Yes. Many Australian institutions offer international scholarships of 10–50% of tuition. We identify what you're competitive for and prepare your applications.",
      },
      {
        question: "Can I study if I'm already in Australia?",
        answer:
          "In most cases yes — visitors, working holiday makers, and current students can often apply for a new student visa onshore. Conditions on your current visa matter, so we check those first.",
      },
      {
        question: "What is a packaged offer?",
        answer:
          "A combined enrolment — for example English language study followed by a diploma and then a degree — under one CoE package. It can secure a longer visa and a clearer pathway; we arrange these regularly.",
      },
    ],
    relatedSlugs: ["student-visas", "skilled-migration", "employer-sponsored"],
  },
};

export const serviceSummaries = [
  {
    slug: "student-visas",
    title: "Student Visas",
    description:
      "Study at Australia's world-class universities, TAFEs, and schools with expert guidance on the Subclass 500 visa.",
  },
  {
    slug: "skilled-migration",
    title: "Skilled Migration",
    description:
      "Points-tested pathways to permanent residency for skilled professionals — subclasses 189, 190, and 491.",
  },
  {
    slug: "partner-family-visas",
    title: "Partner & Family Visas",
    description:
      "Reunite with the people who matter most. Partner, parent, and child visa applications handled with care.",
  },
  {
    slug: "employer-sponsored",
    title: "Employer Sponsored",
    description:
      "Sponsorship, nomination, and visa support for Australian businesses and the skilled workers they need.",
  },
  {
    slug: "education-consulting",
    title: "Education Consulting",
    description:
      "Course and institution selection, enrolment, and admission support for international students.",
  },
  {
    slug: "new-zealand-visas",
    title: "New Zealand Visas",
    description:
      "Student, work, and skilled resident visas for New Zealand — advised by internationally experienced migration consultants.",
  },
  {
    slug: "german-opportunity-card",
    title: "German Opportunity Card",
    description:
      "Germany's Chancenkarte lets skilled professionals enter without a job offer. We handle qualification recognition and the full application.",
  },
];
