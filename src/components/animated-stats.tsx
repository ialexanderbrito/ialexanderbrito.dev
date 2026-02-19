'use client';

import NumberFlow from '@number-flow/react';
import { useEffect, useState } from 'react';

interface AnimatedStatsProps {
  yearsOfExperience: number;
  projectsCount?: number;
  commitsCount?: number;
}

export function AnimatedStats({
  yearsOfExperience,
  projectsCount = 50,
  commitsCount = 5,
}: AnimatedStatsProps) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    // Pequeno delay para garantir que o componente está montado
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="rounded-xl border border-border/50 bg-card/30 p-4 text-center">
        <div className="text-2xl md:text-3xl font-bold text-primary">
          <NumberFlow
            value={animated ? yearsOfExperience : 0}
            format={{ notation: 'standard' }}
            transformTiming={{ duration: 750, easing: 'ease-out' }}
          />
          +
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Anos de experiência
        </div>
      </div>
      <div className="rounded-xl border border-border/50 bg-card/30 p-4 text-center">
        <div className="text-2xl md:text-3xl font-bold text-primary">
          <NumberFlow
            value={animated ? projectsCount : 0}
            format={{ notation: 'standard' }}
            transformTiming={{ duration: 750, easing: 'ease-out' }}
          />
          +
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Projetos realizados
        </div>
      </div>
      <div className="rounded-xl border border-border/50 bg-card/30 p-4 text-center">
        <div className="text-2xl md:text-3xl font-bold text-primary">
          <NumberFlow
            value={animated ? commitsCount : 0}
            format={{ notation: 'standard' }}
            transformTiming={{ duration: 750, easing: 'ease-out' }}
          />
          K+
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Commits no GitHub
        </div>
      </div>
    </div>
  );
}
