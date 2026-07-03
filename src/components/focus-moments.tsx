'use client';

import { Card } from '@/components/ui/focus-cards';
import { Moment } from '@/interfaces/moments';
import { getFlagEmoji } from '@/utils/getFlagEmoji';

interface FocusMomentsProps {
  moments: Moment[];
}

export function FocusMoments({ moments }: FocusMomentsProps) {
  const cards = moments.map((moment) => ({
    title: `${moment.local}${moment.codigoDoPais ? ` • ${getFlagEmoji(moment.codigoDoPais)}` : ''}`,
    src: moment.imagem.url,
    pillPosition: moment.isPillTop ? 'top' as const : 'bottom' as const,
  }));

  // Se não tiver exatamente 10, faz um fallback seguro
  if (cards.length < 10) return null;

  return (
    <div className="mt-8 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4">
        {/* PRIMEIRA LINHA DO MOSAICO (Altura total: 400px no desktop) */}
        {/* Coluna 1-2: Foto Grande */}
        <div className="md:col-span-2">
          <Card card={cards[0]} className="w-full h-[250px] md:h-[300px]" />
        </div>

        {/* Coluna 3-4: Larga em cima, duas pequenas embaixo */}
        <div className="md:col-span-2 flex flex-col gap-3 md:gap-4">
          <Card card={cards[1]} className="w-full h-[120px] md:h-[142px]" />
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <Card card={cards[2]} className="w-full h-[118px] md:h-[142px]" />
            <Card card={cards[3]} className="w-full h-[118px] md:h-[142px]" />
          </div>
        </div>

        {/* Coluna 5: Retrato Alto */}
        <div className="md:col-span-1">
          <Card card={cards[4]} className="w-full h-[250px] md:h-[300px]" />
        </div>

        {/* SEGUNDA LINHA DO MOSAICO (Altura total: 400px no desktop) */}
        {/* Coluna 1-2: Duas pequenas em cima, larga embaixo */}
        <div className="md:col-span-2 flex flex-col gap-3 md:gap-4">
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <Card card={cards[5]} className="w-full h-[118px] md:h-[142px]" />
            <Card card={cards[6]} className="w-full h-[118px] md:h-[142px]" />
          </div>
          <Card card={cards[7]} className="w-full h-[120px] md:h-[142px]" />
        </div>

        {/* Coluna 3: Retrato Alto */}
        <div className="md:col-span-1">
          <Card card={cards[8]} className="w-full h-[250px] md:h-[300px]" />
        </div>

        {/* Coluna 4-5: Foto Grande */}
        <div className="md:col-span-2">
          <Card card={cards[9]} className="w-full h-[250px] md:h-[300px]" />
        </div>
      </div>
    </div>
  );
}
