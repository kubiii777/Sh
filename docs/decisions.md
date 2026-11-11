# Decyzje

Decyzje podjęte bez pytania, zgodnie z zasadą „pytaj tylko o rzeczy blokujące”. Każdą można odwrócić.

## Od właściciela
- **Bez formularza kontaktowego, tylko mail.** Odpadają: Server Action, Resend, zod, react-hook-form, `.env.example`, `src/config/contact.ts` z budżetami. CTA usług otwierają `mailto:` z tematem zawierającym nazwę usługi.

## Faza 0
- **Font:** Archivo (OFL) dla nagłówków i tekstu, Geist Mono dla etykiet. Źródło: pakiety npm `@fontsource-variable/archivo` i `geist`, ładowane przez `next/font/local`, więc build nie potrzebuje sieci.
- **Tracking nagłówków:** -0.045em zamiast -0.03em ze SPEC, bo Archivo w dużych rozmiarach jest szersze niż Geist. Referencja ma -0.06em.
- **Kolory:** bez zmian względem SPEC. Alternatywa `#161616` opisana w `research.md`.
- **Piksele przejść:** kwadraty bez liter. Po przeglądzie fazy 2 zmniejszone z 24 × 6 / 12 × 3 do 32 × 8 (desktop, piksel 45 px przy 1440) i 16 × 4 (mobile).
- **Środowisko:** utworzone środowisko chmurowe `sh-website` z dostępem do trzech referencji i CDN Framera, tylko na potrzeby researchu.

## Faza 1–2
- **Nazwa firmy:** `[NAZWA]` w jednym miejscu, `src/config/site.ts`.
- **Sticky:** przyklejona jest tylko nawigacja (wymóg „Layout globalny”). Zakaz sticky na mobile dotyczy sekcji treści.
- **Ticker:** CSS marquee, jedyny ruch w tej sekcji; przy `prefers-reduced-motion` staje się statyczną, zawijaną listą.
- **Obrazy realizacji demo:** własne abstrakcyjne kompozycje w palecie strony (PNG generowane skryptem `scripts/generate-project-images.cjs`), z napisem „Projekt demo”. Bez stocków i bez udawanych zrzutów ekranu.
- **Strzałki:** własny komponent SVG `Arrow` (Archivo nie ma znaku `→` w podzbiorze latin); w terminalach `→` z Geist Mono. Bez biblioteki ikon.
- **Zakres scrolla przejścia:** postęp 0→1 od wejścia pasa od dołu ekranu do chwili, gdy jego dolna krawędź mija połowę ekranu (SPEC: górna). Przy górnej krawędzi rozpad kończył się, zanim pas był dobrze widoczny.
- **Pas pikseli jako odstęp:** pas ma proporcje 4:1 (360 px przy 1440, 97 px przy 390), więc sekcje od strony pasa mają mniejszy padding.
- **Fade-in:** nie ma go na hero (LCP) ani w sekcjach z własnym ruchem (ticker, realizacje z `PixelReveal`), żeby utrzymać limit jednego efektu na sekcję.
- **Etykiety sekcji:** numeracja `.01`–`.07` zaczyna się od Usług; sekcja Trójki nie ma etykiety, bo jej pozycje same noszą numery `.01`–`.03`.
- **Rok w stopce:** statyczny HTML zawiera rok builda, przeglądarka podstawia bieżący (wymóg `cacheComponents`: czas nie może być czytany w prerenderze).
- **Screenshoty:** sklejane z kafli viewportu, bo przejścia zależą od pozycji scrolla; zwykły zrzut całej strony pokazałby je wszystkie w stanie początkowym.
- **Linki do podstron:** `/uslugi/*`, `/realizacje/*`, `/o-nas`, `/kontakt`, `/polityka-prywatnosci` dają 404 do czasu faz 3–5.

## Po przeglądzie fazy 2 („za mało Awwwards, piksele mniejsze”)
- **Piksele:** 32 × 8 / 16 × 4 zamiast 24 × 6 / 12 × 3.
- **Mniej powtarzalnego schematu:** każda sekcja ma inny układ zamiast jednego wzoru „etykieta + nagłówek + lista”. Hero: nagłówek na całą szerokość, druga linia wyrównana do prawej, pod spodem indeks usług. Trójka: trzy kolumny rozdzielone liniami. Usługi: wiersze z nazwami do 68 px. Ticker: stopień display. Realizacje: plakaty na przemian z lewej i prawej. Proces: schody. CTA: napis na całą szerokość.
- **Nagłówki sekcji:** jedno słowo w stopniu display z licznikiem pozycji w indeksie, np. „Usługi (06)”. Liczniki to faktyczna liczba pozycji na stronie.
- **Skala display:** 7vw zamiast 6.5vw (max nadal 7rem), żeby nagłówek hero wypełniał szerokość w dwóch liniach. Tracking -0.05em.
- **Plakaty projektów demo:** zamiast losowego szumu ta sama schodkowa krawędź pikseli co w przejściach; jasne plakaty zlewają się z tłem strony celowo.
- **Indeks usług w hero:** tylko od 1024 px; na mobile hero zostaje nagłówek, zdanie i przycisk.

## Po drugim przeglądzie fazy 2
- **Hero:** usunięty pasek z indeksem usług. Zamiast logów edytor z kodem pisanym na żywo (3 pliki: audyt OWASP w TS, asystent RAG, plugin Magento 2), potem wynik w terminalu i następny plik. Kod ilustracyjny, ukryty przed czytnikami, pauzuje poza ekranem i przy ukrytej karcie. Tylko od 1024 px.
- **Usługi:** zamiast dużych wierszy z odwracaniem kolorów: indeks po lewej, panel szczegółów po prawej (nazwa, opis, 4 punkty zakresu, przycisk). Najechanie albo fokus zmienia panel. Mobile: proste wiersze. Nowe pole `highlights` w `services.ts` (posłuży też w fazie 3).
- **Proces → „Metoda”:** 4 etapy zamiast 5 kroków ze SPEC (Audyt, Projekt, Sprinty, Wdrożenie i utrzymanie), zgodnie z prośbą właściciela. Desktop: sekcja przypięta, scroll steruje animacją każdego etapu (skan obszarów audytu, rysowana architektura, pętla sprintu, checklista startu i siatka monitoringu). Mobile i reduced motion: statyczna lista; ta sama lista jest w DOM na desktopie jako sr-only.
- **Bez fade-in** w sekcjach Usługi i Metoda, bo mają własny ruch.
