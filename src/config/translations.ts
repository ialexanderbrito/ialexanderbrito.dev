export type Locale = 'pt_BR' | 'en';

export const translations = {
  pt_BR: {
    nav: {
      home: 'Início',
      about: 'Sobre',
      projects: 'Projetos',
      toggleTheme: 'Alternar tema',
      toggleLang: 'Mudar para Inglês',
    },
    home: {
      title: 'Alexander',
      subtitle:
        'Especialista em Frontend, Mobile e soluções integradas com Inteligência Artificial.',
      bio1: 'Com mais de 7 anos de experiência em engenharia de software, construo aplicações web de alta performance e experiências mobile escaláveis, integrando fluxos e modelos de IA para criar produtos modernos e eficientes.',
      bio2Prefix: 'Domínio aprofundado no ecossistema ',
      bio2Middle: 'React',
      bio2Next: 'Next.js',
      bio2Mobile: 'React Native / Expo',
      bio2Ts: 'TypeScript',
      bio2Suffix:
        ' e na integração de agentes, APIs de IA e automações inteligentes.',
      ctaProjects: 'Explorar projetos',
      ctaAbout: 'Sobre minha trajetória',
    },
    about: {
      greeting: 'Opa, sou Alexander',
      subtitle: 'Especialista em Frontend, Mobile & IA',
      defaultBio: 'Desenvolvedor Front-end Sênior Web e Mobile.',
      trajectoryTitle: 'Trajetória Profissional',
      trajectorySubtitle: 'Histórico de atuações e cargos',
      present: 'Presente',
    },
    projects: {
      searchPlaceholder: 'Buscar projeto por nome ou tecnologia...',
      saasTitle: 'SaaS',
      saasSubtitle: 'Produtos digitais e aplicações de alta escala',
      otherTitle: 'Outros projetos',
      otherSubtitle: 'Experimentos, bibliotecas e projetos selecionados',
      emptyTitle: 'Nenhum projeto encontrado',
      emptyDescription:
        'Nenhum projeto corresponde ao termo de busca informado.',
      clearSearch: 'Limpar busca',
      inProduction: 'Em produção',
      personal: 'Pessoal',
      viewProject: 'Acessar projeto',
      viewRepo: 'Ver repositório',
      closeDetails: 'Fechar detalhes',
      viewDetails: 'Ver detalhes',
      techStack: 'Stack técnica',
      year: 'Ano',
    },
    footer: {
      builtBy: 'Projetado e desenvolvido por',
      role: 'Especialista Frontend, Mobile & IA',
      workstation: 'Workstation pessoal',
      rights: 'Todos os direitos reservados.',
    },
    easterEgg: {
      greeting: 'Olá, time da',
      description:
        'Que prazer ter vocês por aqui! Fiquem à vontade para explorar os detalhes da minha workstation e projetos.',
      cta: 'Entendido, vamos explorar',
    },
    notFound: {
      code: '404 · Rota não encontrada',
      title: 'Página não encontrada',
      description:
        'O endereço acessado não existe, foi movido ou está temporariamente indisponível.',
      backHome: 'Voltar ao início',
      exploreProjects: 'Ver projetos',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      toggleTheme: 'Toggle theme',
      toggleLang: 'Switch to Portuguese',
    },
    home: {
      title: 'Alexander',
      subtitle:
        'Specialist in Frontend, Mobile, and solutions integrated with Artificial Intelligence.',
      bio1: 'With over 7 years of software engineering experience, I build high-performance web applications and scalable mobile experiences, integrating AI workflows and models to craft modern, efficient products.',
      bio2Prefix: 'Deep expertise across the ',
      bio2Middle: 'React',
      bio2Next: 'Next.js',
      bio2Mobile: 'React Native / Expo',
      bio2Ts: 'TypeScript',
      bio2Suffix:
        ' ecosystem, as well as integrating autonomous agents, AI APIs, and intelligent automations.',
      ctaProjects: 'Explore projects',
      ctaAbout: 'About my journey',
    },
    about: {
      greeting: "Hey, I'm Alexander",
      subtitle: 'Frontend, Mobile & AI Specialist',
      defaultBio: 'Senior Web & Mobile Front-end Developer.',
      trajectoryTitle: 'Career History',
      trajectorySubtitle: 'Roles and company experience',
      present: 'Present',
    },
    projects: {
      searchPlaceholder: 'Search projects by name or technology...',
      saasTitle: 'SaaS',
      saasSubtitle: 'Digital products and high-scale applications',
      otherTitle: 'Other projects',
      otherSubtitle: 'Experiments, libraries, and selected projects',
      emptyTitle: 'No projects found',
      emptyDescription: 'No projects matched the search criteria.',
      clearSearch: 'Clear search',
      inProduction: 'In production',
      personal: 'Personal',
      viewProject: 'Visit project',
      viewRepo: 'View repository',
      closeDetails: 'Close details',
      viewDetails: 'View details',
      techStack: 'Tech stack',
      year: 'Year',
    },
    footer: {
      builtBy: 'Designed and built by',
      role: 'Frontend, Mobile & AI Specialist',
      workstation: 'Personal workstation',
      rights: 'All rights reserved.',
    },
    easterEgg: {
      greeting: 'Hello, team at',
      description:
        "It's great to have you here! Feel free to explore my workstation and project portfolio.",
      cta: "Got it, let's explore",
    },
    notFound: {
      code: '404 · Route not found',
      title: 'Page not found',
      description:
        'The requested URL does not exist, was moved, or is temporarily unavailable.',
      backHome: 'Back to home',
      exploreProjects: 'View projects',
    },
  },
} as const;

export type TranslationKey = typeof translations.pt_BR;

export function formatJobType(
  typeJob: string | undefined | null,
  locale: Locale,
): string {
  if (!typeJob) return '';
  if (locale !== 'en') return typeJob;

  const normalized = typeJob.trim().toLowerCase();
  if (normalized.includes('remoto')) return 'Remote';
  if (normalized.includes('hibrid') || normalized.includes('híbrid'))
    return 'Hybrid';
  if (normalized.includes('presencial')) return 'On-site';

  return typeJob;
}
