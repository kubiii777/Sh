import type { ReactNode } from "react";

/** Etykieta mono (np. ".01 — USŁUGI") i nagłówek sekcji. */
export function SectionHeader({
  label,
  title,
  children,
  className = "",
}: {
  label: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="label text-mute">{label}</p>
      <h2 className="h2 mt-5">{title}</h2>
      {children ? <div className="mt-6 max-w-[34rem] text-mute">{children}</div> : null}
    </div>
  );
}
