import { FilterProjects } from '@/components/filter-projects';
import RenderProjects from '@/components/render-projects';
import { Accordion } from '@/components/ui/accordion';
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

  const pessoaisRecentes = projects.filter(
    (project) =>
      project.category === 'Pessoal' &&
      (new Date(project.createdAt).getFullYear() >= 2025 ||
        project.name === 'Beatriz & Alexander'),
  );
  const pessoaisAntigos = projects.filter(
    (project) =>
      project.category === 'Pessoal' &&
      new Date(project.createdAt).getFullYear() < 2025 &&
      project.name !== 'Beatriz & Alexander',
  );

  return (
    <main className="max-w-(--breakpoint-lg) mx-auto px-4">
      {/* Hero Section */}
      <section className="flex flex-col justify-center py-12 md:py-16">
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
              className="underline hover:text-foreground transition-colors"
            >
              Github
            </Link>
          </span>
        </div>

        <div className="mt-8">
          <FilterProjects
            category={projects.map((project) => project.category)}
          />
        </div>
      </section>

      {/* Project Categories */}
      <section id="uollet" className="py-10">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-bold">uollet</h2>
          <span className="h-px flex-1 bg-border/50" />
        </div>
        <p className="text-sm text-muted-foreground mb-8">
          Meu SaaS de finanças pessoais em constante evolução
        </p>
        <RenderProjects projects={projects} category="uollet" />
      </section>

      <section id="Pessoal" className="py-10">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-bold">Pessoais</h2>
          <span className="h-px flex-1 bg-border/50" />
        </div>
        <p className="text-sm text-muted-foreground mb-8">
          Projetos pessoais recentes que são mantidos e atualizados regularmente
        </p>
        <RenderProjects projects={pessoaisRecentes} category="Pessoal" />
      </section>

      {/* Legacy Projects - Compact View */}
      <section className="py-10">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-bold text-muted-foreground">Arquivo</h2>
          <span className="h-px flex-1 bg-border/30" />
        </div>
        <p className="text-sm text-muted-foreground mb-8">
          Projetos de estudo, aprendizado e pessoais antigos que não estão mais
          em manutenção
        </p>

        <div className="space-y-8">
          <Accordion
            title={
              <span className="flex items-center gap-2">
                Pessoais antigos
                <span className="px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground">
                  {pessoaisAntigos.length}
                </span>
              </span>
            }
            defaultOpen={true}
          >
            <RenderProjects
              projects={pessoaisAntigos}
              category="Pessoal"
              compact
            />
          </Accordion>
          <Accordion
            title={
              <span className="flex items-center gap-2">
                Rocketseat
                <span className="px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground">
                  {projects.filter((p) => p.category === 'Rocketseat').length}
                </span>
              </span>
            }
            defaultOpen={false}
          >
            <RenderProjects projects={projects} category="Rocketseat" compact />
          </Accordion>
          <Accordion
            title={
              <span className="flex items-center gap-2">
                Mobile
                <span className="px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground">
                  {projects.filter((p) => p.category === 'Celular').length}
                </span>
              </span>
            }
            defaultOpen={false}
          >
            <RenderProjects projects={projects} category="Celular" compact />
          </Accordion>
        </div>
      </section>

      <section id="IK" className="py-10">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-bold">IK Solution</h2>
          <span className="h-px flex-1 bg-border/50" />
        </div>
        <p className="text-sm text-muted-foreground mb-8">
          Projetos desenvolvidos profissionalmente
        </p>
        <RenderProjects projects={projects} category="IK" />
      </section>
    </main>
  );
}
