import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "gold" | "goldOutline" | "light";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex min-h-11 select-none items-center justify-center gap-2 rounded-full font-semibold " +
  "transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-out " +
  "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] " +
  "motion-reduce:transform-none motion-reduce:hover:translate-y-0";

const variants: Record<Variant, string> = {
  primary:
    "bg-[#1a73e8] text-white shadow-[0_6px_20px_-6px_rgb(26_115_232/0.55)] hover:bg-[#1765cc] " +
    "dark:bg-[#8ab4f8] dark:text-[#0c1210] dark:hover:bg-[#a8c7fa]",
  secondary:
    "border border-line bg-surface text-fg shadow-card hover:border-[color-mix(in_srgb,var(--text)_30%,transparent)]",
  ghost: "text-fg hover:bg-surface-2",
  light: "bg-white text-[#0b3d2e] hover:bg-[#f7f3e8]",
  gold:
    "bg-gradient-to-r from-ld-gold to-ld-gold-light text-ld-bg shadow-[0_8px_28px_-8px_rgb(212_179_106/0.6)] " +
    "hover:shadow-[0_10px_36px_-6px_rgb(230_201_136/0.7)]",
  goldOutline:
    "border border-ld-gold/70 text-ld-gold-light hover:border-ld-gold-light hover:bg-ld-gold/10",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-[0.95rem]",
  lg: "px-7 py-3.5 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type LinkProps = CommonProps & { href: string } & Omit<ComponentProps<"a">, "href" | "className">;
type NativeButtonProps = CommonProps & { href?: undefined } & Omit<ComponentProps<"button">, "className">;

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button(props: LinkProps | NativeButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = buttonClasses(variant, size, className);

  if (props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    const external = /^(https?:|mailto:)/.test(href);
    if (external || href.startsWith("#") || /\.(png|pdf|jpe?g)$/i.test(href)) {
      return (
        <a
          href={href}
          className={classes}
          {...(external && !href.startsWith("mailto:")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}

/** A non-interactive, clearly disabled button look (for "coming soon" states). */
export function DisabledButton({
  children,
  variant = "goldOutline",
  size = "lg",
  className,
}: CommonProps) {
  return (
    <span
      role="button"
      aria-disabled="true"
      className={cn(
        base,
        variants[variant],
        sizes[size],
        "pointer-events-none cursor-not-allowed opacity-80 hover:translate-y-0",
        className,
      )}
    >
      {children}
    </span>
  );
}
