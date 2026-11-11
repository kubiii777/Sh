import Link from "next/link";
import { nav, site } from "@/config/site";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="theme-dark sticky top-0 z-40 border-b border-line">
      <div className="wrap flex h-16 items-center justify-between">
        <Link href="/" className="-ml-2 flex min-h-11 items-center px-2 text-[1.0625rem] font-medium tracking-[-0.02em]">
          {site.name}
        </Link>
        <nav aria-label="Główna" className="hidden md:block">
          <ul className="flex items-center gap-8 lg:gap-10">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="label flex min-h-11 items-center text-mute transition-colors duration-150 hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href="/kontakt"
          className="label hidden min-h-10 items-center border border-fg bg-fg px-5 text-bg transition-colors duration-150 hover:bg-transparent hover:text-fg md:flex"
        >
          Rozpocznij projekt
        </Link>
        <MobileMenu />
      </div>
    </header>
  );
}
