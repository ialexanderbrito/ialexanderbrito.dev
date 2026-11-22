export interface ExperienceResponse {
  experiences: Experience[];
}

export interface Experience {
  id: string;
  companyName: string;
  typeJob: string;
  role: string;
  description: string;
  startedAt: string;
  finishedAt?: string;
  companyColor?: CompanyColor;
  companyLogo?: CompanyLogo;
}

export interface CompanyLogo {
  url: string;
}

export interface CompanyColor {
  hex: string;
}
