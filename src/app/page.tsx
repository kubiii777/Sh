import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/home/Faq";
import { HeroCode } from "@/components/home/HeroCode";
import { Method } from "@/components/home/Method";
import { ServicesIndex } from "@/components/home/ServicesIndex";
import { PixelTransition } from "@/components/pixel/PixelTransition";
import { Arrow } from "@/components/ui/Arrow";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Terminal, TerminalLine } from "@/components/ui/Terminal";
import { site } from "@/config/site";
import { CtaSection } from "@/components/sections/CtaSection";
import { ProjectRow } from "@/components/projects/ProjectRow";
import { bottomBeforeBand, top, topAfterBand, two } from "@/lib/spacing";
import { faq, method, securityRules, technologies, trio } from "@/data/home";
import { projects } from "@/data/projects";
import { services } from "@/data/services";

export const metadata: Metadata = {
  description: site.description,
  alternates: { canonical: "/" },
};


export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      {/* 1. Hero */}
      <section className="theme-dark dots">
        <div className="wrap pb-14 pt-14 md:pt-20 lg:pb-16">
          <h1 className="display">
            <span className="lg:block">Budujemy oprogramowanie, </span>
            <span className="lg:block lg:text-right">które myśli i się broni.</span>
          </h1>

          <div className="grid-12 mt-8 items-end gap-y-12 md:mt-12">
            <div className="col-span-12 lg:col-span-5">
              <p className="lead max-w-[30rem] text-mute">Magento, aplikacje webowe, automatyzacje i bezpieczeństwo dla firm.</p>
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
            <div className="col-span-7 hidden lg:block">
              <HeroCode />
            </div>
          </div>
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

      {/* 3. Usługi: indeks + panel szczegółów */}
      <section className="theme-dark dots">
        <div className={`wrap ${topAfterBand} ${bottomBeforeBand}`}>
          <SectionHeader label=".01 — Usługi" note="Od audytu po utrzymanie" title="Usługi" count={services.length} />
          <div className="mt-10 md:mt-16">
            <ServicesIndex items={services} />
          </div>
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
            {featured.map((project, i) => (
              <li key={project.slug} className="border-t border-line">
                <ProjectRow project={project} index={i} />
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

      {/* 7. Metoda: etapy pracy, na desktopie animowane scrollem */}
      <section className="theme-light">
        <div className={`wrap ${topAfterBand} pb-10 md:pb-16`}>
          <SectionHeader label=".05 — Metoda" note="Ta sama w każdym projekcie" title="Metoda" count={method.length}>
            <p>
              Pracujemy według własnej metody. Każdy projekt przechodzi przez te same cztery etapy, więc na każdym
              z nich wiesz, co się dzieje i co dostajesz.
            </p>
          </SectionHeader>
        </div>
        <Method />
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
      <CtaSection label=".07 — Kontakt" />
    </>
  );
}
