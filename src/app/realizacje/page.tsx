import { PixelTransition } from "@/components/pixel/PixelTransition";
import { ProjectList } from "@/components/projects/ProjectList";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";
import { bottomBeforeBand, topAfterBand } from "@/lib/spacing";

export const metadata = pageMetadata({
  title: "Realizacje",
  description: "Projekty demonstracyjne: Magento, aplikacje webowe, automatyzacje i integracje, systemy dla dużych firm oraz audyty Safe Control.",
  path: "/realizacje",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        label="Realizacje"
        title="Realizacje"
        lead="Projekty demonstracyjne. Pokazują zakres i sposób pracy, a nie konkretnych klientów; zastąpią je opisy prawdziwych wdrożeń."
      />
      <PixelTransition from="dark" to="light" seed={301} />
      <section className="theme-light">
        <div className={`wrap ${topAfterBand} ${bottomBeforeBand}`}>
          <ProjectList projects={projects} />
        </div>
      </section>
      <PixelTransition from="light" to="dark" seed={303} />
      <CtaSection label="Kontakt" />
    </>
  );
}
