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
import Image from 'next/image';
import Link from 'next/link';

import { MobileNav } from './mobile-nav';
import { ModeToggle } from './mode-toggle';

export function Navbar() {
  return (
    <>
      <header className="mx-auto sm:hidden max-w-5xl items-center justify-between px-5 py-4 xl:px-0 flex-row sm:flex-row flex">
        <MobileNav />
        <ModeToggle />
      </header>
      <header className="mx-auto hidden max-w-5xl items-center justify-between gap-20 px-5 py-4 xl:px-0 flex-row-reverse sm:flex-row sm:flex">
        <Link href="/" passHref>
          <Image src="/favicon.png" width={24} height={24} alt="Logo" className="w-6 h-6 mb-2" loading="lazy" />
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Sobre</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/projects" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Projetos</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/tech" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Tecnologias</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Contato</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <ModeToggle />
      </header>
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
