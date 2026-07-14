'use client';

import { useCallback, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { flushSync } from 'react-dom';

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return;

    const isDark = resolvedTheme === 'dark';
    const newTheme = isDark ? 'light' : 'dark';

    if (
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setTheme(newTheme);
      return;
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme);
      });
    }).ready;

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top),
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 400,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      },
    );
  }, [resolvedTheme, setTheme]);

  return (
    <Button
      ref={buttonRef}
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      className="relative rounded-full w-12 h-12 sm:w-9 sm:h-9 hover:bg-accent/40 dark:hover:bg-white/10 transition-colors border border-transparent hover:border-border/50 cursor-pointer"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-muted-foreground hover:text-foreground" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-muted-foreground hover:text-foreground" />
      <span className="sr-only">Alternar tema</span>
    </Button>
  );
}
