'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Wrapper } from '../layout/wrapper';
import { H4 } from '@/lib/ui';
import Link from 'next/link';
import { User } from '@/app/constraint';

export function Gallery({ viewAll = false }: { viewAll?: boolean }) {
  const images = viewAll ? User?.images : User?.images.slice(0, 9) || [];

  return images.length ? (
    <section id="gallery" className="space-y-4 w-full">
      <Wrapper className="flex-row justify-between items-center">
        <H4>Gallery</H4>
        <Link href={'/gallery'} className="text-xs sm:text-sm hover:text-gray">
          See all
        </Link>
      </Wrapper>
      <div className="columns-2 gap-4 sm:columns-3">
        {images &&
          images.map((url, i) => {
            const isLandscape = i % 2 === 0;
            const aspectClass = isLandscape ? 'aspect-auto' : 'aspect-square';

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  delay: 0.25 + i * 0.05,
                  duration: 0.4,
                  ease: 'easeOut',
                }}
                className={`${aspectClass} mb-4`}
              >
                <Image
                  className="size-full rounded-lg object-cover"
                  src={url}
                  alt={`Gallery image ${i + 1}`}
                  width={isLandscape ? 800 : 600}
                  height={isLandscape ? 600 : 800}
                  unoptimized={false}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                  style={{ display: 'block' }}
                />
              </motion.div>
            );
          })}
      </div>
    </section>
  ) : null;
}
