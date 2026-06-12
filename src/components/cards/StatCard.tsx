interface StatCardProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <div aria-label={`${value} ${label}`} className="flex flex-col items-start gap-1">
      {icon && <span aria-hidden="true">{icon}</span>}
      <span className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{value}</span>
      <span className="text-sm text-slate-400">{label}</span>
    </div>
  );
}
