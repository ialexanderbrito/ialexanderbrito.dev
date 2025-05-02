import { cn } from '@/lib/utils';
import React from 'react';

interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> { }

const VisuallyHidden = React.forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'absolute w-[1px] h-[1px] p-0 -m-[1px] overflow-hidden whitespace-nowrap',
          'border-0 clip-rect-0',
          className
        )}
        {...props}
      />
    );
  }
);

VisuallyHidden.displayName = 'VisuallyHidden';

export { VisuallyHidden };
