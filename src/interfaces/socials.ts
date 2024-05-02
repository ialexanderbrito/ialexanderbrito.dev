export interface SocialsResponse {
  socials: Social[];
}

export interface Social {
  id: string;
  name: string;
  url: string;
  logoSvg: string;
  order: number;
}
