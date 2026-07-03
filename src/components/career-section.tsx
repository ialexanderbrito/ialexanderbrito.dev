'use client';

import { useState } from 'react';
import { Briefcase, Calendar, ChevronDown, MapPin } from 'lucide-react';
import { calcDuration } from '@/utils/date';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

interface Experience {
  id: string;
  role: string;
  companyName: string;
  companyLogo?: { url: string };
  companyColor?: { hex: string };
  startedAt: string;
  finishedAt?: string;
  typeJob: string;
  description?: string;
}

interface CareerSectionProps {
  experiences: Experience[];
}

function ExperienceCard({ experience }: { experience: Experience }) {
  const templateFormat = 'MMM YYYY';
  const startedAt = dayjs(experience.startedAt).format(templateFormat);
  const finishedAt = experience.finishedAt
    ? dayjs(experience.finishedAt).format(templateFormat)
    : 'Atualmente';
  const duration = calcDuration(
    experience.startedAt,
    experience.finishedAt || new Date(),
  );
  const isCurrentJob = !experience.finishedAt;

  return (
    <div className="relative group">
      {/* Timeline dot */}
      <div
        className="absolute left-4 top-8 w-4 h-4 rounded-full border-2 border-background hidden md:flex items-center justify-center z-10 shadow-sm"
        style={{
          backgroundColor: experience.companyColor?.hex || 'var(--muted)',
        }}
      >
        {isCurrentJob && (
          <span className="absolute w-4 h-4 rounded-full animate-ping opacity-50 bg-current" />
        )}
      </div>

      {/* Card */}
      <div className="md:ml-16 rounded-[15px] border border-border/50 bg-muted/10 backdrop-blur-md p-6 hover:bg-muted/20 transition-colors duration-300">
        <div className="flex flex-col sm:flex-row sm:items-start gap-5">
          {/* Company Logo */}
          <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-[12px] flex items-center justify-center overflow-hidden border border-border/50 bg-white/80 dark:bg-white/5 backdrop-blur-md shadow-sm">
            <img
              src={experience.companyLogo?.url}
              alt={experience.companyName}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
              <h3 className="font-bold text-lg text-foreground/90">
                {experience.role}
              </h3>
              {isCurrentJob && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-[10px] font-semibold tracking-wide uppercase shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  Atual
                </span>
              )}
            </div>

            <p className="text-muted-foreground/80 font-medium mb-4">
              {experience.companyName}
            </p>

            <div className="flex flex-wrap gap-2 text-[11px] sm:text-xs text-muted-foreground mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md bg-muted/20 border border-border/50">
                <Calendar size={14} className="opacity-70" />
                {startedAt} - {finishedAt}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md bg-muted/20 border border-border/50">
                <Briefcase size={14} className="opacity-70" />
                {duration}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md bg-muted/20 border border-border/50">
                <MapPin size={14} className="opacity-70" />
                {experience.typeJob}
              </span>
            </div>

            {experience.description && (
              <p className="text-sm text-muted-foreground/90 leading-relaxed">
                {experience.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CareerSection({ experiences }: CareerSectionProps) {
  const [showPrevious, setShowPrevious] = useState(false);

  const currentJobs = experiences.filter((exp) => !exp.finishedAt);
  const previousJobs = experiences.filter((exp) => exp.finishedAt);

  return (
    <section className="py-12 border-t border-border/50">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-2xl font-bold">Carreira</h2>
        <span className="h-px flex-1 bg-border/50" />
      </div>
      <p className="text-muted-foreground mb-8">
        Minha trajetória profissional ao longo dos anos
      </p>

      {/* Current Jobs */}
      {currentJobs.length > 0 && (
        <div className="relative mb-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-semibold tracking-wide uppercase text-green-700 dark:text-green-400">
              Atualmente
            </span>
            <span className="px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 text-[10px] font-bold shadow-sm">
              {currentJobs.length}
            </span>
          </div>

          {/* Timeline line */}
          <div className="absolute left-6 top-10 bottom-0 w-px bg-border/50 hidden md:block" />

          <div className="space-y-6">
            {currentJobs.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </div>
      )}

      {/* Previous Jobs Accordion */}
      {previousJobs.length > 0 && (
        <div className="relative">
          <button
            onClick={() => setShowPrevious(!showPrevious)}
            className="flex items-center gap-2 mb-6 group cursor-pointer"
          >
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              Experiências anteriores
            </span>
            <span className="px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground text-xs font-medium">
              {previousJobs.length}
            </span>
            <ChevronDown
              size={16}
              className={`text-muted-foreground transition-transform duration-200 ${
                showPrevious ? 'rotate-180' : ''
              }`}
            />
          </button>

          <div
            className={`grid transition-all duration-300 ease-in-out ${
              showPrevious
                ? 'grid-rows-[1fr] opacity-100'
                : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              {/* Timeline line */}
              <div className="absolute left-6 top-8 bottom-0 w-px bg-border/50 hidden md:block" />

              <div className="space-y-6">
                {previousJobs.map((experience) => (
                  <ExperienceCard key={experience.id} experience={experience} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
