export interface CustomMadeGown {
  id: string;
  title: string;
  gownFor: string;
  location: string;
  clientName?: string;
  description: string;
  preOrderPrice: number;
  pixiePreOrderPrice?: number;
  hoodPreOrderPrice?: number;
  flowyPreOrderPrice?: number;
  longGownPicture: string[];
  pixiePicture: string[];
  hoodPicture: string[];
  flowyPictures: string[];
}

export interface CustomMadeGownsResponse {
  items: CustomMadeGown[];
  total: number;
}
