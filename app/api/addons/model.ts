export interface AddOn {
  id: string;
  name: string;
  description: string;
  type: string;
  metroManilaRate: number;
  luzonRate: number;
  outsideLuzonRate: number;
  forSale: number | null;
  pictures: string[];
}
