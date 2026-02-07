import { PortableTextBlock } from '@sanity/types';

export interface Review {
  id: string;
  clientName: string;
  comment: PortableTextBlock[] | null; // Portable Text from Sanity (array of blocks)
  thumbnailMediaUrl: string | null;
  otherMediaUrls: string[] | null;
  gownId: string | null;
  otherGownsIds: string[] | null;
}
