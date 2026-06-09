type ContainerSize = "default" | "prose" | "narrow" | "full";

const sizeMap: Record<ContainerSize, string> = {
  default: "max-w-[var(--max-w-content)]",
  prose: "max-w-[var(--max-w-prose)]",
  narrow: "max-w-[var(--max-w-narrow)]",
  full: "max-w-none",
};

interface ContainerProps {
  size?: ContainerSize;
  className?: string;
  children: React.ReactNode;
}

export function Container({ size = "default", className = "", children }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-[clamp(1rem,4vw,2rem)] ${sizeMap[size]} ${className}`}
    >
      {children}
    </div>
  );
}
