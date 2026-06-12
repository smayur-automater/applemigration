import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ServiceCard } from "@/components/cards/ServiceCard";
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
    icon: <GraduationCapIcon className="size-4" />,
    title: "Student Visas",
    description:
      "Subclass 500 student visas for universities, TAFEs, and schools. We manage the application from start to finish.",
    href: "/services/student-visas",
  },
  {
    icon: <BriefcaseIcon className="size-4" />,
    title: "Skilled Migration",
    description:
      "Points-tested pathways to permanent residency — subclasses 189, 190, and 491 — for qualified professionals.",
    href: "/services/skilled-migration",
  },
  {
    icon: <HeartIcon className="size-4" />,
    title: "Partner & Family Visas",
    description:
      "Partner, parent, and child visa applications. We handle the complexity so families can focus on each other.",
    href: "/services/partner-family-visas",
  },
  {
    icon: <BuildingIcon className="size-4" />,
    title: "Employer Sponsored",
    description:
      "TSS 482, ENS 186, and RSMS sponsorship for Australian businesses and the skilled workers they need.",
    href: "/services/employer-sponsored",
  },
  {
    icon: <BookIcon className="size-4" />,
    title: "Education Consulting",
    description:
      "Course selection, institution placement, enrolment support, and COE coordination for international students.",
    href: "/services/education-consulting",
  },
];

const whyUs = [
  {
    title: "MARA Registered",
    body: "All advice is provided by agents registered with the Office of the Migration Agents Registration Authority (OMARA). Compliant, accountable, and legally authorised.",
  },
  {
    title: "Transparent Fees",
    body: "Fixed-fee service agreements provided upfront. No hourly billing, no surprise invoices — you know exactly what you will pay before we start.",
  },
  {
    title: "End-to-End Management",
    body: "From eligibility assessment through document preparation, lodgement, and Departmental correspondence — one team manages your entire case.",
  },
  {
    title: "15+ Years Experience",
    body: "We have navigated every major policy shift since 2009. Our understanding of how the Department assesses cases today is built on thousands of successful outcomes.",
  },
];

const stats = [
  { value: "1,200+", label: "Visas Granted" },
  { value: "15+",    label: "Years Experience" },
  { value: "98%",    label: "Client Satisfaction" },
  { value: "30+",    label: "Countries Represented" },
];

const accreditations = [
  "MARA Registered",
  "PIER Certified",
  "QEAC Member",
  "Migration Institute of Australia",
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="bg-slate-900 py-20 sm:py-28" id="main-content">
        <Container>
          <div className="grid items-start gap-16 lg:grid-cols-[1fr_360px]">

            {/* Left — Headline + CTAs */}
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
                Registered Migration Agent · MARN {site.marn}
              </p>
              <h1 className="text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.1] tracking-tight text-white">
                Australian Visa &amp; Education{" "}
                <span className="text-slate-400">Specialists</span>
              </h1>
              <p className="mt-5 max-w-[520px] text-[15px] leading-relaxed text-slate-400">
                From student visas to skilled migration and family reunification — we turn complex
                immigration requirements into a clear, managed process. MARA-registered, fixed fees,
                end-to-end support.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/book" variant="primary" size="lg">
                  Book a Free Consultation
                </Button>
                <Button
                  href="/eligibility-check"
                  variant="ghost-light"
                  size="lg"
                  iconRight={<ArrowRightIcon className="size-4" />}
                >
                  Check Eligibility
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-slate-800 pt-10 sm:grid-cols-4">
                {stats.map(({ value, label }) => (
                  <div key={label}>
                    <p className="text-xl font-semibold text-white">{value}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Accreditation + service list card */}
            <div className="hidden lg:block">
              <div className="rounded-md border border-slate-700 bg-slate-800/60 p-6">
                <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Accreditations
                </p>
                <ul className="space-y-2.5">
                  {accreditations.map((a) => (
                    <li key={a} className="flex items-center gap-2.5 text-[13px] text-slate-400">
                      <span className="flex size-4 shrink-0 items-center justify-center rounded-sm border border-slate-600 text-accent">
                        <CheckIcon className="size-2.5" />
                      </span>
                      {a}
                    </li>
                  ))}
                </ul>

                <div className="my-5 border-t border-slate-700" />

                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Visa Services
                </p>
                <ul className="space-y-2">
                  {services.map((s) => (
                    <li key={s.href}>
                      <Link
                        href={s.href}
                        className="flex items-center justify-between text-[13px] text-slate-400 transition-colors hover:text-slate-200"
                      >
                        {s.title}
                        <ArrowRight size={11} strokeWidth={2} className="text-slate-600" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* ── Accreditation bar ───────────────────────────────── */}
      <div className="border-b border-slate-200 bg-white py-4">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
            {[...accreditations, "Education Agent Partner"].map((label) => (
              <span
                key={label}
                className="text-[11px] font-semibold uppercase tracking-widest text-slate-400"
              >
                {label}
              </span>
            ))}
          </div>
        </Container>
      </div>

      {/* ── Services ────────────────────────────────────────── */}
      <Section size="lg" bg="white" aria-label="Our services">
        <Container>
          <div className="mb-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
              What We Do
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Expert Guidance Across All Australian Visa Pathways
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] text-slate-500">
              Whichever pathway fits your goals, our registered agents manage the entire
              process — assessment, documents, lodgement, and Departmental correspondence.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.href} {...s} />
            ))}
          </div>
          <div className="mt-6">
            <Button
              href="/services"
              variant="secondary"
              iconRight={<ArrowRightIcon className="size-4" />}
            >
              View All Services
            </Button>
          </div>
        </Container>
      </Section>

      {/* ── Why Choose Us ───────────────────────────────────── */}
      <Section size="lg" bg="default" aria-label="Why choose us">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
                Why Us
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                We Know the System — and We Work It for You
              </h2>
              <p className="mt-3 text-[15px] text-slate-500">
                The Australian immigration system is complex and frequently updated. Our team provides
                clear, compliant, and practical advice backed by over 15 years of registered practice.
              </p>
              <ul className="mt-8 space-y-6">
                {whyUs.map((item, i) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="mt-0.5 shrink-0 text-xs font-semibold tabular-nums text-slate-400">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="text-[15px] font-semibold text-slate-900">{item.title}</h3>
                      <p className="mt-1 text-[14px] leading-relaxed text-slate-500">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button href="/book" variant="primary">
                  Book a Free Consultation
                </Button>
              </div>
            </div>

            {/* Right — stat grid */}
            <div className="hidden lg:flex lg:flex-col lg:justify-center">
              <div className="grid grid-cols-2 gap-4">
                {stats.map(({ value, label }) => (
                  <div key={label} className="rounded-md border border-slate-200 bg-white p-6">
                    <p className="text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
                    <p className="mt-1 text-[13px] text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-400">
                Registered with OMARA · {site.name} · MARN {site.marn}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Eligibility strip ───────────────────────────────── */}
      <div className="border-y border-slate-200 bg-white py-10">
        <Container>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                Free · 3 Minutes · No Account Required
              </p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-900">
                Which Australian Visa Is Right for You?
              </h2>
              <p className="mt-1 text-[14px] text-slate-500">
                Answer a few questions — we&rsquo;ll show you the pathways that match your situation.
              </p>
            </div>
            <Button
              href="/eligibility-check"
              variant="primary"
              iconRight={<ArrowRightIcon className="size-4" />}
              className="shrink-0"
            >
              Check Your Eligibility
            </Button>
          </div>
        </Container>
      </div>

      {/* ── Testimonials ────────────────────────────────────── */}
      <Section size="lg" bg="default" aria-label="Client testimonials">
        <Container>
          <div className="mb-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
              Client Outcomes
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Real People, Real Results
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
          <div className="mt-6">
            <Button
              href="/success-stories"
              variant="secondary"
              iconRight={<ArrowRightIcon className="size-4" />}
            >
              View All Success Stories
            </Button>
          </div>
        </Container>
      </Section>

      {/* ── Blog Preview ────────────────────────────────────── */}
      <Section size="lg" bg="white" aria-label="Latest articles">
        <Container>
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Latest Insights
            </h2>
            <Link
              href="/blog"
              className="hidden items-center gap-1.5 text-[13px] font-medium text-accent transition-colors hover:text-accent-hover sm:inline-flex"
            >
              All Articles <ArrowRight size={12} strokeWidth={2} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <CTABanner variant="dark" />
    </>
  );
}
