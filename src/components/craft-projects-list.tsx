'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/context/language';
import { Project } from '@/interfaces/project';
import {
  ArrowUpRight01Icon,
  Cancel01Icon,
  ChevronRightIcon,
  ExternalLinkIcon,
  Github01Icon,
  Search01Icon,
  SearchXIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import Link from 'next/link';

interface CraftProjectsListProps {
  projects: Project[];
}

export function CraftProjectsList({ projects }: CraftProjectsListProps) {
  const { locale, t } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [hoveredProject, setHoveredProject] = React.useState<Project | null>(
    null,
  );
  const [expandedProjectId, setExpandedProjectId] = React.useState<
    string | null
  >(null);

  // Mouse tracking with Emil-style physics spring for hover preview
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 260, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Sort helper: order by creation date descending (newest first)
  const sortByDateDesc = (a: Project, b: Project) => {
    const timeA = new Date(a.createdAt).getTime();
    const timeB = new Date(b.createdAt).getTime();
    if (isNaN(timeA)) return 1;
    if (isNaN(timeB)) return -1;
    return timeB - timeA;
  };

  // Only keep SaaS and personal/autoral projects, sorted by creation date descending
  const curatedProjects = React.useMemo(() => {
    return projects
      .filter((p) => {
        const cat = (p.category || '').toLowerCase();
        return cat === 'uollet' || p.category === 'Pessoal';
      })
      .sort(sortByDateDesc);
  }, [projects]);

  // Search filter
  const filteredProjects = React.useMemo(() => {
    if (!searchQuery.trim()) return curatedProjects;

    const query = searchQuery.toLowerCase().trim();
    return curatedProjects.filter((p) => {
      const matchesName = p.name.toLowerCase().includes(query);
      const matchesDesc = (p.description || '').toLowerCase().includes(query);
      const matchesTech = p.technologies.some((t) =>
        t.name.toLowerCase().includes(query),
      );
      return matchesName || matchesDesc || matchesTech;
    });
  }, [curatedProjects, searchQuery]);

  // Split into 2 clear physical sections: SaaS and Outros Projetos (both sorted by date descending)
  const saasProjects = React.useMemo(() => {
    return filteredProjects
      .filter((p) => (p.category || '').toLowerCase() === 'uollet')
      .sort(sortByDateDesc);
  }, [filteredProjects]);

  const outrosProjects = React.useMemo(() => {
    return filteredProjects
      .filter((p) => (p.category || '').toLowerCase() !== 'uollet')
      .sort(sortByDateDesc);
  }, [filteredProjects]);

  const toggleExpand = (id: string) => {
    setExpandedProjectId((prev) => (prev === id ? null : id));
  };

  const renderProjectRow = (project: Project) => {
    const isExpanded = expandedProjectId === project.id;
    const year = new Date(project.createdAt).getFullYear();

    return (
      <div
        key={project.id}
        onMouseEnter={() => setHoveredProject(project)}
        onMouseLeave={() => setHoveredProject(null)}
        className="group transition-colors duration-150 hover:bg-muted/15"
      >
        {/* Row Header */}
        <div
          onClick={() => toggleExpand(project.id)}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3.5 px-2 sm:px-3 cursor-pointer select-none"
        >
          {/* Left: Indicator + Clean Project Name (No tags) */}
          <div className="flex items-center gap-3 min-w-0">
            <motion.span
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.15 }}
              className="text-muted-foreground/60 shrink-0"
            >
              <HugeiconsIcon
                icon={ChevronRightIcon}
                size={16}
                strokeWidth={1.5}
              />
            </motion.span>

            <span className="font-medium text-sm sm:text-base text-foreground group-hover:text-foreground/80 transition-colors truncate">
              {project.name}
            </span>
          </div>

          {/* Right: Tech Chips + Year + Direct Links */}
          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-muted-foreground font-mono shrink-0 pl-7 sm:pl-0">
            {/* Tech Chips */}
            <div className="hidden md:flex items-center gap-1.5">
              {project.technologies.slice(0, 3).map((t) => (
                <span
                  key={t.id}
                  className="px-1.5 py-0.5 rounded bg-muted/30 border border-border/30 text-[10px]"
                >
                  {t.name}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="text-[10px] text-muted-foreground/60">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>

            <span className="text-muted-foreground/40 hidden sm:inline">•</span>
            <span>{isNaN(year) ? '2024' : year}</span>

            {/* Quick Access Action Icons */}
            <div className="flex items-center gap-1.5 ml-1">
              {project.urlProject && (
                <Link
                  href={project.urlProject}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  title={t.projects.viewProject}
                >
                  <HugeiconsIcon
                    icon={ArrowUpRight01Icon}
                    size={15}
                    strokeWidth={1.5}
                  />
                </Link>
              )}
              {project.urlRepo && (
                <Link
                  href={project.urlRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  title={t.projects.viewRepo}
                >
                  <HugeiconsIcon
                    icon={Github01Icon}
                    size={15}
                    strokeWidth={1.5}
                  />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Inline Expansion Panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                duration: 0.22,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="overflow-hidden bg-muted/10 px-4 sm:px-6 pb-6 pt-2 border-t border-border/20"
            >
              <div className="grid lg:grid-cols-5 gap-6 items-start pt-2">
                {/* Left: Description & Tech */}
                <div className="lg:col-span-3 space-y-4">
                  {project.description && (
                    <div>
                      <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1.5">
                        {locale === 'en' ? 'About project' : 'Sobre o projeto'}
                      </p>
                      <p className="text-sm text-foreground/90 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  )}

                  {/* Full Tech Stack */}
                  {project.technologies.length > 0 && (
                    <div>
                      <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">
                        {t.projects.techStack}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tItem) => (
                          <span
                            key={tItem.id}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background border border-border/40 text-xs font-mono text-foreground"
                          >
                            {tItem.iconSvg && (
                              <svg
                                dangerouslySetInnerHTML={{
                                  __html: tItem.iconSvg,
                                }}
                                className="w-3.5 h-3.5 shrink-0 opacity-80"
                              />
                            )}
                            {tItem.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-2">
                    {project.urlProject && (
                      <Button
                        asChild
                        size="sm"
                        className="rounded-lg h-9 px-4 text-xs font-medium gap-1.5"
                      >
                        <Link
                          href={project.urlProject}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>{t.projects.viewProject}</span>
                          <HugeiconsIcon
                            icon={ExternalLinkIcon}
                            size={15}
                            strokeWidth={1.5}
                          />
                        </Link>
                      </Button>
                    )}
                    {project.urlRepo && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="rounded-lg h-9 px-4 text-xs font-medium gap-1.5 border-border/60 hover:bg-background"
                      >
                        <Link
                          href={project.urlRepo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <HugeiconsIcon
                            icon={Github01Icon}
                            size={15}
                            strokeWidth={1.5}
                          />
                          <span>{t.projects.viewRepo}</span>
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Right: Media snapshot */}
                {project.thumbnail?.url && (
                  <div className="lg:col-span-2">
                    <div className="aspect-video w-full rounded-xl overflow-hidden border border-border/40 bg-background/50 shadow-xs">
                      <img
                        src={project.thumbnail.url}
                        alt={project.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative space-y-8 select-none"
    >
      {/* Page Header */}
      <header className="space-y-3 pb-6 border-b border-border/40">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans">
              {t.nav.projects}
            </h1>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
              {locale === 'en'
                ? 'SaaS products and personal projects built with a focus on product and user experience.'
                : 'Produtos SaaS e projetos autorais desenvolvidos com foco em produto e experiência de uso.'}
            </p>
          </div>
          <div className="text-xs font-mono text-muted-foreground shrink-0 self-start sm:self-auto">
            {curatedProjects.length}{' '}
            {curatedProjects.length === 1
              ? locale === 'en'
                ? 'project'
                : 'projeto'
              : locale === 'en'
                ? 'projects'
                : 'projetos'}
          </div>
        </div>
      </header>

      {/* Floating Cursor Preview Window (Desktop only - Monochrome) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute z-30 hidden lg:block -top-6 -left-6"
        style={{
          x: smoothX,
          y: smoothY,
        }}
      >
        <AnimatePresence>
          {hoveredProject && hoveredProject.thumbnail?.url && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 5 }}
              transition={{
                duration: 0.16,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="w-72 overflow-hidden rounded-xl border border-border bg-background/95 backdrop-blur-xl shadow-2xl p-2.5 space-y-2 -translate-x-1/2 -translate-y-full mb-3"
            >
              <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-muted/40 border border-border/40">
                <img
                  src={hoveredProject.thumbnail.url}
                  alt={hoveredProject.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between px-1 text-xs">
                <span className="font-semibold text-foreground truncate">
                  {hoveredProject.name}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground uppercase">
                  {hoveredProject.category}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Search Input (No filter tabs) */}
      <div className="relative max-w-md">
        <HugeiconsIcon
          icon={Search01Icon}
          size={16}
          strokeWidth={1.5}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60"
        />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.projects.searchPlaceholder}
          className="pl-9 pr-9 h-10 rounded-xl bg-muted/20 border-border/50 text-xs sm:text-sm placeholder:text-muted-foreground/60 focus-visible:ring-1 focus-visible:ring-foreground"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 cursor-pointer"
            title={t.projects.clearSearch}
          >
            <HugeiconsIcon icon={Cancel01Icon} size={14} strokeWidth={1.5} />
          </button>
        )}
      </div>

      {/* Empty Search State */}
      {filteredProjects.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border/60 bg-muted/10 p-8 sm:p-12 text-center space-y-3">
          <div className="mx-auto w-10 h-10 rounded-full bg-muted/40 flex items-center justify-center text-muted-foreground">
            <HugeiconsIcon icon={SearchXIcon} size={20} strokeWidth={1.5} />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-foreground">
              {t.projects.emptyTitle}
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              {t.projects.emptyDescription}
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setSearchQuery('')}
            className="text-xs h-8 px-3 rounded-lg border-border/60"
          >
            {t.projects.clearSearch}
          </Button>
        </div>
      )}

      {/* Section 1: SaaS */}
      {saasProjects.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-border/40">
            <h2 className="text-xs font-mono font-medium uppercase tracking-widest text-foreground">
              {t.projects.saasTitle}
            </h2>
            <span className="text-xs font-mono text-muted-foreground">
              {saasProjects.length}{' '}
              {saasProjects.length === 1
                ? locale === 'en'
                  ? 'project'
                  : 'projeto'
                : locale === 'en'
                  ? 'projects'
                  : 'projetos'}
            </span>
          </div>

          <div className="divide-y divide-border/30 border-b border-border/40">
            {saasProjects.map(renderProjectRow)}
          </div>
        </section>
      )}

      {/* Section 2: Outros projetos */}
      {outrosProjects.length > 0 && (
        <section className="space-y-3 pt-4">
          <div className="flex items-center justify-between pb-2 border-b border-border/40">
            <h2 className="text-xs font-mono font-medium uppercase tracking-widest text-foreground">
              {t.projects.otherTitle}
            </h2>
            <span className="text-xs font-mono text-muted-foreground">
              {outrosProjects.length}{' '}
              {outrosProjects.length === 1
                ? locale === 'en'
                  ? 'project'
                  : 'projeto'
                : locale === 'en'
                  ? 'projects'
                  : 'projetos'}
            </span>
          </div>

          <div className="divide-y divide-border/30 border-b border-border/40">
            {outrosProjects.map(renderProjectRow)}
          </div>
        </section>
      )}
    </div>
  );
}
