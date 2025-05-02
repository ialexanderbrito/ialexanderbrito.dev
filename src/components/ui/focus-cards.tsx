'use client';

import React, { useState } from 'react';

import { cn } from '@/lib/utils';
import Image from 'next/image';

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        'rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden w-full h-full transition-all duration-300 ease-out',
        hovered !== null && hovered !== index && 'blur-sm scale-[0.98]',
      )}
      style={{ minHeight: '180px' }}
    >
      <Image
        src={card.src}
        alt={card.title}
        fill
        className={cn(
          'object-cover absolute inset-0',
          hovered === index && 'scale-105 transition-transform duration-500 ease-in-out',
        )}
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="absolute inset-0 bg-linear-to-b from-gray-900/25 to-gray-900/5" />
      <h3 className="z-10 text-sm font-medium absolute top-0 left-0 p-4 text-white">{card.title}</h3>
      <div
        className={cn(
          'absolute inset-0 bg-black/30 transition-opacity duration-300',
          hovered === index ? 'opacity-0' : 'opacity-100',
        )}
      />
    </div>
  ),
);

Card.displayName = 'Card';

type Card = {
  title: string;
  src: string;
};

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
      {cards.map((card, index) => (
        <Card key={card.src + index} card={card} index={index} hovered={hovered} setHovered={setHovered} />
      ))}
    </div>
  );
}
