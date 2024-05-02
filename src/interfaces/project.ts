export interface ProjectsResponse {
  projects: Project[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  urlProject: string;
  urlRepo: string;
  category: string;
  thumbnail: Thumbnail;
  technologies: Technology[];
}

export interface Technology {
  id: string;
  name: string;
  iconSvg: string;
}

export interface Thumbnail {
  id: string;
  url: string;
}
