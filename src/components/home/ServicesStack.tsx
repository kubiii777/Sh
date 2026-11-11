import Link from "next/link";
import { Arrow } from "@/components/ui/Arrow";
import type { Service } from "@/data/services";
import { two } from "@/lib/spacing";

const TAB = 72; // wysokość zakładki z nazwą usługi (px)
const NAV = 64; // wysokość nawigacji (px)

/**
 * Usługi. Desktop: pełnoekranowe panele, które przy scrollu nakładają się jeden na drugi;
 * z poprzednich zostają widoczne zakładki z nazwami, więc na końcu widać cały indeks.
 * Na niskich ekranach i na mobile panele układają się zwyczajnie, bez sticky.
 */
export function ServicesStack({ items }: { items: Service[] }) {
  const n = items.length;
  return (
    <>
      <ul className="border-b border-line lg:hidden">
        {items.map((service) => (
          <li key={service.slug} className="border-t border-line">
            <Link href={`/uslugi/${service.slug}`} className="block py-6 md:py-8">
              <span className="flex items-center justify-between">
                <span className="label text-mute">{service.number}</span>
                <Arrow className="text-[1.25rem]" />
              </span>
              <span className="h3 mt-3 block">{service.name}</span>
              <span className="mt-2 block text-[1rem] text-mute">{service.short}</span>
            </Link>
          </li>
        ))}
      </ul>

      <ol className="hidden lg:block">
        {items.map((service, i) => (
          <li
            key={service.slug}
            className="theme-dark dots flex flex-col border-t border-line [@media(min-height:760px)]:sticky [@media(min-height:760px)]:h-[var(--panel-h)]"
            style={
              {
                top: NAV + i * TAB,
                "--panel-h": `calc(100svh - ${NAV + (n - 1) * TAB}px)`,
              } as React.CSSProperties
            }
          >
            <Link
              href={`/uslugi/${service.slug}`}
              className="group flex shrink-0 items-center gap-8"
              style={{ height: TAB }}
            >
              <span className="label w-24 text-mute">
                {service.number} / {two(n)}
              </span>
              <span className="flex-1 text-[clamp(2rem,3.4vw,3.25rem)] font-medium leading-none tracking-[-0.045em]">
                {service.name}
              </span>
              <span className="label hidden text-mute xl:block">/uslugi/{service.slug}</span>
              <span className="flex h-11 w-11 items-center justify-center border border-line transition-colors duration-150 group-hover:border-fg group-hover:bg-fg group-hover:text-bg">
                <Arrow />
              </span>
            </Link>

            <div className="grid-12 min-h-0 flex-1 content-start gap-y-8 pb-10 pt-6 xl:pt-10">
              <div className="col-span-5 flex flex-col">
                <p className="h3 max-w-[30rem]">{service.value}</p>
                <p className="mt-5 max-w-[28rem] text-[1rem] text-mute">{service.short}</p>
                <p className="label mt-8 text-mute">{service.stack.slice(0, 6).join("  ·  ")}</p>
              </div>
              <div className="col-span-6 col-start-7">
                <p className="label border-b border-line pb-3 text-mute">Zakres</p>
                <ul className="grid grid-cols-2 gap-x-6">
                  {service.scope.slice(0, 8).map((item, j) => (
                    <li key={item.name} className="flex gap-4 border-b border-line py-3 text-[0.9375rem] leading-snug">
                      <span className="label pt-0.5 text-mute">{two(j + 1)}</span>
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
