'use client';

import { ReactNode } from 'react';
import { toast } from 'sonner';
import { useCopyToClipboard } from '@/lib/hooks';
import { cn } from '@/lib/util';

export function CopyText({
  value,
  children,
  className,
  successMessage,
}: {
  value: string;
  children: ReactNode;
  className?: string;
  successMessage?: string;
}) {
  const [copied, copyToClipboard] = useCopyToClipboard();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toast.promise(copyToClipboard(value), {
          success: successMessage || 'Copied to clipboard!',
        });
      }}
      type="button"
      className={cn(
        'cursor-copy text-sm text-gray-700 decoration-dotted hover:underline',
        copied && 'cursor-default',
        className,
      )}
    >
      {children}
    </button>
  );
}
