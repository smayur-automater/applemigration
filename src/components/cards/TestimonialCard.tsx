interface TestimonialCardProps {
  quote: string;
  name: string;
  visa: string;
  country: string;
  flag?: string;
  rating: number;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div aria-label={`Rated ${rating} out of 5 stars`} role="img" className="flex gap-0.5 text-gold">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          aria-hidden="true"
          className={`size-5 ${i < rating ? "fill-current" : "fill-border"}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.3 4.04a1 1 0 0 0 .96.69h4.24c.97 0 1.37 1.24.59 1.81l-3.43 2.49a1 1 0 0 0-.36 1.12l1.3 4.04c.3.92-.75 1.69-1.54 1.12l-3.43-2.49a1 1 0 0 0-1.18 0l-3.43 2.49c-.78.57-1.84-.2-1.54-1.12l1.3-4.04a1 1 0 0 0-.36-1.12L2.96 9.47c-.78-.57-.38-1.81.6-1.81h4.23a1 1 0 0 0 .96-.69l1.3-4.04Z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialCard({ quote, name, visa, country, flag, rating }: TestimonialCardProps) {
  return (
    <figure
      aria-label={`Testimonial from ${name}`}
      className="flex h-full snap-start flex-col gap-4 rounded-lg bg-white p-8 shadow-sm"
    >
      <Stars rating={rating} />
      <blockquote className="flex-1 text-charcoal/90">&ldquo;{quote}&rdquo;</blockquote>
      <figcaption className="flex items-center gap-3 border-t border-border pt-4">
        <span
          aria-hidden="true"
          className="flex size-10 items-center justify-center rounded-full bg-navy font-display text-lg font-semibold text-gold"
        >
          {name.charAt(0)}
        </span>
        <span>
          <span className="block font-semibold text-navy">{name}</span>
          <span className="block text-sm text-charcoal/70">
            {visa} · {flag ? `${flag} ` : ""}
            {country}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
