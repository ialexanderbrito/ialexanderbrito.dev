export interface ExperienceResponse {
  experiences: Experience[];
}

export interface Experience {
  id: string;
  companyColor: CompanyColor;
  companyName: string;
  typeJob: string;
  role: string;
  description: string;
  startedAt: string;
  finishedAt?: string;
  companyLogo: CompanyLogo;
}

export interface CompanyLogo {
  url: string;
}

export interface CompanyColor {
  hex: string;
}
