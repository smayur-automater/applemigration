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
      className="group relative flex flex-col rounded-lg border-b-[3px] border-transparent bg-white p-8 shadow-sm transition-[transform,box-shadow,border-color] duration-(--duration-base) hover:-translate-y-1 hover:border-gold hover:shadow-lg"
    >
      <div className="mb-5 flex size-12 items-center justify-center rounded-lg bg-surface text-navy" aria-hidden="true">
        {icon}
      </div>
      {tag && (
        <span className="mb-2 self-start rounded-sm bg-surface px-2 py-0.5 text-xs text-charcoal/70">
          {tag}
        </span>
      )}
      <h3 id={titleId} className="mb-2 text-xl font-semibold text-navy">
        <Link href={href} className="after:absolute after:inset-0">
          {title}
        </Link>
      </h3>
      <p className="mb-4 flex-1 text-charcoal/80">{description}</p>
      <span className="inline-flex items-center gap-1 font-semibold text-gold-dark transition-colors group-hover:text-navy">
        Learn more
        <svg aria-hidden="true" className="size-4 transition-transform duration-(--duration-fast) group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
        </svg>
      </span>
    </article>
  );
}
