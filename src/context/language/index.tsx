'use client';

import * as React from 'react';

import { Locale, translations } from '@/config/translations';
import { useRouter } from 'next/navigation';

interface LanguageContextType {
  locale: Locale;
  t: (typeof translations)[Locale];
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  isEnglish: boolean;
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(
  undefined,
);

const COOKIE_NAME = 'NEXT_LOCALE';

export function LanguageProvider({
  children,
  initialLocale = 'pt_BR',
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = React.useState<Locale>(initialLocale);
  const router = useRouter();

  // Sync state if initialLocale changes from server
  React.useEffect(() => {
    setLocaleState(initialLocale);
  }, [initialLocale]);

  const updateCookie = (newLocale: Locale) => {
    if (typeof document !== 'undefined') {
      document.cookie = `${COOKIE_NAME}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      try {
        localStorage.setItem(COOKIE_NAME, newLocale);
      } catch {
        // Ignore localStorage errors (e.g. private browsing)
      }
    }
  };

  const setLocale = React.useCallback(
    (newLocale: Locale) => {
      setLocaleState(newLocale);
      updateCookie(newLocale);
      router.refresh();
    },
    [router],
  );

  const toggleLocale = React.useCallback(() => {
    const nextLocale: Locale = locale === 'pt_BR' ? 'en' : 'pt_BR';
    setLocale(nextLocale);
  }, [locale, setLocale]);

  const value = React.useMemo<LanguageContextType>(
    () => ({
      locale,
      t: translations[locale],
      setLocale,
      toggleLocale,
      isEnglish: locale === 'en',
    }),
    [locale, setLocale, toggleLocale],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
