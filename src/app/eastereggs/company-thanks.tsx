'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getSessionStorageItem } from '@/utils/getSessionStorageItem';
import { LinkedinLogo } from '@phosphor-icons/react/dist/ssr';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export function CompanyThanksDialog() {
  const [hasDomLoaded, setHasDomLoaded] = useState(false);
  const [isDialogAlreadyOpen, setIsDialogAlreadyOpen] = useState(
    Boolean(getSessionStorageItem('@ialexanderbrito:companyDialogOpen')) ||
      false,
  );

  const query = useSearchParams();
  const companyName = query.get('company_name');

  function handleDialogClose(isOpen: boolean) {
    if (!isOpen) {
      setIsDialogAlreadyOpen(true);
      sessionStorage.setItem('@ialexanderbrito:companyDialogOpen', 'true');
    }
  }

  useEffect(() => {
    setHasDomLoaded(true);
  }, []);

  return (
    <>
      {hasDomLoaded && (
        <Dialog
          defaultOpen={!!companyName && !isDialogAlreadyOpen}
          onOpenChange={handleDialogClose}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Boas vindas, {companyName}! 🎉</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Olá recrutador(a) da empresa {companyName},
              <br />
              <br />
              Obrigado por visitar meu portfolio! 😀 Estou entusiasmado em
              compartilhar mais sobre minha trajetória e experiências. Fique à
              vontade para explorar meu trabalho, e se tiver alguma dúvida ou
              interesse, estou à disposição para conversar.
              <br />
              Atenciosamente, Alexander. 🤙🏾
            </DialogDescription>
            <DialogFooter className="grid grid-cols-2 gap-4">
              <DialogClose asChild>
                <Button variant="outline">
                  <X className="w-4 h-4 mr-2" />
                  Fechar
                </Button>
              </DialogClose>
              <Button asChild>
                <Link
                  href="https://www.linkedin.com/in/ialexanderbrito/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <LinkedinLogo className="w-4 h-4 mr-2" />
                  LinkedIn
                </Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
