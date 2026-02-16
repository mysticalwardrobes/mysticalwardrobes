import { PortableTextBlock } from '@sanity/types';

export interface CustomMadeGown {
  id: string;
  title: string;
  gownFor: string;
  location: string;
  clientName?: string;
  description: PortableTextBlock[] | null; // Portable Text from Sanity (array of blocks)
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
