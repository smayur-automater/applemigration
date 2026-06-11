import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

interface CTABannerProps {
  variant?: "red" | "light";
  heading?: string;
  subtext?: string;
}

export function CTABanner({
  variant = "red",
  heading = "Ready to Take the Next Step?",
  subtext = "Speak with a MARA-registered agent today — no commitment, no jargon.",
}: CTABannerProps) {
  const isDark = variant === "red";
  return (
    <section className={isDark ? "bg-red py-16" : "bg-red-tint py-16"}>
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2
          className={`font-display text-3xl font-bold sm:text-4xl ${isDark ? "text-white" : "text-navy"}`}
        >
          {heading}
        </h2>
        <p className={`max-w-xl text-lg ${isDark ? "text-white/90" : "text-charcoal"}`}>{subtext}</p>
        <div className="flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
          <Button href="/book" variant={isDark ? "ghost-light" : "primary"} size="lg" fullWidthMobile
            className={isDark ? "border-2 border-white hover:bg-white hover:text-red font-semibold" : ""}>
            Book a Free Consultation
          </Button>
          <Button
            href={site.phoneHref}
            variant="ghost-light"
            size="lg"
            fullWidthMobile
            className={isDark ? "text-white/90 hover:bg-white/15" : "text-red hover:bg-red/10"}
          >
            Call Us Now
          </Button>
        </div>
      </Container>
    </section>
  );
}
