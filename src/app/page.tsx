import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/home/Faq";
import { HeroCode } from "@/components/home/HeroCode";
import { Method } from "@/components/home/Method";
import { Manifesto } from "@/components/home/Manifesto";
import { ServicesStack } from "@/components/home/ServicesStack";
import { PixelTransition } from "@/components/pixel/PixelTransition";
import { Arrow } from "@/components/ui/Arrow";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { mailto, site } from "@/config/site";
import { CtaSection } from "@/components/sections/CtaSection";
import { FeaturedProjects } from "@/components/projects/FeaturedProjects";
import { bottomBeforeBand, top, topAfterBand, two } from "@/lib/spacing";
import { faq, manifesto, method, principles, securityRules, technologies } from "@/data/home";
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

      {/* 2. Manifest: akapit odsłaniany scrollem + trzy przypisy */}
      <section className="theme-light">
        <div className={`wrap ${topAfterBand} ${bottomBeforeBand}`}>
          <p className="label flex justify-between border-t border-line pt-4 text-mute">
            <span>.00 — Studio</span>
            <span>Audyt / Budowa / Opieka</span>
          </p>
          <div className="grid-12 mt-10 gap-y-12 md:mt-16">
            <h2 className="sr-only">Jak działamy</h2>
            <div className="col-span-12 lg:col-span-10 lg:col-start-3">
              <Manifesto text={manifesto} />
            </div>
          </div>
          <FadeIn className="grid-12 mt-14 gap-y-0 md:mt-24">
            <ol className="col-span-12 grid border-t border-line md:grid-cols-3 lg:col-span-10 lg:col-start-3">
              {principles.map((item, i) => (
                <li key={item.name} className="flex gap-5 border-b border-line py-5 md:border-b-0 md:py-6 md:pr-8">
                  <span className="label pt-1 text-mute">{two(i + 1)}</span>
                  <p className="text-[1rem] leading-snug">
                    <span className="font-medium">{item.name}.</span> <span className="text-mute">{item.text}</span>
                  </p>
                </li>
              ))}
            </ol>
          </FadeIn>
        </div>
      </section>

      <PixelTransition from="light" to="dark" seed={23} />

      {/* 3. Usługi: indeks + panel szczegółów */}
      <section className="theme-dark dots">
        <div className={`wrap ${topAfterBand} ${bottomBeforeBand}`}>
          <SectionHeader label=".01 — Usługi" note="Od audytu po utrzymanie" title="Usługi" count={services.length}>
            <p>Pięć obszarów, jedna metoda pracy. Każdy projekt zaczynamy od audytu, niezależnie od usługi.</p>
          </SectionHeader>
          <div className="mt-10 md:mt-16 lg:mt-20">
            <ServicesStack items={services} />
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
          <div className="mt-10 md:mt-16">
            <FeaturedProjects items={featured} />
          </div>
          <div className="mt-14 flex md:mt-24 md:justify-center">
            <Button href="/realizacje" variant="outline" className="w-full sm:w-auto">
              Wszystkie realizacje <Arrow />
            </Button>
          </div>
        </div>
      </section>

      <PixelTransition from="light" to="dark" seed={41} />

      {/* 6. Security by default: nagłówek przypięty po lewej, zasady jako duże wiersze */}
      <section className="theme-dark dots">
        <div className={`wrap ${topAfterBand} ${bottomBeforeBand}`}>
          <p className="label flex justify-between border-t border-line pt-4 text-mute">
            <span>.04 — Bezpieczeństwo</span>
            <span>W każdym projekcie</span>
          </p>
          <div className="grid-12 mt-8 gap-y-10 md:mt-12">
            <div className="col-span-12 lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <h2 className="display">
                  Security <br className="hidden lg:block" />
                  by default.
                </h2>
                <p className="mt-6 max-w-[24rem] text-mute md:mt-8">
                  Te zasady stosujemy w każdym projekcie, niezależnie od budżetu i terminu. Nie są opcją w wycenie.
                </p>
              </div>
            </div>
            <FadeIn className="col-span-12 lg:col-span-7">
              <ol className="border-t border-line">
                {securityRules.map((rule, i) => (
                  <li
                    key={rule.name}
                    className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-line py-6 md:grid-cols-[3.5rem_1fr_auto] md:py-8"
                  >
                    <span className="label pt-2 text-mute md:pt-3">{two(i + 1)}</span>
                    <div>
                      <h3 className="h3">{rule.name}</h3>
                      <p className="mt-2 max-w-[30rem] text-[1rem] text-mute first-letter:uppercase">{rule.text}.</p>
                    </div>
                    <span className="label hidden pt-3 md:block">[ok]</span>
                  </li>
                ))}
              </ol>
            </FadeIn>
          </div>
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

      {/* 8. FAQ: nagłówek przypięty po lewej, pytania po prawej */}
      <section className="theme-light">
        <div className={`wrap ${bottomBeforeBand}`}>
          <p className="label flex justify-between border-t border-line pt-4 text-mute">
            <span>.06 — FAQ</span>
            <span>Zanim napiszesz</span>
          </p>
          <div className="grid-12 mt-8 gap-y-10 md:mt-12">
            <div className="col-span-12 lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <h2 className="display">
                  Pytania
                  <span className="label ml-2 inline-block align-top text-mute md:ml-3 md:mt-2">({two(faq.length)})</span>
                </h2>
                <p className="mt-6 max-w-[20rem] text-mute md:mt-8">
                  Nie ma tu Twojego pytania?{" "}
                  <a href={mailto("Pytanie")} className="text-fg underline decoration-1 underline-offset-4 hover:text-mute">
                    Napisz do nas
                  </a>
                  .
                </p>
              </div>
            </div>
            <FadeIn className="col-span-12 lg:col-span-8">
              <Faq items={faq} />
            </FadeIn>
          </div>
        </div>
      </section>

      <PixelTransition from="light" to="dark" seed={67} />

      {/* 9. CTA */}
      <CtaSection label=".07 — Kontakt" />
    </>
  );
}
