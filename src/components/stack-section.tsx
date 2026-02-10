'use client';

import { useState } from 'react';

import { Stack } from '@/interfaces/stack';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface StackSectionProps {
  title: string;
  stacks: Stack[];
  category: string;
  defaultOpen?: boolean;
}

export function StackSection({
  title,
  stacks,
  category,
  defaultOpen = false,
}: StackSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const filteredStacks = stacks.filter((stack) => stack.category === category);
  const count = filteredStacks.length;

  if (count === 0) return null;

  return (
    <section id={category} className="border-b border-border/50 last:border-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-5 text-left cursor-pointer group"
      >
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {title}
          </h3>
          <span className="px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground">
            {count}
          </span>
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
          'grid gap-3 overflow-hidden transition-all duration-300 ease-in-out',
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
          isOpen ? 'max-h-500 opacity-100 pb-6' : 'max-h-0 opacity-0',
        )}
      >
        {filteredStacks.map((stack) => (
          <Link
            href={stack.urlSite}
            target="_blank"
            rel="noopener noreferrer"
            key={stack.id}
            className={cn(
              'flex items-center gap-3 rounded-xl p-3 bg-card/50 border border-border/50',
              'hover:bg-card hover:border-border hover:shadow-sm transition-all duration-200',
              'focus:outline-hidden focus-visible:outline focus-visible:outline-ring',
            )}
          >
            <div
              className={cn(
                'p-2 flex items-center justify-center rounded-lg relative overflow-hidden shrink-0',
                stack.invert && 'dark:invert',
              )}
            >
              <img
                src={stack.icon.url}
                alt=""
                width="20"
                height="20"
                className="z-10"
                loading="lazy"
              />
              <img
                src={stack.icon.url}
                alt=""
                className="blur-lg absolute inset-0 w-[125%] h-[125%] opacity-80 z-0"
                loading="lazy"
              />
            </div>
            <span className="text-sm truncate">{stack.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
