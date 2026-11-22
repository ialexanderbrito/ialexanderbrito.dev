'use client';

import { useCallback, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Moon02Icon, Sun02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
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
      className="relative rounded-full h-8 w-8 sm:h-8.5 sm:w-8.5 hover:bg-accent/40 dark:hover:bg-white/10 transition-colors border border-border/40 hover:border-border/70 cursor-pointer shrink-0 touch-manipulation after:absolute after:-inset-1.5 after:content-['']"
    >
      <HugeiconsIcon
        icon={Sun02Icon}
        size={16}
        strokeWidth={1.5}
        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-muted-foreground hover:text-foreground"
      />
      <HugeiconsIcon
        icon={Moon02Icon}
        size={16}
        strokeWidth={1.5}
        className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-muted-foreground hover:text-foreground"
      />
      <span className="sr-only">Alternar tema</span>
    </Button>
  );
}
