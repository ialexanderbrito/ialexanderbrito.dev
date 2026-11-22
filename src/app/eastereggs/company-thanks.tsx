'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useLanguage } from '@/context/language';
import { useMediaQuery } from '@/hooks/use-media-query';
import { getSessionStorageItem } from '@/utils/getSessionStorageItem';
import { Linkedin02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export function CompanyThanksDialog() {
  const { locale } = useLanguage();
  const [hasDomLoaded, setHasDomLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 640px)');

  const query = useSearchParams();
  const companyName = query.get('company_name');

  useEffect(() => {
    setHasDomLoaded(true);
    const isAlreadyOpen = Boolean(
      getSessionStorageItem('@ialexanderbrito:companyDialogOpen'),
    );
    if (companyName && !isAlreadyOpen) {
      setOpen(true);
    }
  }, [companyName]);

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);
    if (!isOpen) {
      sessionStorage.setItem('@ialexanderbrito:companyDialogOpen', 'true');
    }
  }

  if (!hasDomLoaded || !companyName) return null;

  const isEn = locale === 'en';

  const content = (
    <div className="space-y-3 pt-2 text-sm text-muted-foreground leading-relaxed font-normal">
      {isEn ? (
        <>
          <p>
            It’s a real pleasure to welcome you here. This space was crafted to
            showcase my work as a{' '}
            <strong className="text-foreground font-medium">
              Frontend, Mobile & AI Specialist
            </strong>
            , combining scalable architecture, high performance, and modern
            product engineering.
          </p>
          <p>
            Feel free to explore the products in production and my career
            timeline. If my profile aligns with the upcoming challenges at{' '}
            <strong className="text-foreground font-semibold">
              {companyName}
            </strong>
            , I’d love to connect.
          </p>
        </>
      ) : (
        <>
          <p>
            Prazer em receber você por aqui. Este espaço foi construído para
            apresentar minha atuação como{' '}
            <strong className="text-foreground font-medium">
              Especialista em Frontend, Mobile & IA
            </strong>
            , unindo arquitetura escalável, alta performance e desenvolvimento
            de produtos modernos.
          </p>
          <p>
            Fique à vontade para explorar os produtos em produção e a linha do
            tempo profissional. Se o meu perfil fizer sentido para os desafios
            da{' '}
            <strong className="text-foreground font-semibold">
              {companyName}
            </strong>
            , estou à disposição para conversarmos.
          </p>
        </>
      )}
      <p className="text-xs font-mono text-muted-foreground/70 pt-1">
        — Alexander
      </p>
    </div>
  );

  const actions = (
    <div className="flex flex-col sm:flex-row gap-2.5 w-full">
      <Button
        type="button"
        variant="outline"
        onClick={() => handleOpenChange(false)}
        className="rounded-xl h-10 text-xs font-medium cursor-pointer border-border/60 flex-1 order-2 sm:order-1"
      >
        <span>{isEn ? 'Explore portfolio' : 'Explorar portfólio'}</span>
      </Button>
      <Button
        asChild
        className="rounded-xl h-10 text-xs font-medium cursor-pointer flex-1 order-1 sm:order-2"
      >
        <Link
          href="https://www.linkedin.com/in/ialexanderbrito/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <HugeiconsIcon
            icon={Linkedin02Icon}
            size={16}
            strokeWidth={1.5}
            className="mr-1.5"
          />
          <span>{isEn ? 'Connect on LinkedIn' : 'Conectar no LinkedIn'}</span>
        </Link>
      </Button>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md rounded-2xl border-border/60 bg-background/95 backdrop-blur-xl shadow-2xl p-6">
          <DialogHeader className="space-y-1.5 text-left">
            <DialogTitle className="text-lg font-bold tracking-tight text-foreground font-sans">
              {isEn
                ? `Hello, team at ${companyName}`
                : `Olá, equipe da ${companyName}`}
            </DialogTitle>
            <DialogDescription asChild>{content}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-4">{actions}</DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent className="p-6 space-y-4">
        <DrawerHeader className="p-0 text-left space-y-1.5">
          <DrawerTitle className="text-lg font-bold tracking-tight text-foreground font-sans">
            {isEn
              ? `Hello, team at ${companyName}`
              : `Olá, equipe da ${companyName}`}
          </DrawerTitle>
          <DrawerDescription asChild>{content}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="p-0 pt-3">{actions}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
