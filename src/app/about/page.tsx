import { CraftWorkstation } from '@/components/craft-workstation';
import { Locale } from '@/config/translations';
import { getPortfolioData } from '@/lib/portfolio-data';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

const thumbnail = {
  url: 'https://ialexanderbrito.dev/about.jpeg',
  width: 1200,
  height: 630,
  alt: 'Sobre • Alexander',
};

const defaultMetadata = {
  title: 'Sobre',
  description:
    'Trajetória profissional, filosofia de desenvolvimento, stack e momentos marcantes de Alexander.',
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
    url: 'https://ialexanderbrito.dev/about',
    siteName: 'Alexander • Sobre',
  },
};

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value as
    Locale | undefined;
  const locale: Locale = localeCookie === 'en' ? 'en' : 'pt_BR';
  const data = await getPortfolioData(locale);

  return (
    <CraftWorkstation
      initialTab="about"
      projects={data.projects}
      about={data.about}
      experiences={data.experiences}
    />
  );
}
