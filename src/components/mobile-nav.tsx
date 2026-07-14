'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { LaptopMinimal, Mailbox, Notebook, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { TooltipMessage } from './tooltip';

// Animações para os ícones da navbar mobile
const iconVariants = {
  initial: { scale: 1, y: 0 },
  hover: {
    scale: 1.15,
    y: -3,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 15,
      mass: 0.5,
    },
  },
  tap: {
    scale: 0.9,
    transition: {
      type: 'spring' as const,
      stiffness: 500,
      damping: 20,
    },
  },
};

// Dados para os itens de navegação
const navigationItems = [
  { href: '/about', title: 'Sobre', icon: User },
  { href: '/projects', title: 'Projetos', icon: Notebook },
  { href: '/tech', title: 'Tecnologias', icon: LaptopMinimal },
  { href: '/contact', title: 'Contato', icon: Mailbox },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 15,
          mass: 0.5,
        }}
      >
        <Link href="/" passHref className="flex items-center justify-center w-12 h-12">
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
      <NavigationMenu className="p-0">
        <NavigationMenuList>
          {navigationItems.map((item) => (
            <NavigationMenuItem key={item.href}>
              <TooltipMessage title={item.title} asChild>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'relative transition-all duration-200 h-12 w-12 flex items-center justify-center rounded-full bg-transparent hover:bg-transparent focus:bg-transparent',
                    pathname === item.href
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <Link href={item.href} aria-label={item.title}>
                    <motion.div
                      variants={iconVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <item.icon className="h-5 w-5" />
                    </motion.div>
                    {pathname === item.href && (
                      <motion.div
                        layoutId="mobile-nav-indicator"
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                        initial={false}
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 35,
                          mass: 0.5,
                        }}
                      />
                    )}
                  </Link>
                </NavigationMenuLink>
              </TooltipMessage>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
