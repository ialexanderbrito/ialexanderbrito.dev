'use client';
import { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';

import { useTheme } from 'next-themes';

export function GithubCalendar() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const colorScheme = theme === 'dark' ? 'dark' : 'light';

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
    light: ['#e4e4e4', '#d3d3d3', '#b2b2b2', '#7a7a7a', '#525252'],
    dark: ['#383838', '#606060', '#8c8c8c', '#bababa', '#ebebeb'],
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
      <div className="min-w-fit [&>div]:w-full [&_svg]:w-full [&_svg]:max-w-full">
        <GitHubCalendar
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
