import { HomeContent } from '@/components/home-content';
import type { Metadata } from 'next';

const thumbnail = {
  url: 'https://ialexanderbrito.dev/og.jpeg',
  width: 1200,
  height: 630,
  alt: 'Home',
};

const defaultMetadata = {
  title: 'Alexander',
  description:
    'Opa, eu sou Alexander -- Front-end Developer & Mobile Developer',
  images: [thumbnail],
};

export const metadata: Metadata = {
  ...defaultMetadata,
  twitter: {
    ...defaultMetadata,
    card: 'summary_large_image',
    site: '@ialexanderbrito',
    creator: '@ialexanderbrito',
  },
  openGraph: {
    ...defaultMetadata,
    type: 'website',
    url: 'https://ialexanderbrito.dev',
    siteName: 'Alexander',
  },
};

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-4 md:px-8 relative overflow-hidden">
      <HomeContent />
    </main>
  );
}
