import React from 'react';
import { User } from '@/app/constraint';
import Avatar from '@/lib/ui/avatar';
import { Button, CopyButton, H4, H5, P3 } from '@/lib/ui';
import { TimerIcon } from '@radix-ui/react-icons';
import { SiGmail } from 'react-icons/si';
import { HiMiniUserPlus } from 'react-icons/hi2';
import { Github, Wrapper } from '@/lib/component';
import { ImLinkedin2 } from 'react-icons/im';
import Link from 'next/link';

export function Contact() {
  return (
    <section id="contact" className="w-full space-y-4">
      <Wrapper className="flex-row justify-between items-center">
        <H4>Get In Touch</H4>
        <Link
          href={User?.contact?.linkedin}
          className="text-xs sm:text-sm hover:text-gray-500 transition-colors duration-300"
        >
          Connect
        </Link>
      </Wrapper>

      <Github />

      <div className="gap-4 flex flex-col sm:flex-row lg:gap-4 w-full">
        <Wrapper
          target="_blank"
          href={User?.contact?.cal}
          className="justify-between sm:w-1/2 cursor-pointer hover:bg-gray transform transition-transform duration-300 ease-in-out hover:scale-105 hover:border-transparent"
        >
          <Avatar name={User?.contact?.email} />
          <P3>{User?.name}</P3>
          <H4>30 Min Meeting</H4>
          <P3 className="flex items-center">
            <TimerIcon className="mr-1" /> 30m
          </P3>
        </Wrapper>

        <div className="flex flex-col justify-between sm:w-1/2 w-full h-auto gap-4">
          <Wrapper
            href={`mailto:${User?.contact?.email}`}
            className="flex-row items-center justify-start relative  transform transition-transform duration-300 ease-in-out hover:bg-gray hover:scale-105 hover:border-transparent"
          >
            <SiGmail className="text-red-500 bg-gray-100 px-1 rounded-lg size-9" />
            <div className="mx-3">
              <H5>{User?.contact?.email}</H5>
              <span className="text-xs text-gray">Drop me a line</span>
            </div>
            <CopyButton
              className="hover:bg-gray absolute top-4 right-4 size-8 p-0 border-none"
              value={User?.contact?.email}
            />
          </Wrapper>

          <Wrapper
            href={User?.contact?.linkedin}
            target="_blank"
            className="flex-row items-center justify-start relative  transform transition-transform duration-300 ease-in-out hover:bg-gray hover:scale-105 hover:border-transparent"
          >
            <ImLinkedin2 className="size-10 px-1 rounded-xl text-white bg-blue-600" />
            <div className="mx-3">
              <H5 className="my-0">{User?.name}</H5>
              <span className="text-xs text-gray">
                Let&apos;s connect on LinkedIn
              </span>
            </div>
            <Button
              className="hover:bg-gray absolute top-4 right-4 size-8 p-0 border-none"
              icon={<HiMiniUserPlus className="size-4" />}
            />
          </Wrapper>
        </div>
      </div>
    </section>
  );
}
