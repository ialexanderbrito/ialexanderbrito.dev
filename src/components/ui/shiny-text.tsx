'use client';

import React, { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = '',
}) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLightTheme = mounted && resolvedTheme === 'light';

  // Only apply gradient after mount to avoid hydration mismatch
  const backgroundImage = mounted
    ? `linear-gradient(
        to right,
        ${isLightTheme ? '#505050' : '#b5b5b5'} 20%,
        ${isLightTheme ? '#000000' : '#ffffff'} 40%,
        ${isLightTheme ? '#000000' : '#ffffff'} 60%,
        ${isLightTheme ? '#505050' : '#b5b5b5'} 80%
      )`
    : undefined;

  return (
    <div
      className={cn(
        'bg-clip-text inline-block',
        !disabled && 'animate-shine',
        'text-[#505050a4] dark:text-[#b5b5b5a4]',
        disabled && 'shiny-text disabled',
        className,
      )}
      style={{
        animationDuration: `${speed}s`,
        backgroundImage,
      }}
    >
      {text}
    </div>
  );
};

export default ShinyText;
