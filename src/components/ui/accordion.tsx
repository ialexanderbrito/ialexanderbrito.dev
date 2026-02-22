'use client';
import { useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface AccordionProps {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function Accordion({
  title,
  children,
  defaultOpen = false,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className="border-b border-border/50 last:border-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-5 text-left cursor-pointer group"
      >
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>
        <ChevronDown
          className={cn(
            'h-5 w-5 text-muted-foreground transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'max-h-500 opacity-100 pb-6' : 'max-h-0 opacity-0',
        )}
      >
        {children}
      </div>
    </section>
  );
}
