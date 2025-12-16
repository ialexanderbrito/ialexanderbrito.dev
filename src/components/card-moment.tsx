import { Moment } from '@/interfaces/moments';

interface CardMomentProps {
  moment: Moment;
  className?: string;
}

export function CardMoment({ moment, className = '' }: CardMomentProps) {
  function getFlagEmoji(country: string) {
    if (!country) return String.fromCodePoint(127397 + '🌍'.charCodeAt(0));

    const codePoints = country
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 ${className}`}
    >
      <img
        src={moment?.imagem?.url}
        alt={`Imagem de ${moment?.local}`}
        className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-linear-to-b from-gray-900/25 to-gray-900/5" />
      <h3 className="z-10 text-sm font-medium absolute top-0 left-0 p-4">
        {moment?.local || 'Local não definido'},{' '}
        {getFlagEmoji(moment?.codigoDoPais)}
      </h3>
    </div>
  );
}
