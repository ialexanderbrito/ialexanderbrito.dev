'use client';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { scrollToTop } from '@/utils/scrollToTop';
import { ChevronUp } from 'lucide-react';

export function ButtonTop() {
  const [show, setShow] = useState(false);

  function handleScroll() {
    if (window.scrollY > 400) {
      setShow(true);
    } else {
      setShow(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        asChild
        onClick={scrollToTop}
        className={cn('fixed bottom-4 right-4 z-50 p-2 shadow-lg cursor-pointer', show ? 'opacity-100' : 'opacity-0')}
      >
        <ChevronUp size={24} />
      </Button>
    </>
  );
}
