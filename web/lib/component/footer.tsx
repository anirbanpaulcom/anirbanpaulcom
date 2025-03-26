import React from 'react';
import { P3 } from '@/lib/ui';
import Link from 'next/link';
import { User } from '@/app/constraint';

export function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center">
      <P3 className="mb-1 mt-4 text-center">
        Brought to you by
        <Link
          href={User?.contact?.linkedin}
          className="text-gradient mx-1 underline"
        >
          {User?.name?.split(' ')[0]}
        </Link>
        | Copyright © {new Date().getFullYear()}. All Rights Reserved
      </P3>
    </footer>
  );
}
