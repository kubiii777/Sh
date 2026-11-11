import Link from "next/link";
import type { ReactNode } from "react";
import { mailto, nav, site } from "@/config/site";
import { services } from "@/data/services";
import { Year } from "./Year";

const linkClass = "flex min-h-11 items-center transition-colors duration-150 hover:text-mute md:min-h-9";

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="col-span-12 border-t border-line pt-5 sm:col-span-6 lg:col-span-3">
      <h2 className="label text-mute">{title}</h2>
      <ul className="mt-3 text-[1rem]">{children}</ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="theme-dark dots border-t border-line">
      <div className="wrap pb-8 pt-16 md:pt-24">
        <div className="grid-12 gap-y-10">
          <Column title="Nawigacja">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </Column>
          <Column title="Usługi">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/uslugi/${service.slug}`} className={linkClass}>
                  {service.name}
                </Link>
              </li>
            ))}
          </Column>
          <Column title="Kontakt">
            <li>
              <a href={mailto()} className={linkClass}>
                {site.email}
              </a>
            </li>
            <li className="flex min-h-11 items-center md:min-h-9">{site.phone}</li>
            <li className="flex min-h-11 items-center md:min-h-9">{site.address}</li>
          </Column>
          <Column title="Social">
            <li>
              <a href={site.social.linkedin} className={linkClass}>
                LinkedIn
              </a>
            </li>
            <li>
              <a href={site.social.github} className={linkClass}>
                GitHub
              </a>
            </li>
          </Column>
        </div>

        <div className="label mt-16 flex flex-col gap-3 border-t border-line pt-5 text-mute md:flex-row md:items-center md:justify-between">
          <p>
            © <Year /> {site.name}
          </p>
          <p>
            NIP {site.nip} / KRS {site.krs}
          </p>
          <Link href="/polityka-prywatnosci" className="flex min-h-11 items-center hover:text-fg md:min-h-0">
            Polityka prywatności
          </Link>
        </div>
      </div>

      {/* Wordmark na całą szerokość: rozmiar liczony z długości nazwy */}
      <div aria-hidden="true" className="wrap border-t border-line pb-6 pt-8 md:pb-10 md:pt-12">
        <div className="[container-type:inline-size]">
          <p
            className="whitespace-nowrap font-medium leading-[0.8] tracking-[-0.05em]"
            style={{ fontSize: `calc(100cqw / ${Math.max(3, site.name.length) * 0.6})` }}
          >
            {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
