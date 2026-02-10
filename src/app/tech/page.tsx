import { StackSection } from '@/components/stack-section';
import { fetchHygraph } from '@/graphql/client';
import { GET_STACKS } from '@/graphql/queries';
import { StacksResponse } from '@/interfaces/stack';
import type { Metadata } from 'next';

const thumbnail = {
  url: 'https://ialexanderbrito.dev/techs.jpeg',
  width: 1200,
  height: 630,
  alt: 'Technologies and Tools',
};

const defaultMetadata = {
  title: 'Tecnologia e Ferramentas',
  description:
    'Uma lista de tecnologias e ferramentas que impulsionam a minha experiência em desenvolvimento. Eu seleciono e uso meticulosamente essas ferramentas para criar soluções robustas e eficientes, priorizando sempre a experiência do usuário.',
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
    siteName: 'Tecnologia e Ferramentas',
  },
};

const categories = [
  { id: 'frontend', title: 'Frontend', defaultOpen: true },
  { id: 'design', title: 'Design', defaultOpen: false },
  { id: 'backend', title: 'Backend', defaultOpen: false },
  { id: 'bancoDeDados', title: 'Banco de Dados', defaultOpen: false },
  { id: 'infraestrutura', title: 'Infraestrutura', defaultOpen: false },
  {
    id: 'observabilidadeEAnalytics',
    title: 'Observabilidade e Analytics',
    defaultOpen: false,
  },
  { id: 'controleDeVersao', title: 'Controle de Versões', defaultOpen: false },
  {
    id: 'extensoesPluginsETemas',
    title: 'Extensões, Plugins e Temas',
    defaultOpen: false,
  },
  { id: 'aplicativos', title: 'Aplicativos', defaultOpen: false },
];

const getStacks = async (): Promise<StacksResponse> => fetchHygraph(GET_STACKS);

export default async function Technologies() {
  const { stacks } = await getStacks();

  return (
    <main className="max-w-(--breakpoint-lg) mx-auto px-4">
      {/* Hero Section */}
      <section className="flex flex-col justify-center py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold">
          Tecnologias e Ferramentas
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Explore as {stacks.length} tecnologias e ferramentas que impulsionam a
          minha experiência em desenvolvimento. Selecionadas com cuidado para
          criar soluções robustas e eficientes.
        </p>
      </section>

      {/* Stack Sections */}
      <section className="pb-12">
        {categories.map((cat) => (
          <StackSection
            key={cat.id}
            title={cat.title}
            stacks={stacks}
            category={cat.id}
            defaultOpen={cat.defaultOpen}
          />
        ))}
      </section>
    </main>
  );
}
