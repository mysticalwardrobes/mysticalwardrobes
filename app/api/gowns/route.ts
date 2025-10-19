import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/app/api/config';
import { Gown } from './model';

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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const collection = searchParams.get('collection');
    const tags = searchParams.get('tags');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sortBy = searchParams.get('sortBy') || 'name';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '15');
    const search = searchParams.get('search');

    // Fetch gowns from Contentful
    const response = await client.getEntries({
      content_type: 'gown',
    });

    // Transform Contentful entries to our Gown interface
    let gowns: Gown[] = response.items.map((item) => {
      const fields = isRecord(item.fields) ? (item.fields as Record<string, unknown>) : {};

      const name = ensureString(fields.name) ?? 'Untitled Gown';
      const collection = ensureString(fields.collection) ?? 'Unknown Collection';
      const tags = ensureStringArray(fields.tags);
      const skirt = ensureString(fields.skirt) ?? '';
      const metroManilaRate = ensureNumber(fields.metroManilaRate) ?? 0;
      const luzonRate = ensureNumber(fields.luzonRate) ?? 0;
      const outsideLuzonRate = ensureNumber(fields.outsideLuzonRate) ?? 0;
      const pixieMetroManilaRate = ensureNumber(fields.pixieMetroManilaRate) ?? 0;
      const pixieLuzonRate = ensureNumber(fields.pixieLuzonRate) ?? 0;
      const pixieOutsideLuzonRate = ensureNumber(fields.pixieOutsideLuzonRate) ?? 0;
      const bust = ensureString(fields.bust) ?? '';
      const waist = ensureString(fields.waist) ?? '';
      const arms = ensureString(fields.arms) ?? '';
      const backing = ensureString(fields.backing) ?? '';
      const addOns = ensureStringArray(fields.addOns);
      const relatedGownIds = ensureStringArray(fields.relatedGownIds);

      // Extract image URLs
      const longGownPicture = extractAssetUrl(fields.longGownPicture) ?? '/assets/sample_gown-1.jpg';
      const filipinianaPicture = extractAssetUrl(fields.filipinianaPicture) ?? '/assets/sample_gown-1.jpg';
      const pixiePicture = extractAssetUrl(fields.pixiePicture) ?? '/assets/sample_gown-1.jpg';
      const trainPicture = extractAssetUrl(fields.trainPicture) ?? '/assets/sample_gown-1.jpg';

      return {
        id: String(item.sys.id),
        name,
        collection,
        tags,
        skirt,
        metroManilaRate,
        luzonRate,
        outsideLuzonRate,
        pixieMetroManilaRate,
        pixieLuzonRate,
        pixieOutsideLuzonRate,
        bust,
        waist,
        arms,
        backing,
        longGownPicture,
        filipinianaPicture,
        pixiePicture,
        trainPicture,
        addOns,
        relatedGownIds,
      };
    });

    // Filter by collection
    if (collection && collection !== 'all') {
      gowns = gowns.filter(gown => gown.collection.toLowerCase() === collection.toLowerCase());
    }

    // Filter by tags
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim().toLowerCase());
      gowns = gowns.filter(gown => 
        tagArray.some(tag => 
          gown.tags.some(gownTag => gownTag.toLowerCase().includes(tag))
        )
      );
    }

    // Filter by price range (using Metro Manila rate as default)
    if (minPrice || maxPrice) {
      const min = minPrice ? parseInt(minPrice) : 0;
      const max = maxPrice ? parseInt(maxPrice) : Infinity;
      
      gowns = gowns.filter(gown => {
        const price = gown.metroManilaRate;
        return price >= min && price <= max;
      });
    }

    // Search by name or collection
    if (search) {
      const searchLower = search.toLowerCase();
      gowns = gowns.filter(gown => 
        gown.name.toLowerCase().includes(searchLower) ||
        gown.collection.toLowerCase().includes(searchLower) ||
        gown.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-low-high':
        gowns.sort((a, b) => a.metroManilaRate - b.metroManilaRate);
        break;
      case 'price-high-low':
        gowns.sort((a, b) => b.metroManilaRate - a.metroManilaRate);
        break;
      case 'collection':
        gowns.sort((a, b) => a.collection.localeCompare(b.collection));
        break;
      case 'name':
      default:
        gowns.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    // Calculate pagination
    const totalItems = gowns.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedGowns = gowns.slice(startIndex, endIndex);

    return NextResponse.json({
      items: paginatedGowns,
      total: totalItems,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    });
  } catch (error) {
    console.error('Error fetching gowns from Contentful:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gowns' },
      { status: 500 }
    );
  }
}