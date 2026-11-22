export const GET_PORTFOLIO_DATA = `
query getPortfolioData($locales: [Locale!] = [pt_BR, en]) {
  projects(first: 100, orderBy: createdAt_DESC, locales: $locales) {
    id
    name
    description
    urlProject
    urlRepo
    category
    createdAt
    thumbnail {
      url
    }
    technologies {
      id
      name
      iconSvg
    }
  }
  experiences(orderBy: finishedAt_DESC, locales: $locales) {
    id
    companyName
    typeJob
    role
    description
    startedAt
    finishedAt
  }
  about(where: {id: "clvmwke3c098907kgbf6stv1t"}, locales: $locales) {
    introduction {
      html
    }
    profilePicture {
      url
    }
  }
}
`;

export const GET_PROJECTS = `
query getProjects($locales: [Locale!] = [pt_BR, en]) {
  projects(first: 100, orderBy: createdAt_DESC, locales: $locales) {
    id
    name
    description
    urlProject
    urlRepo
    category
    createdAt
    thumbnail {
      url
    }
    technologies {
      id
      name
      iconSvg
    }
  }
}
`;

export const GET_EXPERIENCES = `
query getExperiences($locales: [Locale!] = [pt_BR, en]) {
  experiences(orderBy: finishedAt_DESC, locales: $locales) {
    id
    companyName
    typeJob
    role
    description
    startedAt
    finishedAt
  }
}
`;

export const GET_ABOUT = `
query getAbout($locales: [Locale!] = [pt_BR, en]) {
  about(where: {id: "clvmwke3c098907kgbf6stv1t"}, locales: $locales) {
    introduction {
      html
    }
    profilePicture {
      url
    }
  }
}
`;
