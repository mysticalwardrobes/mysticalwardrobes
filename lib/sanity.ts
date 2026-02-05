import { createClient } from '@sanity/client';

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
