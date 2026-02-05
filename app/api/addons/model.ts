import { PortableTextBlock } from '@sanity/types';

// Addon for listing (excludes description for list endpoint)
export interface AddOn {
  id: string;
  name: string;
  type: string;
  metroManilaRate: number;
  luzonRate: number;
  outsideLuzonRate: number;
  forSaleRate: number | null;
  pictures: string[];
}

// Full addon detail with description (for /api/addons/[id])
export interface AddOnDetail extends AddOn {
  description: PortableTextBlock[] | null; // Portable Text from Sanity
}
