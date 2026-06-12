interface TestimonialCardProps {
  quote: string;
  name: string;
  visa: string;
  country: string;
  flag?: string;
  rating: number;
}

export function TestimonialCard({ quote, name, visa, country, flag, rating }: TestimonialCardProps) {
  return (
    <figure
      aria-label={`Testimonial from ${name}`}
      className="flex h-full flex-col gap-5 rounded-md border border-slate-200 bg-white p-6"
    >
      {/* Rating dots — understated, not cartoon stars */}
      <div
        role="img"
        aria-label={`Rated ${rating} out of 5`}
        className="flex items-center gap-1"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`block size-1.5 rounded-full ${i < rating ? "bg-accent" : "bg-slate-200"}`}
          />
        ))}
        <span className="ml-1.5 text-xs text-slate-400">{rating}.0 / 5</span>
      </div>

      <blockquote className="flex-1 text-[14px] leading-relaxed text-slate-600">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <figcaption className="flex items-center gap-3 border-t border-slate-100 pt-4">
        <span
          aria-hidden="true"
          className="flex size-8 shrink-0 items-center justify-center rounded bg-slate-100 text-xs font-semibold text-slate-700"
        >
          {name.charAt(0)}
        </span>
        <div>
          <span className="block text-[13px] font-semibold text-slate-900">{name}</span>
          <span className="block text-xs text-slate-400">
            {visa} &middot; {flag ? `${flag} ` : ""}{country}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}
