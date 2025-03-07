'use client';
import { cn } from '@/lib/util';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse bg-gradient-to-br from-[#f0f0f0] via-[#d0d0d0] to-[#a0a0a0] dark:opacity-25',
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
