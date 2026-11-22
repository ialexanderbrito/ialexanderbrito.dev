import { CraftWorkstation } from '@/components/craft-workstation';
import { Locale } from '@/config/translations';
import { getPortfolioData } from '@/lib/portfolio-data';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

const thumbnail = {
  url: 'https://ialexanderbrito.dev/projects.jpeg',
  width: 1200,
  height: 630,
  alt: 'Projetos • Alexander',
};

const defaultMetadata = {
  title: 'Projetos',
  description:
    'Obras selecionadas, produtos digitais, SaaS e iniciativas em código aberto desenvolvidas com foco em alta performance e design engineering.',
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
    url: 'https://ialexanderbrito.dev/projects',
    siteName: 'Alexander • Projetos',
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
