import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CTABanner } from "@/components/layout/CTABanner";
import { MaraDisclaimer } from "@/components/layout/MaraDisclaimer";
import { ServiceCard } from "@/components/cards/ServiceCard";
import {
  BookIcon,
  BriefcaseIcon,
  BuildingIcon,
  GlobeIcon,
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
  "new-zealand-visas": <GlobeIcon />,
  "german-opportunity-card": <BriefcaseIcon />,
};

export function ServicePage({ service }: { service: ServiceData }) {
  return (
    <>
      {/* Hero */}
      <div className="bg-slate-900 py-14 text-white sm:py-20">
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
            <h1 className="text-[clamp(2.25rem,5vw,3.25rem)] font-semibold leading-tight tracking-tight text-white">
              {service.heroTitle}
            </h1>
            <p className="mt-4 text-[17px] leading-relaxed text-slate-300">{service.heroSubtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/book" variant="primary" size="lg" fullWidthMobile>
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

      {/* Overview + sticky sidebar */}
      <Section size="lg" bg="default">
        <Container className="grid gap-12 lg:grid-cols-[60%_1fr]">
          <div>
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-tight text-slate-900">
              {service.overviewHeading}
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-slate-600">
              {service.overviewParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <h2 className="mt-12 text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-tight text-slate-900">
              {service.requirementsHeading}
            </h2>
            <ol className="mt-6 space-y-4">
              {service.requirements.map((req, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded border border-slate-200 bg-white text-[13px] font-semibold tabular-nums text-slate-500">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-[15px] leading-relaxed text-slate-600">{req}</span>
                </li>
              ))}
            </ol>
          </div>

          <aside>
            <div className="rounded-lg border border-slate-200 bg-white p-7 lg:sticky lg:top-[calc(var(--header-h)+16px)]">
              <h3 className="text-[15px] font-semibold text-slate-900">Get Expert Help</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
                Speak with a registered migration agent about your situation — free, with no obligation.
              </p>
              <div className="mt-5 flex flex-col gap-2.5">
                <Button href="/book" className="w-full" size="sm">
                  Book a Free Consultation
                </Button>
                <Button href="/eligibility-check" variant="secondary" className="w-full" size="sm">
                  Check Your Eligibility
                </Button>
              </div>
              <hr className="my-5 border-slate-100" />
              <div className="space-y-2.5 text-[13px]">
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-2 text-slate-600 transition-colors hover:text-slate-900"
                >
                  <PhoneIcon className="size-3.5 shrink-0 text-slate-400" />
                  {site.phone}
                </a>
                <a
                  href={site.emailHref}
                  className="flex items-center gap-2 text-slate-600 transition-colors hover:text-slate-900"
                >
                  <MailIcon className="size-3.5 shrink-0 text-slate-400" />
                  {site.email}
                </a>
              </div>
              <MaraDisclaimer variant="inline" className="mt-5" />
            </div>
          </aside>
        </Container>
      </Section>

      {/* Process steps */}
      <Section size="lg" bg="white" aria-label="Our process">
        <Container>
          <h2 className="text-center text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-tight text-slate-900">
            {service.processHeading}
          </h2>
          <ol className="mt-14 grid gap-10 md:grid-cols-5 md:gap-4">
            {service.processSteps.map((step, i) => (
              <li key={i} className="relative flex gap-5 md:flex-col md:gap-0 md:text-center">
                {i < service.processSteps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-6 top-12 h-[calc(100%-1rem)] w-px bg-slate-200 md:left-[calc(50%+2rem)] md:top-6 md:h-px md:w-[calc(100%-4rem)]"
                  />
                )}
                <span className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-[13px] font-semibold tabular-nums text-slate-500 md:mx-auto">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="md:mt-4">
                  <h3 className="text-[13px] font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Info card grid */}
      {service.infoCards && (
        <Section size="lg" bg="default" aria-label={service.infoCardsHeading}>
          <Container>
            <h2 className="text-center text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-tight text-slate-900">
              {service.infoCardsHeading}
            </h2>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {service.infoCards.map((card) => (
                <div key={card.title} className="rounded-md border border-slate-200 bg-white p-5">
                  <div className="mb-3 flex size-9 items-center justify-center rounded border border-slate-200 text-slate-500" aria-hidden="true">
                    {card.icon}
                  </div>
                  <h3 className="text-[13px] font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{card.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* FAQs */}
      <Section size="lg" bg="white" aria-label="Frequently asked questions">
        <Container size="prose">
          <h2 className="text-center text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-tight text-slate-900">
            {service.faqHeading}
          </h2>
          <div className="mt-10">
            <Accordion items={service.faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
          </div>
        </Container>
      </Section>

      {/* Related services */}
      <Section size="lg" bg="default" aria-label="Related services">
        <Container>
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-tight text-slate-900">
            You Might Also Need
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* MARA disclaimer */}
      <div className="border-t border-slate-100 bg-slate-50">
        <Container className="py-6">
          <MaraDisclaimer variant="inline" />
        </Container>
      </div>

      {/* CTA Banner */}
      <CTABanner variant="dark" />
    </>
  );
}

export { serviceIcons, servicesData };
