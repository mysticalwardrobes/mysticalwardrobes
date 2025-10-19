import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/app/api/config';
import { PromQueen, PromQueensResponse } from './model';

// Helper functions for Contentful data extraction
const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

const ensureString = (value: unknown): string | null => {
  return typeof value === 'string' && value.trim().length > 0 ? value : null;
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

const extractGownInfo = (value: unknown): { id: string | null; name: string | null } => {
  if (!isRecord(value) || !('sys' in value) || !('fields' in value)) {
    return { id: null, name: null };
  }

  const sys = (value as { sys?: unknown }).sys;
  const fields = (value as { fields?: unknown }).fields;

  if (!isRecord(sys) || !('id' in sys)) {
    return { id: null, name: null };
  }

  if (!isRecord(fields) || !('name' in fields)) {
    return { id: null, name: null };
  }

  const id = ensureString((sys as { id?: unknown }).id);
  const name = ensureString((fields as { name?: unknown }).name);

  return { id, name };
};

// Fisher-Yates shuffle algorithm for random ordering
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');

    // Fetch prom queens from Contentful
    const response = await client.getEntries({
      content_type: 'promQueens',
      include: 2, // Include linked entries (gowns) and assets (pictures)
    });

    // Transform Contentful entries to our PromQueen interface
    const promQueens: PromQueen[] = response.items
      .map((item) => {
        const fields = isRecord(item.fields) ? (item.fields as Record<string, unknown>) : {};

        const clientName = ensureString(fields.clientName);
        const picture = fields.picture;
        const gown = fields.gown;

        const pictureUrl = extractAssetUrl(picture);
        const gownInfo = extractGownInfo(gown);

        // Only include entries that have a picture
        if (!pictureUrl) {
          return null;
        }

        return {
          id: String(item.sys.id),
          clientName,
          pictureUrl: 'https:' + pictureUrl,
          gownId: gownInfo.id,
          gownName: gownInfo.name,
        };
      })
      .filter((item): item is PromQueen => item !== null);

    // Shuffle the array for random ordering
    const shuffledPromQueens = shuffleArray(promQueens);

    // Apply limit if specified
    const limitedPromQueens = limit > 0 ? shuffledPromQueens.slice(0, limit) : shuffledPromQueens;

    const responseData: PromQueensResponse = {
      items: limitedPromQueens,
      total: promQueens.length,
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error fetching prom queens from Contentful:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prom queens' },
      { status: 500 }
    );
  }
}
