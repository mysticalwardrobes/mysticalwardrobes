import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/app/api/config';
import { AddOn } from '../model';

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
    .filter((url): url is string => typeof url === 'string');

  return urls;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Fetch specific add-on from Contentful by ID
    const response = await client.getEntry(id);

    // Transform Contentful entry to our AddOn interface
    const fields = isRecord(response.fields) ? (response.fields as Record<string, unknown>) : {};

    const name = ensureString(fields.name) ?? 'Untitled Add-On';
    const description = ensureString(fields.description) ?? '';
    const type = ensureString(fields.type) ?? 'accessory';
    const metroManilaRate = ensureNumber(fields.metroManilaRate) ?? 0;
    const luzonRate = ensureNumber(fields.luzonRate) ?? 0;
    const outsideLuzonRate = ensureNumber(fields.outsideLuzonRate) ?? 0;
    const forSale = ensureNumber(fields.forSale);
    const pictures = normalizeAssetUrls(fields.pictures);

    const addOn: AddOn = {
      id: String(response.sys.id),
      name,
      description,
      type,
      metroManilaRate,
      luzonRate,
      outsideLuzonRate,
      forSale,
      pictures,
    };

    return NextResponse.json(addOn);
  } catch (error) {
    console.error('Error fetching add-on from Contentful:', error);
    
    // Check if it's a 404 error (entry not found)
    if (error instanceof Error && error.message.includes('404')) {
      return NextResponse.json(
        { error: 'Add-on not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch add-on' },
      { status: 500 }
    );
  }
}
