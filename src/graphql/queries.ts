export const GET_PROJECTS = `
query getProjects {
  projects(first: 100) {
    id
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
  about(where: {slug: "about-me"}) {
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
  socials(orderBy: order_ASC) {
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
