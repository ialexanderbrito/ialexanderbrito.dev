import { CraftWorkstation } from '@/components/craft-workstation';
import { siteConfig } from '@/config/site';
import { Locale } from '@/config/translations';
import { getPortfolioData } from '@/lib/portfolio-data';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

const thumbnail = {
  url: 'https://ialexanderbrito.dev/about.jpeg',
  width: 1200,
  height: 630,
  alt: 'Sobre • Alexander',
  type: 'image/jpeg',
};

export const metadata: Metadata = {
  title: 'Sobre',
  description:
    'Trajetória profissional, filosofia de desenvolvimento, stack e momentos marcantes de Alexander.',
  alternates: {
    canonical: 'https://ialexanderbrito.dev/about',
    languages: {
      'pt-BR': 'https://ialexanderbrito.dev/about',
      'en-US': 'https://ialexanderbrito.dev/about',
    },
  },
  openGraph: {
    title: 'Sobre • Alexander',
    description:
      'Trajetória profissional, filosofia de desenvolvimento, stack e momentos marcantes de Alexander.',
    type: 'profile',
    url: 'https://ialexanderbrito.dev/about',
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    alternateLocale: siteConfig.localeAlternate,
    images: [thumbnail],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre • Alexander',
    description:
      'Trajetória profissional, filosofia de desenvolvimento, stack e momentos marcantes de Alexander.',
    site: '@ialexanderbrito',
    creator: '@ialexanderbrito',
    images: [thumbnail.url],
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
