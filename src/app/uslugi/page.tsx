import Link from "next/link";
import { PixelTransition } from "@/components/pixel/PixelTransition";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { Arrow } from "@/components/ui/Arrow";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/metadata";
import { bottomBeforeBand, topAfterBand } from "@/lib/spacing";

export const metadata = pageMetadata({
  title: "Usługi",
  description:
    "Magento, aplikacje webowe, automatyzacje i integracje (ERP, KSeF, marketplace'y), oprogramowanie dla dużych firm i Safe Control: audyty, EAA i SLA.",
  path: "/uslugi",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Usługi"
        title="Pięć obszarów, jedna metoda."
        lead="Od wdrożeń Magento po stałą kontrolę bezpieczeństwa. Każdą usługę prowadzimy tak samo: audyt, projekt, sprinty, wdrożenie i utrzymanie."
      />

      <PixelTransition from="dark" to="light" seed={101} />

      <section className="theme-light">
        <div className={`wrap ${topAfterBand} ${bottomBeforeBand}`}>
          <h2 className="sr-only">Lista usług</h2>
          <ul className="border-b border-line">
            {services.map((service) => (
              <li key={service.slug} id={service.slug} className="grid-12 gap-y-6 border-t border-line py-10 md:py-16">
                <p className="label col-span-12 text-mute lg:col-span-1">{service.number}</p>
                <div className="col-span-12 lg:col-span-5">
                  <h3 className="h2">
                    <Link href={`/uslugi/${service.slug}`} className="hover:text-mute">
                      {service.name}
                    </Link>
                  </h3>
                </div>
                <div className="col-span-12 lg:col-span-6">
                  <p className="lead">{service.intro}</p>
                  <ul className="mt-8 grid gap-x-6 sm:grid-cols-2">
                    {service.scope.slice(0, 4).map((item) => (
                      <li key={item.name} className="border-t border-line py-3 text-[1rem]">
                        {item.name}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/uslugi/${service.slug}`}
                    className="label mt-6 inline-flex min-h-12 items-center gap-3 border border-fg px-6 transition-colors duration-150 hover:bg-fg hover:text-bg"
                  >
                    Więcej o usłudze <span className="sr-only">{service.name}</span> <Arrow />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PixelTransition from="light" to="dark" seed={103} />

      <CtaSection label="Kontakt" />
    </>
  );
}
