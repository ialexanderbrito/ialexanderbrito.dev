import { cn } from '@/lib/utils';

interface PulseProps {
  color?: string;
}

function Pulse({ color = 'green' }: PulseProps) {
  return (
    <div className="relative flex h-3 w-3">
      <div
        className={cn(
          'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
          color === 'green' && 'bg-green-400',
          color === 'red' && 'bg-red-400',
          color === 'blue' && 'bg-blue-400',
          color === 'yellow' && 'bg-yellow-400',
        )}
      />
      <div
        className={cn(
          'relative inline-flex h-3 w-3 rounded-full',
          color === 'green' && 'bg-green-500',
          color === 'red' && 'bg-red-500',
          color === 'blue' && 'bg-blue-500',
          color === 'yellow' && 'bg-yellow-500',
        )}
      />
    </div>
  );
}

export { Pulse };
