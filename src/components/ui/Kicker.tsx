interface KickerProps {
  children: React.ReactNode;
  className?: string;
}

export function Kicker({ children, className = "" }: KickerProps) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.12em] text-gold ${className}`}
    >
      {children}
    </p>
  );
}
