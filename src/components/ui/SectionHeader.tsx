import type { ReactNode } from "react";

/**
 * Nagłówek sekcji: linia z etykietą mono (np. ".01 — USŁUGI") i notą po prawej,
 * pod nią tytuł w stopniu display z licznikiem pozycji w indeksie górnym.
 */
export function SectionHeader({
  label,
  note,
  title,
  count,
  children,
  className = "",
}: {
  label: string;
  note?: string;
  title: ReactNode;
  count?: number;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="label flex items-baseline justify-between gap-6 border-t border-line pt-4 text-mute">
        <span>{label}</span>
        {note ? <span className="text-right">{note}</span> : null}
      </div>
      <h2 className="display mt-8 md:mt-12">
        {title}
        {count !== undefined ? (
          <span className="label ml-2 inline-block align-top text-mute md:ml-3 md:mt-2">
            ({String(count).padStart(2, "0")})
          </span>
        ) : null}
      </h2>
      {children ? <div className="mt-6 max-w-[34rem] text-mute md:mt-8">{children}</div> : null}
    </div>
  );
}
