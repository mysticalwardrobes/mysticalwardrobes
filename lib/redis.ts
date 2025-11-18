import { createClient } from 'redis';

// Redis connection configuration
// Note: Use REDIS_URL for standard Redis connections (e.g., redis://localhost:6379)
// For Upstash, use the Redis protocol endpoint, not the REST endpoint
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

// Create Redis client
let redisClient: ReturnType<typeof createClient> | null = null;

/**
 * Get or create Redis client instance
 * Ensures singleton pattern for connection reuse
 */
function getRedisClient() {
  if (!redisClient) {
    redisClient = createClient({
      url: redisUrl,
    });

    redisClient.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    // Connect to Redis (non-blocking)
    if (!redisClient.isOpen) {
      redisClient.connect().catch((err) => {
        console.error('Failed to connect to Redis:', err);
      });
    }
  }

  return redisClient;
}

/**
 * Get a value from Redis by key
 * @param key - The key to retrieve
 * @returns The value if found, null otherwise
 */
export async function get(key: string): Promise<string | null> {
  try {
    const client = getRedisClient();
    
    if (!client.isOpen) {
      await client.connect();
    }

    const value = await client.get(key);
    return value;
  } catch (error) {
    console.error(`Error getting key "${key}" from Redis:`, error);
    return null;
  }
}

/**
 * Get a value from Redis and parse it as JSON
 * @param key - The key to retrieve
 * @returns The parsed JSON object if found, null otherwise
 */
export async function getJSON<T = any>(key: string): Promise<T | null> {
  try {
    const value = await get(key);
    if (!value) return null;
    return JSON.parse(value) as T;
  } catch (error) {
    console.error(`Error parsing JSON for key "${key}":`, error);
    return null;
  }
}

/**
 * Set a value in Redis
 * @param key - The key to set
 * @param value - The value to store
 * @param expirationSeconds - Optional expiration time in seconds
 * @returns true if successful, false otherwise
 */
export async function set(
  key: string,
  value: string,
  expirationSeconds?: number
): Promise<boolean> {
  try {
    const client = getRedisClient();
    
    if (!client.isOpen) {
      await client.connect();
    }

    if (expirationSeconds) {
      await client.setEx(key, expirationSeconds, value);
    } else {
      await client.set(key, value);
    }

    return true;
  } catch (error) {
    console.error(`Error setting key "${key}" in Redis:`, error);
    return false;
  }
}

/**
 * Set a JSON object in Redis
 * @param key - The key to set
 * @param value - The JSON object to store
 * @param expirationSeconds - Optional expiration time in seconds
 * @returns true if successful, false otherwise
 */
export async function setJSON(
  key: string,
  value: any,
  expirationSeconds?: number
): Promise<boolean> {
  try {
    const jsonString = JSON.stringify(value);
    return await set(key, jsonString, expirationSeconds);
  } catch (error) {
    console.error(`Error stringifying JSON for key "${key}":`, error);
    return false;
  }
}

/**
 * Delete a key from Redis
 * @param key - The key to delete
 * @returns true if successful, false otherwise
 */
export async function del(key: string): Promise<boolean> {
  try {
    const client = getRedisClient();
    
    if (!client.isOpen) {
      await client.connect();
    }

    await client.del(key);
    return true;
  } catch (error) {
    console.error(`Error deleting key "${key}" from Redis:`, error);
    return false;
  }
}

/**
 * Check if a key exists in Redis
 * @param key - The key to check
 * @returns true if key exists, false otherwise
 */
export async function exists(key: string): Promise<boolean> {
  try {
    const client = getRedisClient();
    
    if (!client.isOpen) {
      await client.connect();
    }

    const result = await client.exists(key);
    return result === 1;
  } catch (error) {
    console.error(`Error checking existence of key "${key}":`, error);
    return false;
  }
}

/**
 * Set expiration time for a key
 * @param key - The key to set expiration for
 * @param seconds - Expiration time in seconds
 * @returns true if successful, false otherwise
 */
export async function expire(key: string, seconds: number): Promise<boolean> {
  try {
    const client = getRedisClient();
    
    if (!client.isOpen) {
      await client.connect();
    }

    await client.expire(key, seconds);
    return true;
  } catch (error) {
    console.error(`Error setting expiration for key "${key}":`, error);
    return false;
  }
}

/**
 * Delete multiple keys by pattern
 * @param pattern - Pattern to match keys (e.g., 'gowns:*', 'addons:*')
 * @returns Number of keys deleted
 */
export async function deleteByPattern(pattern: string): Promise<number> {
  try {
    const client = getRedisClient();
    
    if (!client.isOpen) {
      await client.connect();
    }

    // Use SCAN to find all keys matching the pattern
    const keys: string[] = [];
    let cursor = '0';
    
    do {
      const result = await client.scan(cursor, {
        MATCH: pattern,
        COUNT: 100,
      });
      cursor = result.cursor;
      keys.push(...result.keys);
    } while (cursor !== '0');

    // Delete all matching keys
    if (keys.length > 0) {
      await client.del(keys);
    }

    return keys.length;
  } catch (error) {
    console.error(`Error deleting keys by pattern "${pattern}":`, error);
    return 0;
  }
}

/**
 * Invalidate all cache related to Contentful data
 * Deletes all gowns, addons, and custom-made-gowns cache (both list and individual items)
 * @returns Object with counts of deleted keys per category
 */
export async function invalidateContentfulCache(): Promise<{
  gowns: number;
  addons: number;
  customMadeGowns: number;
  total: number;
}> {
  try {
    // Delete all cache patterns:
    // - gowns:all (list cache)
    // - gown:* (individual gown caches)
    // - addons:all (list cache)
    // - addon:* (individual addon caches)
    // - custom-made-gowns:all (list cache)
    // - custom-made-gown:* (individual custom-made-gown caches)
    const [gownsListCount, gownsIndividualCount, addonsListCount, addonsIndividualCount, customMadeGownsListCount, customMadeGownsIndividualCount] = await Promise.all([
      deleteByPattern('gowns:*'), // Matches 'gowns:all'
      deleteByPattern('gown:*'),   // Matches 'gown:ID' (individual items)
      deleteByPattern('addons:*'), // Matches 'addons:all'
      deleteByPattern('addon:*'),  // Matches 'addon:ID' (individual items)
      deleteByPattern('custom-made-gowns:*'), // Matches 'custom-made-gowns:all'
      deleteByPattern('custom-made-gown:*'), // Matches 'custom-made-gown:ID' (individual items)
    ]);

    const gownsCount = gownsListCount + gownsIndividualCount;
    const addonsCount = addonsListCount + addonsIndividualCount;
    const customMadeGownsCount = customMadeGownsListCount + customMadeGownsIndividualCount;
    const total = gownsCount + addonsCount + customMadeGownsCount;

    console.log('🗑️  Cache invalidated:', {
      gowns: {
        list: gownsListCount,
        individual: gownsIndividualCount,
        total: gownsCount,
      },
      addons: {
        list: addonsListCount,
        individual: addonsIndividualCount,
        total: addonsCount,
      },
      customMadeGowns: {
        list: customMadeGownsListCount,
        individual: customMadeGownsIndividualCount,
        total: customMadeGownsCount,
      },
      total,
    });

    return {
      gowns: gownsCount,
      addons: addonsCount,
      customMadeGowns: customMadeGownsCount,
      total,
    };
  } catch (error) {
    console.error('Error invalidating Contentful cache:', error);
    return {
      gowns: 0,
      addons: 0,
      customMadeGowns: 0,
      total: 0,
    };
  }
}

/**
 * Close Redis connection
 * Useful for cleanup in serverless environments
 */
export async function close(): Promise<void> {
  try {
    if (redisClient && redisClient.isOpen) {
      await redisClient.quit();
      redisClient = null;
    }
  } catch (error) {
    console.error('Error closing Redis connection:', error);
  }
}

