# Strona [NAZWA] — zasady trwałe

Pełna specyfikacja: `SPEC.md`. Wnioski z referencji: `docs/research.md`. Decyzje: `docs/decisions.md`.

@AGENTS.md

## Komendy
- `npm run dev` — serwer deweloperski (port 3000)
- `npm run build` — build produkcyjny; musi przejść przed każdym commitem fazy
- `npm run lint` — ESLint; zero błędów
- `node scripts/screenshots.cjs [ścieżka…]` — screenshoty 390 / 768 / 1440 do `docs/screenshots/`
- `node scripts/generate-project-images.cjs` — obrazy projektów demo

## Stack
Next.js 16 (App Router, TypeScript, `cacheComponents`), Tailwind CSS v4, `motion`, Radix (accordion, dialog) stylowane od zera.
Zabronione: Lenis, GSAP, three.js, shadcn/ui, MUI i inne biblioteki z gotowym wyglądem, biblioteki ikon.
Kontakt tylko przez `mailto:`. Nie ma formularza ani backendu i nie należy ich dodawać.
`new Date()` i `Math.random()` nie mogą trafić do komponentów serwerowych (błąd prerenderu): tylko komponenty klienckie.

## Praca
- Fazy ze `SPEC.md`. Po każdej: build + lint, screenshoty 390/768/1440, commit, krótki raport.
- Pytaj tylko o rzeczy blokujące; resztę zapisuj w `docs/decisions.md`.
- Nie wymyślaj danych firmy, klientów, liczb, opinii ani cen. Placeholder w `[nawiasach]` + wpis w `docs/placeholders.md`.
- Nie kopiuj kodu, tekstów, grafik ani fontów z referencji.
- Nie deployuj i nie podpinaj płatnych usług bez zgody.
- Cała treść po polsku. Dane firmy wyłącznie w `src/config/site.ts`.

## Design system
- Kolory: czerń `#0B0B0B`, złamana biel `#EFEEE9`. Tekst drugorzędny `#8C8C8C` (ciemne) / `#5E5E5E` (jasne). Linie `#2A2A2A` / `#D6D5CF`. Bez akcentu.
- Sekcja dostaje klasę `theme-dark` albo `theme-light`; w środku używaj `bg-bg`, `text-fg`, `text-mute`, `border-line`.
- Fonty: Archivo (500 nagłówki, 400 tekst), Geist Mono dla etykiet, numeracji, metadanych i terminali.
- Klasy typografii: `display`, `h2`, `h3`, `lead`, `label` (mono 12 px, uppercase, 0.08em, np. `.01 — USŁUGI`).
- Siatka: `wrap` (max 1440 px, marginesy 48 / 20 px) + `grid-12`.
- Ciemne sekcje: klasa `dots` (statyczna siatka kropek).
- Przyciski prostokątne: obramowanie 1 px albo wypełnienie; hover odwraca kolory.
- Zaokrąglenia 0–2 px. Sekcje dzielą linie 1 px, nie karty.

## Zakazy
Gradienty, poświaty, glassmorphism. Karty z cieniem i dużym zaokrągleniem. Ikony w kolorowych kółkach i siatki „feature cards”.
Plakietka nad nagłówkiem hero, tekst z gradientem, emoji. Grafiki 3D, własny kursor, magnetyczne przyciski, parallax.
Wymyślone logo, opinie i liczby.

## Ruch
- Tylko `motion` i natywny scroll. Najwyżej jeden efekt ruchu na sekcję.
- `FadeIn`: opacity + 12 px, 300 ms, raz. Nie na hero (LCP) i nie w sekcji, która ma własny efekt.
- `PixelTransition from to` między każdą parą sekcji o różnych kolorach. Jeden canvas, progi z seeda, postęp ze scrolla.
- `PixelReveal` dla obrazów realizacji.
- `prefers-reduced-motion`: wszystko statyczne.

## Mobile (<768 px)
Jedna kolumna, bez sekcji poziomych, bez sticky poza nawigacją. Hero: nagłówek max 2.5rem, jedno zdanie, jeden przycisk, bez terminala.
Menu: pełnoekranowy panel bez animacji, z focus trapem. Wiersze usług i realizacji klikalne w całości, cel dotyku min. 44 px.
Animacje tylko dwie: fade-in i przejścia pikselowe 12 × 3. Tekst 16–17 px, odstępy sekcji 64–80 px.
