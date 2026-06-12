import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, PageHeader, Table } from "@/components/ui";
import { getCourses, getProvider } from "@/lib/data";
import { formatMoney, humanise } from "@/lib/format";

export default async function ProviderDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const provider = await getProvider(id);
  if (!provider) notFound();
  const courses = await getCourses(provider.id);

  return (
    <>
      <PageHeader
        title={provider.name}
        subtitle={`${humanise(provider.type)} · ${provider.city}, ${provider.country} · CRICOS ${provider.cricosCode}`}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:max-w-xl">
        <Card>
          <p className="text-xs font-semibold tracking-wider text-charcoal/50 uppercase">Base commission</p>
          <p className="mt-1 font-display text-2xl font-bold text-navy">
            {provider.commissionPct}% <span className="text-sm font-normal text-charcoal/60">of first-year tuition</span>
          </p>
        </Card>
        <Card>
          <p className="text-xs font-semibold tracking-wider text-charcoal/50 uppercase">Volume bonus</p>
          <p className="mt-1 font-display text-2xl font-bold text-navy">
            {provider.bonusPct
              ? `+${provider.bonusPct}%`
              : "—"}
            {provider.bonusPct && (
              <span className="text-sm font-normal text-charcoal/60">
                {" "}over {provider.bonusThreshold} enrolments/yr
              </span>
            )}
          </p>
        </Card>
      </div>

      <h2 className="mb-3 font-semibold text-navy">Courses</h2>
      <Table head={["Course", "Level", "CRICOS", "Duration", "Tuition / yr", "Intakes"]}>
        {courses.map((course) => (
          <tr key={course.id} className="hover:bg-off-white">
            <td className="px-4 py-3 font-medium text-navy">{course.name}</td>
            <td className="px-4 py-3">{humanise(course.level)}</td>
            <td className="px-4 py-3 text-charcoal/60">{course.cricosCode}</td>
            <td className="px-4 py-3">{course.durationMonths} mo</td>
            <td className="px-4 py-3">{formatMoney(course.tuitionPerYear, course.currency)}</td>
            <td className="px-4 py-3 text-charcoal/60">{course.intakes.join(", ")}</td>
          </tr>
        ))}
      </Table>
      <Link href="/universities" className="mt-4 inline-block text-sm font-medium text-sky hover:underline">
        ← All providers
      </Link>
    </>
  );
}
