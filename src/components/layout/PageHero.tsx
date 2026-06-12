import { Container } from "@/components/ui/Container";
import { Breadcrumb, type Crumb } from "@/components/layout/Breadcrumb";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Crumb[];
  children?: React.ReactNode;
}

export function PageHero({ title, subtitle, breadcrumbs, children }: PageHeroProps) {
  return (
    <div className="bg-slate-900 py-14 text-white sm:py-20">
      <Container>
        {breadcrumbs && (
          <div className="mb-6">
            <Breadcrumb items={breadcrumbs} light />
          </div>
        )}
        <div className="max-w-[600px]">
          <h1 className="font-display text-[clamp(2.25rem,5vw,3.25rem)] font-bold leading-tight text-white">
            {title}
          </h1>
          {subtitle && <p className="mt-4 text-lg text-white/85">{subtitle}</p>}
          {children}
        </div>
      </Container>
    </div>
  );
}
