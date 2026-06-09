import Link from "next/link";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  displayDate?: string;
  slug: string;
  category: string;
  readTime: string;
}

export function BlogCard({ title, excerpt, date, displayDate, slug, category, readTime }: BlogCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-shadow duration-(--duration-base) hover:shadow-lg">
      <div
        aria-hidden="true"
        className="flex h-44 items-center justify-center overflow-hidden bg-navy"
      >
        <span className="font-display text-4xl text-gold/60 transition-transform duration-(--duration-base) group-hover:scale-[1.03]">
          Aa
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-2 text-xs text-charcoal/60">
          <span className="rounded-sm bg-surface px-2 py-0.5 font-semibold text-navy">{category}</span>
          <time dateTime={date}>{displayDate ?? date}</time>
          <span aria-hidden="true">·</span>
          <span>{readTime}</span>
        </div>
        <h3 className="mb-2 text-lg font-semibold leading-snug text-navy">
          <Link
            href={`/blog/${slug}`}
            aria-label={`Read article: ${title}`}
            className="after:absolute after:inset-0"
          >
            {title}
          </Link>
        </h3>
        <p className="text-sm text-charcoal/80">{excerpt}</p>
      </div>
    </article>
  );
}
