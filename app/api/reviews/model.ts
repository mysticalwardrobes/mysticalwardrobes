
export interface Review {
  id: string;
  clientName: string;
  comment: string;
  thumbnailMediaUrl: string | null;
  otherMediaUrls: string[] | null;
  gownId: string | null;
  otherGownsIds: string[] | null;
}