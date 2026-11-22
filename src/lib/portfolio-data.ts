import { fetchHygraph } from '@/graphql/client';
import { GET_PORTFOLIO_DATA } from '@/graphql/queries';
import { About } from '@/interfaces/about';
import { Experience } from '@/interfaces/experience';
import { Project } from '@/interfaces/project';

export type PortfolioLocale = 'pt_BR' | 'en';

interface PortfolioDataResponse {
  projects: Project[];
  about?: About;
  experiences: Experience[];
}

export async function getPortfolioData(locale: PortfolioLocale = 'pt_BR') {
  const locales = locale === 'en' ? ['en', 'pt_BR'] : ['pt_BR', 'en'];

  const data = (await fetchHygraph(GET_PORTFOLIO_DATA, {
    locales,
  })) as PortfolioDataResponse | undefined;

  return {
    projects: data?.projects ?? [],
    about: data?.about,
    experiences: data?.experiences ?? [],
  };
}
