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
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-colors duration-200 select-none',
        scrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border/30'
          : 'bg-transparent',
      )}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 grid grid-cols-[1fr_auto_1fr] items-center">
        {/* Brand Logo (Monograma harmonizado com os controles de ação) */}
        <div className="flex items-center justify-start min-w-0">
          <Link
            href="/"
            aria-label="Início"
            className="relative rounded-full h-8 w-8 sm:h-8.5 sm:w-8.5 flex items-center justify-center border border-border/40 hover:border-border/70 hover:bg-accent/40 dark:hover:bg-white/10 transition-[colors,transform] duration-150 active:scale-[0.97] cursor-pointer select-none shrink-0 touch-manipulation group after:absolute after:-inset-1.5 after:content-['']"
          >
            <img
              src="/favicon.png"
              alt="Alexander"
              width={20}
              height={20}
              className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-xs transition-transform duration-150 group-hover:scale-110"
              loading="eager"
            />
          </Link>
        </div>

        {/* Navigation Links Centrais (Matematicamente centralizado) */}
        <div className="flex items-center justify-center shrink-0">
          <nav className="flex items-center gap-0.5 sm:gap-1.5 p-0.5 sm:p-1 rounded-full border border-border/40 bg-muted/20 backdrop-blur-sm shadow-xs shrink-0">
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
                    'relative h-7 sm:h-8 px-2 sm:px-3.5 flex items-center text-[11px] sm:text-xs font-medium whitespace-nowrap transition-colors rounded-full cursor-pointer touch-manipulation select-none active:scale-[0.97]',
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
        </div>

        {/* Controles da Direita: Idioma + Tema Dark/Light */}
        <div className="flex items-center justify-end gap-1 sm:gap-1.5 min-w-0">
          <LanguageToggle />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
