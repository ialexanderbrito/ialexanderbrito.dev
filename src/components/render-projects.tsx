'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import ShinyText from '@/components/ui/shiny-text';
import { Project } from '@/interfaces/project';
import { GithubLogo } from '@phosphor-icons/react/dist/ssr';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Folder, Sparkles } from 'lucide-react';
import Link from 'next/link';

import { DialogImage } from './dialog-image';

interface RenderProjectsProps {
  projects: Project[];
  category?: string;
  recent?: boolean;
  compact?: boolean;
}

export default function RenderProjects({
  projects,
  category,
  recent,
  compact,
}: RenderProjectsProps) {
  const [showAll, setShowAll] = useState(false);

  const filteredProjects = projects
    .sort((a, b) => b.order - a.order)
    .filter((project) => !category || project.category === category)
    .filter((_, index) => !recent || index < 1);

  if (filteredProjects.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 rounded-2xl border border-dashed border-border/50 bg-muted/10">
        <p className="text-muted-foreground">
          Nenhum projeto encontrado nesta categoria.
        </p>
      </div>
    );
  }

  // Compact view for legacy/old projects
  if (compact) {
    return (
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group flex items-center justify-between gap-4 rounded-lg border border-border/50 bg-card/20 p-4 hover:bg-card/40 hover:border-border transition-all duration-200"
          >
            <div className="flex items-center gap-3 min-w-0">
              <Folder className="h-5 w-5 text-muted-foreground shrink-0" />
              <div className="min-w-0">
                <h5 className="font-medium text-sm truncate">{project.name}</h5>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {project.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {project.urlProject && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  asChild
                >
                  <Link
                    href={project.urlProject}
                    target="_blank"
                    title="Visitar projeto"
                  >
                    <ArrowUpRight size={16} />
                  </Link>
                </Button>
              )}
              {project.urlRepo && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  asChild
                >
                  <Link
                    href={project.urlRepo}
                    target="_blank"
                    title="Ver código"
                  >
                    <GithubLogo size={16} />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Featured project (recent) - Hero style
  if (recent) {
    const project = filteredProjects[0];
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="group relative overflow-hidden rounded-3xl border border-border/50 bg-linear-to-br from-card/80 to-card/40 backdrop-blur-sm"
      >
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image side */}
          <div className="relative aspect-video md:aspect-auto md:min-h-100 overflow-hidden">
            <img
              src={project.thumbnail?.url}
              alt={project.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent md:bg-linear-to-r md:from-transparent md:via-transparent md:to-background/80" />
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium backdrop-blur-sm">
                <Sparkles size={12} />
                Em destaque
              </span>
            </div>
            <div className="absolute bottom-4 left-4 md:hidden">
              <DialogImage src={project.thumbnail?.url} alt={project.name} />
            </div>
          </div>

          {/* Content side */}
          <div className="relative p-8 md:p-10 flex flex-col justify-center">
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                  {project.name}
                </h3>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 8).map((technology) =>
                  technology.iconSvg ? (
                    <span
                      key={technology.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 dark:bg-muted/30 text-xs font-medium text-muted-foreground hover:bg-muted/80 dark:hover:bg-muted/50 transition-colors"
                    >
                      <svg
                        dangerouslySetInnerHTML={{ __html: technology.iconSvg }}
                        className="w-3.5 h-3.5"
                      />
                      {technology.name}
                    </span>
                  ) : null,
                )}
                {project.technologies.length > 8 && (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-muted/50 dark:bg-muted/30 text-xs font-medium text-muted-foreground">
                    +{project.technologies.length - 8}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-2">
                {project.urlProject && (
                  <Button
                    size="lg"
                    className="rounded-full gap-2 group/btn"
                    asChild
                  >
                    <Link href={project.urlProject} target="_blank">
                      <span>Visitar projeto</span>
                      <ExternalLink
                        size={16}
                        className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                      />
                    </Link>
                  </Button>
                )}
                {project.urlRepo && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full gap-2"
                    asChild
                  >
                    <Link href={project.urlRepo} target="_blank">
                      <GithubLogo size={18} />
                      <span>Ver código</span>
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // IK category - compact professional cards
  if (category === 'IK') {
    return (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group relative rounded-2xl border border-border/50 bg-card/30 p-6 hover:border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
          >
            <div className="flex items-start gap-4 mb-4">
              {project.thumbnail && (
                <div className="shrink-0 p-2 flex items-center justify-center overflow-hidden">
                  <img
                    src={project.thumbnail.url}
                    alt={project.name}
                    className="object-contain rounded-xl w-12 h-12"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="min-w-0">
                <h5 className="font-semibold text-lg truncate">
                  {project.name}
                </h5>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {project.description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.technologies.slice(0, 4).map((technology) =>
                technology.iconSvg ? (
                  <span
                    key={technology.id}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted/50 dark:bg-muted/30 text-[10px] font-medium text-muted-foreground"
                  >
                    <svg
                      dangerouslySetInnerHTML={{ __html: technology.iconSvg }}
                      className="w-3 h-3"
                    />
                    {technology.name}
                  </span>
                ) : null,
              )}
              {project.technologies.length > 4 && (
                <span className="inline-flex items-center px-2 py-1 rounded-md bg-muted/50 dark:bg-muted/30 text-[10px] font-medium text-muted-foreground">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>

            <div className="flex gap-2">
              {project.urlProject && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 rounded-lg text-xs h-9"
                  asChild
                >
                  <Link href={project.urlProject} target="_blank">
                    <ArrowUpRight size={14} className="mr-1" />
                    Visitar
                  </Link>
                </Button>
              )}
              {project.urlRepo && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-lg text-xs h-9 px-3"
                  asChild
                >
                  <Link href={project.urlRepo} target="_blank">
                    <GithubLogo size={14} />
                  </Link>
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  // Standard projects (uollet, Pessoal) - Modern card grid
  let projectsToDisplay = filteredProjects;
  if (!showAll) {
    projectsToDisplay = filteredProjects.slice(0, 6);
  }

  const hasMoreProjects = filteredProjects.length > 6;

  return (
    <div className="space-y-8">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projectsToDisplay.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="group relative flex flex-col rounded-2xl border border-border/50 bg-linear-to-b from-card/80 to-card/40 overflow-hidden hover:border-border hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
          >
            {/* Image */}
            <div className="relative aspect-16/10 overflow-hidden bg-muted/20">
              <img
                src={project.thumbnail?.url}
                alt={project.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

              {/* Overlay actions */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <DialogImage src={project.thumbnail?.url} alt={project.name} />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col grow p-5">
              <h5 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                {project.name}
              </h5>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.technologies.slice(0, 4).map((technology) =>
                  technology.iconSvg ? (
                    <span
                      key={technology.id}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted/50 dark:bg-muted/30 text-[10px] font-medium text-muted-foreground"
                    >
                      <svg
                        dangerouslySetInnerHTML={{ __html: technology.iconSvg }}
                        className="w-3 h-3"
                      />
                      {technology.name}
                    </span>
                  ) : null,
                )}
                {project.technologies.length > 4 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-muted/50 dark:bg-muted/30 text-[10px] font-medium text-muted-foreground">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-auto pt-4 border-t border-border/30">
                {project.urlProject && (
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1 rounded-full text-xs h-9 gap-1.5"
                    asChild
                  >
                    <Link href={project.urlProject} target="_blank">
                      Visitar
                      <ArrowUpRight size={14} />
                    </Link>
                  </Button>
                )}
                {project.urlRepo && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full text-xs h-9 px-4 gap-1.5"
                    asChild
                  >
                    <Link href={project.urlRepo} target="_blank">
                      <GithubLogo size={14} />
                      Código
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {hasMoreProjects && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            className="group cursor-pointer rounded-full px-8 py-6 text-base transition-all hover:shadow-lg hover:border-primary/50"
            onClick={() => setShowAll(!showAll)}
          >
            <ShinyText
              text={
                showAll
                  ? 'Ver menos'
                  : `Ver mais ${filteredProjects.length - 6} projetos`
              }
              className="text-sm font-medium"
              speed={3}
            />
          </Button>
        </div>
      )}
    </div>
  );
}
