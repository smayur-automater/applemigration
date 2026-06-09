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
    "bg-navy text-white hover:bg-navy-light active:scale-[0.98] shadow-sm hover:shadow-md font-semibold",
  secondary:
    "border-2 border-gold text-navy hover:bg-gold hover:text-white font-semibold bg-transparent",
  ghost: "text-navy hover:bg-surface font-medium bg-transparent",
  "ghost-light": "text-white hover:bg-white/10 font-medium bg-transparent",
  gold:
    "bg-gold text-navy hover:bg-gold-light active:bg-gold-dark shadow-sm hover:shadow-md font-semibold",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-13 px-8 text-lg",
};

function Spinner() {
  return (
    <svg
      className="size-5 animate-[spin_700ms_linear_infinite]"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
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
    "inline-flex items-center justify-center gap-2 rounded-full whitespace-nowrap",
    "transition-[background-color,color,box-shadow,transform] duration-[var(--duration-base)]",
    "disabled:pointer-events-none disabled:opacity-60",
    variantStyles[variant],
    sizeStyles[size],
    fullWidthMobile ? "w-full sm:w-auto" : "",
    loading ? "opacity-85 cursor-not-allowed" : "",
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
