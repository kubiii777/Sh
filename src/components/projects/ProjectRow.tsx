import Image from "next/image";
import Link from "next/link";
import { PixelReveal } from "@/components/pixel/PixelReveal";
import { Arrow } from "@/components/ui/Arrow";
import type { Project } from "@/data/projects";

/** Duży wiersz realizacji: plakat z PixelReveal i opis; co drugi wiersz odwrócony na desktopie. */
export function ProjectRow({ project, index, heading = "h3" }: { project: Project; index: number; heading?: "h2" | "h3" }) {
  const flip = index % 2 === 1;
  const Heading = heading;
  return (
    <Link href={`/realizacje/${project.slug}`} className="group grid-12 gap-y-5 py-6 md:py-10">
      <PixelReveal
        className={`col-span-12 aspect-[16/10] md:col-span-8 ${flip ? "md:col-start-5" : ""}`}
        seed={index + 3}
      >
        <Image
          src={project.image}
          alt={`Plakat projektu demonstracyjnego: ${project.name}`}
          fill
          sizes="(min-width: 1440px) 890px, (min-width: 768px) 66vw, 100vw"
          className="object-cover"
        />
      </PixelReveal>
      <div
        className={`col-span-12 flex flex-col justify-between gap-6 md:col-span-4 ${
          flip ? "md:col-start-1 md:row-start-1 md:pr-6" : "md:pl-6"
        }`}
      >
        <p className="label flex justify-between text-mute">
          <span>
            {project.category} / {project.year}
          </span>
          <span>Demo</span>
        </p>
        <div>
          <Heading className="h3">{project.name}</Heading>
          <p className="mt-3 text-[1rem] text-mute">{project.summary}</p>
          <p className="label mt-5 inline-flex min-h-11 items-center gap-3 border-b border-transparent group-hover:border-fg md:mt-8">
            Zobacz projekt <Arrow />
          </p>
        </div>
      </div>
    </Link>
  );
}
