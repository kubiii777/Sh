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
    name: "assistant.ts",
    code: [
      "// odpowiedzi tylko na podstawie dokumentów firmy",
      "export async function answer(question: string) {",
      "  const query = guard(question); // prompt injection",
      "  const docs = await vectors.search(query, { k: 5 });",
      "",
      "  if (docs.length === 0) {",
      "    return handoff.toHuman(question);",
      "  }",
      "  return llm.generate({ query, context: docs });",
      "}",
    ],
    output: ["$ npm run eval", "[ok] odpowiedzi zgodne ze źródłami", "[ok] przekazanie do konsultanta"],
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

export const trio = [
  {
    number: ".01",
    name: "Audytujemy",
    lead: "Zanim cokolwiek zbudujemy, sprawdzamy, co już działa, a co jest ryzykiem.",
    points: [
      { title: "Kod i architektura", text: "Przegląd istniejącego kodu, zależności i długu technicznego." },
      { title: "Bezpieczeństwo", text: "Testy według OWASP i lista podatności ułożona od krytycznych." },
      { title: "Plan", text: "Raport z priorytetami i zakresem prac, na którym da się oprzeć decyzję." },
    ],
  },
  {
    number: ".02",
    name: "Budujemy",
    lead: "Piszemy oprogramowanie w krótkich sprintach, z działającą wersją po każdym z nich.",
    points: [
      { title: "Sprinty", text: "Po każdym sprincie dostajesz działającą wersję na środowisku testowym." },
      { title: "Code review", text: "Każda zmiana przechodzi przegląd drugiej osoby i testy automatyczne." },
      { title: "Dokumentacja", text: "Powstaje razem z kodem, a nie po zakończeniu projektu." },
    ],
  },
  {
    number: ".03",
    name: "Utrzymujemy",
    lead: "Po wdrożeniu nie znikamy: pilnujemy, żeby system był szybki, aktualny i bezpieczny.",
    points: [
      { title: "Monitoring", text: "Śledzimy dostępność, błędy i wydajność." },
      { title: "Aktualizacje", text: "Wgrywamy poprawki bezpieczeństwa i aktualizujemy zależności." },
      { title: "Rozwój", text: "Kolejne funkcje dokładamy w tym samym, przewidywalnym trybie." },
    ],
  },
];

export const technologies = [
  "OpenAI", "Anthropic", "LangChain", "pgvector", "Magento 2", "Hyvä", "Shopify", "React", "Next.js",
  "Node.js", "Python", "PHP", "Supabase", "AWS", "Cloudflare", "Docker", "OWASP",
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
