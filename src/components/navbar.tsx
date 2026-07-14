'use client';

import * as React from 'react';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MobileNav } from './mobile-nav';
import { ModeToggle } from './mode-toggle';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
        className={cn(
          'mx-4 sm:hidden items-center justify-between px-4 py-3 flex-row flex sticky top-4 z-50 rounded-full',
          'backdrop-blur-xl backdrop-saturate-150 bg-background/30 border border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_0_rgba(255,255,255,0.02)]',
        )}
      >
        <MobileNav />
        <ModeToggle />
      </motion.header>
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: scrolled ? 0.85 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
          mass: 0.8,
        }}
        className={cn(
          'mx-auto hidden items-center justify-between gap-20 px-5 xl:px-0 sm:flex-row sm:flex sticky top-4 z-50 rounded-full will-change-transform transition-[max-width,padding,background-color] duration-500 ease-in-out',
          'backdrop-blur-xl backdrop-saturate-150 bg-background/30 border border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_0_rgba(255,255,255,0.02)]',
          scrolled ? 'py-2 bg-background/50 max-w-[640px]' : 'py-4 max-w-[1120px]',
        )}
      >
        <motion.div
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 15,
            mass: 0.5,
          }}
          className="ml-4"
        >
          <Link href="/" passHref>
            <img
              src="/favicon.png"
              alt="Logo"
              width="24"
              height="24"
              className="w-6 h-6 transition-all duration-200"
              loading="lazy"
            />
          </Link>
        </motion.div>
        <NavigationMenu>
          <NavigationMenuList className="gap-1">
            {[
              { href: '/about', label: 'Sobre' },
              { href: '/projects', label: 'Projetos' },
              { href: '/tech', label: 'Tecnologias' },
              { href: '/contact', label: 'Contato' },
            ].map((item) => (
              <NavigationMenuItem key={item.href}>
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 20,
                  }}
                >
                  <NavigationMenuLink
                    href={item.href}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'relative transition-all duration-200 bg-transparent hover:bg-transparent rounded-full',
                      pathname === item.href
                        ? 'text-foreground font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/30',
                    )}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {pathname === item.href && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-accent/80 dark:bg-accent/40 rounded-full z-0 border border-border/50"
                        initial={false}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 30,
                          mass: 0.8,
                        }}
                      />
                    )}
                  </NavigationMenuLink>
                </motion.div>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="mr-4">
          <ModeToggle />
        </div>
      </motion.header>
    </>
  );
}

