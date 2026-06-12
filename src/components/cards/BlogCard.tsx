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
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition-[border-color,box-shadow] duration-(--duration-base) hover:border-slate-300 hover:shadow-sm">
      <div
        aria-hidden="true"
        className="flex h-44 items-center justify-center overflow-hidden bg-slate-900"
      >
        <span className="text-4xl text-accent/60 transition-transform duration-(--duration-base) group-hover:scale-[1.03]">
          Aa
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-2 text-xs text-slate-400">
          <span className="rounded-sm bg-slate-100 px-2 py-0.5 font-semibold text-slate-900">{category}</span>
          <time dateTime={date}>{displayDate ?? date}</time>
          <span aria-hidden="true">·</span>
          <span>{readTime}</span>
        </div>
        <h3 className="mb-2 text-lg font-semibold leading-snug text-slate-900">
          <Link
            href={`/blog/${slug}`}
            aria-label={`Read article: ${title}`}
            className="after:absolute after:inset-0"
          >
            {title}
          </Link>
        </h3>
        <p className="text-sm text-slate-500">{excerpt}</p>
      </div>
    </article>
  );
}
