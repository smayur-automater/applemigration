import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

interface CTABannerProps {
  variant?: "dark" | "light" | "red" | "navy";
  heading?: string;
  subtext?: string;
}

export function CTABanner({
  variant = "dark",
  heading = "Ready to Take the Next Step?",
  subtext = "Speak with a MARA-registered agent today — no commitment, no jargon.",
}: CTABannerProps) {
  const isDark = variant === "dark" || variant === "navy" || variant === "red";

  return (
    <section className={isDark ? "bg-slate-900 py-16" : "bg-slate-50 py-16 border-y border-slate-200"}>
      <Container>
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className={`text-2xl font-semibold tracking-tight sm:text-3xl ${isDark ? "text-white" : "text-slate-900"}`}>
              {heading}
            </h2>
            <p className={`mt-2 text-[15px] leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              {subtext}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link
              href="/book"
              className="inline-flex h-10 items-center gap-2 rounded-md bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Book a Free Consultation
              <ArrowRight size={14} strokeWidth={2} />
            </Link>
            <a
              href={site.phoneHref}
              className={`inline-flex h-10 items-center gap-2 rounded-md px-5 text-sm font-medium transition-colors ${
                isDark
                  ? "border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"
                  : "border border-slate-200 text-slate-600 hover:bg-white hover:text-slate-900"
              }`}
            >
              <Phone size={14} strokeWidth={2} />
              {site.phone}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
