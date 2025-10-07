import { atom } from "jotai";

export type PriceRange = [number, number];

export const DEFAULT_PRICE_RANGE: PriceRange = [0, 4000];
export const DEFAULT_SORT_BY = "best-selling";

export const priceRangeAtom = atom<PriceRange>(DEFAULT_PRICE_RANGE);
export const sortByAtom = atom<string>(DEFAULT_SORT_BY);
export const filterDrawerAtom = atom(false);
