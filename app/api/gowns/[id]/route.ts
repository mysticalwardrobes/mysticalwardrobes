import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/app/api/config';
import { Gown } from '../model';

// Helper functions for Contentful data extraction
const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

const ensureString = (value: unknown): string | null => {
  return typeof value === 'string' && value.trim().length > 0 ? value : null;
};

const ensureNumber = (value: unknown): number | null => {
  return typeof value === 'number' && !isNaN(value) ? value : null;
};

// Accepts either an array of strings or an array of linked entries and
// returns an array of strings using the linked entry's `fields.name` when present
const extractStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];

  const result: string[] = [];
  for (const item of value) {
    const asString = ensureString(item);
    if (asString) {
      result.push(asString);
      continue;
    }

    if (isRecord(item)) {
      // Contentful SDK resolves links to entries when include > 0
      const fields = (item as { fields?: unknown }).fields;
      if (isRecord(fields) && 'name' in fields) {
        const name = ensureString((fields as Record<string, unknown>).name);
        if (name) result.push(name);
        continue;
      }
    }
  }
  return result;
};

// Accepts either an array of strings (ids) or an array of linked entries
// and returns an array of entry IDs
const extractIdArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];

  const ids: string[] = [];
  for (const item of value) {
    const asString = ensureString(item);
    if (asString) {
      ids.push(asString);
      continue;
    }

    if (isRecord(item) && 'sys' in item) {
      const sys = (item as { sys?: unknown }).sys;
      if (isRecord(sys) && 'id' in sys) {
        const id = ensureString((sys as Record<string, unknown>).id);
        if (id) ids.push(id);
        continue;
      }
    }
  }
  return ids;
};

const extractAssetUrl = (value: unknown): string | null => {
  if (!isRecord(value) || !('fields' in value)) {
    return null;
  }

  const fields = (value as { fields?: unknown }).fields;
  if (!isRecord(fields) || !('file' in fields)) {
    return null;
  }

  const file = (fields as { file?: unknown }).file;
  if (!isRecord(file) || !('url' in file)) {
    return null;
  }

  return ensureString((file as { url?: unknown }).url);
};

const normalizeAssetUrls = (value: unknown): string[] => {
  const collect = Array.isArray(value) ? value : value != null ? [value] : [];

  const urls = collect
    .map((item) => extractAssetUrl(item))
    .filter((url): url is string => 
      typeof url === 'string' && 
      url !== 'null' && 
      url.trim() !== ''
    );

  return urls;
};

// Strict string-array extractor (for fields guaranteed to be Symbol[])
const ensureStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ensureString(item))
    .filter((v): v is string => v !== null);
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Fetch gown from Contentful by ID
    const response = await client.getEntry(id, {
      include: 10, // Include linked assets (images)
    });

    if (!response) {
      return NextResponse.json(
        { error: 'Gown not found' },
        { status: 404 }
      );
    }

    const fields = isRecord(response.fields) ? (response.fields as Record<string, unknown>) : {};

    const name = ensureString(fields.name) ?? 'Untitled Gown';
    const collection = ensureStringArray(fields.collection);
    const bestFor = ensureStringArray(fields.bestFor);
    const tags = ensureStringArray(fields.tags);
    const color = ensureStringArray(fields.color);
    const skirtStyle = ensureStringArray(fields.skirtStyle);
    const metroManilaRate = ensureNumber(fields.metroManilaRate) ?? 0;
    const luzonRate = ensureNumber(fields.luzonRate) ?? 0;
    const outsideLuzonRate = ensureNumber(fields.outsideLuzonRate) ?? 0;
    const pixieMetroManilaRate = ensureNumber(fields.pixieMetroManilaRate) ?? 0;
    const pixieLuzonRate = ensureNumber(fields.pixieLuzonRate) ?? 0;
    const pixieOutsideLuzonRate = ensureNumber(fields.pixieOutsideLuzonRate) ?? 0;
    const forSaleRateLong = ensureNumber(fields.forSaleRateLong) ?? 0;
    const forSaleRatePixie = ensureNumber(fields.forSaleRatePixie) ?? 0;
    const bust = ensureString(fields.bust) ?? '';
    const waist = ensureString(fields.waist) ?? '';
    const arms = ensureString(fields.arms) ?? '';
    const backing = ensureString(fields.backing) ?? '';
    // Add-ons may be Symbols or Entry links; normalize to entry IDs
    const addOns = extractIdArray(fields.addOns);
    // Related gowns are typically Entry links; normalize to IDs
    const relatedGowns = extractIdArray(fields.relatedGowns);

    // Extract image URLs (handle arrays of images)
    const longGownPictures = normalizeAssetUrls(fields.longGownPicture);
    const filipinianaPictures = normalizeAssetUrls(fields.filipinianaPicture);
    const pixiePictures = normalizeAssetUrls(fields.pixiePicture);
    const trainPictures = normalizeAssetUrls(fields.trainPicture);

    const gown: Gown = {
      id: String(response.sys.id),
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
      waist,
      arms,
      backing,
      longGownPictures,
      filipinianaPictures,
      pixiePictures,
      trainPictures,
      addOns,
      relatedGowns,
    };

    return NextResponse.json(gown);
  } catch (error) {
    console.error('Error fetching gown from Contentful:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gown' },
      { status: 500 }
    );
  }
}
