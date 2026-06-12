import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/layout/PageHero";
import { CTABanner } from "@/components/layout/CTABanner";
import { TeamMemberCard } from "@/components/cards/TeamMemberCard";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";
import { teamMembers } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Apple Education & Immigration is a MARA-registered migration agency with 15+ years of experience helping students, professionals, and families build their Australian future.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Honesty first",
    body: "If a pathway isn't realistic for you, we say so — before you spend a cent. Our advice is grounded in what decision-makers actually approve.",
  },
  {
    title: "Plain English",
    body: "Migration law is complicated; our advice isn't. We translate legislation into clear steps, timelines, and costs.",
  },
  {
    title: "Personal service",
    body: "You work with the same agent from first consultation to visa grant. No call centres, no handoffs, no chasing for updates.",
  },
  {
    title: "Professional standards",
    body: "As MARA-registered agents we follow a strict Code of Conduct, hold professional indemnity insurance, and complete ongoing professional development.",
  },
];

const milestones = [
  { year: "2011", event: "Founded in Sydney as a two-person education consultancy" },
  { year: "2014", event: "MARA registration and expansion into full migration services" },
  { year: "2018", event: "500th visa granted; skilled migration practice established" },
  { year: "2022", event: "Partnerships with 40+ Australian education providers" },
  { year: "2026", event: "1,200+ visas granted across every major visa class" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Apple Education & Immigration"
        subtitle="A MARA-registered migration agency helping people build their Australian future since 2011."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      <Section size="lg" bg="default">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Kicker>Our Story</Kicker>
            <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-tight text-slate-900">
              Built on a Simple Idea: Migration Advice People Can Trust
            </h2>
            <div className="mt-6 space-y-4 text-slate-600">
              <p>
                Apple Education &amp; Immigration began in 2011 helping international students
                find the right course in Australia. We quickly saw the same problem again and
                again: people making life-changing decisions based on confusing, conflicting, or
                simply wrong information.
              </p>
              <p>
                So we became registered migration agents and built the agency we wished our
                clients had found first — one that explains options honestly, charges fixed fees
                disclosed upfront, and treats every application as if it were our own.
              </p>
              <p>
                Fifteen years and more than 1,200 visa grants later, that idea still drives
                everything we do. From student visas to skilled migration to family reunion, our
                team manages the entire journey under one roof.
              </p>
            </div>
          </div>
          <div>
            <h3 className="sr-only">Company milestones</h3>
            <ol className="relative space-y-8 border-l-2 border-accent/40 pl-8">
              {milestones.map((m) => (
                <li key={m.year} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[41px] flex size-5 items-center justify-center rounded-full border-2 border-accent bg-slate-50"
                  />
                  <span className="text-xl font-semibold tabular-nums text-accent">{m.year}</span>
                  <p className="text-slate-600">{m.event}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section size="lg" bg="navy" aria-label="Our values">
        <Container>
          <Kicker>What We Stand For</Kicker>
          <h2 className="mt-3 max-w-2xl text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-tight text-white">
            The Values Behind Every Application We Lodge
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="flex gap-4">
                <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <CheckIcon />
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-white">{v.title}</h3>
                  <p className="mt-1 text-off-white/80">{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section size="lg" bg="white" aria-label="Our team">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Kicker>Meet the Team</Kicker>
              <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-tight text-slate-900">
                The People Behind Your Application
              </h2>
            </div>
            <Button href="/team" variant="ghost" iconRight={<ArrowRightIcon />}>
              View Full Team
            </Button>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.name} {...member} />
            ))}
          </div>
        </Container>
      </Section>

      <Section size="md" bg="surface" aria-label="Registration details">
        <Container size="prose" className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Registered. Insured. Accountable.</h2>
          <p className="mt-4 text-slate-600">
            {site.name} operates under MARN {site.marn}, regulated by the Office of the
            Migration Agents Registration Authority. Read our full disclosure statement,
            including our complaints procedure and your rights as a client.
          </p>
          <Button href="/mara-disclosure" variant="secondary" className="mt-6">
            Read Our MARA Disclosure
          </Button>
        </Container>
      </Section>

      <CTABanner variant="red" />
    </>
  );
}
