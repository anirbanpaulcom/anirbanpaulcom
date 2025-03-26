import React from 'react';
import { Container, Wrapper } from '@/lib/component';
import {
  CalendarIcon,
  CornerBottomRightIcon,
  CornerTopLeftIcon,
} from '@radix-ui/react-icons';
import { H2, H5, P1, P3, Skeleton } from '@/lib/ui';
import { LuChartColumnStacked, LuMoveLeft } from 'react-icons/lu';
import Link from 'next/link';
import { cn, formatDate, formatDateTime, getSlug } from '@/lib/util';
import Tooltiper from '@/lib/ui/tooltip';
import { User } from '@/app/constraint';

async function getBlog() {
  const blogid = await getSlug(0);
  for (const b of User.blogs) {
    if (b.filename === blogid) return b;
  }
  return undefined;
}

export async function generateMetadata() {
  const blog = await getBlog();

  if (!blog) {
    return {
      title: 'Post not found',
      description: 'The requested blog post does not exist',
    };
  }

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: 'article',
      publishedTime: blog.date,
    },
  };
}

export default async function BlogDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const blog = await getBlog();

  return (
    <Container className="m-auto max-w-5xl prose dark:prose-invert">
      <Wrapper className="min-h-72 relative p-6 sm:p-15 md:px-20 mt-10 mb-10">
        <CornerTopLeftIcon className="absolute size-8 -top-4 -left-4 text-gray" />
        <div className="absolute top-0 bottom-0 left-[30%] -z-10 border-on border-y-0 border-r-0 border-l-[1px] border-dashed lg:block hidden" />
        {!blog ? (
          <div className="flex justify-center items-center">
            <Skeleton className="h-8 w-56 self-center rounded-xl" />
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <P3 className="flex items-center justify-center">
              <LuMoveLeft size={16} href="/" className="cursor-pointer " />
              <Link href="/" className="px-2 no-underline">
                Home /
              </Link>
            </P3>
            <H5 className="font-bold">
              {blog ? 'Blog post' : '404 | NOT FOUND'}
            </H5>
          </div>
        )}

        {blog && (
          <div>
            <H2 className={cn('text-center !my-4 md:!my-8 ')}>{blog?.title}</H2>
            <div className="flex w-full justify-between items-center">
              <P3 className="text-center flex items-center justify-center ">
                <Tooltiper content={formatDateTime(blog?.date)}>
                  <CalendarIcon className="mr-2" />
                </Tooltiper>
                {formatDate(blog?.date)}
              </P3>
              <P3 className="text-center flex items-center justify-center ">
                <Tooltiper content={`Category: ${blog?.category}`}>
                  <LuChartColumnStacked size={16} className="mr-2" />
                </Tooltiper>

                {blog?.category}
              </P3>
            </div>
            <P1>{blog?.description}</P1>
          </div>
        )}
        {children}
        <div className="absolute top-0 bottom-0 right-[30%] -z-10 border-on border-y-0 border-r-0 border-l-[1px] border-dashed lg:block hidden" />
        <CornerBottomRightIcon className="absolute size-8 -bottom-4 -right-4 text-gray" />
      </Wrapper>
    </Container>
  );
}
