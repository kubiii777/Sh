export const projectCategories = ["Magento", "Aplikacje webowe", "Automatyzacje", "Dla dużych firm", "Safe Control"] as const;
export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  year: string;
  /** Wszystkie projekty są demonstracyjne, dopóki nie zastąpią ich prawdziwe realizacje. */
  demo: true;
  featured?: boolean;
  client: string;
  industry: string;
  scope: string[];
  stack: string[];
  summary: string;
  challenge: string;
  solution: string[];
  /** Efekty bez wymyślonych liczb: wartość to placeholder do uzupełnienia. */
  results: { label: string; value: string }[];
  image: string;
  gallery: { src: string; alt: string }[];
  /** Renderowany tylko, gdy wypełniony. */
  quote?: { text: string; author: string };
};

const img = (slug: string, n?: number) => `/images/projects/${slug}${n ? `-${n}` : ""}.png`;
const gallery = (slug: string, name: string) => [
  { src: img(slug, 2), alt: `Grafika demonstracyjna: ${name}, szczegół 1` },
  { src: img(slug, 3), alt: `Grafika demonstracyjna: ${name}, szczegół 2` },
];

export const projects: Project[] = [
  {
    slug: "hurtownia-z-prestashop-na-magento",
    name: "Hurtownia: z PrestaShop na Magento 2",
    category: "Magento",
    year: "2026",
    demo: true,
    featured: true,
    client: "[Klient demo]",
    industry: "Hurtownia",
    scope: ["Migracja z PrestaShop", "Cenniki per klient", "Integracja z ERP", "Hyvä"],
    stack: ["Magento 2", "Hyvä", "PHP 8", "OpenSearch", "RabbitMQ"],
    summary: "Handlowcy przestali przepisywać zamówienia z maili: klienci zamawiają sami, po SKU, we własnym cenniku.",
    challenge:
      "Hurtownia sprzedawała na sklepie, który nie obsługiwał cenników indywidualnych ani kont firmowych. Handlowcy przyjmowali zamówienia mailem i przepisywali je do ERP.",
    solution: [
      "Migracja produktów, klientów i historii zamówień z przekierowaniami 301.",
      "Konta firmowe z wieloma użytkownikami, cenniki indywidualne i szybkie zamówienia po SKU.",
      "Dwukierunkowa integracja z ERP przez kolejkę z ponowieniami.",
      "Frontend na Hyvä.",
    ],
    results: [
      { label: "Zamówień składanych samodzielnie przez klientów", value: "[XX]%" },
      { label: "Krótszy czas obsługi zamówienia", value: "[XX]%" },
      { label: "Szybsze ładowanie strony kategorii", value: "[XX]%" },
    ],
    image: img("hurtownia-z-prestashop-na-magento"),
    gallery: gallery("hurtownia-z-prestashop-na-magento", "Hurtownia: z PrestaShop na Magento 2"),
  },
  {
    slug: "integracja-erp-ksef-allegro",
    name: "Integracja ERP, KSeF i Allegro",
    category: "Automatyzacje",
    year: "2026",
    demo: true,
    featured: true,
    client: "[Klient demo]",
    industry: "E-commerce",
    scope: ["Integracja z ERP", "KSeF", "Allegro", "Monitoring synchronizacji"],
    stack: ["Node.js", "RabbitMQ", "KSeF API", "Allegro API", "Docker"],
    summary: "Zamówienie z Allegro trafia do ERP, faktura do KSeF, a stan wraca do sklepu i na aukcję.",
    challenge:
      "Zamówienia z Allegro i sklepu trafiały do ERP ręcznie, stany rozjeżdżały się w ciągu dnia, a firma musiała przygotować się do KSeF.",
    solution: [
      "Synchronizacja zamówień, stanów i cen między sklepem, Allegro i ERP.",
      "Wysyłka e-faktur do KSeF z ERP i zapis numerów KSeF przy dokumentach.",
      "Kolejka z ponowieniami i alerty przy każdym błędzie.",
    ],
    results: [
      { label: "Mniej ręcznie przepisywanych zamówień", value: "[XX]%" },
      { label: "Mniej sprzedaży bez towaru na stanie", value: "[XX]%" },
      { label: "Faktur wysłanych do KSeF automatycznie", value: "[XX]%" },
    ],
    image: img("integracja-erp-ksef-allegro"),
    gallery: gallery("integracja-erp-ksef-allegro", "Integracja ERP, KSeF i Allegro"),
  },
  {
    slug: "audyt-bezpieczenstwa-sklepu",
    name: "Audyt bezpieczeństwa i dostępności sklepu",
    category: "Safe Control",
    year: "2025",
    demo: true,
    featured: true,
    client: "[Klient demo]",
    industry: "E-commerce",
    scope: ["Audyt bezpieczeństwa", "Audyt WCAG / EAA", "Hardening", "Abonament SLA"],
    stack: ["OWASP ZAP", "Burp Suite", "axe", "Cloudflare", "Sentry"],
    summary: "Sklep bez aktualizacji od lat: lista luk od krytycznych, naprawa, retest i opieka w abonamencie.",
    challenge:
      "Sklep od lat działał bez aktualizacji, a właściciel nie wiedział, czy jest bezpieczny i czy spełnia wymagania dostępności.",
    solution: [
      "Testy według OWASP i audyt dostępności według WCAG.",
      "Raport z priorytetami i naprawa znalezisk krytycznych w pierwszej kolejności.",
      "WAF, kopie zapasowe z testem odtworzenia i monitoring w abonamencie SLA.",
    ],
    results: [
      { label: "Zamkniętych znalezisk krytycznych i wysokich", value: "[XX]%" },
      { label: "Kryteriów WCAG spełnionych po naprawie", value: "[XX]%" },
      { label: "Dostępność sklepu w okresie rozliczeniowym", value: "[XX]%" },
    ],
    image: img("audyt-bezpieczenstwa-sklepu"),
    gallery: gallery("audyt-bezpieczenstwa-sklepu", "Audyt bezpieczeństwa i dostępności sklepu"),
  },
  {
    slug: "asystent-dokumentacji-technicznej",
    name: "Asystent dokumentacji technicznej",
    category: "Dla dużych firm",
    year: "2026",
    demo: true,
    client: "[Klient demo]",
    industry: "Produkcja",
    scope: ["RAG", "Model na własnej infrastrukturze", "Ewaluacja odpowiedzi"],
    stack: ["Python", "PostgreSQL", "pgvector", "LangChain", "Docker"],
    summary: "Serwisant pyta, asystent odpowiada z dokumentacji firmy i pokazuje stronę, z której to wziął.",
    challenge:
      "Serwisanci szukali odpowiedzi w tysiącach stron dokumentacji, a dane nie mogły trafić do publicznych usług AI.",
    solution: [
      "Indeks dokumentacji w PostgreSQL z pgvector.",
      "Model uruchomiony w infrastrukturze klienta, z odpowiedziami zawsze wskazującymi źródło.",
      "Zestaw pytań testowych do ewaluacji jakości po każdej zmianie.",
    ],
    results: [
      { label: "Krótszy czas znalezienia odpowiedzi", value: "[XX]%" },
      { label: "Odpowiedzi ocenionych jako poprawne", value: "[XX]%" },
      { label: "Pytań przekazanych do eksperta", value: "[XX]%" },
    ],
    image: img("asystent-dokumentacji-technicznej"),
    gallery: gallery("asystent-dokumentacji-technicznej", "Asystent dokumentacji technicznej"),
  },
  {
    slug: "hyva-i-przyspieszenie-sklepu",
    name: "Hyvä i przyspieszenie sklepu",
    category: "Magento",
    year: "2025",
    demo: true,
    client: "[Klient demo]",
    industry: "Moda",
    scope: ["Hyvä", "Core Web Vitals", "Konfiguracja serwera"],
    stack: ["Magento 2", "Hyvä", "Varnish", "Redis", "OpenSearch"],
    summary: "Sklep z modą przeniesiony z Luma na Hyvä, plus porządek w cache, indeksach i cronach.",
    challenge: "Sklep ładował się wolno, szczególnie na telefonach, a konwersja z ruchu mobilnego spadała.",
    solution: [
      "Nowy frontend na Hyvä z zachowaniem wyglądu marki.",
      "Konfiguracja Varnish i Redis, porządek w indeksach i cronach.",
      "Pomiar Core Web Vitals przed i po zmianach.",
    ],
    results: [
      { label: "Szybsze ładowanie na telefonie", value: "[XX]%" },
      { label: "Wyższa konwersja z ruchu mobilnego", value: "[XX]%" },
      { label: "Stron z dobrym wynikiem Core Web Vitals", value: "[XX]%" },
    ],
    image: img("hyva-i-przyspieszenie-sklepu"),
    gallery: gallery("hyva-i-przyspieszenie-sklepu", "Hyvä i przyspieszenie sklepu"),
  },
  {
    slug: "panel-klienta-dystrybutora",
    name: "Panel dla klientów dystrybutora",
    category: "Aplikacje webowe",
    year: "2025",
    demo: true,
    client: "[Klient demo]",
    industry: "Dystrybucja",
    scope: ["Panel klienta", "Integracja z ERP", "PWA"],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Node.js", "AWS"],
    summary: "Status zamówienia, faktura i reklamacja bez dzwonienia do biura obsługi.",
    challenge: "Klienci pytali o status zamówień i faktury mailem i telefonicznie, a dział obsługi nie nadążał.",
    solution: [
      "Panel z zamówieniami, fakturami, reklamacjami i dokumentami z ERP.",
      "Konta firmowe z rolami i uprawnieniami.",
      "Wersja PWA dla handlowców w terenie.",
    ],
    results: [
      { label: "Mniej zapytań do działu obsługi", value: "[XX]%" },
      { label: "Klientów aktywnie korzystających z panelu", value: "[XX]%" },
      { label: "Krótszy czas obsługi reklamacji", value: "[XX]%" },
    ],
    image: img("panel-klienta-dystrybutora"),
    gallery: gallery("panel-klienta-dystrybutora", "Panel dla klientów dystrybutora"),
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
