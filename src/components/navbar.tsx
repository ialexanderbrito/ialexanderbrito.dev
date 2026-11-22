'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LanguageToggle } from './language-toggle';
import { ModeToggle } from './mode-toggle';
import { useLanguage } from '@/context/language';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const { t } = useLanguage();

  const navItems = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/projects', label: t.nav.projects },
  ];

  React.useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-200 select-none">
      <div
        className={cn(
          'max-w-5xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between transition-colors gap-2',
          scrolled &&
            'bg-background/80 backdrop-blur-md border-b border-border/30',
        )}
      >
        {/* Brand Logo (Apenas o ícone/monograma, sem texto) */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="shrink-0 flex items-center"
        >
          <Link
            href="/"
            aria-label="Início"
            className="flex items-center group cursor-pointer"
          >
            <img
              src="/favicon.png"
              alt="Alexander"
              width={22}
              height={22}
              className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-xs"
              loading="lazy"
            />
          </Link>
        </motion.div>

        {/* Navigation Links Centrais (Início, Projetos, Sobre) */}
        <nav className="flex items-center gap-0.5 sm:gap-1.5 p-0.5 sm:p-1 rounded-full border border-border/40 bg-muted/20 backdrop-blur-sm shrink-0">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative h-7 sm:h-8 px-2 sm:px-3.5 flex items-center text-[11px] sm:text-xs font-medium transition-colors rounded-full cursor-pointer touch-manipulation select-none',
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <span className="relative z-10">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 bg-background rounded-full z-0 border border-border/50 shadow-xs"
                    initial={false}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Controles da Direita: Idioma + Tema Dark/Light */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <LanguageToggle />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
