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

const getProjects = async (): Promise<ProjectsResponse> =>
  fetchHygraph(GET_PROJECTS);

export default async function Projects() {
  const { projects } = await getProjects();

  return (
    <main className="max-w-(--breakpoint-lg) mx-auto px-4">
      {/* Hero Section */}
      <section className="flex flex-col justify-center py-12 md:py-16 border-b border-muted/20">
        <h1 className="text-4xl md:text-5xl font-bold">Projetos</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Explorando {projects.length} projetos desenvolvidos ao longo da minha
          carreira. Cada projeto reflete meu comprometimento com código limpo e
          interfaces intuitivas.
        </p>
        <div className="mt-2 flex items-center text-sm text-muted-foreground">
          <span>
            Confira outros projetos no meu{' '}
            <Link
              href="https://github.com/ialexanderbrito?tab=repositories"
              target="_blank"
              className="underline"
            >
              Github
            </Link>
          </span>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-semibold">Filtrar por categoria</h2>
          <FilterProjects
            category={projects.map((project) => project.category)}
          />
        </div>
      </section>

      {/* Showcase Section - Recent Project */}
      <section id="recent" className="py-8 border-t border-muted/20">
        <h3 className="text-2xl font-bold mb-6">Projeto em destaque</h3>
        <RenderProjects projects={projects} recent />
      </section>

      {/* Project Categories */}
      <section id="uollet" className="py-8 border-t border-muted/20">
        <h3 className="text-2xl font-bold mb-6">uollet</h3>
        <RenderProjects projects={projects} category="uollet" />
      </section>

      <section id="Pessoal" className="py-8 border-t border-muted/20">
        <h3 className="text-2xl font-bold mb-6">Pessoais</h3>
        <RenderProjects projects={projects} category="Pessoal" />
      </section>

      <section id="Rocketseat" className="py-8 border-t border-muted/20">
        <h3 className="text-2xl font-bold mb-6">Rocketseat</h3>
        <RenderProjects projects={projects} category="Rocketseat" />
      </section>

      <section id="Celular" className="py-8 border-t border-muted/20">
        <h3 className="text-2xl font-bold mb-6">Mobile</h3>
        <RenderProjects projects={projects} category="Celular" />
      </section>

      <section id="IK" className="py-8 border-t border-muted/20">
        <h3 className="text-2xl font-bold mb-6">IK</h3>
        <RenderProjects projects={projects} category="IK" />
      </section>
    </main>
  );
}
