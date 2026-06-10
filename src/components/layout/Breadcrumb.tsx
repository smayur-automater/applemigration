import Link from "next/link";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({ items, light = false }: { items: Crumb[]; light?: boolean }) {
  const base = light ? "text-white/70" : "text-charcoal/60";
  const link = light ? "hover:text-white" : "hover:text-navy";
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-2 text-sm ${base}`}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className={`underline-offset-2 transition-colors duration-(--duration-fast) ${link} hover:underline`}>
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className={light ? "text-white" : "text-navy"}>
                  {item.label}
                </span>
              )}
              {!isLast && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
