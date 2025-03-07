import { H4, H5, P3 } from '@/lib/ui';
import Marquee from '@/lib/ui/marquee';
import { cn } from '@/lib/util';
import { LinkedInLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import Avatar from '@/lib/ui/avatar';
import { User } from '@/app/constraint';
import { RecommendationType } from '@/app/type';
import { Wrapper } from '../layout/wrapper';

function ReviewCard({ name, review }: RecommendationType) {
  return (
    <Link
      href={User?.contact?.linkedin}
      className={cn(
        'relative w-64 cursor-pointer overflow-hidden rounded-xl border-on hover:bg-gray p-4 transform transition-transform duration-300 ease-in-out hover:scale-105 hover:border-transparent',
      )}
    >
      <div className="flex flex-row items-center gap-2 ">
        <Avatar name={name} />
        <H5 className="break-words overflow-hidden line-clamp-1">{name}</H5>
        <LinkedInLogoIcon />
      </div>
      <blockquote className="mt-2 text-sm break-words overflow-hidden line-clamp-3">
        {review}
      </blockquote>
    </Link>
  );
}

export function Review() {
  const [firstRow, secondRow] =
    User?.recommendations.length < 6
      ? [User?.recommendations, User?.recommendations]
      : [
          User?.recommendations.slice(
            0,
            Math.ceil(User?.recommendations.length / 2),
          ),
          User?.recommendations.slice(
            Math.ceil(User?.recommendations.length / 2),
          ),
        ];

  return (
    Boolean(User?.recommendations.length) && (
      <section id="review" className="w-full space-y-2">
        <Wrapper className="flex-row justify-between items-center">
          <H4>What People Are Saying</H4>
          <Link
            href={User?.contact?.linkedin}
            className="text-xs sm:text-sm hover:text-gray-500 transition-colors duration-300"
          >
            See all
          </Link>
        </Wrapper>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-color">
          {User?.recommendations?.length === 0 && <P3>No Reviews Found</P3>}
          <Marquee pauseOnHover className="[--duration:20s]">
            {Array.isArray(firstRow) &&
              firstRow.map((review, index) => (
                <ReviewCard key={review.name + index} {...review} />
              ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {Array.isArray(secondRow) &&
              secondRow.map((review, index) => (
                <ReviewCard key={review.name + index} {...review} />
              ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-white dark:from-black"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-2 bg-gradient-to-l from-white dark:from-black"></div>
        </div>
      </section>
    )
  );
}
