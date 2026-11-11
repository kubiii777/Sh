"use client";

import * as Accordion from "@radix-ui/react-accordion";

/** Akordeon FAQ na prymitywie Radix, stylowany od zera. Bez animacji wysokości. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Accordion.Root type="single" collapsible className="border-t border-line">
      {items.map((item, i) => (
        <Accordion.Item key={item.q} value={`faq-${i}`} className="border-b border-line">
          <Accordion.Header asChild>
            <h3>
              <Accordion.Trigger className="group flex min-h-16 w-full items-center gap-5 py-5 text-left md:gap-8 md:py-7">
                <span className="label w-8 shrink-0 text-mute">{String(i + 1).padStart(2, "0")}</span>
                <span className="lead flex-1">{item.q}</span>
                <span aria-hidden="true" className="relative h-4 w-4 shrink-0">
                  <span className="absolute left-0 top-1/2 h-px w-4 bg-fg" />
                  <span className="absolute left-1/2 top-0 h-4 w-px bg-fg group-data-[state=open]:hidden" />
                </span>
              </Accordion.Trigger>
            </h3>
          </Accordion.Header>
          <Accordion.Content className="pb-7 pl-[3.25rem] pr-9 text-mute md:pb-9 md:pl-16 md:pr-16">
            <p className="max-w-[44rem]">{item.a}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
