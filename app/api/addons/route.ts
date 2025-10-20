import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/app/api/config';
import { AddOn } from './model';

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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sortBy = searchParams.get('sortBy') || 'name';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '15');

    // Fetch add-ons from Contentful
    const response = await client.getEntries({
      content_type: 'addOns', // Make sure this matches your Contentful content type
    });

    // Transform Contentful entries to our AddOn interface
    let addOns: AddOn[] = response.items.map((item) => {
      const fields = isRecord(item.fields) ? (item.fields as Record<string, unknown>) : {};

      const name = ensureString(fields.name) ?? 'Untitled Add-On';
      const description = ensureString(fields.description) ?? '';
      const type = ensureString(fields.type) ?? 'accessory';
      const metroManilaRate = ensureNumber(fields.metroManilaRate) ?? 0;
      const luzonRate = ensureNumber(fields.luzonRate) ?? 0;
      const outsideLuzonRate = ensureNumber(fields.outsideLuzonRate) ?? 0;
      const forSale = ensureNumber(fields.forSale);
      
      const pictures = normalizeAssetUrls(fields.pictures);

      return {
        id: String(item.sys.id),
        name,
        description,
        type,
        metroManilaRate,
        luzonRate,
        outsideLuzonRate,
        forSale,
        pictures,
      };
    });

    // Filter by type
    if (type && type !== 'all') {
      addOns = addOns.filter(addon => addon.type === type);
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      const min = minPrice ? parseInt(minPrice) : 0;
      const max = maxPrice ? parseInt(maxPrice) : Infinity;
      
      addOns = addOns.filter(addon => {
        const price = addon.metroManilaRate;
        return price >= min && price <= max;
      });
    }

    // Sort
    switch (sortBy) {
      case 'price-low-high':
        addOns.sort((a, b) => a.metroManilaRate - b.metroManilaRate);
        break;
      case 'price-high-low':
        addOns.sort((a, b) => b.metroManilaRate - a.metroManilaRate);
        break;
      case 'name':
      default:
        addOns.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    // Calculate pagination
    const totalItems = addOns.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedAddOns = addOns.slice(startIndex, endIndex);

    return NextResponse.json({
      items: paginatedAddOns,
      total: totalItems,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    });
  } catch (error) {
    console.error('Error fetching add-ons from Contentful:', error);
    return NextResponse.json(
      { error: 'Failed to fetch add-ons' },
      { status: 500 }
    );
  }
}
