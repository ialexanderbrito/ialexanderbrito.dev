'use client';
import { useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';

import { useTheme } from 'next-themes';

export function GithubCalendar() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const currentYear = new Date().getFullYear();
  const colorScheme = theme === 'dark' ? 'dark' : 'light';

  useEffect(() => {
    setMounted(true);
  }, []);

  const labels = {
    legend: {
      less: 'menos',
      more: 'mais',
    },
    totalCount: '{{count}} contribuições em {{year}}',
  };

  const explicitTheme = {
    light: ['#e4e4e4', '#d3d3d3', '#b2b2b2', '#7a7a7a', '#525252'],
    dark: ['#383838', '#606060', '#8c8c8c', '#bababa', '#ebebeb'],
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <GitHubCalendar
          hideMonthLabels
          blockMargin={6}
          theme={explicitTheme}
          labels={labels}
          colorScheme={colorScheme}
          username="ialexanderbrito"
          year={currentYear}
        />
      </div>
    </div>
  );
}
