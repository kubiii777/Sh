import type { ReactNode } from "react";

/**
 * Nagłówek sekcji: linia z etykietą mono i notą, pod nią tytuł w stopniu display.
 * Na desktopie opis stoi w prawej kolumnie, wyrównany do linii bazowej tytułu.
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
      <div className="grid-12 mt-8 gap-y-6 md:mt-12 lg:items-end">
        <h2 className={`display col-span-12 ${children ? "lg:col-span-8" : ""}`}>
          {title}
          {count !== undefined ? (
            <span className="label ml-2 inline-block align-top text-mute md:ml-3 md:mt-2">
              ({String(count).padStart(2, "0")})
            </span>
          ) : null}
        </h2>
        {children ? (
          <div className="col-span-12 max-w-[34rem] text-mute lg:col-span-4 lg:pb-2">{children}</div>
        ) : null}
      </div>
    </div>
  );
}
