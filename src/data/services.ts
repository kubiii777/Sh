export type Service = {
  slug: string;
  number: string;
  name: string;
  /** Jedno zdanie do listy na stronie głównej. */
  short: string;
  /** 4 punkty zakresu: panel na stronie głównej i /uslugi. */
  highlights: [string, string, string, string];
};

// Faza 3 rozszerza ten typ o: problemy, zakres, deliverables, proces, stack, FAQ.
export const services: Service[] = [
  {
    slug: "ai-rag",
    number: "001",
    name: "AI i RAG",
    short: "Chatboty, wyszukiwarki i asystenci, którzy odpowiadają na podstawie danych Twojej firmy.",
    highlights: ["Chatbot na dokumentach firmy", "Wyszukiwarka semantyczna produktów", "Asystent z przekazaniem do człowieka", "Ekstrakcja danych z faktur i umów"],
  },
  {
    slug: "cyberbezpieczenstwo",
    number: "002",
    name: "Cyberbezpieczeństwo",
    short: "Audyty, testy penetracyjne i hardening sklepów oraz aplikacji webowych.",
    highlights: ["Audyt sklepu i aplikacji webowej", "Testy penetracyjne według OWASP", "Hardening serwerów, CMS i wtyczek", "Raport z planem naprawy i retest"],
  },
  {
    slug: "e-commerce",
    number: "003",
    name: "E-commerce",
    short: "Rozwój i optymalizacja istniejących sklepów na dowolnej platformie.",
    highlights: ["Core Web Vitals i wydajność", "Integracje: ERP, płatności, kurierzy", "Migracje platform i headless", "AI w sklepie: wyszukiwarka i rekomendacje"],
  },
  {
    slug: "wdrozenia-magento-2",
    number: "004",
    name: "Wdrożenia Magento 2",
    short: "Nowe sklepy, migracje i utrzymanie na Magento 2 Open Source i Adobe Commerce.",
    highlights: ["Nowe sklepy i migracje z innych platform", "Frontend Hyvä albo headless", "B2B, multistore i integracje", "Utrzymanie i SLA"],
  },
  {
    slug: "aplikacje-webowe",
    number: "005",
    name: "Aplikacje webowe",
    short: "SaaS, panele klienta, MVP i dashboardy, od pomysłu do produkcji.",
    highlights: ["SaaS i MVP", "Panele klienta i B2B", "Dashboardy", "Aplikacje PWA"],
  },
  {
    slug: "oprogramowanie-dedykowane",
    number: "006",
    name: "Oprogramowanie dedykowane",
    short: "Integracje, automatyzacje i systemy wewnętrzne dopasowane do procesów firmy.",
    highlights: ["Integracje ERP i CRM", "Automatyzacje procesów", "Systemy wewnętrzne i API", "Migracje ze starych systemów"],
  },
];
