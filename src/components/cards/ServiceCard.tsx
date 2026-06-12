import Link from "next/link";
import { useId } from "react";
import { ArrowRight } from "lucide-react";

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
      className="group relative flex flex-col rounded-md border border-slate-200 bg-white p-6 transition-[border-color,box-shadow] duration-150 hover:border-slate-300 hover:shadow-sm"
    >
      <div
        className="mb-4 flex size-9 items-center justify-center rounded border border-slate-200 text-slate-600"
        aria-hidden="true"
      >
        {icon}
      </div>

      {tag && (
        <span className="mb-3 self-start rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
          {tag}
        </span>
      )}

      <h3 id={titleId} className="mb-2 text-[15px] font-semibold text-slate-900">
        <Link href={href} className="after:absolute after:inset-0">
          {title}
        </Link>
      </h3>

      <p className="mb-5 flex-1 text-[13px] leading-relaxed text-slate-500">{description}</p>

      <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-accent transition-colors group-hover:text-accent-hover">
        Learn more
        <ArrowRight
          size={13}
          strokeWidth={2}
          className="transition-transform duration-150 group-hover:translate-x-0.5"
        />
      </span>
    </article>
  );
}
