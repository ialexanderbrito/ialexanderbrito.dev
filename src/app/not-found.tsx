'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language';
import { ArrowLeft01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Custom404() {
  const { t } = useLanguage();

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col justify-center my-auto py-8 sm:py-16 select-none">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-xl space-y-6"
      >
        <div className="space-y-3">
          <span className="inline-block text-xs font-mono uppercase tracking-widest text-muted-foreground/80">
            {t.notFound.code}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground font-sans">
            {t.notFound.title}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed">
            {t.notFound.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button
            asChild
            size="default"
            className="rounded-full px-5 h-10 text-xs sm:text-sm font-semibold gap-2 group cursor-pointer shadow-xs"
          >
            <Link href="/">
              <HugeiconsIcon
                icon={ArrowLeft01Icon}
                size={16}
                strokeWidth={1.5}
                className="transition-transform group-hover:-translate-x-1"
              />
              <span>{t.notFound.backHome}</span>
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="default"
            className="rounded-full px-5 h-10 text-xs sm:text-sm font-medium hover:bg-muted/40 cursor-pointer border-border/60 gap-2 group"
          >
            <Link href="/projects">
              <span>{t.notFound.exploreProjects}</span>
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={16}
                strokeWidth={1.5}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
