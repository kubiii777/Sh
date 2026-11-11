"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { useState } from "react";
import { nav, site } from "@/config/site";

/** Pełnoekranowy panel menu na mobile. Bez animacji; focus trap zapewnia Radix Dialog. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="label -mr-3 flex min-h-11 items-center px-3 md:hidden">Menu</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content
          aria-describedby={undefined}
          className="theme-dark fixed inset-0 z-50 flex flex-col overflow-y-auto md:hidden"
        >
          <div className="wrap flex h-16 shrink-0 items-center justify-between border-b border-line">
            <Dialog.Title className="text-[1.0625rem] font-medium tracking-[-0.02em]">{site.name}</Dialog.Title>
            <Dialog.Close className="label -mr-3 flex min-h-11 items-center px-3">Zamknij</Dialog.Close>
          </div>
          <nav aria-label="Menu główne" className="wrap flex-1">
            <ul>
              <li className="border-b border-line">
                <Link href="/" onClick={close} className="flex min-h-16 items-center text-[1.75rem] font-medium tracking-[-0.03em]">
                  Start
                </Link>
              </li>
              {nav.map((item) => (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    onClick={close}
                    className="flex min-h-16 items-center text-[1.75rem] font-medium tracking-[-0.03em]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="wrap shrink-0 py-6">
            <Link
              href="/kontakt"
              onClick={close}
              className="label flex min-h-14 items-center justify-center border border-fg bg-fg text-bg"
            >
              Rozpocznij projekt
            </Link>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
