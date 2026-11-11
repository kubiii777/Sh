import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Faq } from "@/components/home/Faq";
import { HeroTerminal } from "@/components/home/HeroTerminal";
import { PixelReveal } from "@/components/pixel/PixelReveal";
import { PixelTransition } from "@/components/pixel/PixelTransition";
import { Arrow } from "@/components/ui/Arrow";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Terminal, TerminalLine } from "@/components/ui/Terminal";
import { mailto, site } from "@/config/site";
import { faq, processSteps, securityRules, technologies, trio } from "@/data/home";
import { projects } from "@/data/projects";
import { services } from "@/data/services";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Odstępy sekcji. Pas pikseli sam działa jak odstęp, więc od jego strony padding jest mniejszy.
const top = "pt-16 md:pt-28 lg:pt-36";
const bottom = "pb-16 md:pb-28 lg:pb-36";
const topAfterBand = "pt-14 md:pt-14 lg:pt-16";
const bottomBeforeBand = "pb-14 md:pb-14 lg:pb-16";

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      {/* 1. Hero */}
      <section className="theme-dark dots">
        <div className="wrap grid-12 items-end gap-y-12 pb-14 pt-14 md:pb-14 md:pt-24 lg:pb-16 lg:pt-32">
          <div className="col-span-12 lg:col-span-8">
            <h1 className="display">Budujemy oprogramowanie, które myśli i się broni.</h1>
            <p className="lead mt-6 max-w-[36rem] text-mute md:mt-10">
              AI, bezpieczeństwo, e-commerce i aplikacje webowe dla firm.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 md:mt-12">
              <Button href="/kontakt" className="w-full sm:w-auto">
                Rozpocznij projekt
              </Button>
              <Link
                href="/realizacje"
                className="label hidden min-h-12 items-center gap-3 border-b border-transparent hover:border-fg md:inline-flex"
              >
                Zobacz realizacje <Arrow />
              </Link>
            </div>
          </div>
          <div className="col-span-4 hidden lg:block">
            <HeroTerminal />
          </div>
        </div>
      </section>

      <PixelTransition from="dark" to="light" seed={11} />

      {/* 2. Trójka */}
      <section className="theme-light">
        <div className={`wrap ${topAfterBand} ${bottomBeforeBand}`}>
          <FadeIn>
            <h2 className="sr-only">Jak działamy</h2>
            <div className="border-b border-line">
              {trio.map((item) => (
                <article key={item.name} className="grid-12 gap-y-6 border-t border-line py-10 md:py-14">
                  <header className="col-span-12 flex items-baseline gap-4 lg:col-span-4 lg:block">
                    <p className="label text-mute">{item.number}</p>
                    <h3 className="h2 lg:mt-4">{item.name}</h3>
                  </header>
                  <div className="col-span-12 lg:col-span-8">
                    <p className="lead max-w-[40rem]">{item.lead}</p>
                    <ul className="mt-8 grid gap-x-6 gap-y-6 md:mt-12 md:grid-cols-3">
                      {item.points.map((point) => (
                        <li key={point.title} className="border-t border-line pt-4">
                          <p className="label">{point.title}</p>
                          <p className="mt-2 text-[1rem] text-mute">{point.text}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <PixelTransition from="light" to="dark" seed={23} />

      {/* 3. Usługi */}
      <section className="theme-dark dots">
        <div className={`wrap ${topAfterBand} ${bottomBeforeBand}`}>
          <FadeIn>
            <SectionHeader label=".01 — Usługi" title="Sześć rzeczy, które robimy dobrze." />
            <ul className="mt-12 border-b border-line md:mt-20">
              {services.map((service) => (
                <li key={service.slug} className="border-t border-line">
                  <Link
                    href={`/uslugi/${service.slug}`}
                    className="group -mx-5 block px-5 py-6 transition-colors duration-150 hover:bg-fg hover:text-bg md:-mx-6 md:grid md:grid-cols-12 md:items-baseline md:gap-x-6 md:px-6 md:py-8"
                  >
                    <span className="flex items-center justify-between md:col-span-1 md:block">
                      <span className="label text-mute group-hover:text-bg">{service.number}</span>
                      <Arrow className="text-[1.25rem] md:hidden" />
                    </span>
                    <span className="h3 mt-3 block md:col-span-6 md:mt-0">{service.name}</span>
                    <span className="mt-2 block text-[1rem] text-mute group-hover:text-bg md:col-span-4 md:mt-0">
                      {service.short}
                    </span>
                    <span className="hidden justify-self-end md:col-span-1 md:block md:self-center">
                      <Arrow className="text-[1.75rem]" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      <PixelTransition from="dark" to="light" seed={37} />

      {/* 4. Ticker technologii */}
      <section className="theme-light border-b border-line" aria-labelledby="technologie">
        <div className="wrap pb-8 pt-14 md:pt-14 lg:pt-16">
          <h2 id="technologie" className="label text-mute">
            .02 — Technologie
          </h2>
        </div>
        <div className="overflow-hidden pb-16 md:pb-24">
          <ul className="ticker-track flex w-max items-center">
            {[0, 1].map((copy) =>
              technologies.map((name) => (
                <li
                  key={`${copy}-${name}`}
                  aria-hidden={copy === 1 ? "true" : undefined}
                  data-dup={copy === 1 ? "" : undefined}
                  className="h3 flex items-center whitespace-nowrap"
                >
                  <span className="px-5 md:px-8">{name}</span>
                  <span aria-hidden="true" className="text-mute">
                    /
                  </span>
                </li>
              )),
            )}
          </ul>
        </div>
      </section>

      {/* 5. Wybrane realizacje */}
      <section className="theme-light">
        <div className={`wrap ${top} ${bottomBeforeBand}`}>
          <SectionHeader label=".03 — Realizacje" title="Wybrane realizacje">
            <p>Projekty demonstracyjne. Pokazują zakres i sposób pracy, a nie konkretnych klientów.</p>
          </SectionHeader>
          <ul className="mt-12 border-b border-line md:mt-20">
            {featured.map((project, i) => (
              <li key={project.slug} className="border-t border-line">
                <Link href={`/realizacje/${project.slug}`} className="group grid-12 items-end gap-y-5 py-6 md:py-10">
                  <PixelReveal className="theme-light col-span-12 aspect-[16/10] md:col-span-7" seed={i + 3}>
                    <Image
                      src={project.image}
                      alt={`Grafika projektu demonstracyjnego: ${project.name}`}
                      fill
                      sizes="(min-width: 1440px) 780px, (min-width: 768px) 58vw, 100vw"
                      className="object-cover"
                    />
                  </PixelReveal>
                  <div className="col-span-12 md:col-span-5 md:pl-6">
                    <p className="label text-mute">
                      {project.category} / {project.year} / Demo
                    </p>
                    <h3 className="h3 mt-3 md:mt-4">{project.name}</h3>
                    <p className="label mt-5 inline-flex min-h-11 items-center gap-3 border-b border-transparent group-hover:border-fg md:mt-8">
                      Zobacz projekt <Arrow />
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 md:mt-14">
            <Button href="/realizacje" variant="outline" className="w-full sm:w-auto">
              Wszystkie realizacje <Arrow />
            </Button>
          </div>
        </div>
      </section>

      <PixelTransition from="light" to="dark" seed={41} />

      {/* 6. Security by default */}
      <section className="theme-dark dots">
        <div className={`wrap ${topAfterBand} ${bottomBeforeBand} grid-12 gap-y-10`}>
          <FadeIn className="col-span-12 lg:col-span-5">
            <SectionHeader label=".04 — Bezpieczeństwo" title="Security by default.">
              <p>Te zasady stosujemy w każdym projekcie, niezależnie od budżetu i terminu. Nie są opcją w wycenie.</p>
            </SectionHeader>
          </FadeIn>
          <div className="col-span-12 lg:col-span-7">
            <Terminal title="security.log" meta={`${securityRules.length} zasad`}>
              <ol>
                {securityRules.map((rule, i) => (
                  <li key={rule.name} className="border-b border-line py-3 last:border-b-0">
                    <TerminalLine n={i + 1}>
                      <span className="text-fg">{rule.name}</span>
                      <span className="text-mute"> — {rule.text}</span>
                    </TerminalLine>
                  </li>
                ))}
              </ol>
            </Terminal>
          </div>
        </div>
      </section>

      <PixelTransition from="dark" to="light" seed={53} />

      {/* 7. Proces */}
      <section className="theme-light border-b border-line">
        <div className={`wrap ${topAfterBand} ${bottom} grid-12 gap-y-10`}>
          <div className="col-span-12 lg:col-span-4">
            <SectionHeader label=".05 — Proces" title="Jak pracujemy" />
          </div>
          <FadeIn className="col-span-12 lg:col-span-8">
            <ol className="border-b border-line">
              {processSteps.map((step, i) => (
                <li key={step.name} className="flex gap-5 border-t border-line py-6 md:gap-8 md:py-8">
                  <span className="label w-8 shrink-0 pt-2 text-mute">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="h3">{step.name}</h3>
                    <p className="mt-3 max-w-[36rem] text-mute">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </FadeIn>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="theme-light">
        <div className={`wrap ${top} ${bottomBeforeBand} grid-12 gap-y-10`}>
          <div className="col-span-12 lg:col-span-4">
            <SectionHeader label=".06 — FAQ" title="Częste pytania" />
          </div>
          <FadeIn className="col-span-12 lg:col-span-8">
            <Faq items={faq} />
          </FadeIn>
        </div>
      </section>

      <PixelTransition from="light" to="dark" seed={67} />

      {/* 9. CTA */}
      <section className="theme-dark dots">
        <div className="wrap pb-20 pt-14 md:pb-36 md:pt-20 lg:pb-44 lg:pt-24">
          <FadeIn>
            <p className="label text-mute">.07 — Kontakt</p>
            <h2 className="display mt-5">Porozmawiajmy.</h2>
            <div className="mt-10 flex flex-col gap-6 md:mt-14 md:flex-row md:items-center md:gap-10">
              <a href={mailto()} className="lead flex min-h-11 items-center underline decoration-1 underline-offset-[6px] hover:text-mute">
                {site.email}
              </a>
              <Button href="/kontakt" className="w-full sm:w-auto">
                Rozpocznij projekt
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
