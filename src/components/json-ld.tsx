import { siteConfig } from '@/config/site';

export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteConfig.url}/#person`,
        name: siteConfig.name,
        givenName: 'Alexander',
        alternateName: ['ialexanderbrito'],
        url: siteConfig.url,
        image: `${siteConfig.url}/about.jpeg`,
        jobTitle: 'Senior Software Engineer',
        description: siteConfig.description,
        email: siteConfig.email,
        sameAs: [
          siteConfig.links.github,
          siteConfig.links.linkedin,
          siteConfig.links.twitter,
          'https://twitter.com/ialexanderbrito',
        ],
        knowsAbout: [
          'React',
          'Next.js',
          'React Native',
          'Expo',
          'TypeScript',
          'JavaScript',
          'Tailwind CSS',
          'Design Systems',
          'Design Engineering',
          'Artificial Intelligence',
          'AI Agents',
          'LLM Integration',
          'GraphQL',
          'Node.js',
          'Web Performance',
          'Core Web Vitals',
          'Frontend Architecture',
          'Mobile Development',
        ],
        knowsLanguage: ['pt-BR', 'en'],
        nationality: {
          '@type': 'Country',
          name: 'Brazil',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        alternateName: ['Alexander • Portfolio', 'ialexanderbrito.dev'],
        description: siteConfig.description,
        publisher: {
          '@id': `${siteConfig.url}/#person`,
        },
        inLanguage: ['pt-BR', 'en'],
      },
      {
        '@type': 'ProfilePage',
        '@id': `${siteConfig.url}/#profilepage`,
        url: siteConfig.url,
        name: siteConfig.title,
        isPartOf: {
          '@id': `${siteConfig.url}/#website`,
        },
        about: {
          '@id': `${siteConfig.url}/#person`,
        },
        mainEntity: {
          '@id': `${siteConfig.url}/#person`,
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteConfig.url}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Quem é Alexander?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Alexander é um Engenheiro de Software Sênior e Especialista em Frontend, Mobile e IA com mais de 7 anos de experiência, focado na criação de aplicações web e mobile de alto desempenho com React, Next.js, React Native e TypeScript.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quais são as principais tecnologias e competências de Alexander?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Especialista em React, Next.js (App Router), React Native, Expo, TypeScript, Tailwind CSS, GraphQL, arquitetura de Design Systems, otimização de Web Vitals e integração de fluxos e APIs com modelos de Inteligência Artificial.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quais tipos de projetos Alexander desenvolve?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Aplicações SaaS de alta escala, produtos digitais, aplicativos móveis para iOS e Android, ferramentas de desenvolvimento e iniciativas em código aberto com foco em usabilidade e performance.',
            },
          },
          {
            '@type': 'Question',
            name: 'Como entrar em contato com Alexander?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Você pode entrar em contato através do e-mail eu@ialexanderbrito.dev ou por suas redes profissionais no GitHub (https://github.com/ialexanderbrito) e LinkedIn (https://linkedin.com/in/ialexanderbrito).',
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
