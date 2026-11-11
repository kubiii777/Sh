# SPEC — strona [NAZWA]

> Zmiana względem pierwotnej wersji (decyzja właściciela): **bez formularza kontaktowego, kontakt tylko mailowo.** Sekcje „Stack” i „Kontakt” są zaktualizowane poniżej.

## Kontekst
Software house [NAZWA]. Usługi: AI i RAG, cyberbezpieczeństwo, e-commerce (rozwój i optymalizacja), wdrożenia Magento 2, aplikacje webowe, oprogramowanie dedykowane. Klienci: firmy i sklepy internetowe w Polsce. Cała treść po polsku.

Cel: strona na poziomie Awwwards, czytelna w odbiorze, a na telefonie bardzo prosta. Poprzednia wersja (z Lovable) wyglądała jak generyczny szablon AI i właśnie tego trzeba uniknąć.

## Zasady pracy
- Pracuj fazami (lista na końcu). Po każdej fazie zrób commit i krótki raport.
- Po fazie 2 zatrzymaj się. Uruchom dev server, zrób screenshoty w 390, 768 i 1440 px i czekaj na moją akceptację.
- Pytaj tylko o rzeczy blokujące. Pozostałe decyzje zapisuj w `docs/decisions.md`.
- Nie wymyślaj danych firmy, klientów, liczb, opinii ani cen. Zostaw placeholder w nawiasach kwadratowych i dopisz go do `docs/placeholders.md`.
- Nie kopiuj kodu, tekstów, grafik ani plików fontów z referencji. Odtwarzasz styl i efekty własną implementacją.
- Nie deployuj i nie podpinaj płatnych usług bez mojej zgody.
- Na starcie utwórz `CLAUDE.md` z trwałymi zasadami z tego pliku: design system, zakazy, reguły mobile, komendy.

## Stack
- Next.js (najnowsza stabilna wersja, App Router, TypeScript), strony generowane statycznie.
- Tailwind CSS v4, `motion` (dawniej framer-motion).
- Fonty przez `next/font`, hostowane lokalnie.
- Kontakt wyłącznie przez `mailto:` — bez formularza, bez Server Action, bez Resend, bez zod i react-hook-form.
- Playwright do researchu referencji i testów wizualnych.
- Docelowy hosting: Vercel.
- Bez Lenis, GSAP i three.js. Bez bibliotek komponentów z gotowym wyglądem (shadcn/ui, MUI itp.). Prymitywy Radix (accordion, dialog) są OK, ale stylujesz je od zera.

## Faza 0 — research referencji (Playwright)
- https://ethiack.com — bierzemy układ i UX, bez kolorystyki.
- https://www.contentarchitecture.dev — bierzemy kolorystykę, faktury i pikselowe przejścia między sekcjami przy scrollu.
- https://subduxion.com — bierzemy typografię.

Dla każdej strony:
- screenshoty full-page w 1440 i 390 px;
- na contentarchitecture.dev dodatkowo seria screenshotów co ~150 px scrolla wokół dwóch przejść między sekcjami, żeby zrozumieć mechanikę efektu pikseli;
- `getComputedStyle` dla h1, h2, body, etykiet i przycisków: font-family, font-size, font-weight, line-height, letter-spacing, color, background.

Screenshoty zapisz w `docs/research/`, a wnioski (co bierzemy z której strony) w `docs/research.md`.

Fonty z subduxion.com: ustal nazwy i źródło.
- Darmowe (Google Fonts, licencja OFL): użyj ich przez `next/font`.
- Komercyjne: nie pobieraj plików z cudzego serwera. Zaproponuj najbliższy darmowy odpowiednik i zapytaj, czy kupuję licencję. Do czasu decyzji używaj Geist.

Jeśli któraś strona blokuje przeglądarkę headless, powiedz mi o tym, a dośle screenshoty.

## Zakazy
Strona nie może wyglądać jak typowy szablon z AI. Nie używaj:
- gradientów, poświat i glassmorphismu;
- kart z cieniem i dużym zaokrągleniem;
- ikon w kolorowych kółkach i siatek „feature cards” z ikonami;
- plakietek nad nagłówkiem hero, tekstu z gradientem, emoji;
- grafik 3D, własnego kursora, magnetycznych przycisków, parallaxu;
- wymyślonych logo, opinii i liczb.

Najwyżej jeden efekt ruchu na sekcję. Zaokrąglenia 0–2 px. Sekcje oddzielaj liniami 1 px, nie kartami.

## Design system
- **Kolory:** czerń `#0B0B0B`, złamana biel `#EFEEE9`. Tekst drugorzędny `#8C8C8C` na ciemnym tle i `#5E5E5E` na jasnym. Linie `#2A2A2A` na ciemnym i `#D6D5CF` na jasnym. Bez koloru akcentu. Jeśli research wskaże lepsze odcienie, zaproponuj je w raporcie z fazy 0.
- **Fonty:** nagłówki i tekst według wyników fazy 0 (tymczasowo Geist). Etykiety, numeracja, metadane i bloki terminala w Geist Mono. Sprawdź polskie znaki: ą ę ł ś ż ź ć ń ó.
- **Skala:**
  - nagłówki na desktopie: clamp(2.75rem, 6.5vw, 7rem), line-height 0.95, tracking -0.03em;
  - tekst 17–18 px;
  - etykiety mono 12 px, uppercase, tracking 0.08em, np. `.01 — USŁUGI`.
- **Siatka:** 12 kolumn, max 1440 px, marginesy 48 px na desktopie i 20 px na mobile.
- **Faktura:** na ciemnych sekcjach statyczna siatka kropek (CSS radial-gradient, niski kontrast).
- **Przyciski:** prostokątne. Obramowanie 1 px albo wypełnienie kolorem przeciwnym do tła. Na hover kolory się odwracają.

## Ruch
- Tylko `motion` i natywny scroll.
- Sekcje dostają krótki fade-in przy wejściu (opacity i 12 px w górę, 300 ms). Bez staggerów na wszystkim.
- Główny efekt to przejścia pikselowe (komponent `PixelTransition`). Mechanikę dopasuj do tego, co pokaże research z fazy 0.
  - Na każdej zmianie koloru sekcji (ciemna↔jasna) pojawia się pas kwadratowych pikseli w kolorze następnej sekcji. Desktop: 32 kolumny × 8 rzędów (piksel = szerokość/32). Mobile: 16 × 4. (Pierwotnie 24 × 6 i 12 × 3; zmniejszone po przeglądzie fazy 2.)
  - Każdy piksel ma stały losowy próg z seeda, żeby nic nie migotało. Rzędy bliżej następnej sekcji mają niższe progi, więc krawędź rozpada się schodkowo.
  - Postęp 0→1 liczony od wejścia pasa od dołu ekranu do połowy ekranu (`useScroll`). Piksel jest widoczny, gdy postęp > próg. Animacja jest przypięta do scrolla i cofa się przy scrollu w górę.
  - Jeden canvas na przejście, nie setki divów. Uwzględnij devicePixelRatio. Przerysowanie w requestAnimationFrame, tylko gdy zmieni się postęp.
  - Wariant `PixelReveal`: jednorazowe, pikselowe odsłonięcie obrazów realizacji przy wejściu w viewport.
  - Przy `prefers-reduced-motion` statyczna, schodkowa krawędź bez animacji.

## Mobile (<768 px) — bardzo prosto
- Jedna kolumna. Bez sekcji poziomych i bez sticky.
- Hero: nagłówek (max 2.5rem), jedno zdanie, jeden przycisk. Bez bloku terminala.
- Menu: pełnoekranowy panel z listą linków i CTA, bez animacji, z focus trapem.
- Usługi i realizacje jako wiersze jeden pod drugim. Cały wiersz klikalny, cel dotyku min. 44 px.
- Animacje tylko dwie: fade-in i przejścia pikselowe 16 × 4. Jeśli przycinają, zostaw statyczną schodkową krawędź.
- Tekst 16–17 px, odstępy między sekcjami 64–80 px.

## Layout globalny
- **Nawigacja:** sticky, pełne tło, linia 1 px na dole. Logo tekstowe [NAZWA], linki Usługi / Realizacje / O nas / Kontakt, przycisk „Rozpocznij projekt”.
- **Stopka (ciemna):** kolumny nawigacja / usługi / kontakt (placeholdery) / social (LinkedIn, GitHub). NIP i KRS jako placeholder, link do polityki prywatności. Na dole wordmark [NAZWA] na całą szerokość. Rok w stopce dynamiczny.

## Strona główna
1. **Hero (ciemne).** Nagłówek „Budujemy oprogramowanie, które myśli i się broni.” Pod nim jedno zdanie: AI, bezpieczeństwo, e-commerce i aplikacje dla firm. Przycisk „Rozpocznij projekt” i link „Zobacz realizacje →”. Po prawej, tylko na desktopie, blok terminala w mono z zapętlonymi liniami logów, np. `[sec] owasp.check → raport gotowy`, `[rag] index.build → ok`, `[magento] deploy.staging → ok`.
2. **Trójka (jasne)**, w stylu See/Test/Act z ethiack: „.01 Audytujemy”, „.02 Budujemy”, „.03 Utrzymujemy”. W każdej pogrubione zdanie otwierające i 3 krótkie punkty.
3. **Usługi (ciemne).** 6 wierszy 001–006. W każdym numer mono, nazwa dużym fontem, jedno zdanie opisu i strzałka. Hover odwraca kolory wiersza. Wiersze linkują do `/uslugi/[slug]`.
4. **Ticker technologii (jasne)**, tekst bez logo: OpenAI, Anthropic, LangChain, pgvector, Magento 2, Hyvä, Shopify, React, Next.js, Node.js, Python, PHP, Supabase, AWS, Cloudflare, Docker, OWASP.
5. **Wybrane realizacje (jasne).** 3 projekty demonstracyjne jako duże wiersze: obraz, nazwa, w mono kategoria / rok. Obrazy z `PixelReveal`. Link „Wszystkie realizacje →”.
6. **Security by default (ciemne).** Blok terminala `security.log` z numerowanymi zasadami stosowanymi w każdym projekcie: OWASP Top 10, code review, minimalne uprawnienia, szyfrowanie, RODO, logowanie i monitoring.
7. **Proces (jasne).** 5 numerowanych kroków w jednej kolumnie: Discovery i audyt → Architektura → Budowa w sprintach → Wdrożenie i hardening → Utrzymanie.
8. **FAQ (jasne).** Akordeon z 6 pytaniami: czas realizacji, wycena, NDA, własność kodu, utrzymanie, praca na istniejącym kodzie.
9. **CTA (ciemne).** Duże „Porozmawiajmy.”, email jako link, przycisk do `/kontakt`.

## Usługi
Dane w `src/data/services.ts`: slug, numer, nazwa, opis, problemy, zakres, deliverables, proces, stack, FAQ.

**/uslugi:** hero i 6 usług w rozwiniętej wersji (opis w 2–3 zdaniach, 4 punkty zakresu, link). Na końcu CTA.

**Szablon podstrony usługi:**
1. Hero: numer, nazwa, jedno zdanie o wartości, CTA.
2. 3 typowe problemy klienta.
3. Zakres z krótkimi opisami.
4. Co dostajesz: raport, kod, dokumentacja, szkolenie.
5. Proces w 3–5 krokach.
6. Stack (tagi mono).
7. Powiązane realizacje.
8. FAQ: 4 pytania.
9. CTA: mail z tematem zawierającym nazwę usługi (zamiast `/kontakt?usluga=slug`).

**Treść usług:**
- **001 AI i RAG** (`ai-rag`): chatbot na dokumentach firmy, wyszukiwarka semantyczna produktów, asystent obsługi klienta z przekazaniem do człowieka, ekstrakcja danych z faktur i umów, modele komercyjne albo open-source na własnej infrastrukturze dla danych wrażliwych, ewaluacja jakości odpowiedzi, ochrona przed prompt injection.
- **002 Cyberbezpieczeństwo** (`cyberbezpieczenstwo`): audyt sklepu i aplikacji webowej, testy penetracyjne (OWASP), hardening serwerów, CMS i wtyczek (WooCommerce, PrestaShop, Magento, Shopify), WAF/CDN i backupy, przegląd kont i uprawnień, raport z priorytetami (od krytycznych do niskich) z planem naprawy, retest, monitoring ciągły. Dodatkowa sekcja „Jak wygląda audyt”: zakres i zgody → skan i testy → raport → naprawa → retest.
- **003 E-commerce** (`e-commerce`): rozwój i optymalizacja istniejących sklepów na dowolnej platformie. Core Web Vitals, integracje (ERP, płatności, kurierzy, marketplace), headless, migracje platform, bezpieczeństwo płatności i kont klientów, AI w sklepie (wyszukiwarka, rekomendacje, opisy produktów). Na podstronie link do Magento 2.
- **004 Wdrożenia Magento 2** (`wdrozenia-magento-2`). Hero: „Sklepy na Magento 2, które wytrzymują skalę.”
  - Problemy: wolny sklep i spadająca konwersja, drogie utrzymanie po poprzedniej agencji, platforma nienadążająca za wzrostem (B2B, wiele krajów, duży katalog).
  - Zakres:
    - nowy sklep na Magento 2 Open Source lub Adobe Commerce;
    - migracja z Magento 1, WooCommerce, PrestaShop i Shopify (produkty, klienci, zamówienia, przekierowania 301 chroniące SEO);
    - frontend Hyvä albo headless (GraphQL + Next.js);
    - B2B: cenniki indywidualne, konta firmowe z wieloma użytkownikami, szybkie zamówienia po SKU, limity kupieckie;
    - multistore, wiele języków i walut;
    - integracje: ERP (SAP, Comarch ERP, enova365, Subiekt), PIM, płatności (PayU, Przelewy24, BLIK, Tpay), kurierzy (InPost, DPD, DHL), Allegro, Google Merchant Center;
    - moduły dedykowane;
    - wydajność: Varnish, Redis, OpenSearch, Core Web Vitals;
    - bezpieczeństwo: security patche, audyt modułów firm trzecich, 2FA i niestandardowy URL panelu admina, hardening serwera, WAF;
    - DevOps: CI/CD, staging, monitoring, backupy;
    - utrzymanie i SLA.
  - Sekcje dodatkowe:
    - „Proces wdrożenia”: analiza i specyfikacja → UX/UI → development w sprintach → migracja danych → testy (wydajnościowe, bezpieczeństwa, UAT) → go-live z planem awaryjnym → opieka powdrożeniowa.
    - „Masz już sklep na Magento?”: audyt techniczny, upgrade do aktualnej wersji 2.4.x, przejście na Hyvä, naprawa wydajności, przejęcie projektu od innej agencji.
    - Porównanie „Luma vs Hyvä vs headless”: wydajność, czas wdrożenia, elastyczność, dla kogo. Opisowo, bez cen. Na mobile karty zamiast tabeli.
  - FAQ: czas wdrożenia; Open Source czy Adobe Commerce; czy migracja zaszkodzi SEO; własność kodu; przejęcie sklepu od innej agencji; utrzymanie po starcie.
  - Stack: Magento 2, Adobe Commerce, Hyvä, PHP 8, MySQL/MariaDB, OpenSearch, Redis, Varnish, RabbitMQ, GraphQL, Docker.
- **005 Aplikacje webowe** (`aplikacje-webowe`): SaaS, panele klienta i B2B, MVP, dashboardy, PWA.
- **006 Oprogramowanie dedykowane** (`oprogramowanie-dedykowane`): integracje ERP/CRM, automatyzacje procesów, systemy wewnętrzne, API, migracje ze starych systemów.

## Realizacje
Dane w `src/data/projects.ts`: 6 projektów demonstracyjnych, wyraźnie oznaczonych jako demo. Jeden z nich to wdrożenie Magento 2.

**/realizacje:** hero, filtry jako chipy (Wszystkie, AI, Security, E-commerce, Magento 2, Web app, Software) i lista projektów jako duże wiersze z `PixelReveal`.

**/realizacje/[slug]:**
1. Nazwa projektu, pod nią w mono: Klient / Branża / Rok / Zakres / Stack.
2. Duży obraz.
3. Wyzwanie → Rozwiązanie → Efekty. Efekty jako „[XX]%”, bez wymyślonych liczb.
4. Galeria.
5. Cytat klienta, renderowany tylko wtedy, gdy pole w danych jest wypełnione.
6. „Następny projekt” jako pełnoszerokościowy link.

## O nas
1. Manifest w 3–4 zdaniach dużym tekstem, statyczny.
2. 4 wartości: bezpieczeństwo od pierwszej linii kodu, konkret zamiast obietnic, kod należy do klienta, długoterminowa współpraca.
3. Modele współpracy: fixed price, time & material, abonament utrzymaniowy. Bez cen.
4. Zespół: 4 placeholdery (zdjęcie, imię, rola, LinkedIn).
5. Certyfikaty jako placeholdery. Na końcu CTA.

## Kontakt (bez formularza)
- „Opowiedz nam o projekcie.”, email jako duży link `mailto:`, telefon i adres (placeholdery), „Odpowiadamy w ciągu 24h roboczych”, przycisk „Umów 30-min rozmowę” (link placeholder).
- Krótka lista „co napisać w mailu” (firma, zakres, termin), żeby pierwsza wiadomość była konkretna.
- Bez formularza, bez backendu, bez zmiennych środowiskowych.

## Polityka prywatności i 404
- `/polityka-prywatnosci`: struktura sekcji RODO z placeholderami danych administratora.
- 404: duże „404” i link do strony głównej, w stylu strony.

## SEO, wydajność, dostępność
- Metadata API na każdej stronie: title i description po polsku, canonical, Open Graph. Obrazek OG generowany przez `next/og` w stylu strony.
- `sitemap.ts`, `robots.ts`, JSON-LD Organization oraz Service na stronach usług.
- `next/image`, AVIF/WebP, CLS ≈ 0. Lighthouse na mobile ≥ 90 w każdej kategorii.
- Kontrast AA, widoczny focus, pełna obsługa klawiaturą, semantyczny HTML, `prefers-reduced-motion` wszędzie.

## Fazy
0. Research referencji, potem raport i propozycja fontów.
1. Setup projektu, `CLAUDE.md`, design system, nawigacja i stopka, `PixelTransition`/`PixelReveal`. Strona `/styleguide` (noindex) z kolorami, typografią, przyciskami i demo przejścia.
2. Strona główna. **STOP: screenshoty i czekasz na moją akceptację.**
3. `/uslugi` i 6 podstron usług.
4. `/realizacje` i szablon case study.
5. `/o-nas`, `/kontakt` (mailto), `/polityka-prywatnosci`, 404.
6. SEO, wydajność, dostępność, końcowe QA, `docs/placeholders.md`.

## Definicja ukończenia każdej fazy
- `npm run build` i lint przechodzą bez błędów.
- Screenshoty Playwright w 390, 768 i 1440 px dla każdej zmienionej strony. Obejrzyj je i popraw: poziomy scroll, łamanie wyrazów w nagłówkach, kontrast, odstępy, zgodność z zakazami.
- Krótki raport: co zrobione, ścieżki do screenshotów, otwarte decyzje.
