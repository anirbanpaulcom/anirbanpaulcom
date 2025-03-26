'use client';

import Themer from '@/lib/ui/themer';
import Image from 'next/image';
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  ArrowLeftIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons';
import { User } from '@/app/constraint';
import { useRouter } from 'next/navigation';
import { motion, MotionConfig } from 'framer-motion';
import { BsEnvelopeFill } from 'react-icons/bs';
import Tooltiper from '@/lib/ui/tooltip';
import useClickOutside from '@/lib//hooks/useclickoutside';
import React from 'react';
import { Scroller } from '@/lib/ui';
import IconButton from '../ui/iconbutton';

export function Nav() {
  const router = useRouter();
  const [onMore, setMore] = React.useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  useClickOutside(containerRef as React.RefObject<HTMLElement>, () =>
    setMore(false),
  );

  const menu = [
    {
      label: 'Home',
      icon: (
        <IconButton
          className="w-12 h-10 border-none"
          onClick={() => router.push('/')}
          Icon={
            <Image
              src="/favicon.ico"
              alt="Favicon"
              width={48}
              height={40}
              className="p-3"
            />
          }
        />
      ),
    },
    {
      label: 'Mode',
      icon: <Themer className="w-12 h-10 border-none p-2.5" />,
    },
    {
      label: 'More',
      icon: (
        <DotsHorizontalIcon
          className="w-12 h-10 p-2.5"
          onClick={() => setMore(true)}
        />
      ),
    },
  ];

  const more = [
    {
      label: 'Menu',
      icon: (
        <ArrowLeftIcon
          className="w-12 h-10 p-2.5"
          onClick={() => setMore(false)}
        />
      ),
    },
    {
      label: 'LinkedIn',
      icon: (
        <LinkedInLogoIcon
          className="w-12 h-10 p-2.5"
          onClick={() => router.push(User?.contact?.linkedin)}
        />
      ),
    },
    {
      label: 'GitHub',
      icon: (
        <GitHubLogoIcon
          className="w-12 h-10 p-2.5"
          onClick={() => router.push(User?.contact?.github)}
        />
      ),
    },
    {
      label: 'Email',
      icon: (
        <BsEnvelopeFill
          className="w-12 h-10 p-2.5"
          onClick={() => router.push(`tel:${User?.contact?.email}`)}
        />
      ),
    },
    {
      label: 'Instagram',
      icon: (
        <InstagramLogoIcon
          className="w-12 h-10 p-2.5"
          onClick={() => router.push(User?.contact?.instagram)}
        />
      ),
    },
  ];

  const Icons = (icons: Array<{ label: string; icon: React.ReactNode }>) =>
    icons.map(({ label, icon }, index) => (
      <Tooltiper key={index} content={label}>
        <div className="flex items-center justify-center overflow-hidden bg-gray hover:bg-color text-gray hover:text-color rounded-xl  border-on border-none transform transition-transform duration-300 ease-in-out hover:scale-110">
          {icon}
        </div>
      </Tooltiper>
    ));

  return (
    <MotionConfig transition={{ type: 'spring', bounce: 0.1, duration: 0.2 }}>
      <Scroller />
      <motion.nav
        ref={containerRef}
        className="fixed bottom-5 left-0 right-0 mx-auto p-2 z-50 flex justify-between items-center overflow-hidden border-on backdrop-blur-md rounded-2xl shadow-lg"
        animate={{ width: onMore ? '300px' : '180px' }}
        initial={false}
      >
        {onMore ? Icons(more) : Icons(menu)}
      </motion.nav>
    </MotionConfig>
  );
}
