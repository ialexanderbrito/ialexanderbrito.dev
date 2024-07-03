'use client';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';

function WobbleCard({
  children,
  containerClassName,
  className,
  style,
}: {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (clientX - (rect.left + rect.width / 2)) / 20;
    const y = (clientY - (rect.top + rect.height / 2)) / 20;
    setMousePosition({ x, y });
  };

  const resetMousePosition = () => {
    setIsHovering(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const transformStyle = isHovering
    ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1, 1, 1)`
    : 'translate3d(0px, 0px, 0) scale3d(1, 1, 1)';

  const innerTransformStyle = isHovering
    ? `translate3d(${-mousePosition.x}px, ${-mousePosition.y}px, 0) scale3d(1.03, 1.03, 1)`
    : 'translate3d(0px, 0px, 0) scale3d(1, 1, 1)';

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={resetMousePosition}
      style={{
        transform: transformStyle,
        transition: 'transform 0.1s ease-out',
        ...style,
      }}
      className={cn('mx-auto w-full bg-indigo-800 relative rounded-2xl overflow-hidden', containerClassName)}
    >
      <div
        className="relative h-full sm:mx-0 sm:rounded-2xl overflow-hidden"
        style={{
          boxShadow:
            '0 10px 32px rgba(34, 42, 53, 0.12), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.05), 0 4px 6px rgba(34, 42, 53, 0.08), 0 24px 108px rgba(47, 48, 55, 0.10)',
        }}
      >
        <div
          style={{
            transform: innerTransformStyle,
            transition: 'transform 0.1s ease-out',
          }}
          className={cn('h-full px-4 py-8 sm:px-10', className)}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

export { WobbleCard };
