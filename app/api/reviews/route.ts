import { NextResponse } from 'next/server'
import { client } from '@/app/api/config'

import { Review } from './model'

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null
}

const ensureString = (value: unknown): string | null => {
  return typeof value === 'string' && value.trim().length > 0 ? value : null
}

const extractAssetUrl = (value: unknown): string | null => {
  if (!isRecord(value) || !('fields' in value)) {
    return null
  }

  const fields = (value as { fields?: unknown }).fields
  if (!isRecord(fields) || !('file' in fields)) {
    return null
  }

  const file = (fields as { file?: unknown }).file
  if (!isRecord(file) || !('url' in file)) {
    return null
  }

  return ensureString((file as { url?: unknown }).url)
}

const extractEntryId = (value: unknown): string | null => {
  if (!isRecord(value) || !('sys' in value)) {
    return null
  }

  const sys = (value as { sys?: unknown }).sys
  if (!isRecord(sys)) {
    return null
  }

  return ensureString((sys as { id?: unknown }).id)
}

const normalizeAssetUrls = (value: unknown): string[] | null => {
  const collect = Array.isArray(value) ? value : value != null ? [value] : []

  const urls = collect
    .map((item) => extractAssetUrl(item))
    .filter((url): url is string => typeof url === 'string')

  return urls.length > 0 ? urls : null
}

const normalizeEntryIds = (value: unknown): string[] | null => {
  const collect = Array.isArray(value) ? value : value != null ? [value] : []

  const ids = collect
    .map((item) => extractEntryId(item))
    .filter((id): id is string => typeof id === 'string' && id.length > 0)

  return ids.length > 0 ? ids : null
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  
  // Parse query parameters
  const random = searchParams.get('random') === 'true'
  const limit = parseInt(searchParams.get('limit') || '0', 10)
  
  const response = await client.getEntries({
    content_type: 'reviews',
  })

  let items: Review[] = response.items.map((item) => {
    const fields = isRecord(item.fields) ? (item.fields as Record<string, unknown>) : {}

    const clientName = ensureString(fields.clientName) ?? ''
    const comment = ensureString(fields.comment) ?? ''
    const thumbnailMediaUrl = extractAssetUrl(fields.media)
    const otherMediaUrls = normalizeAssetUrls(fields.otherMedia)
    const gownId = extractEntryId(fields.gown)
    const otherGownsIds = normalizeEntryIds(fields.otherGowns)

    return {
      id: String(item.sys.id),
      clientName,
      comment,
      thumbnailMediaUrl,
      otherMediaUrls,
      gownId,
      otherGownsIds,
    }
  })

  // Apply random selection if requested
  if (random) {
    items = items.sort(() => Math.random() - 0.5)
  }

  // Apply limit if specified
  if (limit > 0) {
    items = items.slice(0, limit)
  }

  return NextResponse.json(items)
}
