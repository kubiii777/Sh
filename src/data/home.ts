export const heroLogs = [
  "[sec] owasp.check → raport gotowy",
  "[rag] index.build → ok",
  "[magento] deploy.staging → ok",
  "[ci] tests.run → zaliczone",
  "[sec] deps.audit → brak krytycznych",
  "[rag] eval.answers → ok",
  "[shop] cwv.measure → zapisano",
  "[api] contract.verify → ok",
  "[ops] backup.verify → ok",
  "[sec] access.review → zakończony",
  "[magento] cache.warm → ok",
  "[ci] deploy.production → ok",
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

export const processSteps = [
  { name: "Discovery i audyt", text: "Poznajemy cel biznesowy, użytkowników i istniejące systemy. Sprawdzamy kod i ryzyka." },
  { name: "Architektura", text: "Dobieramy technologie, projektujemy dane i integracje, opisujemy zakres pierwszego etapu." },
  { name: "Budowa w sprintach", text: "Dostarczamy działające fragmenty na środowisko testowe i zbieramy uwagi na bieżąco." },
  { name: "Wdrożenie i hardening", text: "Testy, zabezpieczenie konfiguracji, kopie zapasowe i start z planem awaryjnym." },
  { name: "Utrzymanie", text: "Monitoring, aktualizacje i dalszy rozwój w stałym rytmie." },
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
