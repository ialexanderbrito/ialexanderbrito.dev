import { CraftWorkstation } from '@/components/craft-workstation';
import { Locale } from '@/config/translations';
import { getPortfolioData } from '@/lib/portfolio-data';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

const thumbnail = {
  url: 'https://ialexanderbrito.dev/og.jpeg',
  width: 1200,
  height: 630,
  alt: 'Alexander • Especialista Frontend, Mobile & IA',
};

const defaultMetadata = {
  title: 'Alexander • Especialista Frontend, Mobile & IA',
  description:
    'Portfólio de engenharia de software de Alexander. Especialista no ecossistema React, Next.js, Mobile (React Native) e soluções com Inteligência Artificial.',
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

export default async function Home() {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value as
    Locale | undefined;
  const locale: Locale = localeCookie === 'en' ? 'en' : 'pt_BR';
  const data = await getPortfolioData(locale);

  return (
    <CraftWorkstation
      initialTab="home"
      projects={data.projects}
      about={data.about}
      experiences={data.experiences}
    />
  );
}
