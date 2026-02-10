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
        className="mx-auto sm:hidden max-w-5xl items-center justify-between px-5 py-4 xl:px-0 flex-row sm:flex-row flex"
      >
        <MobileNav />
        <ModeToggle />
      </motion.header>
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: scrolled ? 0.92 : 1,
          maxWidth: scrolled ? 720 : 1120,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
          mass: 0.8,
        }}
        className={cn(
          'mx-auto hidden max-w-5xl items-center justify-between gap-20 px-5 xl:px-0 sm:flex-row sm:flex backdrop-blur-md bg-background/80 sticky top-4 z-50 rounded-full border border-border/50 will-change-transform',
          scrolled
            ? 'py-2 shadow-lg shadow-black/5 dark:shadow-black/20'
            : 'py-4 shadow-sm',
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
                      'relative transition-all duration-200 bg-transparent hover:bg-accent/50 rounded-full',
                      pathname === item.href
                        ? 'text-foreground font-medium'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {item.label}
                    {pathname === item.href && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute -bottom-1 left-3 right-3 h-0.5 bg-primary rounded-full"
                        initial={false}
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 30,
                          mass: 0.5,
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

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        className={cn(
          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
          className,
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </a>
    </NavigationMenuLink>
  </li>
));
ListItem.displayName = 'ListItem';
