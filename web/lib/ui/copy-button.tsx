'use client';

import { VariantProps, cva } from 'class-variance-authority';
import { toast } from 'sonner';
import { useCopyToClipboard } from '@/lib/hooks/useclipboard';
import { cn } from '@/lib/util';
import { CheckIcon, CopyIcon } from '@radix-ui/react-icons';

const copyButtonVariants = cva(
  'relative group rounded-full size-8  p-1 flex justify-center items-center  transition-all duration-75',
  {
    variants: {
      variant: {
        default: 'bg-transparent hover:bg-gray-100 active:bg-gray-200',
        neutral: 'bg-transparent hover:bg-gray-100 active:bg-gray-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export function CopyButton({
  variant = 'default',
  value,
  className,
  successMessage,
}: {
  value: string;
  className?: string;
  successMessage?: string;
} & VariantProps<typeof copyButtonVariants>) {
  const [copied, copyToClipboard] = useCopyToClipboard();
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toast.promise(copyToClipboard(value), {
          success: successMessage || 'Copied to clipboard!',
        });
      }}
      className={cn(
        copyButtonVariants({ variant }),
        'cursor-pointer',
        className,
      )}
      type="button"
    >
      <span className="sr-only">Copy</span>
      {copied ? (
        <CheckIcon className="bg-green-200 rounded-full p-1 size-5 text-reverse" />
      ) : (
        <CopyIcon />
      )}
    </button>
  );
}
