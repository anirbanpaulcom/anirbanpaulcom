'use client';

import { useEffect, useState } from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { H2, H5, P1, P3, Skeleton } from '@/lib/ui';
import Tooltiper from '@/lib/ui/tooltip';
import { cn, formatDate, formatDateTime } from '@/lib/util';
import { CalendarIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React from 'react';
import { LuChartColumnStacked, LuMoveLeft } from 'react-icons/lu';
import { BlogType } from '@/app/type';
import { useMDXComponents } from '@/mdx-components';

export function BlogDetails({
  content,
  meta,
}: {
  content: string;
  meta: BlogType;
}) {
  const [blog, setBlog] = useState<MDXRemoteSerializeResult | null>(null);
  useEffect(() => {
    serialize(content).then((serializedContent) => {
      setBlog(serializedContent);
    });
  }, [content]);

  return (
    <>
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

      {meta && (
        <div>
          <H2 className={cn('text-center !my-4 md:!my-8 ')}>{meta?.title}</H2>
          <div className="flex w-full justify-between items-center">
            <P3 className="text-center flex items-center justify-center ">
              <Tooltiper content={formatDateTime(meta?.date)}>
                <CalendarIcon className="mr-2" />
              </Tooltiper>
              {formatDate(meta?.date)}
            </P3>
            <P3 className="text-center flex items-center justify-center ">
              <Tooltiper content={`Category: ${meta?.category}`}>
                <LuChartColumnStacked size={16} className="mr-2" />
              </Tooltiper>

              {meta?.category}
            </P3>
          </div>
          <P1>{meta?.description}</P1>
        </div>
      )}
      {blog && <MDXRemote {...blog} components={useMDXComponents} />}
    </>
  );
}
