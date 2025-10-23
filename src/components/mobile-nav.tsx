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
  initial: { scale: 1 },
  hover: { scale: 1.1, y: -2 },
  tap: { scale: 0.95 },
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
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <Link href="/" passHref>
          <img src="/favicon.png" alt="Logo" className="w-6 h-6" loading="lazy" />
        </Link>
      </motion.div>
      <NavigationMenu className="backdrop-blur-sm bg-background/50 p-1 rounded-full border border-border/40 shadow-sm">
        <NavigationMenuList>
          {navigationItems.map((item) => (
            <TooltipMessage key={item.href} title={item.title}>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'relative transition-all duration-300 p-2',
                    pathname === item.href ? 'text-primary bg-primary/10' : 'text-muted-foreground',
                  )}
                >
                  <Link href={item.href}>
                    <motion.div
                      variants={iconVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                      <item.icon className="h-5 w-5" />
                    </motion.div>
                    {pathname === item.href && (
                      <motion.div
                        layoutId="mobile-nav-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        style={{ borderRadius: '9999px' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </TooltipMessage>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
