export interface School {
  id: string;
  nome: string;
  uf: string;
  cidade: string;
  dependencia: "Publica" | "Privada";
  qtd_redacoes: number;
  media_geral: number;
  comp1: number;
  comp2: number;
  comp3: number;
  comp4: number;
  comp5: number;
  ranking: number;
  nse?: number;
  historico?: {
    ano: number;
    media_geral: number;
    comp1: number;
    comp2: number;
    comp3: number;
    comp4: number;
    comp5: number;
  }[];
}

export interface Averages {
  media_geral: number;
  comp1: number;
  comp2: number;
  comp3: number;
  comp4: number;
  comp5: number;
}

export interface FilterState {
  searchTerm: string;
  selectedUF: string;
  selectedCidade: string;
  minStudents: string;
  selectedSegment: string;
}
