import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from './ui/button';

export function MobileNav() {
  return (
    <Sheet>
      <Button variant="ghost" asChild>
        <SheetTrigger>
          <svg strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </SheetTrigger>
      </Button>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="justify-start flex items-center">
            <SheetClose asChild>
              <Link href="/" passHref className="flex items-center justify-center gap-2">
                <Image src="/favicon.png" width={24} height={24} alt="Logo" className="w-6 h-6 mb-2" />
                <span className="font-bold mb-2">ialexanderbrito</span>
              </Link>
            </SheetClose>
          </SheetTitle>

          <ul className="space-y-3 my-4 pb-10 pl-8">
            <li className="text-start">
              <SheetClose asChild>
                <Link href="/about" passHref>
                  Sobre
                </Link>
              </SheetClose>
            </li>
            <li className="text-start">
              <SheetClose asChild>
                <Link href="/projects" passHref>
                  Projetos
                </Link>
              </SheetClose>
            </li>

            <li className="text-start">
              <SheetClose asChild>
                <Link href="/tech" passHref>
                  Tecnologias
                </Link>
              </SheetClose>
            </li>
          </ul>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
