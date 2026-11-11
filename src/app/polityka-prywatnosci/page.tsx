import { mailto, site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { bottom, two } from "@/lib/spacing";

export const metadata = pageMetadata({
  title: "Polityka prywatności",
  description: "Kto jest administratorem danych, jakie dane przetwarzamy, w jakim celu i jakie masz prawa.",
  path: "/polityka-prywatnosci",
});

// Struktura zgodna z art. 13 RODO. Dane w nawiasach do uzupełnienia; treść do weryfikacji prawnej przed startem.
const sections: { title: string; body: string[] }[] = [
  {
    title: "Administrator danych",
    body: [
      `Administratorem danych osobowych jest ${site.legalName} z siedzibą: ${site.address}, NIP ${site.nip}, KRS ${site.krs} („Administrator”).`,
      `W sprawach danych osobowych można pisać na adres ${site.email}.`,
    ],
  },
  {
    title: "Jakie dane przetwarzamy",
    body: [
      "Dane, które podajesz w wiadomości email: imię i nazwisko, adres email, nazwę firmy, numer telefonu oraz treść wiadomości.",
      "Dane techniczne zapisywane w logach serwera: adres IP, data i godzina wizyty, typ przeglądarki. Służą bezpieczeństwu i diagnostyce.",
    ],
  },
  {
    title: "Cele i podstawy przetwarzania",
    body: [
      "Odpowiedź na wiadomość i przygotowanie oferty: art. 6 ust. 1 lit. b RODO (działania przed zawarciem umowy) oraz lit. f (prawnie uzasadniony interes Administratora).",
      "Zapewnienie bezpieczeństwa strony: art. 6 ust. 1 lit. f RODO.",
      "Ustalenie, dochodzenie lub obrona roszczeń: art. 6 ust. 1 lit. f RODO.",
    ],
  },
  {
    title: "Okres przechowywania",
    body: [
      "Korespondencję przechowujemy przez czas potrzebny do jej obsługi, a następnie przez [okres] na wypadek roszczeń.",
      "Logi serwera przechowujemy przez [okres].",
    ],
  },
  {
    title: "Odbiorcy danych",
    body: [
      "Dostawcy usług, z których korzystamy: hosting strony [dostawca], poczta email [dostawca]. Przetwarzają dane na podstawie umów powierzenia.",
      "Przekazanie danych poza Europejski Obszar Gospodarczy: [opis albo „nie dotyczy”].",
    ],
  },
  {
    title: "Twoje prawa",
    body: [
      "Masz prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia oraz prawo sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie.",
      "Masz prawo wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych.",
      "Podanie danych jest dobrowolne, ale bez nich nie odpowiemy na wiadomość.",
    ],
  },
  {
    title: "Pliki cookies",
    body: [
      "Strona nie używa plików cookies analitycznych ani marketingowych. Jeśli to się zmieni, zaktualizujemy tę politykę i poprosimy o zgodę.",
    ],
  },
  {
    title: "Zmiany polityki",
    body: ["Aktualna wersja polityki jest zawsze dostępna na tej stronie. Data ostatniej zmiany: [data]."],
  },
];

export default function PrivacyPage() {
  return (
    <section className="theme-light">
      <div className={`wrap pt-14 md:pt-20 lg:pt-24 ${bottom}`}>
        <p className="label border-t border-line pt-4 text-mute">Dokument</p>
        <h1 className="display mt-8 md:mt-12">Polityka prywatności</h1>
        <div className="grid-12 mt-12 md:mt-20">
          <nav aria-label="Spis treści" className="col-span-12 mb-10 lg:col-span-3 lg:mb-0">
            <ol className="lg:sticky lg:top-24">
              {sections.map((section, i) => (
                <li key={section.title}>
                  <a href={`#s${i + 1}`} className="flex min-h-10 items-center gap-3 text-[1rem] text-mute hover:text-fg">
                    <span className="label">{two(i + 1)}</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="col-span-12 lg:col-span-8 lg:col-start-5">
            {sections.map((section, i) => (
              <section key={section.title} id={`s${i + 1}`} className="border-t border-line py-8 md:py-10">
                <h2 className="h3 flex gap-4">
                  <span className="label pt-2 text-mute">{two(i + 1)}</span>
                  {section.title}
                </h2>
                <div className="mt-4 max-w-[44rem] space-y-4 md:pl-10">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
            <p className="border-t border-line pt-8 text-mute">
              Pytania? Napisz:{" "}
              <a href={mailto("Dane osobowe")} className="underline underline-offset-4 hover:text-fg">
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
