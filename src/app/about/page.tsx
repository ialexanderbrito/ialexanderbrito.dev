import { FocusMoments } from '@/components/focus-moments';
import { GithubCalendar } from '@/components/github-calendar';
import Location from '@/components/location';
import Spotify from '@/components/spotify';
import SpotlightCard from '@/components/ui/spotlight-card';
import { fetchHygraph } from '@/graphql/client';
import { GET_ABOUT, GET_EXPERIENCES, GET_MOMENTS } from '@/graphql/queries';
import { AboutResponse } from '@/interfaces/about';
import { ExperienceResponse } from '@/interfaces/experience';
import { MomentsResponse } from '@/interfaces/moments';
import { calcDuration } from '@/utils/date';
import { generateColSpanByIndex } from '@/utils/generateColSpanByIndex';
import dayjs from 'dayjs';
import type { Metadata } from 'next';
import 'dayjs/locale/pt-br';

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

dayjs.locale('pt-br');

const getExperiences = async (): Promise<ExperienceResponse> => fetchHygraph(GET_EXPERIENCES);
const getMoments = async (): Promise<MomentsResponse> => fetchHygraph(GET_MOMENTS);
const getAbout = async (): Promise<AboutResponse> => fetchHygraph(GET_ABOUT);

export const dynamic = 'force-dynamic';

export default async function Resume() {
  const { experiences } = await getExperiences();
  const { about } = await getAbout();
  const { moments } = await getMoments();

  return (
    <main className="max-w-(--breakpoint-lg) mx-auto px-4">
      <div className="flex flex-col md:flex-row align-center justify-between w-full gap-5 md:mt-8">
        <img
          src={about?.profilePicture?.url}
          alt="Foto de perfil"
          className="rounded-md w-[420px] h-auto object-cover"
          loading="lazy"
        />
        {about?.introduction?.html && (
          <>
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-bold mt-8 mb-4">Sobre mim</h1>
              <section
                className="mt-0 flex-col gap-4 flex text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: about.introduction.html }}
              />
              <div className="col-span-1">
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
                  <Spotify />
                  <Location />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold mt-8">Momentos</h3>

        <h2 className="text-muted-foreground">
          Momentos marcantes da minha vida pessoal, que me fizeram ser quem sou hoje.
        </h2>

        <FocusMoments moments={moments} />
      </div>

      <h3 className="text-2xl font-bold mt-8 mb-4">Carreira</h3>

      <section className="mt-8 flex-col gap-4 flex lg:grid lg:grid-cols-3">
        {experiences.map((experience, index) => {
          const templateFormat = 'MMM YYYY';

          const startedAt = dayjs(experience.startedAt).format(templateFormat);
          const finishedAt = experience.finishedAt ? dayjs(experience.finishedAt).format(templateFormat) : 'Atualmente';

          const duration = calcDuration(experience.startedAt, experience.finishedAt || new Date());

          return (
            <SpotlightCard
              className="flex flex-col justify-between p-8 border-none"
              spotlightColor={experience.companyColor?.hex}
              spotlightOpacity={0.15}
              key={experience.id}
              style={{
                gridColumn: generateColSpanByIndex(index),
              }}
            >
              <div className="flex">
                <figure
                  className="rounded-lg overflow-hidden relative w-16 h-16 flex items-center justify-center"
                  style={{ backgroundColor: experience.companyColor?.hex }}
                >
                  <img
                    src={experience.companyLogo?.url}
                    alt={experience.companyName}
                    className="w-[65px] h-[65px]"
                    loading="lazy"
                  />
                </figure>
              </div>

              <div className="mt-6 space-y-2">
                <h4 className="text-xs text-muted-foreground">
                  {experience.companyName}

                  <div className="mt-1 flex flex-col">
                    <span className="mt-1">
                      {startedAt} • {finishedAt} • {duration}
                    </span>
                    <span className="mt-1">
                      {experience.description} • {experience.typeJob}
                    </span>
                  </div>
                </h4>

                <h5 className="font-bold text-xl">{experience.role}</h5>
              </div>
            </SpotlightCard>
          );
        })}
      </section>

      <section className="mt-8 flex-col gap-4 flex">
        <h3 className="text-2xl font-bold">Contribuições</h3>

        <h2 className="text-muted-foreground mb-4">Contribuições feitas por mim no GitHub.</h2>
        <GithubCalendar />
      </section>
    </main>
  );
}
