# Decyzje

Decyzje podjęte bez pytania, zgodnie z zasadą „pytaj tylko o rzeczy blokujące”. Każdą można odwrócić.

## Od właściciela
- **Bez formularza kontaktowego, tylko mail.** Odpadają: Server Action, Resend, zod, react-hook-form, `.env.example`, `src/config/contact.ts` z budżetami. CTA usług otwierają `mailto:` z tematem zawierającym nazwę usługi.

## Faza 0
- **Font:** Archivo (OFL) dla nagłówków i tekstu, Geist Mono dla etykiet. Źródło: pakiety npm `@fontsource-variable/archivo` i `geist`, ładowane przez `next/font/local`, więc build nie potrzebuje sieci.
- **Tracking nagłówków:** -0.045em zamiast -0.03em ze SPEC, bo Archivo w dużych rozmiarach jest szersze niż Geist. Referencja ma -0.06em.
- **Kolory:** bez zmian względem SPEC. Alternatywa `#161616` opisana w `research.md`.
- **Piksele przejść:** kwadraty bez liter, domyślnie 24 × 6 (desktop) i 12 × 3 (mobile) ze SPEC. Wariant drobny do porównania na `/styleguide`.
- **Środowisko:** utworzone środowisko chmurowe `sh-website` z dostępem do trzech referencji i CDN Framera, tylko na potrzeby researchu.

## Faza 1–2
- **Nazwa firmy:** `[NAZWA]` w jednym miejscu, `src/config/site.ts`.
- **Sticky:** przyklejona jest tylko nawigacja (wymóg „Layout globalny”). Zakaz sticky na mobile dotyczy sekcji treści.
- **Ticker:** CSS marquee, jedyny ruch w tej sekcji; przy `prefers-reduced-motion` staje się statyczną, zawijaną listą.
- **Obrazy realizacji demo:** własne abstrakcyjne kompozycje SVG w palecie strony, z napisem „DEMO”. Bez stocków i bez udawanych zrzutów ekranu.
- **Strzałki:** znak `→` z fontu, bez biblioteki ikon.
- **Zakres scrolla przejścia:** postęp 0→1 od wejścia pasa od dołu ekranu do chwili, gdy jego dolna krawędź mija połowę ekranu (SPEC: górna). Przy górnej krawędzi rozpad kończył się, zanim pas był dobrze widoczny.
- **Pas pikseli jako odstęp:** pas ma proporcje 4:1 (360 px przy 1440, 97 px przy 390), więc sekcje od strony pasa mają mniejszy padding.
- **Fade-in:** nie ma go na hero (LCP) ani w sekcjach z własnym ruchem (ticker, realizacje z `PixelReveal`), żeby utrzymać limit jednego efektu na sekcję.
- **Etykiety sekcji:** numeracja `.01`–`.07` zaczyna się od Usług; sekcja Trójki nie ma etykiety, bo jej pozycje same noszą numery `.01`–`.03`.
- **Rok w stopce:** statyczny HTML zawiera rok builda, przeglądarka podstawia bieżący (wymóg `cacheComponents`: czas nie może być czytany w prerenderze).
- **Screenshoty:** sklejane z kafli viewportu, bo przejścia zależą od pozycji scrolla; zwykły zrzut całej strony pokazałby je wszystkie w stanie początkowym.
- **Linki do podstron:** `/uslugi/*`, `/realizacje/*`, `/o-nas`, `/kontakt`, `/polityka-prywatnosci` dają 404 do czasu faz 3–5.
