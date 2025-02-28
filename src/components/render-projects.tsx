import { Button } from '@/components/ui/button';
import { Project } from '@/interfaces/project';
import { GithubLogo } from '@phosphor-icons/react/dist/ssr';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { DialogImage } from './dialog-image';

interface RenderProjectsProps {
  projects: Project[];
  category?: string;
  recent?: boolean;
}

export default function RenderProjects({ projects, category, recent }: RenderProjectsProps) {
  return (
    <section className="mt-8 flex-col gap-4 flex lg:grid lg:grid-cols-3">
      {projects
        .sort((a, b) => b.order - a.order)
        .filter((project) => !category || project.category === category)
        .filter((_, index) => !recent || index < 1)
        .map((project) => (
          <div
            className="rounded-lg flex flex-col justify-around p-8 border bg-accent/50 dark:backdrop-blur-2xl
            text-accent-foreground transition-transform"
            key={project.id}
          >
            <div className="flex">
              <figure className="rounded-lg overflow-hidden relative flex items-center justify-center">
                {project.category !== 'IK' ? (
                  <DialogImage src={project.thumbnail?.url} alt={project.name} />
                ) : (
                  <Image
                    src={project.thumbnail?.url}
                    alt={project.name}
                    width={500}
                    height={500}
                    className="w-16 h-16 bg-gray-300 dark:bg-[#333] rounded-lg"
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
                  <Button variant="outline" className="text-sm" asChild>
                    <Link href={project?.urlProject} target="_blank" passHref>
                      <ArrowUpRight size={16} className="mr-1" />
                      Visitar
                    </Link>
                  </Button>
                )}

                {project.urlRepo && (
                  <Button variant="outline" className="text-sm" asChild>
                    <Link href={project?.urlRepo} target="_blank" passHref>
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
                          dangerouslySetInnerHTML={{ __html: technology.iconSvg }}
                          className="w-4 h-4 inline-block mr-1 mt-1 text-muted-foreground"
                        />
                        <p className="text-muted-foreground">{technology.name}</p>
                      </span>
                    ),
                )}
              </div>
            </div>
          </div>
        ))}
    </section>
  );
}
