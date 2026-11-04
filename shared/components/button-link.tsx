import Link from "next/link";
import type { ComponentProps } from "react";

const variants = {
  primary: "bg-primary text-text-primary hover:bg-primary-hover",
  secondary: "border-[1.5px] border-text-primary bg-surface hover:bg-surface-secondary",
};

const sizes = {
  md: "h-12 px-5 text-[15px]",
  sm: "h-10 px-4 text-sm",
};

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`inline-flex items-center justify-center rounded-sm font-bold whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
