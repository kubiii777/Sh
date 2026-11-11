import { PixelTransition } from "@/components/pixel/PixelTransition";
import { CtaSection } from "@/components/sections/CtaSection";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { bottomBeforeBand, top, topAfterBand, two } from "@/lib/spacing";

export const metadata = pageMetadata({
  title: "O nas",
  description: "Kim jesteśmy, w co wierzymy i jak współpracujemy: fixed price, time & material albo abonament utrzymaniowy.",
  path: "/o-nas",
});

const values = [
  { name: "Bezpieczeństwo od pierwszego commita", text: "Nie ma u nas etapu „zabezpieczymy na końcu”. Code review, testy i osobne klucze dla każdego środowiska są od pierwszego dnia." },
  { name: "Wycena z listą tego, czego w niej nie ma", text: "Zakres, termin i wykluczenia na piśmie. Jeśli czegoś nie wiemy, mówimy to przed podpisaniem umowy, a nie po." },
  { name: "Możesz od nas odejść", text: "Repozytorium, serwery i hasła są na Twoich kontach od pierwszego dnia. Zmiana agencji to przekazanie dostępów, a nie negocjacje." },
  { name: "Wolimy lata niż jednorazowe projekty", text: "System, który ktoś zna od lat, naprawia się w godzinę, a nie w tydzień. Dlatego wolimy utrzymywać to, co zbudowaliśmy." },
];

const models = [
  { name: "Fixed price", text: "Stała cena za dobrze opisany zakres. Dobre dla audytów, MVP i zamkniętych etapów." },
  { name: "Time & material", text: "Rozliczenie za czas pracy, z raportem po każdym sprincie. Dobre, gdy zakres będzie się zmieniał." },
  { name: "Abonament utrzymaniowy", text: "Stała opieka z SLA: aktualizacje, monitoring, kopie zapasowe i godziny na rozwój." },
];

const team = [1, 2, 3, 4].map((i) => ({ name: `[Imię i nazwisko ${i}]`, role: "[Rola]", linkedin: "#" }));
const certificates = [1, 2, 3, 4].map((i) => `[Certyfikat ${i}]`);

export default function AboutPage() {
  return (
    <>
      {/* 1. Manifest */}
      <section className="theme-dark dots">
        <div className="wrap pb-14 pt-14 md:pt-20 lg:pb-16 lg:pt-24">
          <p className="label border-t border-line pt-4 text-mute">O nas</p>
          <h1 className="sr-only">O nas</h1>
          <p className="mt-8 text-[clamp(2rem,4.6vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.045em] md:mt-12">
            Budujemy sklepy na Magento, integracje z ERP i KSeF oraz aplikacje webowe. Potem ich pilnujemy.{" "}
            <span className="text-mute">
              Zanim coś wycenimy, czytamy kod i logi. Zanim coś wdrożymy, ktoś drugi czyta nasz kod. A gdy system już
              działa, to do nas, a nie do Ciebie, przychodzi alert, kiedy coś przestaje działać.
            </span>
          </p>
        </div>
      </section>

      <PixelTransition from="dark" to="light" seed={501} />

      {/* 2. Wartości i 3. Modele współpracy */}
      <section className="theme-light">
        <div className={`wrap ${topAfterBand}`}>
          <FadeIn>
            <SectionHeader label=".01 — Wartości" note="Na tym opieramy każdy projekt" title="Wartości" count={values.length} />
            <ul className="mt-10 border-b border-line md:mt-16 md:grid md:grid-cols-2 md:gap-x-6">
              {values.map((value, i) => (
                <li key={value.name} className="border-t border-line py-8">
                  <p className="label text-mute">{two(i + 1)}</p>
                  <h3 className="h3 mt-4">{value.name}</h3>
                  <p className="mt-3 max-w-[32rem] text-mute">{value.text}</p>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
        <div className={`wrap ${top} ${bottomBeforeBand}`}>
          <SectionHeader label=".02 — Współpraca" note="Bez cen, bo zależą od zakresu" title="Modele współpracy" />
          <ul className="mt-10 border-y border-line md:mt-16 lg:grid lg:grid-cols-3">
            {models.map((model, i) => (
              <li
                key={model.name}
                className="border-t border-line py-8 first:border-t-0 lg:border-l lg:border-t-0 lg:px-8 lg:py-10 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
              >
                <p className="label text-mute">{two(i + 1)}</p>
                <h3 className="h3 mt-6">{model.name}</h3>
                <p className="mt-4 text-mute">{model.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PixelTransition from="light" to="dark" seed={503} />

      {/* 4. Zespół i 5. Certyfikaty */}
      <section className="theme-dark dots">
        <div className={`wrap ${topAfterBand}`}>
          <SectionHeader label=".03 — Zespół" note="Ludzie, z którymi pracujesz" title="Zespół" count={team.length} />
          <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
            {team.map((person, i) => (
              <li key={person.name}>
                <div className="flex aspect-[4/5] items-end border border-line p-4">
                  <span className="label text-mute">[Zdjęcie {two(i + 1)}]</span>
                </div>
                <h3 className="mt-4 text-[1.25rem] font-medium tracking-[-0.02em]">{person.name}</h3>
                <p className="label mt-2 text-mute">{person.role}</p>
                <a href={person.linkedin} className="label mt-3 inline-flex min-h-11 items-center hover:text-mute">
                  LinkedIn <span className="sr-only">: {person.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={`wrap ${top} ${bottomBeforeBand}`}>
          <SectionHeader label=".04 — Certyfikaty" note="Do uzupełnienia" title="Certyfikaty" />
          <ul className="mt-10 grid grid-cols-2 border-l border-t border-line md:mt-16 lg:grid-cols-4">
            {certificates.map((cert) => (
              <li key={cert} className="label flex aspect-[3/2] items-center justify-center border-b border-r border-line text-mute">
                {cert}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[1rem] text-mute">
            {site.name}: NIP {site.nip}, KRS {site.krs}.
          </p>
        </div>
      </section>

      <CtaSection label=".05 — Kontakt" />
    </>
  );
}
