'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface FilterProjectsProps {
  category?: string[];
}

const categoryLabels: Record<string, string> = {
  uollet: 'uollet',
  Pessoal: 'Pessoais',
  IK: 'IK Solution',
  Rocketseat: 'Rocketseat',
  Celular: 'Mobile',
};

export function FilterProjects({ category }: FilterProjectsProps) {
  const uniqueCategories = Array.from(new Set(category));

  const archiveCategories = ['Rocketseat', 'Celular', 'IK'];
  uniqueCategories.sort((a, b) => {
    if (a === 'uollet') return -1;
    if (b === 'uollet') return 1;
    if (archiveCategories.includes(a) && !archiveCategories.includes(b))
      return 1;
    if (!archiveCategories.includes(a) && archiveCategories.includes(b))
      return -1;
    return 0;
  });

  const handleScroll = (cat: string) => {
    const element = document.getElementById(cat);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {uniqueCategories.map((cat) => {
        const isArchive = archiveCategories.includes(cat);
        return (
          <Badge
            key={cat}
            variant={isArchive ? 'outline' : 'secondary'}
            onClick={() => handleScroll(cat)}
            className={cn(
              'cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground',
              isArchive &&
                'text-muted-foreground hover:text-primary-foreground',
            )}
          >
            {categoryLabels[cat] || cat}
          </Badge>
        );
      })}
    </div>
  );
}
