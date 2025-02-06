import RenderStacks from '@/components/render-stacks';
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

const getStacks = async (): Promise<StacksResponse> => fetchHygraph(GET_STACKS);

export default async function Technologies() {
  const { stacks } = await getStacks();

  return (
    <main className="max-w-(--breakpoint-lg) mx-auto px-4">
      <h1 className="text-4xl font-bold mt-8 mb-4">Tecnologias e Ferramentas</h1>

      <span className="flex-row gap-1 flex text-muted-foreground">
        Explore as tecnologias e ferramentas que impulsionam a minha experiência em desenvolvimento. Eu seleciono e uso
        meticulosamente essas ferramentas para criar soluções robustas e eficientes, priorizando sempre a experiência do
        usuário.
      </span>

      <h3 className="text-2xl font-bold mt-8 mb-4">Frontend</h3>
      <RenderStacks stacks={stacks} category="frontend" />

      <h3 className="text-2xl font-bold mt-8 mb-4">Design</h3>
      <RenderStacks stacks={stacks} category="design" />

      <h3 className="text-2xl font-bold mt-8 mb-4">Backend</h3>
      <RenderStacks stacks={stacks} category="backend" />

      <h3 className="text-2xl font-bold mt-8 mb-4">Banco de Dados</h3>
      <RenderStacks stacks={stacks} category="bancoDeDados" />

      <h3 className="text-2xl font-bold mt-8 mb-4">Infraestrutura</h3>
      <RenderStacks stacks={stacks} category="infraestrutura" />

      <h3 className="text-2xl font-bold mt-8 mb-4">Observabilidade e analytics</h3>
      <RenderStacks stacks={stacks} category="observabilidadeEAnalytics" />

      <h3 className="text-2xl font-bold mt-8 mb-4">Controle de versões</h3>
      <RenderStacks stacks={stacks} category="controleDeVersao" />

      <h3 className="text-2xl font-bold mt-8 mb-4">Extensões, plugins e temas</h3>
      <RenderStacks stacks={stacks} category="extensoesPluginsETemas" />

      <h3 className="text-2xl font-bold mt-8 mb-4">Aplicativos</h3>
      <RenderStacks stacks={stacks} category="aplicativos" />
    </main>
  );
}
