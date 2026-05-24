'use client';
import { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';

import { useTheme } from 'next-themes';

export function GithubCalendar() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const colorScheme = resolvedTheme === 'dark' ? 'dark' : 'light';

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const labels = {
    months: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ],
    weekdays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    legend: {
      less: 'menos',
      more: 'mais',
    },
    totalCount: '{{count}} contribuições no último ano',
  };

  const explicitTheme = {
    light: ['#ececee', '#e3e3e5', '#d8d8db', '#c7c7cb', '#8d8d96'],
    dark: ['#27272a', '#3d3d42', '#4d4e54', '#696970', '#84848c'],
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
      <div className="min-w-fit [&>div]:w-full [&_svg]:w-full [&_svg]:max-w-full">
        <GitHubCalendar
          key={colorScheme}
          showMonthLabels
          blockMargin={isMobile ? 3 : 4}
          blockSize={isMobile ? 10 : 12}
          theme={explicitTheme}
          labels={labels}
          colorScheme={colorScheme}
          username="ialexanderbrito"
        />
      </div>
    </div>
  );
}
