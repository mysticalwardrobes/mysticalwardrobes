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
