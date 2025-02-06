import { FilterProjects } from '@/components/filter-projects';
import RenderProjects from '@/components/render-projects';
import { fetchHygraph } from '@/graphql/client';
import { GET_PROJECTS } from '@/graphql/queries';
import { ProjectsResponse } from '@/interfaces/project';
import type { Metadata } from 'next';
import Link from 'next/link';

const thumbnail = {
  url: 'https://ialexanderbrito.dev/projects.jpeg',
  width: 1200,
  height: 630,
  alt: 'Projects',
};

const defaultMetadata = {
  title: 'Projetos',
  description:
    'Uma lista de projetos que desenvolvi ao longo da minha carreira, separados por categorias e tecnologias utilizadas!',
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
    siteName: 'Projetos',
  },
};

const getProjects = async (): Promise<ProjectsResponse> => fetchHygraph(GET_PROJECTS);

export default async function Projects() {
  const { projects } = await getProjects();

  return (
    <main className="max-w-(--breakpoint-lg) mx-auto px-4">
      <h1 className="text-4xl font-bold mt-8 mb-4">Projetos</h1>

      <div className="flex flex-row items-center text-muted-foreground">
        <span>
          Essa página lista os {projects.length} projetos que desenvolvi ao longo da minha carreira. Confira outros
          projetos no meu{' '}
          <Link href="https://github.com/ialexanderbrito?tab=repositories" target="_blank" className="underline">
            {' '}
            Github
          </Link>
        </span>
      </div>

      <FilterProjects category={projects.map((project) => project.category)} />

      <section id="recent">
        <h3 className="text-2xl font-bold mt-8 mb-4">Projeto mais recente</h3>
        <RenderProjects projects={projects} recent />
      </section>

      <section id="uollet">
        <h3 className="text-2xl font-bold mt-8 mb-4">uollet</h3>
        <RenderProjects projects={projects} category="uollet" />
      </section>

      <section id="Pessoal">
        <h3 className="text-2xl font-bold mt-8 mb-4">Pessoais</h3>
        <RenderProjects projects={projects} category="Pessoal" />
      </section>

      <section id="Rocketseat">
        <h3 className="text-2xl font-bold mt-8 mb-4">Rocketseat</h3>
        <RenderProjects projects={projects} category="Rocketseat" />
      </section>

      <section id="Celular">
        <h3 className="text-2xl font-bold mt-8 mb-4">Mobile</h3>
        <RenderProjects projects={projects} category="Celular" />
      </section>

      <section id="IK">
        <h3 className="text-2xl font-bold mt-8 mb-4">IK</h3>
        <RenderProjects projects={projects} category="IK" />
      </section>
    </main>
  );
}
