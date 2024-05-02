'use client';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';

export function ButtonTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, [show]);

  return (
    <>
      {show && (
        <Button
          variant="outline"
          size="icon"
          asChild
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-4 right-4 z-50 p-2 shadow-lg cursor-pointer"
        >
          <ChevronUp size={24} />
        </Button>
      )}
    </>
  );
}
