'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language';
import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion } from 'framer-motion';

interface CraftHomeViewProps {
  onNavigateTab: (tab: 'projects' | 'about') => void;
}

export function CraftHomeView({ onNavigateTab }: CraftHomeViewProps) {
  const { t } = useLanguage();

  return (
    <div className="select-none max-w-2xl w-full my-auto">
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className="space-y-6 sm:space-y-7"
      >
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
            {t.home.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed text-balance">
            {t.home.subtitle}
          </p>
        </div>

        <div className="space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed font-normal">
          <p>{t.home.bio1}</p>
          <p>
            {t.home.bio2Prefix}
            <strong className="text-foreground font-medium">React</strong>,{' '}
            <strong className="text-foreground font-medium">Next.js</strong>,{' '}
            <strong className="text-foreground font-medium">
              React Native / Expo
            </strong>
            ,{' '}
            <strong className="text-foreground font-medium">TypeScript</strong>
            {t.home.bio2Suffix}
          </p>
        </div>

        {/* Primary Navigation Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Button
            type="button"
            size="default"
            onClick={() => onNavigateTab('projects')}
            className="rounded-full px-5 h-10 text-xs sm:text-sm font-semibold gap-2 group cursor-pointer shadow-xs"
          >
            <span>{t.home.ctaProjects}</span>
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={16}
              strokeWidth={1.5}
              className="transition-transform group-hover:translate-x-1"
            />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="default"
            onClick={() => onNavigateTab('about')}
            className="rounded-full px-5 h-10 text-xs sm:text-sm font-medium hover:bg-muted/40 cursor-pointer border-border/60"
          >
            <span>{t.home.ctaAbout}</span>
          </Button>
        </div>
      </motion.section>
    </div>
  );
}
