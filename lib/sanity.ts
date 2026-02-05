import { createClient } from '@sanity/client';
import { PortableTextBlock } from '@sanity/types';

/**
 * Helper function to extract plain text from Portable Text blocks
 * @param blocks - Array of Portable Text blocks
 * @returns Plain text string extracted from blocks
 */
export function extractTextFromPortableText(blocks: PortableTextBlock[] | null | undefined): string {
  if (!blocks || !Array.isArray(blocks)) {
    return '';
  }
  
  return blocks
    .filter((block): block is PortableTextBlock & { children?: Array<{ text?: string }> } => 
      block._type === 'block' && 'children' in block
    )
    .flatMap(block => block.children?.map((child: { text?: string }) => child.text) || [])
    .filter(Boolean)
    .join(' ')
    .trim();
}

/**
 * Sanity client configuration
 * Used for fetching content from Sanity CMS
 */
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'yz23zros',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.SANITY_API_VERSION || '2024-01-01',
  useCdn: true, // Use CDN for faster responses in production
  token: process.env.SANITY_API_READ_TOKEN, // Optional: for private datasets
});

/**
 * GROQ Queries for AddOns
 */
export const ADDONS_LIST_QUERY = `*[_type == "addOns"] {
  "id": _id,
  name,
  type,
  metroManilaRate,
  luzonRate,
  outsideLuzonRate,
  forSaleRate,
  "pictures": pictures[].asset->url
}`;

export const ADDON_DETAIL_QUERY = `*[_type == "addOns" && _id == $id][0] {
  "id": _id,
  name,
  description,
  type,
  metroManilaRate,
  luzonRate,
  outsideLuzonRate,
  forSaleRate,
  "pictures": pictures[].asset->url
}`;

/**
 * GROQ Queries for Gowns
 */

// Optimized query for list view - only fetches fields needed for collections page
// Used for filtering, sorting, and displaying gown cards
export const GOWNS_LIST_QUERY = `*[_type == "gown"] {
  "id": _id,
  name,
  collection,
  bestFor,
  tags,
  color,
  skirtStyle,
  metroManilaRate,
  pixieMetroManilaRate,
  "longGownPictures": longGownPicture[].asset->url,
  "filipinianaPictures": filipinianaPicture[].asset->url,
  "pixiePictures": pixiePicture[].asset->url,
  "trainPictures": trainPicture[].asset->url
}`;

export const GOWN_DETAIL_QUERY = `*[_type == "gown" && _id == $id][0] {
  "id": _id,
  name,
  collection,
  bestFor,
  tags,
  color,
  skirtStyle,
  metroManilaRate,
  luzonRate,
  outsideLuzonRate,
  pixieMetroManilaRate,
  pixieLuzonRate,
  pixieOutsideLuzonRate,
  forSaleRateLong,
  forSaleRatePixie,
  bust,
  bustAlt,
  waist,
  waistAlt,
  lenght,
  sleeves,
  "longGownPictures": longGownPicture[].asset->url,
  "longGownPicturesAlt": longGownPictureAlt[].asset->url,
  "filipinianaPictures": filipinianaPicture[].asset->url,
  "pixiePictures": pixiePicture[].asset->url,
  "trainPictures": trainPicture[].asset->url,
  "addOns": addOns[]._ref,
  "relatedGowns": relatedGowns[]._ref
}`;

/**
 * GROQ Queries for Reviews
 */
export const REVIEWS_LIST_QUERY = `*[_type == "reviews"] {
  "id": _id,
  clientName,
  comment,
  "thumbnailMediaUrl": media.asset->url,
  "otherMediaUrls": otherMedia[].asset->url,
  "gownId": gown._ref,
  "otherGownsIds": otherGowns[]._ref
}`;

export const REVIEWS_BY_GOWN_QUERY = `*[_type == "reviews" && (gown._ref == $gownId || $gownId in otherGowns[]._ref)] {
  "id": _id,
  clientName,
  comment,
  "thumbnailMediaUrl": media.asset->url,
  "otherMediaUrls": otherMedia[].asset->url,
  "gownId": gown._ref,
  "otherGownsIds": otherGowns[]._ref
}`;

/**
 * GROQ Queries for Prom Queens
 */
export const PROMQUEENS_LIST_QUERY = `*[_type == "promQueens"] {
  "id": _id,
  clientName,
  "pictureUrl": picture.asset->url,
  "gownId": gown._ref,
  "gownName": gown->name
}`;

/**
 * GROQ Queries for Custom Made Gowns
 */
export const CUSTOM_MADE_GOWNS_LIST_QUERY = `*[_type == "customMadeGowns"] {
  "id": _id,
  title,
  gownFor,
  location,
  clientName,
  description,
  preOrderPrice,
  pixiePreOrderPrice,
  hoodPreOrderPrice,
  flowyPreOrderPrice,
  "longGownPicture": longGownPicture[].asset->url,
  "pixiePicture": pixiePicture[].asset->url,
  "hoodPicture": hoodPicture[].asset->url,
  "flowyPictures": flowyPictures[].asset->url
}`;

export const CUSTOM_MADE_GOWN_DETAIL_QUERY = `*[_type == "customMadeGowns" && _id == $id][0] {
  "id": _id,
  title,
  gownFor,
  location,
  clientName,
  description,
  preOrderPrice,
  pixiePreOrderPrice,
  hoodPreOrderPrice,
  flowyPreOrderPrice,
  "longGownPicture": longGownPicture[].asset->url,
  "pixiePicture": pixiePicture[].asset->url,
  "hoodPicture": hoodPicture[].asset->url,
  "flowyPictures": flowyPictures[].asset->url
}`;
