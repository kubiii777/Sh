import Image from "next/image";
import Link from "next/link";
import { PixelReveal } from "@/components/pixel/PixelReveal";
import { Arrow } from "@/components/ui/Arrow";
import type { Project } from "@/data/projects";
import { two } from "@/lib/spacing";

function Caption({ project, index, big = false }: { project: Project; index: number; big?: boolean }) {
  return (
    <div className={`grid-12 mt-5 gap-y-3 ${big ? "md:mt-6" : ""}`}>
      <p className="label col-span-12 flex gap-6 text-mute md:col-span-3">
        <span>{two(index + 1)}</span>
        <span>
          {project.category} / {project.year}
        </span>
      </p>
      <div className={`col-span-12 ${big ? "md:col-span-6" : "md:col-span-9"}`}>
        <h3 className={big ? "h2" : "h3"}>{project.name}</h3>
        {big ? <p className="mt-4 max-w-[34rem] text-[1rem] text-mute">{project.summary}</p> : null}
      </div>
      {big ? (
        <p className="label col-span-12 flex items-start md:col-span-3 md:justify-end">
          <span className="inline-flex min-h-11 items-center gap-3 border-b border-transparent group-hover:border-fg md:min-h-0">
            Zobacz projekt <Arrow />
          </span>
        </p>
      ) : null}
    </div>
  );
}

/**
 * Wybrane realizacje: pierwszy projekt na całą szerokość, dwa kolejne w asymetrycznej parze
 * (7 + 5 kolumn, prawy obniżony). Mobile: jedna kolumna.
 */
export function FeaturedProjects({ items }: { items: Project[] }) {
  const [first, ...rest] = items;
  return (
    <div>
      <Link href={`/realizacje/${first.slug}`} className="group block">
        <PixelReveal className="aspect-[16/10]" seed={3}>
          <Image
            src={first.image}
            alt={`Plakat projektu demonstracyjnego: ${first.name}`}
            fill
            sizes="(min-width: 1440px) 1344px, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015]"
          />
        </PixelReveal>
        <Caption project={first} index={0} big />
      </Link>

      <div className="grid-12 mt-14 gap-y-14 md:mt-24">
        {rest.map((project, i) => (
          <Link
            key={project.slug}
            href={`/realizacje/${project.slug}`}
            className={`group col-span-12 block ${
              i === 0 ? "md:col-span-7" : "md:col-span-5 md:mt-40"
            }`}
          >
            <PixelReveal className={"aspect-[16/10]"} seed={i + 4}>
              <Image
                src={project.image}
                alt={`Plakat projektu demonstracyjnego: ${project.name}`}
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015]"
              />
            </PixelReveal>
            <div className="mt-5 flex items-start justify-between gap-6">
              <div>
                <p className="label text-mute">
                  {two(i + 2)} &nbsp; {project.category} / {project.year}
                </p>
                <h3 className="h3 mt-3">{project.name}</h3>
              </div>
              <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center border border-line transition-colors duration-150 group-hover:border-fg group-hover:bg-fg group-hover:text-bg">
                <Arrow />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
