import { Arrow } from "@/components/ui/Arrow";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { mailto, site } from "@/config/site";

/**
 * Końcowe CTA (ciemne): „Porozmawiajmy.” na całą szerokość, email i przycisk.
 * Z `subject` przycisk otwiera mail z tematem (np. nazwą usługi) zamiast prowadzić do /kontakt.
 */
export function CtaSection({ label = "Kontakt", subject }: { label?: string; subject?: string }) {
  return (
    <section className="theme-dark dots">
      <div className="wrap pb-16 pt-14 md:pb-28 md:pt-20 lg:pt-24">
        <FadeIn>
          <p className="label flex justify-between gap-6 border-t border-line pt-4 text-mute">
            <span>{label}</span>
            <span className="text-right">Odpowiadamy w ciągu 24h roboczych</span>
          </p>
          <div className="[container-type:inline-size]">
            <h2 className="mega mt-10 md:mt-16" style={{ fontSize: "13.6cqw" }}>
              Porozmawiajmy.
            </h2>
          </div>
          <div className="mt-10 flex flex-col gap-6 border-t border-line pt-8 md:mt-16 md:flex-row md:items-center md:justify-between">
            <a
              href={mailto(subject)}
              className="lead flex min-h-11 items-center underline decoration-1 underline-offset-[6px] hover:text-mute"
            >
              {site.email}
            </a>
            <Button href={subject ? mailto(subject) : "/kontakt"} className="w-full sm:w-auto">
              {subject ? "Napisz do nas" : "Rozpocznij projekt"} <Arrow />
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
