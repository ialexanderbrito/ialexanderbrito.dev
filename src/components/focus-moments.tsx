'use client';

import { useState } from 'react';

import { Card } from '@/components/ui/focus-cards';
import { Moment } from '@/interfaces/moments';
import { getFlagEmoji } from '@/utils/getFlagEmoji';

interface FocusMomentsProps {
  moments: Moment[];
}

export function FocusMoments({ moments }: FocusMomentsProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const cards = moments.map((moment) => ({
    title: `${moment.local}${moment.codigoDoPais ? ` • ${getFlagEmoji(moment.codigoDoPais)}` : ''}`,
    src: moment.imagem.url,
  }));

  return (
    <div className="mt-8 mb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        <div className="col-span-2 sm:col-span-1 md:col-span-2 flex flex-col">
          {cards[0] && (
            <div className="h-72 md:h-96">
              <Card card={cards[0]} index={0} hovered={hovered} setHovered={setHovered} />
            </div>
          )}
        </div>
        <div className="col-span-2 sm:col-span-1 md:col-span-2">
          {cards[1] && (
            <div className="h-44 md:h-44 mb-4">
              <Card card={cards[1]} index={1} hovered={hovered} setHovered={setHovered} />
            </div>
          )}
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
            {cards[2] && (
              <div className="h-44">
                <Card card={cards[2]} index={2} hovered={hovered} setHovered={setHovered} />
              </div>
            )}
            {cards[3] && (
              <div className="h-44">
                <Card card={cards[3]} index={3} hovered={hovered} setHovered={setHovered} />
              </div>
            )}
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1 md:col-span-1 flex flex-col">
          {cards[4] && (
            <div className="h-72 md:h-96">
              <Card card={cards[4]} index={4} hovered={hovered} setHovered={setHovered} />
            </div>
          )}
        </div>

        <div className="col-span-2 sm:col-span-1 md:col-span-2">
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 mb-4">
            {cards[5] && (
              <div className="h-44">
                <Card card={cards[5]} index={5} hovered={hovered} setHovered={setHovered} />
              </div>
            )}
            {cards[6] && (
              <div className="h-44">
                <Card card={cards[6]} index={6} hovered={hovered} setHovered={setHovered} />
              </div>
            )}
          </div>
          {cards[7] && (
            <div className="h-44">
              <Card card={cards[7]} index={7} hovered={hovered} setHovered={setHovered} />
            </div>
          )}
        </div>

        {cards.length >= 10 && (
          <>
            <div className="col-span-2 sm:col-span-1 md:col-span-1 flex flex-col">
              {cards[8] && (
                <div className="h-72 md:h-96">
                  <Card card={cards[8]} index={8} hovered={hovered} setHovered={setHovered} />
                </div>
              )}
            </div>

            <div className="col-span-2 sm:col-span-1 md:col-span-2 flex flex-col">
              {cards[9] && (
                <div className="h-72 md:h-96">
                  <Card card={cards[9]} index={9} hovered={hovered} setHovered={setHovered} />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
