import { Container, Gallery } from '@/lib/component';
import React from 'react';

export default function Galleries() {
  return (
    <Container className="m-auto max-w-3xl gap-4 min-h-screen  flex justify-start">
      <Gallery viewAll />
    </Container>
  );
}
