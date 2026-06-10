import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

interface CTABannerProps {
  variant?: "gold" | "navy";
  heading?: string;
  subtext?: string;
}

export function CTABanner({
  variant = "gold",
  heading = "Ready to Take the Next Step?",
  subtext = "Speak with a MARA-registered agent today — no commitment, no jargon.",
}: CTABannerProps) {
  const isGold = variant === "gold";
  return (
    <section className={isGold ? "bg-gold py-16" : "bg-navy py-16"}>
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2
          className={`font-display text-3xl font-bold sm:text-4xl ${isGold ? "text-navy" : "text-white"}`}
        >
          {heading}
        </h2>
        <p className={`max-w-xl text-lg ${isGold ? "text-navy/90" : "text-white/85"}`}>{subtext}</p>
        <div className="flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
          <Button href="/book" variant={isGold ? "primary" : "gold"} size="lg" fullWidthMobile>
            Book a Free Consultation
          </Button>
          <Button
            href={site.phoneHref}
            variant={isGold ? "ghost" : "ghost-light"}
            size="lg"
            fullWidthMobile
            className={isGold ? "text-navy hover:bg-navy/10" : ""}
          >
            Call Us Now
          </Button>
        </div>
      </Container>
    </section>
  );
}
