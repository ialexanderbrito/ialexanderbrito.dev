export interface StacksResponse {
  stacks: Stack[];
}

export interface Stack {
  id: string;
  name: string;
  urlSite: string;
  icon: Icon;
  category: string;
  order: number;
  invert: boolean;
}

export interface Icon {
  url: string;
}
