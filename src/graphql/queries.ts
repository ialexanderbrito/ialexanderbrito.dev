export const GET_PROJECTS = `
query getProjects {
  projects(first: 100, orderBy: order_DESC) {
    id
    order
    name
    description
    urlProject
    urlRepo
    category
    thumbnail {
      id
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
query getExperiences {
  experiences(orderBy: finishedAt_DESC) {
    id
    companyColor {
      hex
    }
    companyName
    typeJob
    role
    description
    startedAt
    finishedAt
    companyLogo {
      url
    }
  }
}
`;

export const GET_ABOUT = `
query getAbout {
  about(where: {id: "clvmwke3c098907kgbf6stv1t"}) {
    slug
    introduction {
      html
    }
    profilePicture {
      url
    }
  }
}
`;

export const GET_SOCIALS = `
query getSocial {
  socials(first: 50, orderBy: order_ASC) {
    id
    name
    url
    order
    logoSvg
    target
  }
}
`;

export const GET_STACKS = `
query getStacks {
  stacks(first: 100, orderBy: name_ASC) {
    id
    name
    urlSite
    invert
    icon {
      url
    }
    category
  }
}
`;

export const GET_MOMENTS = `
query getMoment {
  moments {
    local,
    codigoDoPais,
    imagem {
      url
    }
  }
}
`;
