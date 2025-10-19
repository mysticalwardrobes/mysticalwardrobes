export interface Gown {
  id: string;
  name: string;
  collection: string;
  tags: string[];
  skirt: string;
  metroManilaRate: number;
  luzonRate: number;
  outsideLuzonRate: number;
  pixieMetroManilaRate: number;
  pixieLuzonRate: number;
  pixieOutsideLuzonRate: number;
  bust: string;
  waist: string;
  arms: string;
  backing: string;
  longGownPicture: string;
  filipinianaPicture: string;
  pixiePicture: string;
  trainPicture: string;
  addOns: string[];
  relatedGownIds: string[];
}
