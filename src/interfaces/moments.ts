export interface MomentsResponse {
  moments: Moment[];
}

export interface Moment {
  id: string;
  local: string;
  codigoDoPais: string;
  isPillTop?: boolean;
  imagem: Imagem;
}

export interface Imagem {
  url: string;
}
