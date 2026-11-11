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

// Proces układa się na desktopie w schody: każdy krok o kolumnę dalej.
const stairName = ["lg:col-start-1", "lg:col-start-2", "lg:col-start-3", "lg:col-start-4", "lg:col-start-5"];
const stairText = ["lg:col-start-6", "lg:col-start-7", "lg:col-start-8", "lg:col-start-9", "lg:col-start-10"];

const two = (n: number) => String(n).padStart(2, "0");

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      {/* 1. Hero */}
      <section className="theme-dark dots">
        <div className="wrap pb-14 pt-14 md:pt-20 lg:pb-16 lg:pt-24">
          <h1 className="display">
            <span className="lg:block">Budujemy oprogramowanie, </span>
            <span className="lg:block lg:text-right">które myśli i się broni.</span>
          </h1>

          <div className="grid-12 mt-8 items-end gap-y-12 md:mt-14 lg:mt-20">
            <div className="col-span-12 lg:col-span-6">
              <p className="lead max-w-[30rem] text-mute">AI, bezpieczeństwo, e-commerce i aplikacje webowe dla firm.</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 md:mt-10">
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
            <div className="col-span-5 col-start-8 hidden lg:block">
              <HeroTerminal />
            </div>
          </div>

          {/* Indeks usług: tylko desktop, na mobile hero zostaje proste */}
          <nav aria-label="Usługi" className="mt-16 hidden border-y border-line lg:block">
            <ul className="grid grid-cols-6">
              {services.map((service) => (
                <li key={service.slug} className="border-l border-line first:border-l-0">
                  <Link
                    href={`/uslugi/${service.slug}`}
                    className="flex h-full flex-col gap-3 px-3 py-4 transition-colors duration-150 hover:bg-fg hover:text-bg xl:px-5"
                  >
                    <span className="label opacity-60">{service.number}</span>
                    <span className="text-[0.8125rem] font-medium leading-tight tracking-[-0.01em] xl:text-[0.9375rem]">{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <PixelTransition from="dark" to="light" seed={11} />

      {/* 2. Trójka: trzy kolumny rozdzielone liniami */}
      <section className="theme-light">
        <div className={`wrap ${topAfterBand} ${bottomBeforeBand}`}>
          <FadeIn>
            <h2 className="sr-only">Jak działamy</h2>
            <div className="border-y border-line lg:grid lg:grid-cols-3">
              {trio.map((item, i) => (
                <article
                  key={item.name}
                  className="border-t border-line py-10 first:border-t-0 lg:border-l lg:border-t-0 lg:px-8 lg:py-12 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
                >
                  <p className="label flex justify-between text-mute">
                    <span>{item.number}</span>
                    <span aria-hidden="true">
                      {two(i + 1)} / {two(trio.length)}
                    </span>
                  </p>
                  <h3 className="h2 mt-8 lg:mt-24">{item.name}</h3>
                  <p className="mt-5 max-w-[30rem] text-[1.25rem] font-medium leading-[1.25] tracking-[-0.02em] lg:mt-6 lg:min-h-[5em]">
                    {item.lead}
                  </p>
                  <ul className="mt-8 lg:mt-10">
                    {item.points.map((point) => (
                      <li key={point.title} className="border-t border-line py-4">
                        <p className="label">{point.title}</p>
                        <p className="mt-2 text-[1rem] text-mute">{point.text}</p>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <PixelTransition from="light" to="dark" seed={23} />

      {/* 3. Usługi: duże wiersze */}
      <section className="theme-dark dots">
        <div className={`wrap ${topAfterBand} ${bottomBeforeBand}`}>
          <FadeIn>
            <SectionHeader label=".01 — Usługi" note="Od audytu po utrzymanie" title="Usługi" count={services.length} />
            <ul className="mt-10 border-b border-line md:mt-16">
              {services.map((service) => (
                <li key={service.slug} className="border-t border-line">
                  <Link
                    href={`/uslugi/${service.slug}`}
                    className="group -mx-5 block px-5 py-6 transition-colors duration-150 hover:bg-fg hover:text-bg md:-mx-6 md:grid md:grid-cols-12 md:items-center md:gap-x-6 md:px-6 md:py-7 lg:py-9"
                  >
                    <span className="flex items-center justify-between md:col-span-1 md:block md:self-start md:pt-3">
                      <span className="label text-mute group-hover:text-bg">{service.number}</span>
                      <Arrow className="text-[1.25rem] md:hidden" />
                    </span>
                    <span className="mt-3 block text-[1.75rem] font-medium leading-none tracking-[-0.04em] md:col-span-7 md:mt-0 md:text-[clamp(2rem,4.4vw,4.25rem)] md:leading-[0.95] md:tracking-[-0.05em]">
                      {service.name}
                    </span>
                    <span className="mt-3 block text-[1rem] text-mute group-hover:text-bg md:col-span-3 md:mt-0">
                      {service.short}
                    </span>
                    <span className="hidden justify-self-end md:col-span-1 md:block">
                      <Arrow className="text-[2rem]" />
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
      <section className="theme-light" aria-labelledby="technologie">
        <div className="wrap pt-14 lg:pt-16">
          <h2 id="technologie" className="label flex justify-between border-t border-line pt-4 text-mute">
            <span>.02 — Technologie</span>
            <span aria-hidden="true">({two(technologies.length)})</span>
          </h2>
        </div>
        <div className="overflow-hidden border-b border-line py-10 md:py-16">
          <ul className="ticker-track flex w-max items-center">
            {[0, 1].map((copy) =>
              technologies.map((name) => (
                <li
                  key={`${copy}-${name}`}
                  aria-hidden={copy === 1 ? "true" : undefined}
                  data-dup={copy === 1 ? "" : undefined}
                  className="flex items-center whitespace-nowrap text-[2.25rem] font-medium leading-none tracking-[-0.05em] md:text-[clamp(3rem,6.5vw,6.5rem)]"
                >
                  <span className="px-4 md:px-8">{name}</span>
                  <span aria-hidden="true" className="h-[0.32em] w-[0.32em] bg-fg" />
                </li>
              )),
            )}
          </ul>
        </div>
      </section>

      {/* 5. Wybrane realizacje: obrazy na przemian z lewej i z prawej */}
      <section className="theme-light">
        <div className={`wrap ${top} ${bottomBeforeBand}`}>
          <SectionHeader
            label=".03 — Realizacje"
            note="Projekty demonstracyjne"
            title="Realizacje"
            count={featured.length}
          >
            <p>Projekty demonstracyjne. Pokazują zakres i sposób pracy, a nie konkretnych klientów.</p>
          </SectionHeader>
          <ul className="mt-10 border-b border-line md:mt-16">
            {featured.map((project, i) => {
              const flip = i % 2 === 1;
              return (
                <li key={project.slug} className="border-t border-line">
                  <Link href={`/realizacje/${project.slug}`} className="group grid-12 gap-y-5 py-6 md:py-10">
                    <PixelReveal
                      className={`theme-light col-span-12 aspect-[16/10] md:col-span-8 ${flip ? "md:col-start-5" : ""}`}
                      seed={i + 3}
                    >
                      <Image
                        src={project.image}
                        alt={`Plakat projektu demonstracyjnego: ${project.name}`}
                        fill
                        sizes="(min-width: 1440px) 890px, (min-width: 768px) 66vw, 100vw"
                        className="object-cover"
                      />
                    </PixelReveal>
                    <div
                      className={`col-span-12 flex flex-col justify-between gap-6 md:col-span-4 ${
                        flip ? "md:col-start-1 md:row-start-1 md:pr-6" : "md:pl-6"
                      }`}
                    >
                      <p className="label flex justify-between text-mute">
                        <span>
                          {project.category} / {project.year}
                        </span>
                        <span>Demo</span>
                      </p>
                      <div>
                        <h3 className="h3">{project.name}</h3>
                        <p className="label mt-5 inline-flex min-h-11 items-center gap-3 border-b border-transparent group-hover:border-fg md:mt-8">
                          Zobacz projekt <Arrow />
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
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
        <div className={`wrap ${topAfterBand} ${bottomBeforeBand}`}>
          <FadeIn>
            <SectionHeader label=".04 — Bezpieczeństwo" note="W każdym projekcie" title="Security by default." />
            <div className="grid-12 mt-10 gap-y-8 md:mt-16">
              <p className="col-span-12 max-w-[26rem] text-mute lg:col-span-4">
                Te zasady stosujemy w każdym projekcie, niezależnie od budżetu i terminu. Nie są opcją w wycenie.
              </p>
              <div className="col-span-12 lg:col-span-8">
                <Terminal title="security.log" meta={`${two(securityRules.length)} zasad`} className="md:text-[15px] md:leading-7">
                  <ol>
                    {securityRules.map((rule, i) => (
                      <li key={rule.name} className="border-b border-line py-3 last:border-b-0 md:py-4">
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
          </FadeIn>
        </div>
      </section>

      <PixelTransition from="dark" to="light" seed={53} />

      {/* 7. Proces: jedna kolumna kroków, na desktopie schodkowo */}
      <section className="theme-light">
        <div className={`wrap ${topAfterBand} ${bottom}`}>
          <SectionHeader label=".05 — Proces" note="Od rozmowy do utrzymania" title="Proces" count={processSteps.length} />
          <FadeIn>
            <ol className="mt-10 border-b border-line md:mt-16">
              {processSteps.map((step, i) => (
                <li key={step.name} className="grid-12 gap-y-3 border-t border-line py-6 md:py-8">
                  <div className={`col-span-12 flex gap-5 lg:col-span-5 ${stairName[i]}`}>
                    <span className="label w-8 shrink-0 pt-2 text-mute">{two(i + 1)}</span>
                    <h3 className="h3">{step.name}</h3>
                  </div>
                  <p className={`col-span-12 pl-[3.25rem] text-mute lg:col-span-3 lg:pl-0 ${stairText[i]}`}>{step.text}</p>
                </li>
              ))}
            </ol>
          </FadeIn>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="theme-light">
        <div className={`wrap ${bottomBeforeBand}`}>
          <SectionHeader label=".06 — FAQ" note="Zanim napiszesz" title="FAQ" count={faq.length} />
          <FadeIn className="grid-12 mt-10 md:mt-16">
            <div className="col-span-12 lg:col-span-9 lg:col-start-4">
              <Faq items={faq} />
            </div>
          </FadeIn>
        </div>
      </section>

      <PixelTransition from="light" to="dark" seed={67} />

      {/* 9. CTA */}
      <section className="theme-dark dots">
        <div className="wrap pb-16 pt-14 md:pb-28 md:pt-20 lg:pt-24">
          <FadeIn>
            <p className="label flex justify-between border-t border-line pt-4 text-mute">
              <span>.07 — Kontakt</span>
              <span>Odpowiadamy w ciągu 24h roboczych</span>
            </p>
            <div className="[container-type:inline-size]">
              <h2 className="mega mt-10 md:mt-16" style={{ fontSize: "13.6cqw" }}>
                Porozmawiajmy.
              </h2>
            </div>
            <div className="mt-10 flex flex-col gap-6 border-t border-line pt-8 md:mt-16 md:flex-row md:items-center md:justify-between">
              <a
                href={mailto()}
                className="lead flex min-h-11 items-center underline decoration-1 underline-offset-[6px] hover:text-mute"
              >
                {site.email}
              </a>
              <Button href="/kontakt" className="w-full sm:w-auto">
                Rozpocznij projekt <Arrow />
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
