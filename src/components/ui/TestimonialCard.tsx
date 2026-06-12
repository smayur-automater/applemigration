interface TestimonialCardProps {
  quote: string;
  name: string;
  visa: string;
  country: string;
  rating?: number;
  initials?: string;
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      className="w-4 h-4"
      fill={filled ? "#D4A843" : "#E5E7EB"}
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export function TestimonialCard({
  quote,
  name,
  visa,
  country,
  rating = 5,
  initials,
}: TestimonialCardProps) {
  return (
    <figure
      role="figure"
      aria-label={`Testimonial from ${name}`}
      className="bg-white rounded-2xl p-6 shadow-sm flex flex-col"
    >
      <div
        className="flex gap-0.5 mb-4"
        role="img"
        aria-label={`Rated ${rating} out of 5 stars`}
      >
        {[...Array(5)].map((_, i) => (
          <Star key={i} filled={i < rating} />
        ))}
      </div>
      <blockquote className="text-gray-600 text-sm leading-relaxed mb-5 flex-1">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
          style={{ backgroundColor: "var(--color-deep-navy)" }}
          aria-hidden="true"
        >
          {initials ?? name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
        </div>
        <div>
          <p
            className="text-sm font-semibold"
            style={{ color: "var(--color-deep-navy)" }}
          >
            {name}
          </p>
          <p className="text-xs text-gray-400">
            {country} · {visa}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

export type { TestimonialCardProps };
