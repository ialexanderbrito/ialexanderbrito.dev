export interface MomentsResponse {
  moments: Moment[];
}

export interface Moment {
  id: string;
  local: string;
  codigoDoPais: string;
  imagem: Imagem;
}

export interface Imagem {
  url: string;
}
