"use client";

import { useState } from "react";
import { ProjectRow } from "@/components/projects/ProjectRow";
import { projectCategories, type Project, type ProjectCategory } from "@/data/projects";

type Filter = "Wszystkie" | ProjectCategory;
const filters: Filter[] = ["Wszystkie", ...projectCategories];

/** Filtry jako chipy (przyciski z aria-pressed) i lista realizacji. Filtr działa bez przeładowania. */
export function ProjectList({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Filter>("Wszystkie");
  const visible = active === "Wszystkie" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <div role="group" aria-label="Filtruj realizacje" className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const count = filter === "Wszystkie" ? projects.length : projects.filter((p) => p.category === filter).length;
          const on = filter === active;
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(filter)}
              className={`label inline-flex min-h-11 items-center gap-2 border px-4 transition-colors duration-150 ${
                on ? "border-fg bg-fg text-bg" : "border-line hover:border-fg"
              }`}
            >
              {filter}
              <span className={on ? "opacity-70" : "text-mute"}>({count})</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        Widoczne realizacje: {visible.length}
      </p>
      <ul className="mt-10 border-b border-line md:mt-16">
        {visible.map((project, i) => (
          <li key={project.slug} className="border-t border-line">
            <ProjectRow project={project} index={i} heading="h2" />
          </li>
        ))}
      </ul>
    </>
  );
}
