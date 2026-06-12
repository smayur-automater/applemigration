import Link from "next/link";
import { Card, PageHeader } from "@/components/ui";
import { getCourses, getProviders } from "@/lib/data";
import { humanise } from "@/lib/format";

export const metadata = { title: "Universities & Providers" };

export default async function UniversitiesPage() {
  const [providers, courses] = await Promise.all([getProviders(), getCourses()]);
  return (
    <>
      <PageHeader
        title="Universities & Providers"
        subtitle="Partner institutions, their CRICOS registrations and commission schedules."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {providers.map((provider) => {
          const providerCourses = courses.filter((c) => c.providerId === provider.id);
          return (
            <Card key={provider.id}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <Link
                    href={`/universities/${provider.id}`}
                    className="font-semibold text-navy hover:underline"
                  >
                    {provider.name}
                  </Link>
                  <p className="text-xs text-charcoal/60">
                    {humanise(provider.type)} · {provider.city} · CRICOS {provider.cricosCode}
                  </p>
                </div>
                <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-bold text-gold">
                  {provider.commissionPct}%
                </span>
              </div>
              <p className="mt-3 text-sm text-charcoal/70">
                {providerCourses.length} course{providerCourses.length === 1 ? "" : "s"} on the books
                {provider.bonusPct
                  ? ` · +${provider.bonusPct}% bonus over ${provider.bonusThreshold} enrolments/yr`
                  : ""}
              </p>
              <Link
                href={`/universities/${provider.id}`}
                className="mt-3 inline-block text-sm font-medium text-sky hover:underline"
              >
                View courses →
              </Link>
            </Card>
          );
        })}
      </div>
    </>
  );
}
