import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/layout/PageHero";
import { MaraDisclaimer } from "@/components/layout/MaraDisclaimer";
import { ContactForm } from "@/components/forms/ContactForm";
import { CalendarIcon, MailIcon, PhoneIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Apple Education & Immigration. We respond within 1 business day. Phone, email, or send us a message online.",
  alternates: { canonical: "/contact" },
};

const altMethods = [
  {
    icon: <PhoneIcon className="size-6" />,
    label: "Phone",
    value: site.phone,
    href: site.phoneHref,
  },
  {
    icon: <MailIcon className="size-6" />,
    label: "Email",
    value: site.email,
    href: site.emailHref,
  },
  {
    icon: <CalendarIcon className="size-6" />,
    label: "Book Online",
    value: "Schedule a free consultation",
    href: "/book",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Get in Touch"
        subtitle="We respond within 1 business day."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <Section size="lg" bg="default">
        <Container className="grid gap-12 lg:grid-cols-[60%_1fr]">
          <div>
            <h2 className="mb-6 text-2xl font-semibold text-slate-900">Send Us a Message</h2>
            <ContactForm />
          </div>

          <aside>
            <div className="rounded-lg bg-white p-8 shadow-sm lg:sticky lg:top-[calc(var(--header-h)+16px)]">
              <h3 className="text-xl font-semibold text-slate-900">Contact Information</h3>
              <address className="mt-4 space-y-3 text-sm not-italic text-slate-600">
                <p>
                  <a
                    href={site.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 transition-colors duration-(--duration-fast) hover:text-accent-hover"
                  >
                    {site.address}
                  </a>
                </p>
                <p>
                  <a href={site.phoneHref} className="font-medium text-slate-900 hover:text-accent-hover">
                    {site.phone}
                  </a>
                </p>
                <p>
                  <a href={site.emailHref} className="font-medium text-slate-900 hover:text-accent-hover">
                    {site.email}
                  </a>
                </p>
              </address>

              <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-900">
                Business Hours
              </h3>
              <table className="mt-2 w-full text-sm text-slate-600">
                <tbody>
                  {site.hours.map((row) => (
                    <tr key={row.days}>
                      <th scope="row" className="py-1 pr-4 text-left font-medium">
                        {row.days}
                      </th>
                      <td className="py-1">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-900">
                Emergency / After Hours
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                For urgent visa matters (e.g. imminent visa expiry), email us with
                &ldquo;URGENT&rdquo; in the subject line and we&rsquo;ll respond as soon as
                possible.
              </p>

              <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-900">
                Office Location
              </h3>
              <iframe
                title="Office location map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`}
                className="mt-2 aspect-[4/3] w-full rounded-md border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <MaraDisclaimer variant="inline" className="mt-6" />
            </div>
          </aside>
        </Container>
      </Section>

      <Section size="md" bg="white" aria-label="Other ways to contact us">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            {altMethods.map((m) => (
              <Link
                key={m.label}
                href={m.href}
                className="flex flex-col items-center gap-2 rounded-lg border border-slate-200 p-8 text-center transition-[box-shadow,transform] duration-(--duration-base) hover:border-slate-300 hover:shadow-sm"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-900">
                  {m.icon}
                </span>
                <span className="font-semibold text-slate-900">{m.label}</span>
                <span className="text-sm text-slate-500">{m.value}</span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
