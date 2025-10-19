export interface PromQueen {
  id: string;
  clientName: string | null;
  pictureUrl: string | null;
  gownId: string | null;
  gownName: string | null;
}

export interface PromQueensResponse {
  items: PromQueen[];
  total: number;
}
