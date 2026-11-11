import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PixelReveal } from "@/components/pixel/PixelReveal";
import { PixelTransition } from "@/components/pixel/PixelTransition";
import { CtaSection } from "@/components/sections/CtaSection";
import { Arrow } from "@/components/ui/Arrow";
import { FadeIn } from "@/components/ui/FadeIn";
import { getProject, projects } from "@/data/projects";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/metadata";
import { bottomBeforeBand, top, topAfterBand, two } from "@/lib/spacing";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/realizacje/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({ title: project.name, description: `Projekt demonstracyjny. ${project.summary}`, path: `/realizacje/${slug}` });
}

export default async function ProjectPage({ params }: PageProps<"/realizacje/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const service = services.find((s) => s.projectCategory === project.category);
  const meta = [
    { label: "Klient", value: project.client },
    { label: "Branża", value: project.industry },
    { label: "Rok", value: project.year },
    { label: "Zakres", value: project.scope.join(", ") },
    { label: "Stack", value: project.stack.join(", ") },
  ];

  return (
    <>
      {/* 1. Nazwa i metadane */}
      <section className="theme-dark dots">
        <div className="wrap pb-10 pt-14 md:pt-20 lg:pt-24">
          <p className="label flex justify-between gap-6 border-t border-line pt-4 text-mute">
            <span>
              <Link href="/realizacje" className="hover:text-fg">
                Realizacje
              </Link>{" "}
              / {project.category}
            </span>
            <span>Projekt demonstracyjny</span>
          </p>
          <h1 className="display mt-8 max-w-[16ch] md:mt-12">{project.name}</h1>
          <dl className="mt-10 grid border-t border-line md:mt-14 md:grid-cols-5">
            {meta.map((item) => (
              <div key={item.label} className="border-b border-line py-4 md:border-b-0 md:border-l md:px-4 md:first:border-l-0 md:first:pl-0">
                <dt className="label text-mute">{item.label}</dt>
                <dd className="label mt-2 normal-case tracking-normal">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* 2. Duży obraz */}
        <div className="wrap pb-14 lg:pb-16">
          <PixelReveal className="aspect-[16/10]" seed={index + 11} cols={32}>
            <Image
              src={project.image}
              alt={`Plakat projektu demonstracyjnego: ${project.name}`}
              fill
              priority
              sizes="(min-width: 1440px) 1344px, 100vw"
              className="object-cover"
            />
          </PixelReveal>
        </div>
      </section>

      <PixelTransition from="dark" to="light" seed={401} />

      {/* 3. Wyzwanie → Rozwiązanie → Efekty */}
      <section className="theme-light">
        <div className={`wrap ${topAfterBand}`}>
          <FadeIn className="border-b border-line">
            <div className="grid-12 gap-y-4 border-t border-line py-10 md:py-14">
              <h2 className="label col-span-12 text-mute lg:col-span-3">.01 — Wyzwanie</h2>
              <p className="lead col-span-12 lg:col-span-8">{project.challenge}</p>
            </div>
            <div className="grid-12 gap-y-4 border-t border-line py-10 md:py-14">
              <h2 className="label col-span-12 text-mute lg:col-span-3">.02 — Rozwiązanie</h2>
              <ol className="col-span-12 lg:col-span-8">
                {project.solution.map((step, i) => (
                  <li key={step} className="flex gap-5 border-t border-line py-4 first:border-t-0 first:pt-0">
                    <span className="label pt-1 text-mute">{two(i + 1)}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="grid-12 gap-y-6 border-t border-line py-10 md:py-14">
              <h2 className="label col-span-12 text-mute lg:col-span-3">.03 — Efekty</h2>
              <ul className="col-span-12 grid gap-y-8 md:grid-cols-3 md:gap-x-6 lg:col-span-9">
                {project.results.map((result) => (
                  <li key={result.label} className="border-t border-line pt-4">
                    <p className="text-[clamp(3rem,6vw,5.5rem)] font-medium leading-none tracking-[-0.05em]">{result.value}</p>
                    <p className="mt-3 text-[1rem] text-mute">{result.label}</p>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>

        {/* 4. Galeria */}
        <div className={`wrap ${top} ${bottomBeforeBand}`}>
          <h2 className="label border-t border-line pt-4 text-mute">.04 — Galeria</h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {project.gallery.map((image, i) => (
              <li key={image.src}>
                <PixelReveal className="aspect-[16/10]" seed={index * 7 + i}>
                  <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </PixelReveal>
              </li>
            ))}
          </ul>

          {/* 5. Cytat: tylko gdy wypełniony */}
          {project.quote ? (
            <figure className="mt-16 border-t border-line pt-10 md:mt-24">
              <blockquote className="h2 max-w-[24ch]">„{project.quote.text}”</blockquote>
              <figcaption className="label mt-6 text-mute">{project.quote.author}</figcaption>
            </figure>
          ) : null}

          {service ? (
            <p className="mt-12 border-t border-line pt-6">
              <Link href={`/uslugi/${service.slug}`} className="label inline-flex min-h-11 items-center gap-3 hover:text-mute">
                Usługa: {service.name} <Arrow />
              </Link>
            </p>
          ) : null}
        </div>
      </section>

      <PixelTransition from="light" to="dark" seed={403} />

      {/* 6. Następny projekt */}
      <section className="theme-dark dots">
        <Link href={`/realizacje/${next.slug}`} className="group block border-b border-line transition-colors duration-150 hover:bg-fg hover:text-bg">
          <div className="wrap py-14 md:py-20">
            <p className="label flex justify-between text-mute group-hover:text-bg">
              <span>Następny projekt</span>
              <span>
                {next.category} / {next.year}
              </span>
            </p>
            <p className="display mt-8 flex items-end justify-between gap-6">
              <span className="max-w-[16ch]">{next.name}</span>
              <Arrow className="mb-[0.1em] shrink-0" />
            </p>
          </div>
        </Link>
      </section>

      <CtaSection label="Kontakt" subject={`Projekt podobny do: ${project.name}`} />
    </>
  );
}
