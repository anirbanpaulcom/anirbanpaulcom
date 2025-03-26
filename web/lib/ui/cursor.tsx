'use client';

import { cn } from '@/lib/util';
import {
  AnimatePresence,
  HTMLMotionProps,
  motion,
  useMotionValue,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FiArrowUpRight, FiMove, FiCrosshair } from 'react-icons/fi';
import React from 'react';
import { BsCursorFill, BsFillHandIndexFill } from 'react-icons/bs';
import { FaHandRock } from 'react-icons/fa';
import { FaHand } from 'react-icons/fa6';
import { LuTextCursor } from 'react-icons/lu';

type PointerProps = Omit<HTMLMotionProps<'div'>, 'ref'>;

const cursorMappings = {
  default: BsCursorFill,
  grab: FaHand,
  grabbing: FaHandRock,
  text: LuTextCursor,
  move: FiMove,
  crosshair: FiCrosshair,
  pointer: BsFillHandIndexFill,
} as const;

export function Pointer({
  className,
  style,
  children,
  ...props
}: PointerProps): React.JSX.Element {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [cursorType, setCursorType] =
    useState<keyof typeof cursorMappings>('default');
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      updateCursorStyle(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [x, y]);

  const updateCursorStyle = (x: number, y: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const elements = document.elementsFromPoint(x, y);
      let detectedCursor = 'default';

      for (const element of elements) {
        const style = window.getComputedStyle(element);
        const cursor = style.cursor;

        if (cursor && cursor !== 'auto' && cursor !== 'none') {
          detectedCursor = cursor;
          break;
        }
      }

      setCursorType(() => {
        const normalizedCursor = detectedCursor.replace(
          '-webkit-',
          '',
        ) as keyof typeof cursorMappings;
        return cursorMappings[normalizedCursor] ? normalizedCursor : 'default';
      });
    });
  };

  const IconComponent = cursorMappings[cursorType] || FiArrowUpRight;

  return (
    <AnimatePresence>
      <motion.div
        className="pointer-events-none fixed z-[9999] transform -translate-x-1/2 -translate-y-1/2"
        style={{ x, y, ...style }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        {...props}
      >
        {children || (
          <IconComponent
            className={cn(
              cursorType === 'default' && 'rotate-[-70deg]',
              className,
            )}
            size={24}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
