import type { ReactNode } from "react";

/** Hero podstrony (ciemne): etykieta mono, nagłówek display, opcjonalny lead i akcje. */
export function PageHero({
  label,
  title,
  lead,
  children,
}: {
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="theme-dark dots">
      <div className="wrap pb-14 pt-14 md:pt-20 lg:pb-16 lg:pt-24">
        <p className="label border-t border-line pt-4 text-mute">{label}</p>
        <h1 className="display mt-8 max-w-[14ch] md:mt-12">{title}</h1>
        {lead ? <p className="lead mt-6 max-w-[38rem] text-mute md:mt-10">{lead}</p> : null}
        {children ? <div className="mt-8 md:mt-12">{children}</div> : null}
      </div>
    </section>
  );
}
