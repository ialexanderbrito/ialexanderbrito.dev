import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { LaptopMinimal, Mailbox, Notebook, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { TooltipMessage } from './tooltip';

export function MobileNav() {
  return (
    <>
      <Link href="/" passHref>
        <Image src="/favicon.png" width={24} height={24} alt="Logo" className="w-6 h-6" />
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <TooltipMessage title="Sobre">
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <User className="h-5 w-5" />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </TooltipMessage>
          <TooltipMessage title="Projetos">
            <NavigationMenuItem>
              <Link href="/projects" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Notebook className="h-5 w-5" />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </TooltipMessage>
          <TooltipMessage title="Tecnologias">
            <NavigationMenuItem>
              <Link href="/tech" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <LaptopMinimal className="h-5 w-5" />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </TooltipMessage>
          <TooltipMessage title="Contato">
            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Mailbox className="h-5 w-5" />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </TooltipMessage>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
