export type Service = {
  slug: string;
  number: string;
  name: string;
  /** Jedno zdanie do listy na stronie głównej. */
  short: string;
};

// Faza 3 rozszerza ten typ o: problemy, zakres, deliverables, proces, stack, FAQ.
export const services: Service[] = [
  {
    slug: "ai-rag",
    number: "001",
    name: "AI i RAG",
    short: "Chatboty, wyszukiwarki i asystenci, którzy odpowiadają na podstawie danych Twojej firmy.",
  },
  {
    slug: "cyberbezpieczenstwo",
    number: "002",
    name: "Cyberbezpieczeństwo",
    short: "Audyty, testy penetracyjne i hardening sklepów oraz aplikacji webowych.",
  },
  {
    slug: "e-commerce",
    number: "003",
    name: "E-commerce",
    short: "Rozwój i optymalizacja istniejących sklepów na dowolnej platformie.",
  },
  {
    slug: "wdrozenia-magento-2",
    number: "004",
    name: "Wdrożenia Magento 2",
    short: "Nowe sklepy, migracje i utrzymanie na Magento 2 Open Source i Adobe Commerce.",
  },
  {
    slug: "aplikacje-webowe",
    number: "005",
    name: "Aplikacje webowe",
    short: "SaaS, panele klienta, MVP i dashboardy, od pomysłu do produkcji.",
  },
  {
    slug: "oprogramowanie-dedykowane",
    number: "006",
    name: "Oprogramowanie dedykowane",
    short: "Integracje, automatyzacje i systemy wewnętrzne dopasowane do procesów firmy.",
  },
];
