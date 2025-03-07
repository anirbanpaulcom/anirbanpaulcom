import type { Metadata } from 'next';
import './app.css';
import { User } from './constraint';
import { Footer, Nav } from '@/lib/component';
import ThemeProviders from '@/lib/provider/themeprovider';
import { DM_Sans } from 'next/font/google';
import { Toaster } from 'sonner';
import { GoogleAnalytics } from '@next/third-parties/google';
import Head from 'next/head';
import OpengraphImage from '@/public/opengraph-image.png';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${User.name} | ${User.designation}`,
    template: `%s | ${User.name}`,
  },
  description: User?.about,
  metadataBase: new URL(User.site),
  keywords: [User?.name, User?.designation, ...User?.skills],
  authors: [{ name: User.name, url: User.site }],
  openGraph: {
    title: User.name,
    description: User.about,
    url: User?.site,
    siteName: User.name,
    images: [
      {
        url: OpengraphImage.src,
        width: OpengraphImage.width,
        height: OpengraphImage.height,
        alt: User.name,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: User?.contact?.twitter,
    creator: User?.contact?.twitter,
    title: `${User.name} | ${User.designation}`,
    description: User?.about,
    images: [
      {
        url: OpengraphImage.src,
        width: OpengraphImage.width,
        height: OpengraphImage.height,
        alt: User.name,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: User?.site,
  },
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: User?.name,
  jobTitle: User?.designation,
  description: User?.about,
  url: User?.site,
  sameAs: [
    User.contact.github,
    User.contact.linkedin,
    User.contact.instagram,
    User.contact.twitter,
  ],
  knowsAbout: User?.about,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="canonical" href={User.site} />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="apple-touch-icon" href="/favicon.ico" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd)
                .replace(/</g, '\\u003c')
                .replace(/>/g, '\\u003e'),
            }}
          />
          <GoogleAnalytics gaId="G-DC07EMNJ2X" />
        </Head>
        <ThemeProviders>
          <Toaster />
          <Nav />
          {children}
          <Footer />
        </ThemeProviders>
      </body>
    </html>
  );
}
