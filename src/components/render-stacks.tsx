import { Stack } from '@/interfaces/stack';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface RenderStacksProps {
  stacks: Stack[];
  category?: string;
}

export default function RenderStacks({ stacks, category }: RenderStacksProps) {
  return (
    <section className="mt-8 flex-col gap-4 flex lg:grid lg:grid-cols-4">
      {stacks
        .filter((stack) => !category || stack.category === category)
        .map((stack) => (
          <Link
            href={stack.urlSite}
            target="_blank"
            rel="noopener noreferrer"
            key={stack.id}
            className={cn(
              'flex items-center gap-3 rounded-md p-3 bg-accent/50 dark:backdrop-blur-2xl hover:bg-accent/70 text-accent-foreground transition-colors',
              'focus:outline-hidden focus-visible:outline-2 focus-visible:outline focus-visible:outline-ring',
            )}
          >
            <div
              className={cn(
                'p-2 flex items-center justify-center rounded-lg relative overflow-hidden',
                stack.invert && 'dark:invert',
              )}
            >
              <Image src={stack.icon.url} alt="" width={24} height={24} className="z-10" loading="lazy" />
              <Image
                src={stack.icon.url}
                alt=""
                width={8}
                height={8}
                className="blur-lg absolute inset-0 w-[125%] h-[125%] opacity-80 z-0"
              />
            </div>
            <span className="text-xs md:text-sm">{stack.name}</span>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"></div>
          </Link>
        ))}
    </section>
  );
}
