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

const ensureStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value
      .map(item => ensureString(item))
      .filter((item): item is string => item !== null);
  }
  return [];
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
    const addOns = ensureStringArray(fields.addOns);
    const relatedGowns = ensureStringArray(fields.relatedGowns);

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
