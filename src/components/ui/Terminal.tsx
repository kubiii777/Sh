import type { ReactNode } from "react";

/** Ramka terminala: belka z nazwą pliku i treść w mono. Linie 1 px, bez zaokrągleń. */
export function Terminal({
  title,
  meta,
  children,
  className = "",
}: {
  title: string;
  meta?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`border border-line bg-bg font-mono text-[13px] leading-6 ${className}`}>
      <div className="label flex items-center justify-between border-b border-line px-4 py-3 text-mute">
        <span>{title}</span>
        {meta ? <span>{meta}</span> : null}
      </div>
      <div className="px-4 py-4">{children}</div>
    </div>
  );
}

export function TerminalLine({ n, children }: { n: number | string; children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="w-6 shrink-0 select-none text-right text-mute">{String(n).padStart(2, "0")}</span>
      <span className="min-w-0">{children}</span>
    </div>
  );
}
