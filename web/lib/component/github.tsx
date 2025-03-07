import React from 'react';
import { Wrapper } from '@/lib/component';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { Button } from '../ui';
import Image from 'next/image';
import GitHubgraph from '@/public/github.svg';
import { User } from '@/app/constraint';
import { cn } from '@/lib/util';

export function Github() {
  return (
    <Wrapper
      href={User?.contact?.github}
      className={cn('items-center justify-between bg-black h-44 sm:h-56')}
    >
      <div className="flex justify-between w-full">
        <GitHubLogoIcon
          target="_blank"
          className="size-10 cursor-pointer bg-reverse rounded-xl text-reverse p-1"
        />
        <Button
          className="bg-white hover:bg-white/90 text-black max-w-20"
          text="Follow"
        />
      </div>
      <Image
        width={80}
        height={80}
        className="w-full"
        src={GitHubgraph}
        alt={'GitHubgraph'}
      />
    </Wrapper>
  );
}
