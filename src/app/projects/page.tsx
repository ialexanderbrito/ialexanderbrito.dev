import { CraftWorkstation } from '@/components/craft-workstation';
import { siteConfig } from '@/config/site';
import { Locale } from '@/config/translations';
import { getPortfolioData } from '@/lib/portfolio-data';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

const thumbnail = {
  url: 'https://ialexanderbrito.dev/projects.jpeg',
  width: 1200,
  height: 630,
  alt: 'Projetos • Alexander',
  type: 'image/jpeg',
};

export const metadata: Metadata = {
  title: 'Projetos',
  description:
    'Produtos digitais, SaaS, aplicações web e mobile, e projetos de código aberto desenvolvidos por Alexander.',
  alternates: {
    canonical: 'https://ialexanderbrito.dev/projects',
    languages: {
      'pt-BR': 'https://ialexanderbrito.dev/projects',
      'en-US': 'https://ialexanderbrito.dev/projects',
    },
  },
  openGraph: {
    title: 'Projetos • Alexander',
    description:
      'Produtos digitais, SaaS, aplicações web e mobile, e projetos de código aberto desenvolvidos por Alexander.',
    type: 'website',
    url: 'https://ialexanderbrito.dev/projects',
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    alternateLocale: siteConfig.localeAlternate,
    images: [thumbnail],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projetos • Alexander',
    description:
      'Produtos digitais, SaaS, aplicações web e mobile, e projetos de código aberto desenvolvidos por Alexander.',
    site: '@ialexanderbrito',
    creator: '@ialexanderbrito',
    images: [thumbnail.url],
  },
};

export default async function Projects() {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value as
    Locale | undefined;
  const locale: Locale = localeCookie === 'en' ? 'en' : 'pt_BR';
  const data = await getPortfolioData(locale);

  return (
    <CraftWorkstation
      initialTab="projects"
      projects={data.projects}
      about={data.about}
      experiences={data.experiences}
    />
  );
}
