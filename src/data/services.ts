import type { ProjectCategory } from "./projects";

export type Item = { name: string; text: string };
export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  number: string;
  name: string;
  /** Jedno zdanie: lista usług na stronie głównej, stopka, wiersze. */
  short: string;
  /** Jedno zdanie o wartości: hero podstrony. */
  value: string;
  /** 2–3 zdania: rozwinięta wersja na /uslugi. */
  intro: string;
  /** Pełny zakres. Pierwsze pozycje są najważniejsze: trafiają na stronę główną i /uslugi. */
  scope: Item[];
  /** 3 typowe problemy klienta. */
  problems: Item[];
  /** Proces w 3–7 krokach. */
  process: Item[];
  processTitle: string;
  stack: string[];
  faq: Faq[];
  /** Kategoria realizacji powiązanych z usługą. */
  projectCategory: ProjectCategory;
  /** Sekcja „Masz już sklep na Magento?” i podobne: lista bez opisów. */
  existing?: { title: string; items: Item[] };
  /** Porównanie wariantów (np. Luma / Hyvä / headless). Na mobile karty zamiast tabeli. */
  comparison?: { title: string; columns: string[]; rows: { label: string; values: string[] }[] };
};

/** „Co dostajesz”: wspólne dla wszystkich usług. */
export const deliverables: Item[] = [
  { name: "Raport", text: "Stan wyjściowy, ryzyka i rekomendacje z priorytetami. Wiesz, co robimy i dlaczego." },
  { name: "Kod", text: "W Twoim repozytorium, po code review i z testami. Prawa autorskie przechodzą na Ciebie." },
  { name: "Dokumentacja", text: "Architektura, konfiguracja i instrukcje wdrożenia, pisane razem z kodem." },
  { name: "Szkolenie", text: "Dla zespołu, który będzie z systemu korzystał albo go dalej rozwijał." },
];

export const services: Service[] = [
  {
    slug: "magento",
    number: "001",
    name: "Magento",
    short: "Nowe sklepy, migracje z PrestaShop i WooCommerce, Hyvä, hurtownie z cennikami per klient, hosting i moduły.",
    value: "Magento, które nie zwalnia przy dużym katalogu i nie sypie się po aktualizacji.",
    intro:
      "Budujemy i rozwijamy sklepy na Magento 2: od nowych wdrożeń i migracji, przez sklepy hurtowni i producentów z cennikami per klient, po zarządzany hosting i gotowe moduły. Przyspieszamy istniejące sklepy motywem Hyvä i przygotowujemy je do sprzedaży za granicą.",
    scope: [
      {
        name: "Sklepy dla hurtowni i producentów",
        text: "Cenniki indywidualne, konta firmowe z wieloma użytkownikami, szybkie zamówienia po SKU i limity kupieckie.",
      },
      {
        name: "Hyvä i przyspieszanie sklepów",
        text: "Wdrożenie motywu Hyvä, konfiguracja Varnish, Redis i OpenSearch, praca nad Core Web Vitals.",
      },
      {
        name: "Migracje",
        text: "Z PrestaShop, WooCommerce, Shopera i starych wersji Magento: produkty, klienci, zamówienia i przekierowania 301, które chronią SEO.",
      },
      {
        name: "Ekspansja zagraniczna",
        text: "Multistore, wiele języków i walut, VAT OSS oraz lokalne metody płatności.",
      },
      {
        name: "AI w sklepie",
        text: "Opisy produktów, tłumaczenia, wyszukiwarka semantyczna i chatbot odpowiadający na podstawie danych sklepu.",
      },
      {
        name: "Gotowe moduły Magento",
        text: "Rozszerzenia, które rozwijamy i wdrażamy u wielu klientów, zamiast za każdym razem pisać wszystko od zera.",
      },
      {
        name: "Hosting zarządzany Magento",
        text: "Serwery skonfigurowane pod Magento, z kopiami zapasowymi, monitoringiem i aktualizacjami.",
      },
      {
        name: "Nowe sklepy",
        text: "Magento 2 Open Source albo Adobe Commerce, od specyfikacji po start z planem awaryjnym.",
      },
      {
        name: "Headless i PWA",
        text: "Frontend w Next.js na GraphQL Magento, gdy sklep potrzebuje pełnej swobody interfejsu.",
      },
      {
        name: "Bezpieczeństwo",
        text: "Security patche, audyt modułów firm trzecich, 2FA i niestandardowy adres panelu admina, hardening serwera i WAF.",
      },
    ],
    problems: [
      {
        name: "Wolny sklep i spadająca konwersja",
        text: "Strony ładują się długo, Core Web Vitals są na czerwono, a klienci porzucają koszyki.",
      },
      {
        name: "Drogie utrzymanie po poprzedniej agencji",
        text: "Każda zmiana trwa tygodniami, moduły są nieaktualne, a nikt nie chce brać odpowiedzialności za kod.",
      },
      {
        name: "Platforma nie nadąża za wzrostem",
        text: "Sprzedaż hurtowa, drugi kraj albo katalog liczony w dziesiątkach tysięcy SKU, a sklep już ledwo daje radę.",
      },
    ],
    processTitle: "Proces wdrożenia",
    process: [
      { name: "Analiza i specyfikacja", text: "Procesy sprzedaży, integracje, dane do migracji i zakres pierwszego etapu." },
      { name: "UX i UI", text: "Ścieżki zakupowe i projekt interfejsu, także dla klientów hurtowych." },
      { name: "Development w sprintach", text: "Działająca wersja na środowisku testowym po każdym sprincie." },
      { name: "Migracja danych", text: "Produkty, klienci, zamówienia i przekierowania 301, z próbną migracją przed startem." },
      { name: "Testy", text: "Wydajnościowe, bezpieczeństwa i akceptacyjne (UAT) z Twoim zespołem." },
      { name: "Go-live z planem awaryjnym", text: "Start w ustalonym oknie, z możliwością szybkiego powrotu." },
      { name: "Opieka powdrożeniowa", text: "Monitoring, poprawki i dalszy rozwój w abonamencie." },
    ],
    existing: {
      title: "Masz już sklep na Magento?",
      items: [
        { name: "Audyt techniczny", text: "Kod, moduły, wydajność i bezpieczeństwo, z listą rzeczy do zrobienia w kolejności." },
        { name: "Upgrade do 2.4.x", text: "Aktualizacja do wspieranej wersji razem z modułami i motywem." },
        { name: "Przejście na Hyvä", text: "Nowy frontend bez przepisywania całego sklepu." },
        { name: "Naprawa wydajności", text: "Cache, indeksy, zapytania i konfiguracja serwera." },
        { name: "Przejęcie od innej agencji", text: "Przejmujemy repozytorium, serwery i wiedzę, bez przerwy w sprzedaży." },
      ],
    },
    comparison: {
      title: "Luma, Hyvä czy headless?",
      columns: ["Luma", "Hyvä", "Headless"],
      rows: [
        {
          label: "Wydajność",
          values: [
            "Wymaga sporo optymalizacji, żeby osiągnąć dobre Core Web Vitals.",
            "Lekki frontend, dobre wyniki bez dużego nakładu pracy.",
            "Najwięcej kontroli nad wydajnością, ale też najwięcej pracy.",
          ],
        },
        {
          label: "Czas wdrożenia",
          values: [
            "Najkrótszy start, bo to domyślny motyw Magento.",
            "Krótki: większość modułów ma gotową kompatybilność.",
            "Najdłuższy: frontend powstaje jako osobna aplikacja.",
          ],
        },
        {
          label: "Elastyczność",
          values: [
            "Ograniczona przez starszy stos frontendowy.",
            "Duża w ramach Magento, nowoczesny i prosty stos.",
            "Pełna: dowolny interfejs i wiele kanałów sprzedaży.",
          ],
        },
        {
          label: "Dla kogo",
          values: [
            "Sklepy, które chcą tylko utrzymać obecny frontend.",
            "Większość sklepów detalicznych i hurtowych, które chcą przyspieszyć.",
            "Marki z nietypowym interfejsem albo wieloma frontami.",
          ],
        },
      ],
    },
    stack: ["Magento 2", "Adobe Commerce", "Hyvä", "PHP 8", "MySQL / MariaDB", "OpenSearch", "Redis", "Varnish", "RabbitMQ", "GraphQL", "Docker"],
    faq: [
      {
        q: "Ile trwa wdrożenie sklepu na Magento?",
        a: "To zależy od zakresu, integracji i ilości danych do migracji. Termin podajemy po etapie analizy, razem z harmonogramem podzielonym na etapy.",
      },
      {
        q: "Magento Open Source czy Adobe Commerce?",
        a: "Open Source wystarcza większości sklepów, także hurtowych, z modułami i integracjami. Adobe Commerce ma sens, gdy potrzebujesz jego wbudowanych funkcji i wsparcia producenta. Pomagamy policzyć, co się bardziej opłaca.",
      },
      {
        q: "Czy migracja zaszkodzi SEO?",
        a: "Nie, jeśli jest dobrze przygotowana. Mapujemy adresy, ustawiamy przekierowania 301, przenosimy metadane i sprawdzamy indeksowanie po starcie.",
      },
      {
        q: "Do kogo należy kod sklepu?",
        a: "Do Ciebie. Kod jest w Twoim repozytorium, a po rozliczeniu przenosimy autorskie prawa majątkowe. Wyjątkiem są nasze gotowe moduły, na które dostajesz licencję.",
      },
      {
        q: "Czy przejmiecie sklep od innej agencji?",
        a: "Tak. Zaczynamy od audytu i przejęcia dostępów, repozytorium i dokumentacji, a potem przejmujemy utrzymanie bez przerwy w sprzedaży.",
      },
      {
        q: "Co po starcie sklepu?",
        a: "Proponujemy abonament utrzymaniowy z SLA: aktualizacje i security patche, monitoring, kopie zapasowe oraz czas na dalszy rozwój.",
      },
    ],
    projectCategory: "Magento",
  },
  {
    slug: "aplikacje-webowe",
    number: "002",
    name: "Aplikacje webowe",
    short: "MVP produktu, panel dla klientów i handlowców, dashboard z danych z kilku systemów, frontend headless.",
    value: "Panele, SaaS i narzędzia wewnętrzne, które zastępują Excela i maile.",
    intro:
      "Projektujemy i budujemy aplikacje webowe od MVP po dojrzały produkt: SaaS, panele dla klientów i handlowców, dashboardy. Tworzymy też frontendy headless i PWA dla sklepów, które potrzebują szybkości aplikacji.",
    scope: [
      { name: "SaaS i MVP", text: "Pierwsza wersja produktu w krótkim czasie, z architekturą, która pozwoli go rozwijać." },
      { name: "Panele dla klientów i handlowców", text: "Zamówienia, faktury, reklamacje i dokumenty w jednym miejscu zamiast maili i arkuszy." },
      { name: "Dashboardy i raporty", text: "Dane z wielu systemów na jednym ekranie, z uprawnieniami dla różnych ról." },
      { name: "Headless i PWA", text: "Szybkie frontendy dla sklepów i serwisów, działające także jako aplikacja na telefonie." },
      { name: "API i integracje", text: "Połączenia z ERP, CRM, płatnościami i usługami zewnętrznymi." },
      { name: "Utrzymanie i rozwój", text: "Monitoring, aktualizacje i kolejne funkcje w stałym rytmie." },
    ],
    problems: [
      { name: "Pomysł na produkt bez zespołu technicznego", text: "Wiesz, co chcesz zbudować, ale nie masz ludzi, którzy przeprowadzą to od zera do produkcji." },
      { name: "Arkusze i maile zamiast panelu", text: "Klienci i handlowcy pracują na plikach, a informacje giną po drodze." },
      { name: "Stara aplikacja, której nikt nie chce ruszać", text: "Każda zmiana grozi awarią, a technologia przestała być wspierana." },
    ],
    processTitle: "Proces",
    process: [
      { name: "Warsztat i zakres MVP", text: "Cel, użytkownicy i najmniejszy zakres, który da się sprawdzić na rynku." },
      { name: "Projekt UX i UI", text: "Kluczowe ekrany i ścieżki, przetestowane przed developmentem." },
      { name: "Sprinty", text: "Działająca wersja po każdym sprincie, z demo dla Twojego zespołu." },
      { name: "Start", text: "Wdrożenie produkcyjne z monitoringiem i planem awaryjnym." },
      { name: "Rozwój", text: "Kolejne funkcje na podstawie danych z użycia." },
    ],
    stack: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Supabase", "GraphQL", "Docker", "AWS", "Cloudflare"],
    faq: [
      {
        q: "Ile kosztuje MVP?",
        a: "Zależy od zakresu. Po warsztacie dostajesz wycenę etapu MVP w modelu fixed price albo szacunek do rozliczenia time & material.",
      },
      {
        q: "Czy aplikacja będzie działać na telefonie?",
        a: "Tak. Projektujemy interfejsy responsywne, a gdy ma to sens, budujemy PWA, które można zainstalować na telefonie.",
      },
      {
        q: "Czy możecie przejąć istniejącą aplikację?",
        a: "Tak. Zaczynamy od audytu kodu i infrastruktury, a potem proponujemy plan: naprawę, stopniową przebudowę albo dalszy rozwój.",
      },
      {
        q: "Gdzie będzie hostowana aplikacja?",
        a: "Tam, gdzie ma to największy sens: w Twojej chmurze, na naszym zarządzanym hostingu albo na platformie typu Vercel czy AWS.",
      },
    ],
    projectCategory: "Aplikacje webowe",
  },
  {
    slug: "automatyzacje",
    number: "003",
    name: "Automatyzacje",
    short: "Integracje z Comarch, enova, Subiektem i SAP B1, KSeF, Allegro i Amazonem, Akeneo i Pimcore.",
    value: "Zamówienie z Allegro trafia do ERP, faktura do KSeF, stan wraca do sklepu. Bez nikogo po drodze.",
    intro:
      "Łączymy sklep z ERP, KSeF, marketplace'ami i PIM, żeby zamówienia, stany, ceny i faktury nie wymagały ręcznego przepisywania. Tam, gdzie to ma sens, dokładamy AI do pracy z dokumentami.",
    scope: [
      {
        name: "Integracje Magento z ERP",
        text: "Comarch ERP, enova365, Subiekt, Symfonia i SAP Business One: zamówienia, stany, ceny i dokumenty w obie strony.",
      },
      { name: "Integracje z KSeF", text: "Wysyłka i odbiór e-faktur z ERP albo sklepu, statusy i numery KSeF zapisywane automatycznie." },
      {
        name: "Integracje z marketplace'ami",
        text: "Allegro, Amazon, Empik, Erli i Kaufland: oferty, stany i zamówienia zarządzane z jednego miejsca.",
      },
      { name: "Wdrożenia PIM", text: "Akeneo albo Pimcore jako jedno źródło danych produktowych dla sklepu i marketplace'ów." },
      { name: "Automatyzacje procesów", text: "Powiadomienia, raporty i synchronizacje uruchamiane harmonogramem albo zdarzeniem." },
      { name: "AI w dokumentach", text: "Ekstrakcja danych z faktur i umów oraz asystent odpowiadający na podstawie dokumentów firmy." },
    ],
    problems: [
      { name: "Ręczne przepisywanie zamówień do ERP", text: "Ktoś codziennie kopiuje dane między systemami, a każdy błąd wraca jako reklamacja." },
      { name: "Rozjechane stany i ceny", text: "Sklep, ERP i marketplace'y pokazują różne liczby, a towar sprzedaje się dwa razy." },
      { name: "KSeF bez integracji", text: "E-faktury trzeba obsługiwać, a obecne systemy nie są ze sobą połączone." },
    ],
    processTitle: "Proces",
    process: [
      { name: "Mapa procesów i danych", text: "Które dane, skąd, dokąd i jak często. Gdzie dziś powstają błędy." },
      { name: "Projekt integracji", text: "Kierunki synchronizacji, kolejki, obsługa błędów i alerty." },
      { name: "Budowa i testy", text: "Na kopii danych, zanim cokolwiek dotknie produkcji." },
      { name: "Uruchomienie z monitoringiem", text: "Każda synchronizacja jest logowana, a błędy trafiają do kolejki ponowień." },
      { name: "Utrzymanie", text: "Aktualizacje przy zmianach API po stronie ERP, KSeF i marketplace'ów." },
    ],
    stack: ["Node.js", "PHP", "Python", "REST", "GraphQL", "SOAP", "RabbitMQ", "KSeF API", "Akeneo", "Pimcore", "Docker"],
    faq: [
      {
        q: "Z jakimi systemami ERP się integrujecie?",
        a: "Najczęściej z Comarch ERP, enova365, Subiektem, Symfonią i SAP Business One. Inne systemy też, o ile mają API, bazę albo eksport, z którym da się bezpiecznie pracować.",
      },
      {
        q: "Czy pomożecie z KSeF?",
        a: "Tak. Integrujemy wysyłkę i odbiór e-faktur z ERP albo sklepem i zapisujemy numery KSeF przy dokumentach.",
      },
      {
        q: "Co się stanie, gdy integracja przestanie działać?",
        a: "Każda operacja trafia do kolejki z ponowieniami, a błędy wywołują alert. Nic nie ginie po cichu.",
      },
      {
        q: "Czy trzeba zmieniać ERP?",
        a: "Zwykle nie. Integrację budujemy wokół systemów, które już masz.",
      },
    ],
    projectCategory: "Automatyzacje",
  },
  {
    slug: "dla-duzych-firm",
    number: "004",
    name: "Dla dużych firm",
    short: "Oprogramowanie dedykowane, wymiana starych systemów etapami, RAG na własnych serwerach i stały zespół z SLA.",
    value: "Systemy, na których stoi firma, i AI, które nie wysyła danych na zewnątrz.",
    intro:
      "Dla większych organizacji budujemy systemy dedykowane, łączymy je z istniejącą infrastrukturą i przenosimy dane ze starych systemów. Wdrażamy AI na własnej infrastrukturze, gdy dane nie mogą opuścić firmy.",
    scope: [
      { name: "Oprogramowanie dedykowane", text: "Systemy wewnętrzne dopasowane do procesów firmy, a nie odwrotnie." },
      { name: "Migracje ze starych systemów", text: "Etapami, z równoległą pracą starego i nowego systemu, bez zatrzymywania firmy." },
      {
        name: "AI i RAG na własnej infrastrukturze",
        text: "Modele open-source albo komercyjne w prywatnej chmurze, z ewaluacją odpowiedzi i ochroną przed prompt injection.",
      },
      { name: "API i integracje", text: "SAP, CRM, hurtownie danych i systemy partnerów połączone przez udokumentowane API." },
      { name: "Bezpieczeństwo i zgodność", text: "RODO, minimalne uprawnienia, szyfrowanie i ślad audytowy zmian." },
      { name: "Zespół i SLA", text: "Stały zespół, czasy reakcji zapisane w umowie i raporty z każdego okresu." },
    ],
    problems: [
      { name: "System, który zna jedna osoba", text: "Kluczowy proces działa na oprogramowaniu, którego nikt nie odważy się zmienić." },
      { name: "Dane wrażliwe a narzędzia AI", text: "Chcesz korzystać z AI, ale dane nie mogą trafić do publicznych usług." },
      { name: "Systemy, które ze sobą nie rozmawiają", text: "Te same dane wprowadza się w kilku miejscach, a raporty się nie zgadzają." },
    ],
    processTitle: "Proces",
    process: [
      { name: "Discovery i audyt", text: "Procesy, systemy, dane i ryzyka. Rozmowy z ludźmi, którzy z nich korzystają." },
      { name: "Architektura i plan migracji", text: "Docelowy układ systemów i kolejność przenoszenia danych." },
      { name: "Budowa w sprintach", text: "Działające fragmenty na środowisku testowym, z odbiorami po każdym sprincie." },
      { name: "Wdrożenie etapami", text: "Każdy etap ma plan awaryjny i kryteria odbioru." },
      { name: "Utrzymanie i SLA", text: "Monitoring, aktualizacje i rozwój w ramach umowy." },
    ],
    stack: ["TypeScript", "Node.js", "Python", "PostgreSQL", "pgvector", "LangChain", "Docker", "Kubernetes", "AWS", "OpenAI", "Anthropic"],
    faq: [
      {
        q: "Czy podpisujecie NDA i umowy powierzenia danych?",
        a: "Tak. NDA przed rozmową o szczegółach, a umowę powierzenia przetwarzania danych przed startem prac.",
      },
      {
        q: "Gdzie działają modele AI?",
        a: "Tam, gdzie zdecydujesz: w Twojej infrastrukturze, w prywatnej chmurze albo przez API dostawcy z umową, która wyklucza trenowanie na Twoich danych.",
      },
      {
        q: "Czy pracujecie razem z naszym zespołem IT?",
        a: "Tak. Możemy przejąć cały projekt albo pracować w jednym repozytorium z Twoimi programistami, według wspólnych zasad code review.",
      },
      {
        q: "Jak wygląda migracja ze starego systemu?",
        a: "Etapami. Najpierw dane i integracje, potem kolejne moduły, a przez okres przejściowy oba systemy działają równolegle.",
      },
    ],
    projectCategory: "Dla dużych firm",
  },
  {
    slug: "safe-control",
    number: "005",
    name: "Safe Control",
    short: "Audyt bezpieczeństwa, wydajności i dostępności (EAA), pentesty i abonament: patche, monitoring, backup.",
    value: "Wiesz, co jest dziurawe, zanim dowie się o tym ktoś inny.",
    intro:
      "Safe Control to audyty i stała opieka. Sprawdzamy sklepy i aplikacje pod kątem techniki, bezpieczeństwa, konwersji i dostępności, a potem pilnujemy ich w abonamencie SLA z aktualizacjami, monitoringiem i kopiami zapasowymi.",
    scope: [
      { name: "Audyty sklepów", text: "Techniczne, bezpieczeństwa i konwersji, z raportem ułożonym od krytycznych do niskich." },
      { name: "Dostępność i EAA", text: "Audyt według WCAG i dostosowanie sklepu do wymagań European Accessibility Act." },
      { name: "Abonament SLA", text: "Aktualizacje, monitoring i kopie zapasowe, z czasami reakcji zapisanymi w umowie." },
      { name: "Testy penetracyjne", text: "Według OWASP, w uzgodnionym zakresie i oknie czasowym." },
      { name: "Hardening", text: "Serwery, CMS i wtyczki (WooCommerce, PrestaShop, Magento, Shopify), WAF, CDN i kopie zapasowe." },
      { name: "Przegląd kont i uprawnień", text: "Kto ma dostęp do czego i czy powinien go mieć." },
      { name: "Raport, naprawa i retest", text: "Plan naprawy z priorytetami, poprawki i ponowny test, który potwierdza efekt." },
    ],
    problems: [
      { name: "Nikt nie wie, czy sklep jest bezpieczny", text: "Ostatni audyt był dawno albo nigdy, a sklep obsługuje płatności i dane klientów." },
      { name: "EAA obowiązuje, a sklep nie jest dostępny", text: "Wymagania dostępności dotyczą także sklepów internetowych." },
      { name: "Aktualizacje odkładane latami", text: "Każda aktualizacja to ryzyko, więc nikt jej nie robi, a luk przybywa." },
    ],
    processTitle: "Jak wygląda audyt",
    process: [
      { name: "Zakres i zgody", text: "Ustalamy, co testujemy, w jakim oknie czasowym i na jakich zasadach." },
      { name: "Skan i testy", text: "Testy automatyczne i ręczne według OWASP, WCAG i dobrych praktyk platformy." },
      { name: "Raport", text: "Znaleziska od krytycznych do niskich, z opisem ryzyka i sposobu naprawy." },
      { name: "Naprawa", text: "Poprawiamy sami albo wspieramy Twój zespół." },
      { name: "Retest", text: "Ponowny test potwierdza, że luki są zamknięte." },
    ],
    stack: ["OWASP", "Burp Suite", "OWASP ZAP", "Nmap", "WCAG 2.1", "axe", "Lighthouse", "Cloudflare", "Sentry"],
    faq: [
      {
        q: "Czym jest EAA i czy dotyczy mojego sklepu?",
        a: "European Accessibility Act to unijne wymagania dostępności, które od 28 czerwca 2025 roku obejmują m.in. sklepy internetowe. Audyt pokaże, co trzeba poprawić w Twoim przypadku.",
      },
      {
        q: "Czy testy mogą wyłączyć sklep?",
        a: "Testy planujemy w uzgodnionym oknie, a te, które mogą obciążyć sklep, wykonujemy na kopii środowiska.",
      },
      {
        q: "Co obejmuje abonament SLA?",
        a: "Aktualizacje i security patche, monitoring dostępności i błędów, kopie zapasowe z testem odtworzenia oraz ustalone czasy reakcji.",
      },
      {
        q: "Ile trwa audyt?",
        a: "Zależy od zakresu i wielkości systemu. Termin podajemy po ustaleniu zakresu, przed startem prac.",
      },
    ],
    projectCategory: "Safe Control",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
