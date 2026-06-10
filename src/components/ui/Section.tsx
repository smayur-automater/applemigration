type SectionSize = "sm" | "md" | "lg" | "xl";
type SectionBg = "default" | "navy" | "surface" | "white" | "gold";

const sizeMap: Record<SectionSize, string> = {
  sm: "py-12",
  md: "py-16",
  lg: "py-24",
  xl: "py-32",
};

const bgMap: Record<SectionBg, string> = {
  default: "bg-off-white",
  navy: "bg-navy text-white",
  surface: "bg-surface",
  white: "bg-white",
  gold: "bg-gold",
};

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: SectionSize;
  bg?: SectionBg;
  children: React.ReactNode;
}

export function Section({
  size = "md",
  bg = "default",
  className = "",
  children,
  ...props
}: SectionProps) {
  return (
    <section className={`${sizeMap[size]} ${bgMap[bg]} ${className}`} {...props}>
      {children}
    </section>
  );
}
