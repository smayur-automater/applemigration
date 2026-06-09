import { maraDisclaimerText, site } from "@/lib/site";

interface MaraDisclaimerProps {
  variant?: "strip" | "inline";
  className?: string;
}

export function MaraDisclaimer({ variant = "strip", className = "" }: MaraDisclaimerProps) {
  if (variant === "inline") {
    return (
      <p
        aria-label="MARA registration and legal disclaimer"
        className={`text-xs text-charcoal/60 ${className}`}
      >
        {site.name} | MARN {site.marn} | Registered Migration Agent. {maraDisclaimerText}
      </p>
    );
  }
  return (
    <div
      aria-label="MARA registration and legal disclaimer"
      className={`border-l-4 border-gold bg-white/10 py-3 pl-4 pr-4 text-sm ${className}`}
    >
      {site.name} is a registered migration agency. MARN {site.marn}. Migration advice on this
      page is general in nature and does not constitute personal migration advice.
    </div>
  );
}
