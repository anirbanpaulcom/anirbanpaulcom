import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/util';

export default function Avatar({
  src,
  name,
  className,
}: {
  src?: string;
  name?: string;
  className?: string;
}) {
  return (
    <Image
      src={
        src ? src : `https://api.dicebear.com/9.x/micah/png?seed=?name=${name}`
      }
      alt={name || 'Avatar'}
      width={32}
      height={32}
      className={cn('size-8 rounded-full', className)}
    />
  );
}
