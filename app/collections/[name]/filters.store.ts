import { atom } from "jotai";

export type PriceRange = [number, number];

export const DEFAULT_PRICE_RANGE: PriceRange = [0, 15000];
export const DEFAULT_SORT_BY = "most-popular";

// Filter options from Contentful gown content type
export const TAG_OPTIONS = [
  "Hollywood", "Great Gatsby", "Red Carpet", "Gala", "Glam", "Glitz and Glamour", "Old money",
  "Avant Garde", "Euphoria", "Barbie", "Coquette", "Regal", "Royalty", "Bridgerton", "Regency",
  "Victorian", "Medieval", "Renaissance", "Baroque", "Roco  co", "Vintage", "Enchanted", "Masquerade",
  "Enchanted Forest and Enchanted Garden", "Garden Glamour", "Fairy and Fairytale", "Ethereal",
  "Goddess", "Fantasy", "Princess", "Alice in the wonderland", "Cottagecore", "Lantern",
  "Caraval and Carnival", "Floral", "Winter / Ice", "Spring Blossom", "Summer", "Autumn",
  "Celestial", "Dreamlike", "Starry night", "Heavenly", "Star Light", "Sun Rise and Sun Set",
  "Aurora Borealis", "Galaxy and Cosmic", "Eclipse", "Under the sea", "Mermaid", "Siren",
  "Ocean", "Pearl", "Greek Goddess", "Disney", "Manwha", "Lolita", "Gothic",
  "UN Costumes / National Attire", "Good and Evil", "Historical Manhwa", "Oscar night"
];

export const COLOR_OPTIONS = [
  "Beige", "Black", "Blue", "Brown", "Gold", "Gray", "Green", "Pink", "Purple", "Red", "Peach", "Silver", "White", "Yellow"
];

export const BEST_FOR_OPTIONS = [
  "Prom & Grand Balls", "Debutantes & Birthdays", "Frame Her & Photoshoots", "Special Guests & Pixie Dresses"
];

export const SKIRT_STYLE_OPTIONS = [
  "Flowy Full Length Dress", "Medium Gown", "Ball Gown", "Train", "Pixie"
];

export const priceRangeAtom = atom<PriceRange>(DEFAULT_PRICE_RANGE);
export const sortByAtom = atom<string>(DEFAULT_SORT_BY);
export const filterDrawerAtom = atom(false);

// New filter atoms
export const selectedTagsAtom = atom<string[]>([]);
export const selectedColorsAtom = atom<string[]>([]);
export const selectedBestForAtom = atom<string[]>([]);
export const selectedSkirtStylesAtom = atom<string[]>([]);

// Search atoms for filtering options
export const tagsSearchAtom = atom<string>('');
export const colorsSearchAtom = atom<string>('');
