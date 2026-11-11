import { Arrow } from "@/components/ui/Arrow";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="theme-dark dots">
      <div className="wrap pb-20 pt-14 md:pb-28 md:pt-20">
        <p className="label flex justify-between border-t border-line pt-4 text-mute">
          <span>Błąd</span>
          <span>404</span>
        </p>
        <div className="[container-type:inline-size]">
          <h1 className="mega mt-8" style={{ fontSize: "48cqw" }}>
            404
          </h1>
        </div>
        <div className="mt-10 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <p className="lead">Tej strony nie ma. Mogła zmienić adres albo nigdy nie istniała.</p>
          <Button href="/" className="w-full sm:w-auto">
            Strona główna <Arrow />
          </Button>
        </div>
      </div>
    </section>
  );
}
