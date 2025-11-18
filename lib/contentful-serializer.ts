/**
 * Serialization utilities for Contentful responses
 * Converts Contentful entries to flat, JSON-safe structures for Redis caching
 */

import { ContentfulEntriesResponse, ContentfulEntryResponse } from '@/app/api/cache-config';

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
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ensureString(item))
    .filter((v): v is string => v !== null);
};

// Extract IDs from linked entries or string arrays
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

// Extract asset URLs from Contentful asset objects
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
  return collect
    .map((item) => extractAssetUrl(item))
    .filter((url): url is string => typeof url === 'string' && url !== 'null' && url.trim() !== '');
};

/**
 * Serialized gown entry structure (JSON-safe, no circular references)
 */
export interface SerializedGownEntry {
  id: string;
  name: string;
  collection: string[];
  bestFor: string[];
  tags: string[];
  color: string[];
  skirtStyle: string[];
  metroManilaRate: number;
  luzonRate: number;
  outsideLuzonRate: number;
  pixieMetroManilaRate: number;
  pixieLuzonRate: number;
  pixieOutsideLuzonRate: number;
  forSaleRateLong: number;
  forSaleRatePixie: number;
  bust: string;
  waist: string;
  arms: string;
  backing: string;
  lenght: string;
  longGownPictures: string[];
  filipinianaPictures: string[];
  pixiePictures: string[];
  trainPictures: string[];
  addOns: string[];
  relatedGownIds: string[];
}

/**
 * Serialize a Contentful entries response to a flat structure
 */
export function serializeGownsResponse(
  response: ContentfulEntriesResponse
): SerializedGownEntry[] {
  return response.items.map((item) => {
    const fields = isRecord(item.fields) ? (item.fields as Record<string, unknown>) : {};

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
    const lenght = ensureString(fields.lenght) ?? '';
    const addOns = extractIdArray(fields.addOns);
    const relatedGownIds = extractIdArray(fields.relatedGowns);

    const longGownPictures = normalizeAssetUrls(fields.longGownPicture);
    const filipinianaPictures = normalizeAssetUrls(fields.filipinianaPicture);
    const pixiePictures = normalizeAssetUrls(fields.pixiePicture);
    const trainPictures = normalizeAssetUrls(fields.trainPicture);

    return {
      id: String(item.sys.id),
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
      lenght,
      longGownPictures,
      filipinianaPictures,
      pixiePictures,
      trainPictures,
      addOns,
      relatedGownIds,
    };
  });
}

/**
 * Deserialize a flat structure back to a Contentful-like entries response
 * This reconstructs the structure needed by the transformation logic
 */
export function deserializeGownsResponse(
  serialized: SerializedGownEntry[]
): ContentfulEntriesResponse {
  return {
    items: serialized.map((entry) => ({
      sys: {
        id: entry.id,
        type: 'Entry',
        createdAt: '',
        updatedAt: '',
        revision: 0,
        contentType: {
          sys: {
            type: 'Link',
            linkType: 'ContentType',
            id: 'gown',
          },
        },
        metadata: {
          tags: [],
        },
      },
      fields: {
        name: entry.name,
        collection: entry.collection,
        bestFor: entry.bestFor,
        tags: entry.tags,
        color: entry.color,
        skirtStyle: entry.skirtStyle,
        metroManilaRate: entry.metroManilaRate,
        luzonRate: entry.luzonRate,
        outsideLuzonRate: entry.outsideLuzonRate,
        pixieMetroManilaRate: entry.pixieMetroManilaRate,
        pixieLuzonRate: entry.pixieLuzonRate,
        pixieOutsideLuzonRate: entry.pixieOutsideLuzonRate,
        forSaleRateLong: entry.forSaleRateLong,
        forSaleRatePixie: entry.forSaleRatePixie,
        bust: entry.bust,
        waist: entry.waist,
        arms: entry.arms,
        backing: entry.backing,
        lenght: entry.lenght,
        longGownPicture: entry.longGownPictures.map((url) => ({
          fields: {
            file: {
              url,
            },
          },
        })),
        filipinianaPicture: entry.filipinianaPictures.map((url) => ({
          fields: {
            file: {
              url,
            },
          },
        })),
        pixiePicture: entry.pixiePictures.map((url) => ({
          fields: {
            file: {
              url,
            },
          },
        })),
        trainPicture: entry.trainPictures.map((url) => ({
          fields: {
            file: {
              url,
            },
          },
        })),
        addOns: entry.addOns,
        relatedGowns: entry.relatedGownIds, // Store as string array (IDs only)
      },
    })) as any,
    total: serialized.length,
    skip: 0,
    limit: serialized.length,
    sys: {
      type: 'Array',
    },
  } as ContentfulEntriesResponse;
}

/**
 * Serialized individual gown entry (for single gown cache)
 */
export interface SerializedGownEntrySingle {
  id: string;
  name: string;
  collection: string[];
  bestFor: string[];
  tags: string[];
  color: string[];
  skirtStyle: string[];
  metroManilaRate: number;
  luzonRate: number;
  outsideLuzonRate: number;
  pixieMetroManilaRate: number;
  pixieLuzonRate: number;
  pixieOutsideLuzonRate: number;
  forSaleRateLong: number;
  forSaleRatePixie: number;
  bust: string;
  waist: string;
  arms: string;
  backing: string;
  lenght: string;
  longGownPictures: string[];
  filipinianaPictures: string[];
  pixiePictures: string[];
  trainPictures: string[];
  addOns: string[];
  relatedGownIds: string[];
}

/**
 * Serialize a single Contentful entry response
 */
export function serializeGownEntry(response: ContentfulEntryResponse): SerializedGownEntrySingle {
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
  const lenght = ensureString(fields.lenght) ?? '';
  const addOns = extractIdArray(fields.addOns);
  const relatedGownIds = extractIdArray(fields.relatedGowns);

  const longGownPictures = normalizeAssetUrls(fields.longGownPicture);
  const filipinianaPictures = normalizeAssetUrls(fields.filipinianaPicture);
  const pixiePictures = normalizeAssetUrls(fields.pixiePicture);
  const trainPictures = normalizeAssetUrls(fields.trainPicture);

  return {
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
    lenght,
    longGownPictures,
    filipinianaPictures,
    pixiePictures,
    trainPictures,
    addOns,
    relatedGownIds,
  };
}

/**
 * Deserialize a single gown entry back to Contentful-like structure
 */
export function deserializeGownEntry(serialized: SerializedGownEntrySingle): ContentfulEntryResponse {
  return {
    sys: {
      id: serialized.id,
      type: 'Entry',
      createdAt: '',
      updatedAt: '',
      revision: 0,
      contentType: {
        sys: {
          type: 'Link',
          linkType: 'ContentType',
          id: 'gown',
        },
      },
      metadata: {
        tags: [],
      },
    },
    fields: {
      name: serialized.name,
      collection: serialized.collection,
      bestFor: serialized.bestFor,
      tags: serialized.tags,
      color: serialized.color,
      skirtStyle: serialized.skirtStyle,
      metroManilaRate: serialized.metroManilaRate,
      luzonRate: serialized.luzonRate,
      outsideLuzonRate: serialized.outsideLuzonRate,
      pixieMetroManilaRate: serialized.pixieMetroManilaRate,
      pixieLuzonRate: serialized.pixieLuzonRate,
      pixieOutsideLuzonRate: serialized.pixieOutsideLuzonRate,
      forSaleRateLong: serialized.forSaleRateLong,
      forSaleRatePixie: serialized.forSaleRatePixie,
      bust: serialized.bust,
      waist: serialized.waist,
      arms: serialized.arms,
      backing: serialized.backing,
      lenght: serialized.lenght,
      longGownPicture: serialized.longGownPictures.map((url) => ({
        fields: {
          file: {
            url,
          },
        },
      })),
      filipinianaPicture: serialized.filipinianaPictures.map((url) => ({
        fields: {
          file: {
            url,
          },
        },
      })),
      pixiePicture: serialized.pixiePictures.map((url) => ({
        fields: {
          file: {
            url,
          },
        },
      })),
      trainPicture: serialized.trainPictures.map((url) => ({
        fields: {
          file: {
            url,
          },
        },
      })),
      addOns: serialized.addOns,
      relatedGowns: serialized.relatedGownIds, // Return as string array (IDs only)
    },
  } as unknown as ContentfulEntryResponse;
}

/**
 * Serialized addon entry structure (JSON-safe, no circular references)
 */
export interface SerializedAddonEntry {
  id: string;
  name: string;
  description: string;
  type: string;
  metroManilaRate: number;
  luzonRate: number;
  outsideLuzonRate: number;
  forSaleRate: number | null;
  pictures: string[];
}

/**
 * Serialize a Contentful entries response for addons to a flat structure
 */
export function serializeAddonsResponse(
  response: ContentfulEntriesResponse
): SerializedAddonEntry[] {
  return response.items.map((item) => {
    const fields = isRecord(item.fields) ? (item.fields as Record<string, unknown>) : {};

    const name = ensureString(fields.name) ?? 'Untitled Add-On';
    const description = ensureString(fields.description) ?? '';
    const type = ensureString(fields.type) ?? 'accessory';
    const metroManilaRate = ensureNumber(fields.metroManilaRate) ?? 0;
    const luzonRate = ensureNumber(fields.luzonRate) ?? 0;
    const outsideLuzonRate = ensureNumber(fields.outsideLuzonRate) ?? 0;
    const forSaleRate = ensureNumber(fields.forSaleRate);
    const pictures = normalizeAssetUrls(fields.pictures);

    return {
      id: String(item.sys.id),
      name,
      description,
      type,
      metroManilaRate,
      luzonRate,
      outsideLuzonRate,
      forSaleRate: forSaleRate ?? null,
      pictures,
    };
  });
}

/**
 * Deserialize a flat structure back to a Contentful-like entries response for addons
 */
export function deserializeAddonsResponse(
  serialized: SerializedAddonEntry[]
): ContentfulEntriesResponse {
  return {
    items: serialized.map((entry) => ({
      sys: {
        id: entry.id,
        type: 'Entry',
        createdAt: '',
        updatedAt: '',
        revision: 0,
        contentType: {
          sys: {
            type: 'Link',
            linkType: 'ContentType',
            id: 'addOns',
          },
        },
        metadata: {
          tags: [],
        },
      },
      fields: {
        name: entry.name,
        description: entry.description,
        type: entry.type,
        metroManilaRate: entry.metroManilaRate,
        luzonRate: entry.luzonRate,
        outsideLuzonRate: entry.outsideLuzonRate,
        forSaleRate: entry.forSaleRate,
        pictures: entry.pictures.map((url) => ({
          fields: {
            file: {
              url,
            },
          },
        })),
      },
    })) as any,
    total: serialized.length,
    skip: 0,
    limit: serialized.length,
    sys: {
      type: 'Array',
    },
  } as ContentfulEntriesResponse;
}

/**
 * Serialized individual addon entry (for single addon cache)
 */
export interface SerializedAddonEntrySingle {
  id: string;
  name: string;
  description: string;
  type: string;
  metroManilaRate: number;
  luzonRate: number;
  outsideLuzonRate: number;
  forSaleRate: number | null;
  pictures: string[];
}

/**
 * Serialize a single Contentful entry response for addon
 */
export function serializeAddonEntry(response: ContentfulEntryResponse): SerializedAddonEntrySingle {
  const fields = isRecord(response.fields) ? (response.fields as Record<string, unknown>) : {};

  const name = ensureString(fields.name) ?? 'Untitled Add-On';
  const description = ensureString(fields.description) ?? '';
  const type = ensureString(fields.type) ?? 'accessory';
  const metroManilaRate = ensureNumber(fields.metroManilaRate) ?? 0;
  const luzonRate = ensureNumber(fields.luzonRate) ?? 0;
  const outsideLuzonRate = ensureNumber(fields.outsideLuzonRate) ?? 0;
  const forSaleRate = ensureNumber(fields.forSaleRate);
  const pictures = normalizeAssetUrls(fields.pictures);

  return {
    id: String(response.sys.id),
    name,
    description,
    type,
    metroManilaRate,
    luzonRate,
    outsideLuzonRate,
    forSaleRate: forSaleRate ?? null,
    pictures,
  };
}

/**
 * Deserialize a single addon entry back to Contentful-like structure
 */
export function deserializeAddonEntry(serialized: SerializedAddonEntrySingle): ContentfulEntryResponse {
  return {
    sys: {
      id: serialized.id,
      type: 'Entry',
      createdAt: '',
      updatedAt: '',
      revision: 0,
      contentType: {
        sys: {
          type: 'Link',
          linkType: 'ContentType',
          id: 'addOns',
        },
      },
      metadata: {
        tags: [],
      },
    },
    fields: {
      name: serialized.name,
      description: serialized.description,
      type: serialized.type,
      metroManilaRate: serialized.metroManilaRate,
      luzonRate: serialized.luzonRate,
      outsideLuzonRate: serialized.outsideLuzonRate,
      forSaleRate: serialized.forSaleRate,
      pictures: serialized.pictures.map((url) => ({
        fields: {
          file: {
            url,
          },
        },
      })),
    },
  } as unknown as ContentfulEntryResponse;
}

