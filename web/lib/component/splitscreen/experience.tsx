import React from 'react';
import { Wrapper } from '@/lib/component';
import { H4, H5, P2, P3 } from '@/lib/ui';
import { cn } from '@/lib/util';
import { User } from '@/app/constraint';
import Link from 'next/link';

export function Experience() {
  return (
    Boolean(User?.experiences?.length) && (
      <section className="space-y-4 w-full">
        <Wrapper className="flex-row justify-between items-center">
          <H4>What I Do</H4>
          <Link
            href={User?.contact?.linkedin}
            className="text-xs sm:text-sm hover:text-gray"
          >
            See all
          </Link>
        </Wrapper>
        <Wrapper className="gap-2">
          <P2>Experience</P2>
          {User?.experiences?.length ? (
            User?.experiences.map((experience, index) => (
              <div
                key={index}
                className="flex items-start relative opacity-100 transition-all duration-500"
              >
                <div className="flex justify-center items-center mr-3 mt-1">
                  <span className="size-[14px] bg-gray-300 rounded-full z-10" />
                  <span
                    className={cn(
                      `absolute left-1.5 top-1 w-[2px] bg-gray-300 z-0 ${User?.experiences?.length - 1 === index ? 'bg-transparent' : ''}`,
                    )}
                    style={{ height: 'calc(100% + 1rem)' }}
                  />
                </div>
                <article>
                  <H5>{experience?.title}</H5>
                  <P3>
                    {experience?.role} | {experience?.time}
                  </P3>
                  <P3>{experience?.description}</P3>
                </article>
              </div>
            ))
          ) : (
            <P3> No Experience Found</P3>
          )}
        </Wrapper>
      </section>
    )
  );
}
