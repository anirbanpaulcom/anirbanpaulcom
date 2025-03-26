import React from 'react';
import Link from 'next/link';
import { BlogType } from '@/app/type';
import { User } from '@/app/constraint';
import { Wrapper } from '../layout/wrapper';
import IconButton from '@/lib/ui/iconbutton';
import { LuMoveUpRight } from 'react-icons/lu';
import { H5, P3, Skeleton, Span, H4 } from '@/lib/ui';
import { formatDate } from '@/lib/util';

export function BlogCardLoader({
  loading = false,
  total = 1,
}: {
  loading: boolean;
  total: number;
}) {
  return loading ? (
    Array.from({ length: total }).map((_, index) => (
      <div
        key={index}
        className="py-5 px-6 cursor-pointer flex flex-col justify-between rounded-xl space-y-3 overflow-hidden h-64 w-full mx-4 sm:mx-8 md:mx-10 max-w-3xl border-on hover:bg-gray hover:border-transparent"
      >
        <div>
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-40 rounded-lg" />
            <Skeleton className="size-8 rounded-lg" />
          </div>
          <div className="space-y-4 my-6">
            <Skeleton className="h-4 max-w-56 rounded-md" />
            <Skeleton className="h-4 max-w-64 rounded-md" />
            <Skeleton className="h-4 max-w-96 rounded-md" />
          </div>
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-6 w-24 rounded-lg" />
          <Skeleton className="h-6 w-20 rounded-lg" />
        </div>
      </div>
    ))
  ) : (
    <H5 className="absolute text-center">No Blogs Found</H5>
  );
}

export function BlogCard({
  link,
  title,
  subtitle,
  content,
  time,
  footer,
}: {
  link?: string;
  title?: string;
  subtitle?: string;
  content?: string;
  time?: string;
  footer?: string;
}) {
  return (
    <Link
      href={link || '#'}
      className="py-5 px-6 cursor-pointer flex flex-col justify-between rounded-xl space-y-3 overflow-hidden h-64 w-full mx-4 sm:mx-8 md:mx-10 max-w-3xl border-on hover:bg-gray hover:border-transparent"
    >
      <div className="flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <H5 className="max-w-[90%]">{title}</H5>
          <IconButton
            Icon={<LuMoveUpRight className="size-4" />}
            hoverIcon={<LuMoveUpRight className="text-black size-4" />}
          />
        </div>
        <Span className="font-normal">{subtitle}</Span>
        <P3 className="overflow-hidden line-clamp-4 md:line-clamp-6">
          {content}
        </P3>
      </div>
      <div className="flex justify-between items-center">
        {time && <P3>{formatDate(time)}</P3>}
        {footer && <P3>{footer}</P3>}
      </div>
    </Link>
  );
}

export function Blog({
  viewAll = false,
  loading = false,
}: {
  viewAll?: boolean;
  loading?: boolean;
}) {
  const allBlogs = React.useMemo(() => {
    return viewAll ? User?.blogs : User?.blogs.slice(0, 2) || [];
  }, [viewAll]);

  return (
    ((Array.isArray(allBlogs) && Boolean(allBlogs.length)) || loading) && (
      <section id="blog" className="space-y-4 w-full">
        <Wrapper className="flex-row justify-between items-center">
          <H4>Insights And Stories</H4>
          {!viewAll && (
            <Link
              href="blogs"
              className="text-xs sm:text-sm hover:text-gray-500 transition-colors duration-300"
            >
              See all
            </Link>
          )}
        </Wrapper>

        <div className="w-full gap-4 grid grid-cols-1 sm:grid-cols-2 place-items-center">
          {loading ? (
            <BlogCardLoader loading={loading} total={2} />
          ) : (
            allBlogs.map((b: BlogType) => (
              <BlogCard
                link={`/blog/${b.filename}`}
                key={b.filename}
                title={b.title}
                content={b.description}
                time={b.date}
                footer={`${b.category}`}
              />
            ))
          )}
        </div>
      </section>
    )
  );
}
