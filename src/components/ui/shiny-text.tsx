'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({ text, disabled = false, speed = 5, className = '' }) => {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';

  return (
    <div
      className={cn(
        'bg-clip-text inline-block',
        !disabled && 'animate-shine',
        isLightTheme ? 'text-[#505050a4]' : 'text-[#b5b5b5a4]',
        disabled && 'shiny-text disabled',
        className,
      )}
      style={{
        animationDuration: `${speed}s`,
        backgroundImage: `linear-gradient(
          to right,
          ${isLightTheme && '#505050'} 20%,
          ${isLightTheme && '#000000'} 40%,
          ${isLightTheme && '#000000'} 60%,
          ${isLightTheme && '#505050'} 80%
        )`,
        // backgroundSize: '200% auto',
      }}
    >
      {text}
    </div>
  );
};

export default ShinyText;
