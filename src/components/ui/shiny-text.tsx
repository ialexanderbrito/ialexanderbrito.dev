import React from 'react';

import { cn } from '@/lib/utils';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({ text, disabled = false, speed = 5, className = '' }) => (
  <div
    className={cn(
      'bg-clip-text text-[#b5b5b5a4] inline-block',
      !disabled && 'animate-shine',
      disabled && 'shiny-text disabled',
      className,
    )}
    style={{
      animationDuration: `${speed}s`,
    }}
  >
    {text}
  </div>
);

export default ShinyText;
