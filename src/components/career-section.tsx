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
        className="absolute left-4 top-6 w-4 h-4 rounded-full border-2 border-background hidden md:flex items-center justify-center z-10"
        style={{
          backgroundColor: experience.companyColor?.hex || 'var(--muted)',
        }}
      >
        {isCurrentJob && (
          <span className="absolute w-4 h-4 rounded-full animate-ping opacity-50 bg-current" />
        )}
      </div>

      {/* Card */}
      <div className="md:ml-16 rounded-2xl border border-border/50 bg-card/30 p-6 hover:bg-card/50 hover:border-border transition-all duration-300 group-hover:shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          {/* Company Logo */}
          <div className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden">
            <img
              src={experience.companyLogo?.url}
              alt={experience.companyName}
              className="w-14 h-14 object-contain"
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <h3 className="font-bold text-lg">{experience.role}</h3>
              {isCurrentJob && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  Atual
                </span>
              )}
            </div>

            <p className="text-muted-foreground font-medium mb-3">
              {experience.companyName}
            </p>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} />
                {startedAt} - {finishedAt}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Briefcase size={14} />
                {duration}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} />
                {experience.typeJob}
              </span>
            </div>

            {experience.description && (
              <p className="mt-3 text-sm text-muted-foreground">
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
        <div className="relative mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              Atualmente
            </span>
            <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium">
              {currentJobs.length}
            </span>
          </div>

          {/* Timeline line */}
          <div className="absolute left-6 top-8 bottom-0 w-px bg-border/50 hidden md:block" />

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
            className="flex items-center gap-2 mb-4 group cursor-pointer"
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
