import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { Section } from "@/components/ui/Section";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { StatCard } from "@/components/cards/StatCard";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { BlogCard } from "@/components/cards/BlogCard";
import { CTABanner } from "@/components/layout/CTABanner";
import {
  ArrowRightIcon,
  BookIcon,
  BriefcaseIcon,
  BuildingIcon,
  CheckIcon,
  GraduationCapIcon,
  HeartIcon,
} from "@/components/ui/icons";
import { blogPosts, testimonials } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Apple Education & Immigration — Australian Visa & Education Experts",
  description:
    "MARA-registered migration agents for student visas, skilled migration, partner and family visas, employer sponsorship, and education consulting. Book a free consultation today.",
};

const services = [
  {
    icon: <GraduationCapIcon />,
    title: "Student Visas",
    description:
      "Study at Australia's world-class universities, TAFEs, and schools with expert guidance on the Subclass 500 visa.",
    href: "/services/student-visas",
  },
  {
    icon: <BriefcaseIcon />,
    title: "Skilled Migration",
    description:
      "Points-tested pathways to permanent residency for skilled professionals — subclasses 189, 190, and 491.",
    href: "/services/skilled-migration",
  },
  {
    icon: <HeartIcon />,
    title: "Partner & Family Visas",
    description:
      "Reunite with the people who matter most. Partner, parent, and child visa applications handled with care.",
    href: "/services/partner-family-visas",
  },
  {
    icon: <BuildingIcon />,
    title: "Employer Sponsored",
    description:
      "Sponsorship, nomination, and visa support for Australian businesses and the skilled workers they need.",
    href: "/services/employer-sponsored",
  },
  {
    icon: <BookIcon />,
    title: "Education Consulting",
    description:
      "Course and institution selection, enrolment, and admission support for international students.",
    href: "/services/education-consulting",
  },
];

const whyUs = [
  {
    title: "MARA Registered Agents",
    body: "Fully registered with the Office of the Migration Agents Registration Authority — compliance and professional standards you can rely on.",
  },
  {
    title: "Plain-English Advice",
    body: "No jargon, no surprises. We explain your options, costs, and realistic chances clearly before you commit to anything.",
  },
  {
    title: "End-to-End Service",
    body: "From your first eligibility assessment through to visa grant and beyond — one team handles your entire journey.",
  },
  {
    title: "15+ Years Australian Immigration Experience",
    body: "We've seen policy change after policy change, and we know how decision-makers assess applications today.",
  },
];

const trustLogos = [
  "MARA Registered",
  "PIER Member",
  "QEAC Certified",
  "Migration Institute of Australia",
  "Education Agent Partner",
];

export default function HomePage() {
  return (
    <>
      {/* Section 1 — Hero */}
      <section className="flex min-h-[100svh] items-center bg-navy py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-[55%_1fr]">
          <div>
            <Kicker>Registered Migration Agent · MARN {site.marn}</Kicker>
            <h1 className="mt-4 font-display text-[clamp(2.75rem,6vw,4rem)] font-bold leading-[1.1] text-white">
              Your Australian Future Starts Here
            </h1>
            <p className="mt-6 max-w-[520px] text-lg text-off-white/90">
              From study to skilled work to family reunion, we turn complex visa requirements
              into a clear plan. Honest advice, fixed fees, and a team that has guided
              thousands to Australia.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href="/book" variant="gold" size="lg" fullWidthMobile>
                Book a Free Consultation
              </Button>
              <Button
                href="/eligibility-check"
                variant="ghost-light"
                size="lg"
                fullWidthMobile
                iconRight={<ArrowRightIcon />}
              >
                Check Your Eligibility
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3">
              <StatCard value="1,200+" label="Visas Granted" />
              <StatCard value="15+" label="Years Experience" />
              <StatCard value="98%" label="Client Satisfaction" />
            </div>
          </div>
          <div className="relative">
            <span aria-hidden="true" className="absolute -left-2 top-6 bottom-6 w-1 bg-gold" />
            <div
              role="img"
              aria-label="A migration agent in consultation with a client, reviewing visa documents together"
              className="flex h-[300px] items-center justify-center rounded-tl-3xl rounded-br-3xl bg-navy-light lg:h-[440px]"
            >
              <svg aria-hidden="true" className="size-40 text-gold/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
                <path d="m9 12 2 2 4-4" strokeWidth="1.2" />
              </svg>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 2 — Trust Bar */}
      <div
        role="complementary"
        aria-label="Accreditations and memberships"
        className="bg-white py-5 shadow-sm"
      >
        <Container className="flex flex-wrap items-center justify-evenly gap-x-8 gap-y-3">
          {trustLogos.map((label) => (
            <span
              key={label}
              className="text-sm font-semibold uppercase tracking-wide text-charcoal/40 transition-colors duration-200 hover:text-navy"
            >
              {label}
            </span>
          ))}
        </Container>
      </div>

      {/* Section 3 — Services Overview */}
      <Section size="lg" bg="default" aria-label="Our services">
        <Container>
          <Kicker>What We Do</Kicker>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-navy">
            Expert Guidance Across All Australian Visa Pathways
          </h2>
          <p className="mt-4 max-w-2xl text-charcoal/80">
            Whichever pathway fits your goals, our registered agents manage the entire process —
            assessment, documents, lodgement, and everything in between.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.href} {...s} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/services" variant="secondary" iconRight={<ArrowRightIcon />}>
              Explore All Services
            </Button>
          </div>
        </Container>
      </Section>

      {/* Section 4 — Why Choose Apple */}
      <Section size="lg" bg="navy" aria-label="Why choose us">
        <Container>
          <Kicker>Why Us</Kicker>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-white">
            We Know the System — and We Work It for You
          </h2>
          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ul className="space-y-8">
              {whyUs.map((item) => (
                <li key={item.title} className="flex gap-4">
                  <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <CheckIcon />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-off-white/80">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div
              role="img"
              aria-label="The Apple Education and Immigration team at work in their Sydney office"
              className="hidden h-[420px] items-center justify-center rounded-xl bg-navy-light lg:flex"
            >
              <svg aria-hidden="true" className="size-36 text-gold/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.9">
                <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                <circle cx="10" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Button href="/book" variant="gold" size="lg">
              Book a Free Consultation
            </Button>
          </div>
        </Container>
      </Section>

      {/* Section 5 — Eligibility Quiz Teaser */}
      <Section size="md" bg="surface" aria-label="Eligibility quiz">
        <Container className="flex max-w-[640px] flex-col items-center gap-4 text-center">
          <Kicker>Find Out in 3 Minutes</Kicker>
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-navy">
            Which Australian Visa Is Right for You?
          </h2>
          <p className="text-charcoal/80">
            Answer a few quick questions and we&rsquo;ll show you the visa pathways that match
            your situation.
          </p>
          <Button
            href="/eligibility-check"
            size="lg"
            fullWidthMobile
            iconRight={<ArrowRightIcon />}
            className="mt-2"
          >
            Check Your Eligibility
          </Button>
          <p className="text-sm text-charcoal/60">No account needed · Takes 3 minutes · Free</p>
        </Container>
      </Section>

      {/* Section 6 — Testimonials */}
      <Section size="lg" bg="white" aria-label="Client testimonials">
        <Container>
          <Kicker>Success Stories</Kicker>
          <h2 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-navy">
            Real People, Real Outcomes
          </h2>
          <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
            {testimonials.slice(0, 3).map((t) => (
              <div key={t.name} className="min-w-[85%] sm:min-w-[60%] md:min-w-0">
                <TestimonialCard {...t} />
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/success-stories" variant="ghost" iconRight={<ArrowRightIcon />}>
              Read More Success Stories
            </Button>
          </div>
        </Container>
      </Section>

      {/* Section 7 — Blog Preview */}
      <Section size="lg" bg="default" aria-label="Latest articles">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-navy">
              Latest Insights
            </h2>
            <Link
              href="/blog"
              className="hidden items-center gap-1 font-semibold text-navy transition-colors duration-(--duration-fast) hover:text-gold-dark sm:inline-flex"
            >
              View All Articles
              <ArrowRightIcon className="size-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
          <div className="mt-10 text-center sm:hidden">
            <Button href="/blog" variant="ghost" iconRight={<ArrowRightIcon />}>
              View All
            </Button>
          </div>
        </Container>
      </Section>

      {/* Section 8 — CTA Banner */}
      <CTABanner variant="gold" />
    </>
  );
}
