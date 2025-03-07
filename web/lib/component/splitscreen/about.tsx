import React from 'react';
import { P2 } from '@/lib/ui';
import { User } from '@/app/constraint';
import { Wrapper } from '@/lib/component';

export function About() {
  return (
    User?.about && (
      <Wrapper>
        <P2>{User?.about}</P2>
      </Wrapper>
    )
  );
}
