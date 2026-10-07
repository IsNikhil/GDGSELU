import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "brand" | "dark" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn inline-flex select-none items-center justify-center gap-2 rounded-full whitespace-nowrap transition-all duration-300";

const variants: Record<Variant, string> = {
  brand: "bg-brand font-semibold text-white hover:shadow-lg hover:shadow-brand/20",
  dark: "bg-foreground font-semibold text-white hover:bg-[#222] hover:shadow-lg hover:shadow-black/10",
  outline:
    "border border-black/15 bg-white/80 font-medium text-foreground duration-150 hover:bg-white",
  ghost: "border border-line font-semibold text-foreground duration-150 hover:bg-black/[0.03]",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-1.5 text-[13px]",
  md: "px-6 py-3 text-[15px]",
  lg: "px-8 py-4 text-[16px]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type LinkProps = CommonProps & { href: string } & Omit<ComponentProps<"a">, "href" | "className">;
type NativeButtonProps = CommonProps & { href?: undefined } & Omit<
    ComponentProps<"button">,
    "className"
  >;

export function buttonClasses(variant: Variant = "brand", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button(props: LinkProps | NativeButtonProps) {
  const { variant = "brand", size = "md", className, children } = props;
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
  variant = "outline",
  size = "md",
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
        "cursor-not-allowed opacity-60",
        className,
      )}
    >
      {children}
    </span>
  );
}
