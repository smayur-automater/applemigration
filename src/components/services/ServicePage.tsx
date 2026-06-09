import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CTABanner } from "@/components/layout/CTABanner";
import { MaraDisclaimer } from "@/components/layout/MaraDisclaimer";
import { ServiceCard } from "@/components/cards/ServiceCard";
import {
  ArrowRightIcon,
  BookIcon,
  BriefcaseIcon,
  BuildingIcon,
  GraduationCapIcon,
  HeartIcon,
  MailIcon,
  PhoneIcon,
} from "@/components/ui/icons";
import { servicesData, serviceSummaries, type ServiceData } from "@/lib/services-data";
import { site } from "@/lib/site";

const serviceIcons: Record<string, React.ReactNode> = {
  "student-visas": <GraduationCapIcon />,
  "skilled-migration": <BriefcaseIcon />,
  "partner-family-visas": <HeartIcon />,
  "employer-sponsored": <BuildingIcon />,
  "education-consulting": <BookIcon />,
};

export function ServicePage({ service }: { service: ServiceData }) {
  return (
    <>
      {/* Section 1 — PageHero with MARA strip */}
      <div className="bg-navy py-14 text-white sm:py-20">
        <Container>
          <div className="mb-6">
            <Breadcrumb
              light
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: service.navLabel },
              ]}
            />
          </div>
          <div className="max-w-[680px]">
            <h1 className="font-display text-[clamp(2.25rem,5vw,3.25rem)] font-bold leading-tight text-white">
              {service.heroTitle}
            </h1>
            <p className="mt-4 text-lg text-white/85">{service.heroSubtitle}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href="/book" variant="gold" size="lg" fullWidthMobile>
                Book a Free Consultation
              </Button>
              <Button href="/eligibility-check" variant="ghost-light" size="lg" fullWidthMobile>
                Check Your Eligibility
              </Button>
            </div>
            <MaraDisclaimer className="mt-8" />
          </div>
        </Container>
      </div>

      {/* Section 2 — Overview with sticky sidebar */}
      <Section size="lg" bg="default">
        <Container className="grid gap-12 lg:grid-cols-[60%_1fr]">
          <div>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-navy">
              {service.overviewHeading}
            </h2>
            <div className="mt-6 space-y-4 text-charcoal/85">
              {service.overviewParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <h2 className="mt-12 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-navy">
              {service.requirementsHeading}
            </h2>
            <ol className="mt-6 space-y-4">
              {service.requirements.map((req, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold font-semibold text-navy">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-charcoal/85">{req}</span>
                </li>
              ))}
            </ol>
          </div>

          <aside>
            <div className="rounded-lg bg-white p-8 shadow-md lg:sticky lg:top-[calc(var(--header-h)+16px)]">
              <h3 className="text-xl font-semibold text-navy">Get Expert Help</h3>
              <p className="mt-2 text-sm text-charcoal/80">
                Speak with a registered migration agent about your situation — free, with no
                obligation.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <Button href="/book" className="w-full">
                  Book a Free Consultation
                </Button>
                <Button href="/eligibility-check" variant="secondary" className="w-full">
                  Check Your Eligibility
                </Button>
              </div>
              <hr className="my-6 border-border" />
              <div className="space-y-3 text-sm">
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-2 font-medium text-navy transition-colors duration-(--duration-fast) hover:text-gold-dark"
                >
                  <PhoneIcon className="size-4" />
                  {site.phone}
                </a>
                <a
                  href={site.emailHref}
                  className="flex items-center gap-2 font-medium text-navy transition-colors duration-(--duration-fast) hover:text-gold-dark"
                >
                  <MailIcon className="size-4" />
                  {site.email}
                </a>
              </div>
              <MaraDisclaimer variant="inline" className="mt-6" />
            </div>
          </aside>
        </Container>
      </Section>

      {/* Section 3 — Process steps */}
      <Section size="lg" bg="white" aria-label="Our process">
        <Container>
          <h2 className="text-center font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-navy">
            {service.processHeading}
          </h2>
          <ol className="mt-14 grid gap-10 md:grid-cols-5 md:gap-4">
            {service.processSteps.map((step, i) => (
              <li key={i} className="relative flex gap-5 md:flex-col md:gap-0 md:text-center">
                {i < service.processSteps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-6 top-12 h-[calc(100%-1rem)] w-0.5 bg-border md:left-[calc(50%+2rem)] md:top-6 md:h-0.5 md:w-[calc(100%-4rem)]"
                  />
                )}
                <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-gold font-display text-lg font-bold text-navy md:mx-auto">
                  {i + 1}
                </span>
                <div className="md:mt-4">
                  <h3 className="font-semibold text-navy">{step.title}</h3>
                  <p className="mt-1 text-sm text-charcoal/75">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Section 4 — Info card grid */}
      {service.infoCards && (
        <Section size="lg" bg="surface" aria-label={service.infoCardsHeading}>
          <Container>
            <h2 className="text-center font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-navy">
              {service.infoCardsHeading}
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {service.infoCards.map((card) => (
                <div key={card.title} className="rounded-lg bg-white p-6 shadow-sm">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-surface text-navy" aria-hidden="true">
                    {card.icon}
                  </div>
                  <h3 className="font-semibold text-navy">{card.title}</h3>
                  <p className="mt-1 text-sm text-charcoal/75">{card.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Section 5 — FAQs */}
      <Section size="lg" bg="default" aria-label="Frequently asked questions">
        <Container size="prose">
          <h2 className="text-center font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-navy">
            {service.faqHeading}
          </h2>
          <div className="mt-10">
            <Accordion items={service.faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
          </div>
        </Container>
      </Section>

      {/* Section 6 — Related services */}
      <Section size="lg" bg="white" aria-label="Related services">
        <Container>
          <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-navy">
            You Might Also Need
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.relatedSlugs.map((slug) => {
              const related = serviceSummaries.find((s) => s.slug === slug);
              if (!related) return null;
              return (
                <ServiceCard
                  key={slug}
                  icon={serviceIcons[slug]}
                  title={related.title}
                  description={related.description}
                  href={`/services/${slug}`}
                />
              );
            })}
          </div>
        </Container>
      </Section>

      {/* MARA disclaimer above footer */}
      <div className="bg-off-white">
        <Container className="pb-8">
          <MaraDisclaimer variant="inline" />
        </Container>
      </div>

      {/* Section 7 — CTA Banner */}
      <CTABanner variant="gold" />
    </>
  );
}

export { serviceIcons, servicesData };
