import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/util';

interface WrapperProps extends React.HTMLProps<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
}

export function Wrapper({
  children,
  className,
  href,
  target,
  rel,
  ...props
}: WrapperProps) {
  return href ? (
    <Link
      href={href}
      target={target}
      rel={rel || 'noopener noreferrer'}
      passHref
      className={cn(
        `flex flex-col justify-center border-on w-full px-6 py-4 rounded-xl ${className}`,
      )}
    >
      {children}
    </Link>
  ) : (
    <section
      className={cn(
        `flex flex-col justify-center border-on w-full px-6 py-4 rounded-xl ${className}`,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
