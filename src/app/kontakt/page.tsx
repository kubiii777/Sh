import Link from "next/link";
import { PixelTransition } from "@/components/pixel/PixelTransition";
import { Arrow } from "@/components/ui/Arrow";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { mailto, site } from "@/config/site";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/metadata";
import { bottom, topAfterBand, two } from "@/lib/spacing";

export const metadata = pageMetadata({
  title: "Kontakt",
  description: "Opowiedz nam o projekcie. Napisz maila albo umów 30-minutową rozmowę. Odpowiadamy w ciągu 24 godzin roboczych.",
  path: "/kontakt",
});

const tips = [
  { name: "Kim jesteście", text: "Firma, branża i osoba do kontaktu." },
  { name: "Co chcecie osiągnąć", text: "Cel biznesowy, a nie tylko lista funkcji." },
  { name: "Co już macie", text: "Platforma, systemy, integracje i to, co dziś nie działa." },
  { name: "Termin i budżet", text: "Nawet orientacyjne widełki pomagają dobrać zakres." },
];

export default function ContactPage() {
  return (
    <>
      <section className="theme-dark dots">
        <div className="wrap pb-14 pt-14 md:pt-20 lg:pb-16 lg:pt-24">
          <p className="label flex justify-between gap-6 border-t border-line pt-4 text-mute">
            <span>Kontakt</span>
            <span className="text-right">Odpowiadamy w ciągu 24h roboczych</span>
          </p>
          <h1 className="display mt-8 max-w-[14ch] md:mt-12">Opowiedz nam o projekcie.</h1>

          <div className="mt-10 border-t border-line pt-8 md:mt-16">
            <p className="label text-mute">Email</p>
            <a
              href={mailto()}
              className="mt-3 block break-all text-[clamp(1.75rem,5.4vw,5rem)] font-medium leading-none tracking-[-0.045em] underline decoration-1 underline-offset-[0.12em] hover:text-mute"
            >
              {site.email}
            </a>
          </div>

          <div className="grid-12 mt-10 gap-y-8 border-t border-line pt-8 md:mt-14">
            <dl className="col-span-12 grid gap-y-6 sm:grid-cols-2 lg:col-span-7">
              <div>
                <dt className="label text-mute">Telefon</dt>
                <dd className="mt-2 text-[1.25rem]">{site.phone}</dd>
              </div>
              <div>
                <dt className="label text-mute">Adres</dt>
                <dd className="mt-2 text-[1.25rem]">{site.address}</dd>
              </div>
            </dl>
            <div className="col-span-12 flex flex-col gap-4 sm:flex-row lg:col-span-5 lg:justify-end">
              <Button href={mailto("Nowy projekt")} className="w-full sm:w-auto">
                Napisz maila <Arrow />
              </Button>
              <Button href={site.calendar} variant="outline" className="w-full sm:w-auto">
                Umów 30-min rozmowę
              </Button>
            </div>
          </div>
        </div>
      </section>

      <PixelTransition from="dark" to="light" seed={601} />

      <section className="theme-light">
        <div className={`wrap ${topAfterBand} ${bottom} grid-12 gap-y-16`}>
          <div className="col-span-12 lg:col-span-6">
            <SectionHeader label=".01 — Pierwszy mail" note="Żeby szybciej odpowiedzieć" title="Co napisać" />
            <ol className="mt-10 border-b border-line md:mt-16">
              {tips.map((tip, i) => (
                <li key={tip.name} className="flex gap-5 border-t border-line py-5">
                  <span className="label pt-1 text-mute">{two(i + 1)}</span>
                  <div>
                    <h3 className="text-[1.25rem] font-medium tracking-[-0.02em]">{tip.name}</h3>
                    <p className="mt-1 text-[1rem] text-mute">{tip.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-[1rem] text-mute">
              Możemy podpisać NDA przed rozmową o szczegółach. Dane z wiadomości przetwarzamy zgodnie z{" "}
              <Link href="/polityka-prywatnosci" className="underline underline-offset-4 hover:text-fg">
                polityką prywatności
              </Link>
              .
            </p>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <SectionHeader label=".02 — Temat" note="Mail z gotowym tematem" title="W sprawie" />
            <ul className="mt-10 border-b border-line md:mt-16">
              {services.map((service) => (
                <li key={service.slug} className="border-t border-line">
                  <a
                    href={mailto(`Zapytanie: ${service.name}`)}
                    className="group flex min-h-16 items-center justify-between gap-4 py-4 hover:text-mute"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="label text-mute">{service.number}</span>
                      <span className="text-[1.25rem] font-medium tracking-[-0.02em]">{service.name}</span>
                    </span>
                    <Arrow className="text-[1.25rem]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
