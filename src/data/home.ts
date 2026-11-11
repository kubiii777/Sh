/** Pliki pisane na żywo w edytorze w hero. Dekoracja: kod ilustracyjny, linie do 56 znaków. */
export const heroFiles = [
  {
    name: "audit.ts",
    code: [
      "// audyt bezpieczeństwa sklepu",
      'import { scan, report } from "./security";',
      "",
      "export async function audit(shop: Shop) {",
      "  const findings = await scan(shop, {",
      '    standard: "OWASP Top 10",',
      '    scope: ["checkout", "admin", "api"],',
      "  });",
      "  return report(findings.bySeverity());",
      "}",
    ],
    output: ["$ npm run audit", "[ok] skan: checkout, admin, api", "[ok] raport z priorytetami → audit.pdf"],
  },
  {
    name: "ksef.ts",
    code: [
      "// faktury z ERP do KSeF, z ponowieniem przy błędzie",
      "export async function sendInvoices(erp: Erp) {",
      '  const invoices = await erp.invoices({ status: "new" });',
      "",
      "  for (const invoice of invoices) {",
      "    const xml = toFa3(invoice);",
      "    const result = await ksef.send(xml, { retry: 3 });",
      "    await erp.markSent(invoice.id, result.number);",
      "  }",
      "}",
    ],
    output: ["$ npm run sync:ksef", "[ok] faktury wysłane do KSeF", "[ok] numery KSeF zapisane w ERP"],
  },
  {
    name: "ValidateCart.php",
    code: [
      "<?php",
      "// Magento 2: kontrola koszyka przed zamówieniem",
      "final class ValidateCartPlugin {",
      "    public function beforePlaceOrder($subject, $quote) {",
      "        $this->credit->assertWithinLimit($quote);",
      "        $this->stock->reserve($quote->getAllItems());",
      "",
      "        return [$quote];",
      "    }",
      "}",
    ],
    output: ["$ bin/magento setup:di:compile", "[ok] testy integracyjne", "[ok] deploy.staging"],
  },
];

/** Manifest pod hero. Bez liczb i obietnic, których nie da się sprawdzić. */
export const manifesto =
  "Jesteśmy software house'em dla firm, które sprzedają i pracują online. Zaczynamy od audytu, budujemy w krótkich sprintach i zostajemy po starcie, bo oprogramowanie, od którego zależy sprzedaż, trzeba pilnować codziennie.";

export const principles = [
  { name: "Audyt", text: "Zanim cokolwiek zbudujemy, sprawdzamy, co działa, a co jest ryzykiem." },
  { name: "Sprinty", text: "Po każdym sprincie działająca wersja na środowisku testowym." },
  { name: "Opieka", text: "Po starcie monitoring, aktualizacje i dalszy rozwój." },
];

export const technologies = [
  "Magento 2", "Hyvä", "Adobe Commerce", "Akeneo", "Pimcore", "KSeF", "Comarch ERP", "enova365", "SAP Business One",
  "Allegro", "Next.js", "React", "Node.js", "PHP", "Python", "OpenAI", "Anthropic", "pgvector", "Docker", "AWS",
  "Cloudflare", "OWASP",
];

export const securityRules = [
  { name: "OWASP Top 10", text: "każdy projekt sprawdzamy pod kątem najczęstszych podatności" },
  { name: "Code review", text: "żadna zmiana nie trafia na produkcję bez przeglądu" },
  { name: "Minimalne uprawnienia", text: "konta i klucze dostają tylko to, czego potrzebują" },
  { name: "Szyfrowanie", text: "dane chronione w tranzycie i w spoczynku" },
  { name: "RODO", text: "przetwarzamy tylko dane potrzebne do działania systemu" },
  { name: "Logowanie i monitoring", text: "wiemy, co dzieje się w systemie, i reagujemy na incydenty" },
];

/** Metoda pracy: etapy sekcji „Metoda”. Punkty zasilają animację na desktopie i listę na mobile. */
export const method = [
  {
    slug: "01-audyt",
    name: "Audyt",
    lead: "Zaczynamy od sprawdzenia, co już działa, a co jest ryzykiem.",
    points: [
      "Kod i architektura",
      "Bezpieczeństwo według OWASP",
      "Wydajność i Core Web Vitals",
      "Infrastruktura i kopie zapasowe",
      "Dostępy i uprawnienia",
      "Zależności i licencje",
    ],
  },
  {
    slug: "02-projekt",
    name: "Projekt",
    lead: "Na podstawie audytu projektujemy architekturę i zakres pierwszego etapu.",
    points: ["Specyfikacja", "Architektura", "Harmonogram", "Zakres etapu 1"],
  },
  {
    slug: "03-sprinty",
    name: "Sprinty",
    lead: "Budujemy w sprintach. Każdy kończy się działającą wersją na środowisku testowym.",
    points: ["Planowanie", "Budowa", "Code review i testy", "Demo i odbiór"],
  },
  {
    slug: "04-utrzymanie",
    name: "Wdrożenie i utrzymanie",
    lead: "Startujemy z planem awaryjnym, a potem pilnujemy, żeby system był szybki i bezpieczny.",
    points: ["Testy wydajności i bezpieczeństwa", "Hardening konfiguracji", "Go-live z planem awaryjnym", "Monitoring i aktualizacje"],
  },
];

export const faq = [
  {
    q: "Ile trwa realizacja projektu?",
    a: "To zależy od zakresu. Po etapie discovery dostajesz harmonogram z podziałem na etapy, więc termin znasz przed startem prac.",
  },
  {
    q: "Jak wyceniacie projekty?",
    a: "Małe, dobrze opisane zakresy wyceniamy w modelu fixed price. Większe i zmienne rozliczamy według czasu pracy (time & material), z raportem po każdym sprincie.",
  },
  {
    q: "Czy podpisujecie NDA?",
    a: "Tak. Możemy podpisać umowę o poufności przed pierwszą rozmową o szczegółach, na Twoim wzorze albo naszym.",
  },
  {
    q: "Do kogo należy kod?",
    a: "Do Ciebie. Po rozliczeniu prac przenosimy autorskie prawa majątkowe, a repozytorium od początku może działać na Twoim koncie.",
  },
  {
    q: "Czy zajmujecie się utrzymaniem po wdrożeniu?",
    a: "Tak. Oferujemy abonament utrzymaniowy, który obejmuje monitoring, aktualizacje bezpieczeństwa i drobny rozwój.",
  },
  {
    q: "Czy pracujecie na istniejącym kodzie?",
    a: "Tak. Zaczynamy od audytu, żeby ocenić stan kodu i ryzyka, a potem proponujemy plan: naprawę, stopniową przebudowę albo dalszy rozwój.",
  },
];
