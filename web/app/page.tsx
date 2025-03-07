import React from 'react';
import {
  Container,
  Hero,
  About,
  Contact,
  Review,
  Blog,
  Experience,
} from '@/lib/component';

export default function Home() {
  return (
    <Container className="m-auto max-w-3xl gap-4">
      <Hero />
      <About />
      <Contact />
      <Experience />
      <Blog />
      <Review />
    </Container>
  );
}
