import React from 'react';
import { Wrapper } from '@/lib/component';
import { Lanyard, WavesLines } from '@/lib/ui';

export function Hero() {
  return (
    <Wrapper className="h-96 md:h-[500px] -z-10 bg-reverse p-0 border-none">
      <WavesLines className="z-10" xGap={15} />
      <Lanyard
        position={[0, 0, 12]}
        gravity={[0, -40, 0]}
        containerClassname="h-96 md:h-[500px] z-50 w-full"
      />
    </Wrapper>
  );
}
