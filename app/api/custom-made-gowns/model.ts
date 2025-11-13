export interface CustomMadeGown {
  id: string;
  title: string;
  gownFor: string;
  location: string;
  clientName?: string;
  description: string;
  preOrderPrice: number;
  longGownPicture: string[];
  pixiePicture: string[];
  hoodPicture: string[];
}

export interface CustomMadeGownsResponse {
  items: CustomMadeGown[];
  total: number;
}
