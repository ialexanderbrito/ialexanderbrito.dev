'use client';

import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { flushSync } from 'react-dom';

export function ModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return;

    const newTheme = !isDark;

    // Check if View Transitions API is supported
    if (
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsDark(newTheme);
      document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return;
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        setIsDark(newTheme);
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
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
  }, [isDark]);

  return (
    <Button
      ref={buttonRef}
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      className="relative"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Alternar tema</span>
    </Button>
  );
}
