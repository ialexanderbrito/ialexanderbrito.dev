import { CardMoment } from '@/components/card-moment';
import { Moment } from '@/interfaces/moments';

interface BentoGridProps {
  moments: Moment[];
}

export function BentoGrid({ moments }: BentoGridProps) {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">
        <div className="col-span-2 sm:col-span-1 md:col-span-2 h-auto md:h-full flex flex-col">
          <CardMoment moment={moments[0]} className="grow" />
        </div>
        <div className="col-span-2 sm:col-span-1 md:col-span-2">
          <CardMoment moment={moments[1]} className="mb-4" />
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
            <CardMoment moment={moments[2]} />
            <CardMoment moment={moments[3]} />
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1 md:col-span-1 h-auto md:h-full flex flex-col">
          <CardMoment moment={moments[4]} className="grow" />
        </div>

        <div className="col-span-2 sm:col-span-1 md:col-span-2">
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 mb-4">
            <CardMoment moment={moments[5]} />
            <CardMoment moment={moments[6]} />
          </div>
          <CardMoment moment={moments[7]} />
        </div>

        {moments.length >= 10 && (
          <>
            <div className="col-span-2 sm:col-span-1 md:col-span-1 h-auto md:h-full flex flex-col">
              <CardMoment moment={moments[8]} className="grow" />
            </div>

            <div className="col-span-2 sm:col-span-1 md:col-span-2 h-auto md:h-full flex flex-col">
              <CardMoment moment={moments[9]} className="grow" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
