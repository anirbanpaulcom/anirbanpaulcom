import React from 'react';
import { Container, Wrapper } from '@/lib/component';
import {
  CornerBottomRightIcon,
  CornerTopLeftIcon,
} from '@radix-ui/react-icons';

export default function BlogDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="m-auto max-w-5xl prose dark:prose-invert">
      <Wrapper className="min-h-72 relative p-6 sm:p-15 md:px-20 mt-10 mb-10">
        <CornerTopLeftIcon className="absolute size-8 -top-4 -left-4 text-gray" />
        <div className="absolute top-0 bottom-0 left-[30%] -z-10 border-on border-y-0 border-r-0 border-l-[1px] border-dashed lg:block hidden" />
        {children}
        <div className="absolute top-0 bottom-0 right-[30%] -z-10 border-on border-y-0 border-r-0 border-l-[1px] border-dashed lg:block hidden" />
        <CornerBottomRightIcon className="absolute size-8 -bottom-4 -right-4 text-gray" />
      </Wrapper>
    </Container>
  );
}
