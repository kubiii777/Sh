import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  /** solid: wypełnienie kolorem tekstu sekcji; outline: obramowanie 1 px. Hover odwraca kolory. */
  variant?: "solid" | "outline";
  className?: string;
};

const base =
  "label inline-flex min-h-12 items-center justify-center gap-3 border border-fg px-6 transition-colors duration-150";
const variants = {
  solid: "bg-fg text-bg hover:bg-transparent hover:text-fg",
  outline: "bg-transparent text-fg hover:bg-fg hover:text-bg",
};

export function Button({ href, children, variant = "solid", className = "" }: Props) {
  const classes = `${base} ${variants[variant]} ${className}`;
  const external = /^(mailto:|tel:|https?:)/.test(href);
  return external ? (
    <a href={href} className={classes}>
      {children}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
