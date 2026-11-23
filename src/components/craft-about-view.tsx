'use client';

import * as React from 'react';

import { formatJobType } from '@/config/translations';
import { useLanguage } from '@/context/language';
import { About } from '@/interfaces/about';
import { Experience } from '@/interfaces/experience';
import dayjs from 'dayjs';

interface CraftAboutViewProps {
  about?: About;
  experiences: Experience[];
}

export function CraftAboutView({
  about,
  experiences = [],
}: CraftAboutViewProps) {
  const { locale, t } = useLanguage();

  return (
    <div className="space-y-16 md:space-y-20 max-w-3xl">
      {/* 1. Header & Bio Narrative (Dados 100% via Hygraph) */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
            {t.about.greeting}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed text-balance">
            {t.about.subtitle}
          </p>
        </div>

        {/* Profile Narrative with Integrated Portrait */}
        <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8 pt-2">
          {about?.profilePicture?.url && (
            <div className="shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-border/50 bg-muted/20 shadow-xs">
                <img
                  src={about.profilePicture.url}
                  alt="Alexander"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          )}

          {about?.introduction?.html ? (
            <div
              className="text-sm sm:text-base text-muted-foreground leading-relaxed flex-1 font-normal prose prose-neutral dark:prose-invert max-w-none [&_p]:mb-4 [&_p:last-child]:mb-0 [&_a]:text-foreground [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-primary [&_a]:transition-colors"
              dangerouslySetInnerHTML={{ __html: about.introduction.html }}
            />
          ) : (
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed flex-1 font-normal">
              {t.about.defaultBio}
            </p>
          )}
        </div>
      </section>

      {/* 2. Trajetória Profissional em Linhas Tipográficas */}
      {experiences.length > 0 && (
        <section className="space-y-6 pt-4 border-t border-border/30">
          <div className="space-y-1">
            <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              {t.about.trajectoryTitle}
            </h2>
            <p className="text-xs text-muted-foreground/80 font-mono">
              {t.about.trajectorySubtitle}
            </p>
          </div>

          <div className="divide-y divide-border/30 border-y border-border/30">
            {experiences.map((exp) => {
              const startYear = exp.startedAt
                ? dayjs(exp.startedAt).format('YYYY')
                : '';
              const endYear = exp.finishedAt
                ? dayjs(exp.finishedAt).format('YYYY')
                : t.about.present;
              const period = startYear ? `${startYear} — ${endYear}` : '';

              return (
                <div
                  key={exp.id}
                  className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-6 -mx-2 sm:-mx-3 px-2 sm:px-3 rounded-lg hover:bg-muted/15 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-4 min-w-0 flex-1">
                    <span className="text-xs font-mono text-muted-foreground/70 shrink-0 sm:w-32">
                      {period}
                    </span>
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                        <span className="text-sm sm:text-base font-semibold text-foreground">
                          {exp.role}
                        </span>
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          · {exp.companyName}
                        </span>
                      </div>
                      {exp.description && (
                        <p className="text-xs sm:text-sm text-muted-foreground/90 leading-relaxed font-normal">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {exp.typeJob && (
                    <span className="text-xs font-mono text-muted-foreground/60 shrink-0 sm:pl-0">
                      {formatJobType(exp.typeJob, locale)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
