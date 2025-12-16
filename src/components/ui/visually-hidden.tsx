import React from 'react';

import { cn } from '@/lib/utils';

type VisuallyHiddenProps = React.HTMLAttributes<HTMLSpanElement>;

const VisuallyHidden = React.forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap',
        'border-0 clip-rect-0',
        className,
      )}
      {...props}
    />
  ),
);

VisuallyHidden.displayName = 'VisuallyHidden';

export { VisuallyHidden };
