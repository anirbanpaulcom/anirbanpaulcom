'use client';

import { cn } from '@/lib/util';
import { motion, MotionProps, useScroll, useSpring } from 'framer-motion';
import React from 'react';

interface ScrollerProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {
  className?: string;
}

export const Scroller = React.forwardRef<HTMLDivElement, ScrollerProps>(
  ({ className, ...props }, ref) => {
    const { scrollYProgress } = useScroll();

    const scaleX = useSpring(scrollYProgress, {
      stiffness: 200,
      damping: 50,
      restDelta: 0.001,
    });

    return (
      <motion.div
        ref={ref}
        className={cn(
          'fixed inset-x-0 top-0 z-[9000] h-[2px] origin-left bg-gradient-to-r from-gray-400 to-black dark:from-gray-400 dark:to-white',
          className,
        )}
        style={{
          scaleX,
        }}
        {...props}
      />
    );
  },
);

Scroller.displayName = 'Scroller';
