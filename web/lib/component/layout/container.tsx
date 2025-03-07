'use client';

import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.main
      initial={{ opacity: 0, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1 }}
      className={`px-4 py-10 flex flex-1 flex-col w-full h-full justify-center items-center ${className}`}
    >
      {children}
    </motion.main>
  );
}
