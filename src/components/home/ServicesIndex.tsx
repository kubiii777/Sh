"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Arrow } from "@/components/ui/Arrow";
import type { Service } from "@/data/services";

const two = (n: number) => String(n).padStart(2, "0");

/**
 * Usługi. Desktop (≥1024 px): indeks po lewej, panel ze szczegółami po prawej; najechanie
 * albo fokus na pozycji zmienia panel. Mobile: proste wiersze, cały wiersz klikalny.
 */
export function ServicesIndex({ items }: { items: Service[] }) {
  const [active, setActive] = useState(0);
  const current = items[active];

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

      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-x-6">
        <ol className="col-span-5 flex flex-col border-t border-line">
          {items.map((service, i) => {
            const on = i === active;
            return (
              <li key={service.slug} className="flex flex-1 border-b border-line">
                <Link
                  href={`/uslugi/${service.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-current={on ? "true" : undefined}
                  className={`flex w-full items-center gap-6 py-4 transition-colors duration-150 ${
                    on ? "text-fg" : "text-mute hover:text-fg"
                  }`}
                >
                  <span className="label w-9 shrink-0">{service.number}</span>
                  <span className="flex-1 text-[clamp(1.375rem,2.1vw,2rem)] font-medium leading-none tracking-[-0.035em]">
                    {service.name}
                  </span>
                  <Arrow className={`text-[1.5rem] transition-opacity duration-150 ${on ? "opacity-100" : "opacity-0"}`} />
                </Link>
              </li>
            );
          })}
        </ol>

        <div className="col-span-7 flex min-h-[38rem] flex-col border border-line">
          <div className="label flex justify-between border-b border-line px-6 py-3 text-mute xl:px-8">
            <span>
              {two(active + 1)} / {two(items.length)}
            </span>
            <span>/uslugi/{current.slug}</span>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.slug}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex flex-1 flex-col justify-between gap-10 px-6 py-8 xl:px-8 xl:py-10"
            >
              <div>
                <p className="h2">{current.name}</p>
                <p className="lead mt-6 max-w-[32rem] text-mute">{current.short}</p>
              </div>
              <div>
                <ul className="grid grid-cols-2 gap-x-6">
                  {current.scope.slice(0, 6).map(({ name: point }, i) => (
                    <li key={point} className="flex gap-4 border-t border-line py-4 text-[1rem]">
                      <span className="label pt-1 text-mute">{two(i + 1)}</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/uslugi/${current.slug}`}
                  className="label mt-6 inline-flex min-h-12 items-center gap-3 border border-fg bg-fg px-6 text-bg transition-colors duration-150 hover:bg-transparent hover:text-fg"
                >
                  Zobacz usługę <Arrow />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
