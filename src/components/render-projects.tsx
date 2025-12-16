'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import ShinyText from '@/components/ui/shiny-text';
import { Project } from '@/interfaces/project';
import { GithubLogo } from '@phosphor-icons/react/dist/ssr';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { DialogImage } from './dialog-image';

interface RenderProjectsProps {
  projects: Project[];
  category?: string;
  recent?: boolean;
}

export default function RenderProjects({
  projects,
  category,
  recent,
}: RenderProjectsProps) {
  const [showAll, setShowAll] = useState(false);

  const filteredProjects = projects
    .sort((a, b) => b.order - a.order)
    .filter((project) => !category || project.category === category)
    .filter((_, index) => !recent || index < 1);

  if (filteredProjects.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 rounded-lg border bg-accent/30 text-accent-foreground">
        <p className="text-muted-foreground">
          Nenhum projeto encontrado nesta categoria.
        </p>
      </div>
    );
  }

  if (category === 'IK') {
    return (
      <div className="mt-4 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="rounded-lg border bg-card/30 p-6 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <figure className="w-16 h-16 flex items-center justify-center">
                {project.thumbnail && (
                  <img
                    src={project.thumbnail.url}
                    alt={project.name}
                    className="w-16 h-16 bg-gray-300 dark:bg-[#333] rounded-lg object-contain"
                    loading="lazy"
                  />
                )}
              </figure>
            </div>

            <h5 className="font-bold text-xl mt-1">{project.name}</h5>
            <div className="space-y-2">
              <h4 className="text-xs text-muted-foreground">
                <div className="mt-1 flex flex-col">
                  <span className="mt-1">{project.description}</span>
                </div>
              </h4>

              <div className="mt-3 flex flex-row gap-1 flex-wrap">
                {project.urlProject && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-sm"
                    asChild
                  >
                    <Link href={project?.urlProject} target="_blank">
                      <ArrowUpRight size={16} className="mr-1" />
                      Visitar
                    </Link>
                  </Button>
                )}

                {project.urlRepo && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-sm"
                    asChild
                  >
                    <Link href={project?.urlRepo} target="_blank">
                      <GithubLogo size={16} className="mr-1" />
                      Ver código
                    </Link>
                  </Button>
                )}
              </div>

              <div className="mt-1 flex flex-row gap-2 flex-wrap">
                {project.technologies.map(
                  (technology) =>
                    technology.iconSvg && (
                      <span
                        key={technology.id}
                        className="mt-1 rounded-md dark:bg-[#333] p-1 text-xs text-white flex items-center h-6 w-auto bg-[#f0f0f0]"
                      >
                        <svg
                          dangerouslySetInnerHTML={{
                            __html: technology.iconSvg,
                          }}
                          className="w-4 h-4 inline-block mr-1 mt-1 text-muted-foreground"
                        />
                        <p className="text-muted-foreground">
                          {technology.name}
                        </p>
                      </span>
                    ),
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  let projectsToDisplay = filteredProjects;
  if (!recent && !showAll) {
    projectsToDisplay = filteredProjects.slice(0, 3);
  }

  const hasMoreProjects = !recent && filteredProjects.length > 3;

  return (
    <div className="space-y-6">
      <section
        className={
          recent
            ? 'w-full'
            : 'mt-4 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }
      >
        {projectsToDisplay.map((project) => (
          <div
            key={project.id}
            className={`rounded-lg border bg-card/30 dark:backdrop-blur-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col ${
              recent ? 'w-full md:flex-row' : ''
            }`}
          >
            {/* Card media */}
            <div className={`${recent ? 'w-full md:w-1/2' : 'w-full'}`}>
              <div className="relative group aspect-video overflow-hidden bg-muted/20">
                <img
                  src={project.thumbnail?.url}
                  alt={project.name}
                  className="object-cover transition-transform group-hover:scale-105 duration-500 absolute inset-0 w-full h-full"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <DialogImage
                    src={project.thumbnail?.url}
                    alt={project.name}
                  />
                </div>
              </div>
            </div>

            {/* Card content */}
            <div
              className={`p-6 flex flex-col h-full ${recent ? 'md:w-1/2' : 'w-full'}`}
            >
              <div className="flex-grow">
                <h5 className="font-bold text-xl mb-2">{project.name}</h5>
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, recent ? 8 : 5).map(
                    (technology) =>
                      technology.iconSvg && (
                        <span
                          key={technology.id}
                          className="rounded-md dark:bg-muted/30 bg-muted/50 p-1 text-xs text-muted-foreground flex items-center h-6"
                        >
                          <svg
                            dangerouslySetInnerHTML={{
                              __html: technology.iconSvg,
                            }}
                            className="w-4 h-4 inline-block mr-1 text-muted-foreground"
                          />
                          <p>{technology.name}</p>
                        </span>
                      ),
                  )}
                  {project.technologies.length > (recent ? 8 : 5) && (
                    <span className="rounded-md dark:bg-muted/30 bg-muted/50 p-1 text-xs text-muted-foreground flex items-center h-6">
                      +{project.technologies.length - (recent ? 8 : 5)}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/30">
                {project.urlProject && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-sm font-medium"
                    asChild
                  >
                    <Link href={project?.urlProject} target="_blank">
                      <ArrowUpRight size={16} className="mr-1" />
                      Visitar
                    </Link>
                  </Button>
                )}

                {project.urlRepo && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-sm font-medium"
                    asChild
                  >
                    <Link href={project?.urlRepo} target="_blank">
                      <GithubLogo size={16} className="mr-1" />
                      Ver código
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
      {hasMoreProjects && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            className="group rounded-full px-6 py-6 text-base transition-all hover:shadow-lg cursor-pointer"
            onClick={() => setShowAll(!showAll)}
          >
            <ShinyText
              text={
                showAll
                  ? 'Ver menos'
                  : `Ver mais ${filteredProjects.length - 3} projetos`
              }
              className="text-base font-medium group-hover:text-primary transition-colors"
              speed={3}
            />
          </Button>
        </div>
      )}
    </div>
  );
}
