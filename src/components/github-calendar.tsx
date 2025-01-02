'use client';
import GitHubCalendar from 'react-github-calendar';

import { useTheme } from 'next-themes';

export function GithubCalendar() {
  const { theme } = useTheme();
  const colorScheme = theme === 'dark' ? 'dark' : 'light';

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

  return (
    <div className="overflow-x-auto w-full">
      <GitHubCalendar
        hideMonthLabels
        blockMargin={6}
        theme={explicitTheme}
        year={new Date().getFullYear()}
        labels={labels}
        colorScheme={colorScheme}
        username="ialexanderbrito"
      />
    </div>
  );
}
