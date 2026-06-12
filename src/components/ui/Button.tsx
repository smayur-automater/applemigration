import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "ghost-light" | "gold";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
  fullWidthMobile?: boolean;
  href?: string;
  className?: string;
  children?: ReactNode;
}

type ButtonProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps>;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-hover active:scale-[0.98] font-medium",
  secondary:
    "border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-medium bg-white",
  ghost:
    "text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium bg-transparent",
  "ghost-light":
    "text-white/90 hover:bg-white/10 font-medium bg-transparent",
  gold:
    "bg-accent text-white hover:bg-accent-hover active:scale-[0.98] font-medium",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-11 px-6 text-base gap-2",
};

function Spinner() {
  return (
    <svg
      className="size-4 animate-[spin_700ms_linear_infinite]"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
      <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconRight,
  fullWidthMobile = false,
  href,
  className = "",
  children,
  disabled,
  ...props
}: ButtonProps & { disabled?: boolean }) {
  const classes = [
    "inline-flex items-center justify-center rounded-md whitespace-nowrap",
    "transition-[background-color,color,border-color,transform,opacity] duration-[var(--duration-fast)]",
    "disabled:pointer-events-none disabled:opacity-50",
    variantStyles[variant],
    sizeStyles[size],
    fullWidthMobile ? "w-full sm:w-auto" : "",
    loading ? "opacity-70 cursor-not-allowed" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {loading ? <Spinner /> : icon}
      {children}
      {!loading && iconRight}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}

export type { ButtonProps, ButtonVariant, ButtonSize };
