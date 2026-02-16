// List view interface - optimized for collections page display
// Contains only fields needed for filtering, sorting, and card display
export interface GownListItem {
  id: string;
  name: string;
  collection: string[];
  bestFor: string[];
  tags: string[];
  color: string[];
  skirtStyle: string[];
  metroManilaRate: number;
  pixieMetroManilaRate: number;
  longGownPictures: string[];
  filipinianaPictures: string[];
  pixiePictures: string[];
  trainPictures: string[];
}

// Full detail interface - all fields for gown detail page
export interface Gown extends GownListItem {
  luzonRate: number;
  outsideLuzonRate: number;
  pixieLuzonRate: number;
  pixieOutsideLuzonRate: number;
  forSaleRateLong: number;
  forSaleRatePixie: number;
  bust: string;
  bustAlt: string;
  waist: string;
  waistAlt: string;
  lenght: string;
  sleeves: string;
  longGownPicturesAlt: string[];
  addOns: string[];
  relatedGowns: string[];
}
