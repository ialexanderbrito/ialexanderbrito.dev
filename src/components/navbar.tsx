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
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto sm:hidden max-w-5xl items-center justify-between px-5 py-4 xl:px-0 flex-row sm:flex-row flex"
      >
        <MobileNav />
        <ModeToggle />
      </motion.header>
      <motion.header
        initial={{ opacity: 0, y: -20, scale: 1, maxWidth: 1120 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: scrolled ? 0.95 : 1,
          boxShadow: scrolled ? '0 2px 16px 0 rgba(0,0,0,0.10)' : '0 1px 4px 0 rgba(0,0,0,0.05)',
          maxWidth: scrolled ? 800 : 1120,
        }}
        transition={{ duration: 0.5 }}
        className={cn(
          'mx-auto hidden max-w-5xl items-center justify-between gap-20 px-5 xl:px-0 sm:flex-row sm:flex backdrop-blur-sm bg-background/70 sticky top-4 z-50 rounded-full border border-border/40 shadow-sm',
          scrolled ? 'py-2 scale-95' : 'py-4 scale-100',
        )}
        style={{
          transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          className="ml-4"
        >
          <Link href="/" passHref>
            <img src="/favicon.png" alt="Logo" className="w-6 h-6" loading="lazy" />
          </Link>
        </motion.div>
        <NavigationMenu>
          <NavigationMenuList>
            {[
              { href: '/about', label: 'Sobre' },
              { href: '/projects', label: 'Projetos' },
              { href: '/tech', label: 'Tecnologias' },
              { href: '/contact', label: 'Contato' },
            ].map((item) => (
              <NavigationMenuItem key={item.href}>
                <Link href={item.href} passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'relative transition-colors duration-300 bg-transparent',
                      pathname === item.href ? 'text-foreground font-medium' : 'text-muted-foreground',
                    )}
                  >
                    {item.label}
                    {pathname === item.href && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </NavigationMenuLink>
                </Link>
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

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => (
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
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  ),
);
ListItem.displayName = 'ListItem';
