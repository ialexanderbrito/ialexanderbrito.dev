'use client';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface FilterProjectsProps {
  category?: string[];
}

export function FilterProjects({ category }: FilterProjectsProps) {
  const uniqueCategories = Array.from(new Set(category));

  uniqueCategories.sort((a, b) => {
    if (a === 'uollet') {
      return -1;
    }
    if (b === 'uollet') {
      return 1;
    }
    return 0;
  });

  const handleScroll = (category: string) => {
    const element = document.getElementById(category);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-row flex-wrap gap-2 mt-8">
      {uniqueCategories.map((category) => (
        <Badge
          key={category}
          onClick={() => {
            handleScroll(category);
          }}
          className={cn('cursor-pointer')}
        >
          {category}
        </Badge>
      ))}
    </div>
  );
}
