// Collections configuration - Single source of truth for all collection data

export interface Collection {
  name: string;
  slug: string;
  description: string;
  image: string;
}

export const collections: Collection[] = [
  {
    name: "All Collections",
    slug: "all",
    description: "Explore our complete range of gowns across all collections.",
    image: "/assets/collections/All Collections.jpg"
  },
  {
    name: "Modern Glamour",
    slug: "modern-glamour",
    description: "Where elegance meets bold sophistication.",
    image: "/assets/collections/Modern Glamour.jpg"
  },
  {
    name: "Royal Historical Eras",
    slug: "royal-historical-eras",
    description: "A tribute to timeless grandeur and aristocratic charm.",
    image: "/assets/collections/Royal Historical Eras.jpg"
  },
  {
    name: "Fairytale Fantasy",
    slug: "fairytale-fantasy",
    description: "Where imagination and magic come alive.",
    image: "/assets/collections/Fairytale Fantasy.jpg"
  },
  {
    name: "Nature Seasonal Realms",
    slug: "nature-seasonal-realms",
    description: "A reflection of nature's elegance and ever-changing beauty.",
    image: "/assets/collections/Nature Seasonal Realms.jpg"
  },
  {
    name: "Celestial Dreamlike",
    slug: "celestial-dreamlike",
    description: "For those who shine among the stars.",
    image: "/assets/collections/Celestial Dreamlike.jpg"
  },
  {
    name: "Ocean Realm",
    slug: "ocean-realm",
    description: "Born from the depths of legend and the beauty of the sea.",
    image: "/assets/collections/Ocean Realm.jpg"
  },
  {
    name: "Your Favorite Character",
    slug: "your-favorite-character",
    description: "These gowns pay homage to mythological figures and cultural masterpieces.",
    image: "/assets/collections/Your Favorite Character.jpg"
  }
];

// Collection descriptions mapping (detailed descriptions for collection pages)
export const collectionDescriptions: Record<string, string> = {
  'Modern Glamour': 'Where elegance meets bold sophistication. Inspired by red-carpet icons and luxurious soirées, these gowns capture modern beauty, confidence, and shine. Ideal for fashion-forward events and evening galas.',
  'Royal Historical Eras': 'A tribute to timeless grandeur and aristocratic charm. Inspired by the grand eras that shaped timeless couture—from the opulence of Rococo and Baroque courts to the refined grace of Victorian and Regency society. Each gown reimagines the artistry of the past through corseted silhouettes, intricate details, and lavish fabrics—capturing the romance and nobility of queens, empresses, and heroines from history.',
  'Fairytale Fantasy': 'Where imagination and magic come alive. Romantic, whimsical, and full of wonder, these gowns bring stories to life—woven from dreams, enchantment, and pure fairytale. Designed for dreamers and believers, every piece captures the feeling of stepping into your own fantasy moment.',
  'Nature Seasonal Realms': 'A reflection of nature\'s elegance and ever-changing beauty. From the frost of winter to the bloom of spring, this collection is inspired by the seasons\' colors, moods, and harmony. Each gown embodies the softness and vitality of the natural world, creating an organic grace that feels timeless and serene.',
  'Celestial Dreamlike': 'For those who shine among the stars. Radiant and ethereal, these gowns are inspired by the cosmos—by moonlight, galaxies, and the divine heavens. Flowing fabrics and shimmering tones mirror the night sky, turning every wearer into a celestial vision of grace and light.',
  'Ocean Realm': 'Born from the depths of legend and the beauty of the sea. This collection embodies the mystery of sirens and the grace of ocean goddesses—where every gown mirrors the rhythm of the waves and the glow of moonlit waters. Designed for those who find strength in serenity, it captures the calm, allure, and eternal magic of the sea.',
  'Cultural and Mythic Icons': 'These gowns pay homage to mythological figures, beloved characters, and cultural masterpieces. Each creation reimagines legends through fashion—blending tradition and fantasy into couture that transcends eras and cultures alike.',
  'All Gowns': 'Prom, Junior-Senior Balls, Graduation ball, Masquerade ball and Public Balls'
};

// Utility functions for working with collections

/**
 * Get collection display name from URL slug
 */
export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find(c => c.slug === slug);
}

/**
 * Get collection display name from URL slug (with fallback)
 */
export function getCollectionDisplayName(slug: string): string {
  const collection = getCollectionBySlug(slug);
  return collection ? collection.name : slug;
}

/**
 * Get detailed collection description by display name
 */
export function getCollectionDescription(displayName: string): string {
  return collectionDescriptions[displayName] || 'Prom, Junior-Senior Balls, Graduation ball, Masquerade ball and Public Balls';
}

/**
 * Get all collection names (useful for filtering/validation)
 */
export function getAllCollectionNames(): string[] {
  return collections.map(c => c.name);
}

/**
 * Get all collection slugs (useful for routing/validation)
 */
export function getAllCollectionSlugs(): string[] {
  return collections.map(c => c.slug);
}

/**
 * Check if a slug is a valid collection
 */
export function isValidCollectionSlug(slug: string): boolean {
  return collections.some(c => c.slug === slug);
}

/**
 * Get collections excluding "All Collections"
 */
export function getSpecificCollections(): Collection[] {
  return collections.filter(c => c.slug !== 'all');
}

