'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language';

export function LanguageToggle() {
  const { locale, toggleLocale, t } = useLanguage();

  return (
    <Button
      type="button"
      onClick={toggleLocale}
      variant="ghost"
      size="sm"
      aria-label={t.nav.toggleLang}
      title={t.nav.toggleLang}
      className="relative rounded-full h-8 w-8 sm:h-8.5 sm:w-8.5 p-0 flex items-center justify-center border border-border/40 hover:border-border/70 hover:bg-accent/40 dark:hover:bg-white/10 transition-colors cursor-pointer select-none shrink-0 touch-manipulation after:absolute after:-inset-1.5 after:content-['']"
    >
      <span className="text-xs font-semibold text-foreground tracking-tight font-sans">
        {locale === 'en' ? 'EN' : 'PT'}
      </span>
      <span className="sr-only">{t.nav.toggleLang}</span>
    </Button>
  );
}
