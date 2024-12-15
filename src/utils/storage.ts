// Local storage keys
const STORAGE_KEYS = {
  PRODUCTS: 'nextg_products',
} as const;

export function saveProducts(products: any[]): void {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
}

export function loadProducts(): any[] {
  const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  return stored ? JSON.parse(stored) : [];
}