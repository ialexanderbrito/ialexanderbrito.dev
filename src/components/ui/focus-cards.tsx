'use client';

import React from 'react';

import { cn } from '@/lib/utils';

export type Card = {
  title: string;
  src: string;
  pillPosition?: 'top' | 'bottom';
};

export const Card = React.memo(
  ({ card, className }: { card: Card; className?: string }) => {
    const isTop = card.pillPosition === 'top';

    return (
      <div
        className={cn(
          'group relative overflow-hidden rounded-[15px] border border-border/50 bg-muted/20 h-full min-h-[120px]',
          className,
        )}
      >
        <img
          src={card.src}
          alt={card.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Sutil escurecimento que some no hover para dar destaque */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none transition-opacity duration-500 group-hover:bg-black/0" />

        <div
          className={cn(
            'absolute left-2 right-2 z-10 pointer-events-none transition-transform duration-500 flex justify-start',
            isTop
              ? 'top-2 group-hover:translate-y-1'
              : 'bottom-2 group-hover:-translate-y-1',
          )}
        >
          <div className="flex items-center px-2 py-1 sm:px-3 sm:py-1.5 rounded-full backdrop-blur-md bg-black/60 border border-white/20 shadow-sm text-[10px] sm:text-xs font-medium text-white w-fit max-w-full">
            <span className="truncate">{card.title}</span>
          </div>
        </div>
      </div>
    );
  },
);

Card.displayName = 'Card';
