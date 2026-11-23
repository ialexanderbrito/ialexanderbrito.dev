import { CraftWorkstation } from '@/components/craft-workstation';
import { siteConfig } from '@/config/site';
import { Locale } from '@/config/translations';
import { getPortfolioData } from '@/lib/portfolio-data';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

const thumbnail = {
  url: 'https://ialexanderbrito.dev/og.jpeg',
  width: 1200,
  height: 630,
  alt: 'Alexander • Especialista Frontend, Mobile & IA',
  type: 'image/jpeg',
};

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: {
    canonical: 'https://ialexanderbrito.dev',
    languages: {
      'pt-BR': 'https://ialexanderbrito.dev',
      'en-US': 'https://ialexanderbrito.dev',
    },
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: 'profile',
    url: 'https://ialexanderbrito.dev',
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    alternateLocale: siteConfig.localeAlternate,
    images: [thumbnail],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    site: '@ialexanderbrito',
    creator: '@ialexanderbrito',
    images: [thumbnail.url],
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
