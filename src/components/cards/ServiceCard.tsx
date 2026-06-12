import Link from "next/link";
import { useId } from "react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  tag?: string;
}

export function ServiceCard({ icon, title, description, href, tag }: ServiceCardProps) {
  const titleId = useId();
  return (
    <article
      aria-labelledby={titleId}
      className="group relative flex flex-col rounded-lg border border-slate-200 bg-white p-6 transition-[box-shadow,border-color] duration-(--duration-base) hover:border-slate-300 hover:shadow-md"
    >
      <div className="mb-4 flex size-10 items-center justify-center rounded-md bg-accent-light text-accent" aria-hidden="true">
        {icon}
      </div>
      {tag && (
        <span className="mb-3 self-start rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
          {tag}
        </span>
      )}
      <h3 id={titleId} className="mb-2 text-base font-semibold text-slate-900">
        <Link href={href} className="after:absolute after:inset-0">
          {title}
        </Link>
      </h3>
      <p className="mb-4 flex-1 text-sm text-slate-500 leading-relaxed">{description}</p>
      <span className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors group-hover:text-accent-hover">
        Learn more
        <svg aria-hidden="true" className="size-3.5 transition-transform duration-(--duration-fast) group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
        </svg>
      </span>
    </article>
  );
}
