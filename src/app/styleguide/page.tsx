import type { Metadata } from "next";
import Image from "next/image";
import { PixelReveal } from "@/components/pixel/PixelReveal";
import { PixelTransition } from "@/components/pixel/PixelTransition";
import { Arrow } from "@/components/ui/Arrow";
import { Button } from "@/components/ui/Button";
import { Terminal, TerminalLine } from "@/components/ui/Terminal";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const swatches = [
  { name: "Czerń", value: "#0B0B0B", className: "bg-ink text-paper" },
  { name: "Złamana biel", value: "#EFEEE9", className: "bg-paper text-ink" },
  { name: "Tekst 2 / ciemne", value: "#8C8C8C", className: "bg-[#8c8c8c] text-ink" },
  { name: "Tekst 2 / jasne", value: "#5E5E5E", className: "bg-[#5e5e5e] text-paper" },
  { name: "Linia / ciemne", value: "#2A2A2A", className: "bg-[#2a2a2a] text-paper" },
  { name: "Linia / jasne", value: "#D6D5CF", className: "bg-[#d6d5cf] text-ink" },
];

function Buttons() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button href="/styleguide">Rozpocznij projekt</Button>
      <Button href="/styleguide" variant="outline">
        Zobacz realizacje <Arrow />
      </Button>
    </div>
  );
}

function Type() {
  return (
    <div className="space-y-10">
      <div>
        <p className="label text-mute">Display / Archivo 500</p>
        <p className="display mt-4">Zażółć gęślą jaźń.</p>
      </div>
      <div>
        <p className="label text-mute">H2</p>
        <p className="h2 mt-4">Bezpieczeństwo od pierwszej linii kodu</p>
      </div>
      <div>
        <p className="label text-mute">H3</p>
        <p className="h3 mt-4">Wdrożenia Magento 2</p>
      </div>
      <div>
        <p className="label text-mute">Lead</p>
        <p className="lead mt-4 max-w-[40rem]">Zanim cokolwiek zbudujemy, sprawdzamy, co już działa, a co jest ryzykiem.</p>
      </div>
      <div>
        <p className="label text-mute">Tekst 17–18 px / Archivo 400</p>
        <p className="mt-4 max-w-[40rem]">
          Tekst podstawowy. Polskie znaki: ą ę ł ś ż ź ć ń ó Ą Ę Ł Ś Ż Ź Ć Ń Ó. Pchnąć w tę łódź jeża lub ośm skrzyń fig.
        </p>
        <p className="mt-3 max-w-[40rem] text-mute">Tekst drugorzędny w kolorze przygaszonym.</p>
      </div>
      <div>
        <p className="label text-mute">Etykieta / Geist Mono 12 px</p>
        <p className="label mt-4">.01 — Usługi / ąęłśżźćńó / 001 → 006</p>
      </div>
    </div>
  );
}

export default function Styleguide() {
  return (
    <>
      <section className="theme-dark dots">
        <div className="wrap py-16 md:py-24">
          <p className="label text-mute">Styleguide / noindex</p>
          <h1 className="display mt-5">Design system</h1>

          <h2 className="label mt-16 border-t border-line pt-5 text-mute">Kolory</h2>
          <div className="mt-6 grid grid-cols-2 border border-line md:grid-cols-6">
            {swatches.map((s) => (
              <div key={s.value} className={`flex aspect-[4/3] flex-col justify-between p-4 ${s.className}`}>
                <span className="label">{s.name}</span>
                <span className="label">{s.value}</span>
              </div>
            ))}
          </div>

          <h2 className="label mt-16 border-t border-line pt-5 text-mute">Typografia / ciemne</h2>
          <div className="mt-8">
            <Type />
          </div>

          <h2 className="label mt-16 border-t border-line pt-5 text-mute">Przyciski / ciemne</h2>
          <div className="mt-8">
            <Buttons />
          </div>

          <h2 className="label mt-16 border-t border-line pt-5 text-mute">Terminal</h2>
          <Terminal title="security.log" meta="6 zasad" className="mt-8 max-w-[36rem]">
            <TerminalLine n={1}>[sec] owasp.check → raport gotowy</TerminalLine>
            <TerminalLine n={2}>[rag] index.build → ok</TerminalLine>
            <TerminalLine n={3}>[magento] deploy.staging → ok</TerminalLine>
          </Terminal>
        </div>
      </section>

      <PixelTransition from="dark" to="light" seed={3} />

      <section className="theme-light">
        <div className="wrap py-16 md:py-24">
          <h2 className="label border-t border-line pt-5 text-mute">Typografia / jasne</h2>
          <div className="mt-8">
            <Type />
          </div>
          <h2 className="label mt-16 border-t border-line pt-5 text-mute">Przyciski / jasne</h2>
          <div className="mt-8">
            <Buttons />
          </div>

          <h2 className="label mt-16 border-t border-line pt-5 text-mute">PixelReveal</h2>
          <PixelReveal className="mt-8 aspect-[16/10] max-w-[48rem]">
            <Image
              src="/images/projects/asystent-dokumentacji-technicznej.png"
              alt="Przykładowa grafika projektu demonstracyjnego"
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          </PixelReveal>
          <p className="label mt-16 text-mute">Poniżej: przejście jasne → ciemne (32 × 8, mobile 16 × 4)</p>
        </div>
      </section>

      <PixelTransition from="light" to="dark" seed={5} />

      <section className="theme-dark dots">
        <div className="wrap py-24 md:py-40">
          <p className="label text-mute">Koniec demo. Przejście cofa się przy scrollu w górę.</p>
        </div>
      </section>
    </>
  );
}
