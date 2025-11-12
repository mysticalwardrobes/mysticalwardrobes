export interface AddOn {
  id: string;
  name: string;
  description: string;
  type: string;
  metroManilaRate: number;
  luzonRate: number;
  outsideLuzonRate: number;
  forSaleRate: number | null;
  pictures: string[];
}
