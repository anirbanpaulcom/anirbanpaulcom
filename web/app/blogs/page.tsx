import React from 'react';
import { Blog, Container } from '@/lib/component';

export default function Blogs() {
  return (
    <Container className="m-auto max-w-3xl gap-4 min-h-screen  flex justify-start">
      <Blog viewAll />
    </Container>
  );
}
