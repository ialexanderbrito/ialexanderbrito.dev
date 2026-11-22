'use client';

import * as React from 'react';

import { useLanguage } from '@/context/language';
import { scrollToTop } from '@/utils/scrollToTop';
import { ArrowUp01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion } from 'framer-motion';

export function ButtonTop() {
  const [show, setShow] = React.useState(false);
  const { locale } = useLanguage();

  React.useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShow(window.scrollY > 320);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const label = locale === 'en' ? 'Scroll to top' : 'Voltar ao topo';

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label={label}
          title={label}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          whileHover={{ scale: 1.06, y: -1 }}
          whileTap={{ scale: 0.92 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-background/80 hover:bg-background backdrop-blur-md border border-border/50 hover:border-border/80 shadow-md text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none touch-manipulation focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-foreground"
        >
          <HugeiconsIcon icon={ArrowUp01Icon} size={18} strokeWidth={1.5} />
          <span className="sr-only">{label}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
