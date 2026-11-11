import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Faq } from "@/components/home/Faq";
import { PixelTransition } from "@/components/pixel/PixelTransition";
import { ProjectRow } from "@/components/projects/ProjectRow";
import { CtaSection } from "@/components/sections/CtaSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Comparison } from "@/components/services/Comparison";
import { NumberedList } from "@/components/services/NumberedList";
import { Arrow } from "@/components/ui/Arrow";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tags } from "@/components/ui/Tags";
import { mailto, site } from "@/config/site";
import { projects } from "@/data/projects";
import { deliverables, getService, services } from "@/data/services";
import { pageMetadata } from "@/lib/metadata";
import { bottomBeforeBand, top, topAfterBand, two } from "@/lib/spacing";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/uslugi/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({ title: service.name, description: `${service.value} ${service.short}`, path: `/uslugi/${slug}` });
}

export default async function ServicePage({ params }: PageProps<"/uslugi/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = projects.filter((p) => p.category === service.projectCategory);
  const subject = `Zapytanie: ${service.name}`;
  // numeracja sekcji zależy od tego, czy usługa ma sekcje dodatkowe
  let n = 0;
  const label = (name: string) => `.${two(++n)} — ${name}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.name,
          serviceType: service.name,
          description: service.intro,
          url: `${site.url}/uslugi/${service.slug}`,
          areaServed: { "@type": "Country", name: "Polska" },
          provider: { "@type": "Organization", name: site.name, url: site.url },
        }}
      />

      {/* 1. Hero */}
      <section className="theme-dark dots">
        <div className="wrap pb-14 pt-14 md:pt-20 lg:pb-16 lg:pt-24">
          <p className="label flex justify-between gap-6 border-t border-line pt-4 text-mute">
            <span>
              <Link href="/uslugi" className="hover:text-fg">
                Usługi
              </Link>{" "}
              / {service.number}
            </span>
            <span>
              {service.number} / {two(services.length)}
            </span>
          </p>
          <h1 className="display mt-8 md:mt-12">{service.name}</h1>
          <div className="grid-12 mt-8 gap-y-8 md:mt-12">
            <p className="lead col-span-12 lg:col-span-6">{service.value}</p>
            <p className="col-span-12 text-mute lg:col-span-5 lg:col-start-8">{service.intro}</p>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 md:mt-14">
            <Button href={mailto(subject)} className="w-full sm:w-auto">
              Zapytaj o wycenę <Arrow />
            </Button>
            <Link
              href="#zakres"
              className="label hidden min-h-12 items-center gap-3 border-b border-transparent hover:border-fg md:inline-flex"
            >
              Zobacz zakres
            </Link>
          </div>
        </div>
      </section>

      <PixelTransition from="dark" to="light" seed={201} />

      {/* 2. Problemy i 3. Zakres */}
      <section className="theme-light">
        <div className={`wrap ${topAfterBand}`}>
          <FadeIn>
            <SectionHeader label={label("Problemy")} note="Z tym przychodzą klienci" title="Brzmi znajomo?" />
            <ul className="mt-10 border-y border-line md:mt-16 lg:grid lg:grid-cols-3">
              {service.problems.map((problem, i) => (
                <li
                  key={problem.name}
                  className="border-t border-line py-8 first:border-t-0 lg:border-l lg:border-t-0 lg:px-8 lg:py-10 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
                >
                  <p className="label text-mute">{two(i + 1)}</p>
                  <h3 className="h3 mt-6">{problem.name}</h3>
                  <p className="mt-4 text-mute">{problem.text}</p>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
        <div id="zakres" className={`wrap ${top} ${bottomBeforeBand}`}>
          <SectionHeader label={label("Zakres")} note="Co robimy" title="Zakres" count={service.scope.length} />
          <div className="mt-10 md:mt-16">
            <NumberedList items={service.scope} />
          </div>
        </div>
      </section>

      <PixelTransition from="light" to="dark" seed={203} />

      {/* 4. Co dostajesz */}
      <section className="theme-dark dots">
        <div className={`wrap ${topAfterBand} ${bottomBeforeBand}`}>
          <FadeIn>
            <SectionHeader label={label("Co dostajesz")} note="W każdym projekcie" title="Co dostajesz" />
            <ul className="mt-10 border-y border-line md:mt-16 md:grid md:grid-cols-2 lg:grid-cols-4">
              {deliverables.map((item, i) => (
                <li
                  key={item.name}
                  className="border-t border-line py-8 first:border-t-0 md:border-l md:px-6 md:[&:nth-child(-n+2)]:border-t-0 md:[&:nth-child(odd)]:border-l-0 md:[&:nth-child(odd)]:pl-0 lg:border-t-0 lg:[&:nth-child(odd)]:border-l lg:[&:nth-child(odd)]:pl-6 lg:first:border-l-0 lg:first:pl-0"
                >
                  <p className="label text-mute">{two(i + 1)}</p>
                  <h3 className="h3 mt-6">{item.name}</h3>
                  <p className="mt-4 text-[1rem] text-mute">{item.text}</p>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      <PixelTransition from="dark" to="light" seed={205} />

      {/* 5. Proces (+ sekcje dodatkowe) */}
      <section className="theme-light">
        <div className={`wrap ${topAfterBand}`}>
          <SectionHeader label={label("Proces")} note="Każdy krok kończy się odbiorem" title={service.processTitle} />
          <div className="mt-10 md:mt-16">
            <NumberedList items={service.process} ordered />
          </div>
        </div>

        {service.existing ? (
          <div className={`wrap ${top}`}>
            <SectionHeader label={label("Istniejący sklep")} note="Przejmujemy i naprawiamy" title={service.existing.title} />
            <div className="mt-10 md:mt-16">
              <NumberedList items={service.existing.items} />
            </div>
          </div>
        ) : null}

        {service.comparison ? (
          <div className={`wrap ${top}`}>
            <SectionHeader label={label("Porównanie")} note="Opisowo, bez cen" title={service.comparison.title} />
            <div className="mt-10 md:mt-16">
              <Comparison data={service.comparison} />
            </div>
          </div>
        ) : null}
        <div className={bottomBeforeBand} />
      </section>

      <PixelTransition from="light" to="dark" seed={207} />

      {/* 6. Stack i 7. Powiązane realizacje */}
      <section className="theme-dark dots">
        <div className={`wrap ${topAfterBand}`}>
          <SectionHeader label={label("Stack")} note="Technologie" title="Stack" count={service.stack.length} />
          <Tags items={service.stack} className="mt-10 md:mt-16" />
        </div>
        <div className={`wrap ${top} ${bottomBeforeBand}`}>
          <SectionHeader label={label("Realizacje")} note="Projekty demonstracyjne" title="Realizacje" count={related.length} />
          {related.length ? (
            <ul className="mt-10 border-b border-line md:mt-16">
              {related.map((project, i) => (
                <li key={project.slug} className="border-t border-line">
                  <ProjectRow project={project} index={i} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-10 text-mute">Realizacje w tym obszarze pojawią się wkrótce.</p>
          )}
        </div>
      </section>

      <PixelTransition from="dark" to="light" seed={209} />

      {/* 8. FAQ */}
      <section className="theme-light">
        <div className={`wrap ${topAfterBand} ${bottomBeforeBand}`}>
          <SectionHeader label={label("FAQ")} note="Zanim napiszesz" title="FAQ" count={service.faq.length} />
          <FadeIn className="grid-12 mt-10 md:mt-16">
            <div className="col-span-12 lg:col-span-9 lg:col-start-4">
              <Faq items={service.faq} />
            </div>
          </FadeIn>
        </div>
      </section>

      <PixelTransition from="light" to="dark" seed={211} />

      {/* 9. CTA */}
      <CtaSection label={label("Kontakt")} subject={subject} />
    </>
  );
}
