import { Gift } from "../types";

const STORAGE_KEY = 'wedding_gifts_db';

const INITIAL_GIFTS: Gift[] = Array.from({ length: 45 }).map((_, i) => ({
  id: `init-${i}`,
  name: `Presente Exemplo ${i + 1}`,
  imageUrl: `https://picsum.photos/400/400?random=${i}`,
  status: 'available'
}));

export const getStoredGifts = (): Gift[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_GIFTS));
    return INITIAL_GIFTS;
  }
  return JSON.parse(stored);
};

export const saveGiftsToStorage = (gifts: Gift[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(gifts));
};