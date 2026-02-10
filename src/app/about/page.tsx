import { AnimatedStats } from '@/components/animated-stats';
import { CareerSection } from '@/components/career-section';
import { FocusMoments } from '@/components/focus-moments';
import { GithubCalendar } from '@/components/github-calendar';
import Location from '@/components/location';
import Spotify from '@/components/spotify';
import { fetchHygraph } from '@/graphql/client';
import { GET_ABOUT, GET_EXPERIENCES, GET_MOMENTS } from '@/graphql/queries';
import { AboutResponse } from '@/interfaces/about';
import { ExperienceResponse } from '@/interfaces/experience';
import { MomentsResponse } from '@/interfaces/moments';
import type { Metadata } from 'next';

const thumbnail = {
  url: 'https://ialexanderbrito.dev/about.jpeg',
  width: 1200,
  height: 630,
  alt: 'About',
};

const defaultMetadata = {
  title: 'Sobre',
  description:
    'Um breve currículo sobre minha vida profissional, como informações sobre mim e experiências profissionais!',
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
    siteName: 'Alexander • Sobre',
  },
};

const getExperiences = async (): Promise<ExperienceResponse> =>
  fetchHygraph(GET_EXPERIENCES);
const getMoments = async (): Promise<MomentsResponse> =>
  fetchHygraph(GET_MOMENTS);
const getAbout = async (): Promise<AboutResponse> => fetchHygraph(GET_ABOUT);

export const dynamic = 'force-dynamic';

export default async function Resume() {
  const { experiences } = await getExperiences();
  const { about } = await getAbout();
  const { moments } = await getMoments();

  const yearsOfExperience = Math.floor(
    (new Date().getTime() - new Date('2019-01-01').getTime()) /
      (1000 * 60 * 60 * 24 * 365),
  );

  return (
    <main className="max-w-(--breakpoint-lg) mx-auto px-4">
      {/* Hero Section */}
      <section className="py-12 md:py-16">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Profile Image + Widgets */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative">
              <div className="aspect-4/5 rounded-2xl overflow-hidden border border-border/50 bg-muted/20">
                <img
                  src={about?.profilePicture?.url}
                  alt="Alexander"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              {/* Floating badge */}
              {/* <div className="absolute -bottom-4 -right-4 md:bottom-4 md:right-4 bg-background/95 backdrop-blur-sm border border-border/50 rounded-xl p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                  </span>
                  <span className="text-sm font-medium">
                    Disponível para projetos
                  </span>
                </div>
              </div> */}
            </div>

            {/* Live Status Widgets */}
            <div className="grid gap-4 mt-8">
              <Spotify />
              <Location />
            </div>
          </div>

          {/* Bio Content */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Olá, eu sou Alexander
              </h1>
              {about?.introduction?.html && (
                <div
                  className="text-lg text-muted-foreground leading-relaxed prose prose-neutral dark:prose-invert max-w-none [&_p]:mb-4 [&_p:last-child]:mb-0"
                  dangerouslySetInnerHTML={{ __html: about.introduction.html }}
                />
              )}
            </div>

            {/* Quick Stats */}
            <AnimatedStats yearsOfExperience={yearsOfExperience} />

            {/* Skills & CTA */}
            <div className="rounded-xl border border-border/50 bg-card/30 p-5">
              <h3 className="text-sm font-semibold mb-3">
                Principais tecnologias
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  'React',
                  'Next.js',
                  'TypeScript',
                  'React Native',
                  'Node.js',
                  'Tailwind CSS',
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full bg-muted/50 text-xs font-medium text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 pt-3 border-t border-border/50">
                <a
                  href="/projects"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Ver projetos
                </a>
                <a
                  href="/contact"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium hover:bg-muted/50 transition-colors"
                >
                  Entrar em contato
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CareerSection experiences={experiences} />

      {/* Moments Section */}
      <section className="py-12 border-t border-border/50">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-bold">Momentos</h2>
          <span className="h-px flex-1 bg-border/50" />
        </div>
        <p className="text-muted-foreground mb-8">
          Momentos marcantes da minha vida pessoal, que me fizeram ser quem sou
          hoje
        </p>
        <FocusMoments moments={moments} />
      </section>

      {/* GitHub Contributions Section */}
      <section className="py-12 border-t border-border/50">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-bold">Contribuições</h2>
          <span className="h-px flex-1 bg-border/50" />
        </div>
        <p className="text-muted-foreground mb-8">
          Minha atividade no GitHub ao longo do ano
        </p>
        <div className="rounded-2xl border border-border/50 bg-card/30 p-6 overflow-hidden">
          <GithubCalendar />
        </div>
      </section>
    </main>
  );
}
