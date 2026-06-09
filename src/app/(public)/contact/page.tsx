import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Apple Education & Immigration — Get in Touch",
  description: "Contact our MARA-registered migration agents. We respond within 1 business day. Phone, email, or book a free consultation online.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20" style={{ backgroundColor: "var(--color-navy)" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm" style={{ color: "rgba(247,245,240,0.6)" }}>
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white">Contact</li>
            </ol>
          </nav>
          <h1 className="font-display font-bold text-white mb-3" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Get in Touch
          </h1>
          <p className="text-lg" style={{ color: "rgba(247,245,240,0.8)" }}>We respond within 1 business day.</p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
            {/* Left — Form */}
            <div>
              <h2 className="font-display font-bold mb-8 text-2xl" style={{ color: "var(--color-navy)" }}>
                Send Us a Message
              </h2>
              <ContactForm />
            </div>

            {/* Right — Contact Details */}
            <div>
              <div
                className="sticky p-8 bg-white rounded-xl"
                style={{ top: "calc(var(--header-h) + 16px)", boxShadow: "var(--shadow-sm)" }}
              >
                <h3 className="font-semibold text-lg mb-6" style={{ color: "var(--color-navy)" }}>Contact Information</h3>

                <div className="space-y-4 text-sm mb-6" style={{ color: "var(--color-charcoal)" }}>
                  <div>
                    <p className="font-medium mb-1" style={{ color: "var(--color-navy)" }}>📍 Address</p>
                    <p>Melbourne Business Centre<br />470 St Kilda Road<br />Melbourne VIC 3004</p>
                    <a
                      href="https://maps.google.com/maps?q=470+St+Kilda+Road+Melbourne+VIC+3004"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs mt-1 inline-block transition-colors duration-150"
                      style={{ color: "var(--color-gold)" }}
                    >
                      View on Google Maps →
                    </a>
                  </div>
                  <div>
                    <p className="font-medium mb-1" style={{ color: "var(--color-navy)" }}>📞 Phone</p>
                    <p><a href="tel:+61480047407" className="hover:underline">Admissions: +61 480 047 407</a></p>
                    <p><a href="tel:+61470519421" className="hover:underline">Migration: +61 470 519 421</a></p>
                  </div>
                  <div>
                    <p className="font-medium mb-1" style={{ color: "var(--color-navy)" }}>✉ Email</p>
                    <p><a href="mailto:team@applemigration.com.au" className="hover:underline break-all">team@applemigration.com.au</a></p>
                    <p><a href="mailto:visa@applemigration.com.au" className="hover:underline break-all">visa@applemigration.com.au</a></p>
                  </div>
                  <div>
                    <p className="font-medium mb-1" style={{ color: "var(--color-navy)" }}>🕐 Business Hours</p>
                    <table className="text-xs w-full">
                      <tbody>
                        <tr><td>Mon – Fri</td><td className="text-right">9:00am – 5:30pm AEST</td></tr>
                        <tr><td>Saturday</td><td className="text-right">By appointment</td></tr>
                        <tr><td>Sunday</td><td className="text-right">Closed</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="border-t pt-6 mb-6" style={{ borderColor: "var(--color-border)" }}>
                  <h3 className="font-semibold text-base mb-2" style={{ color: "var(--color-navy)" }}>Emergency / After Hours</h3>
                  <p className="text-sm" style={{ color: "var(--color-charcoal)" }}>
                    For urgent matters outside business hours, email us and mark the subject "URGENT". We monitor after-hours for time-sensitive visa matters.
                  </p>
                </div>

                {/* Map */}
                <div className="rounded-lg overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <iframe
                    loading="lazy"
                    src="https://maps.google.com/maps?q=470+St+Kilda+Road+Melbourne+VIC+3004&t=m&z=15&output=embed&iwloc=near"
                    title="Apple Education & Immigration — 470 St Kilda Road, Melbourne VIC 3004"
                    className="w-full h-full border-0"
                    aria-label="Map showing office location"
                  />
                </div>

                <p className="mt-4 text-xs" style={{ color: "var(--color-charcoal)", opacity: 0.5 }}>
                  MARN 2318293 | ABN 37 580 471 992 | Registered Migration Agent
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alternate contact methods */}
      <section className="py-16" style={{ backgroundColor: "var(--color-off-white)" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "📞", label: "Call Us", value: "+61 480 047 407", link: "tel:+61480047407" },
              { icon: "✉", label: "Email Us", value: "team@applemigration.com.au", link: "mailto:team@applemigration.com.au" },
              { icon: "📅", label: "Book Online", value: "Free 30-min consultation", link: "/book" },
            ].map((method) => (
              <a
                key={method.label}
                href={method.link}
                className="block p-8 bg-white rounded-xl text-center border transition-all duration-250"
                style={{ borderColor: "var(--color-border)", boxShadow: "var(--shadow-sm)" }}
              >
                <div className="text-4xl mb-4" aria-hidden="true">{method.icon}</div>
                <p className="font-semibold mb-1" style={{ color: "var(--color-navy)" }}>{method.label}</p>
                <p className="text-sm" style={{ color: "var(--color-charcoal)" }}>{method.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
