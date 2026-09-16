import { describe, it, expect } from 'vitest';
import { filterProducts, sortProducts, extractCategories } from './productFilters';
import type { Product } from '../types/product';

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Essence Mascara Lash Princess',
    description: 'The Essence Mascara Lash Princess is a popular mascara.',
    category: 'beauty',
    price: 9.99,
    rating: 4.94,
    stock: 5,
    brand: 'Essence',
    thumbnail: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
  },
  {
    id: 2,
    title: 'Eyeshadow Palette with Mirror',
    description: 'The Eyeshadow Palette with Mirror offers colors for everyday.',
    category: 'beauty',
    price: 19.99,
    rating: 3.28,
    stock: 44,
    brand: 'Glamour',
    thumbnail: 'https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png',
  },
  {
    id: 3,
    title: 'Calvin Klein CK One',
    description: 'Calvin Klein CK One is a classic unisex fragrance.',
    category: 'fragrances',
    price: 49.99,
    rating: 4.85,
    stock: 17,
    brand: 'Calvin Klein',
    thumbnail: 'https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/thumbnail.png',
  },
  {
    id: 4,
    title: 'Knoll Saarinen Executive Chair',
    description: 'The Knoll Saarinen Executive Chair is a modern icon.',
    category: 'furniture',
    price: 499.99,
    rating: 4.11,
    stock: 2,
    thumbnail: 'https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Chair/thumbnail.png',
  },
];

describe('productFilters', () => {
  describe('filterProducts', () => {
    it('filters products by title search query', () => {
      const result = filterProducts(mockProducts, 'Mascara', 'all');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
    });

    it('performs case-insensitive search', () => {
      const result = filterProducts(mockProducts, 'eyeshadow', 'all');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(2);
    });

    it('filters products by brand search query', () => {
      const result = filterProducts(mockProducts, 'Calvin', 'all');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(3);
    });

    it('filters products by category text search', () => {
      const result = filterProducts(mockProducts, 'furniture', 'all');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(4);
    });

    it('filters products by category dropdown selection', () => {
      const result = filterProducts(mockProducts, '', 'beauty');
      expect(result).toHaveLength(2);
      expect(result.map((p) => p.id)).toEqual([1, 2]);
    });

    it('combines category filter and search query', () => {
      const result = filterProducts(mockProducts, 'Mascara', 'beauty');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);

      const noMatchResult = filterProducts(mockProducts, 'Mascara', 'fragrances');
      expect(noMatchResult).toHaveLength(0);
    });

    it('returns empty array when search query matches nothing', () => {
      const result = filterProducts(mockProducts, 'nonexistent product query', 'all');
      expect(result).toHaveLength(0);
    });
  });

  describe('sortProducts', () => {
    it('sorts price low to high', () => {
      const result = sortProducts(mockProducts, 'price-asc');
      expect(result.map((p) => p.price)).toEqual([9.99, 19.99, 49.99, 499.99]);
    });

    it('sorts price high to low', () => {
      const result = sortProducts(mockProducts, 'price-desc');
      expect(result.map((p) => p.price)).toEqual([499.99, 49.99, 19.99, 9.99]);
    });

    it('sorts rating high to low', () => {
      const result = sortProducts(mockProducts, 'rating-desc');
      expect(result.map((p) => p.rating)).toEqual([4.94, 4.85, 4.11, 3.28]);
    });

    it('sorts title A-Z', () => {
      const result = sortProducts(mockProducts, 'title-asc');
      expect(result.map((p) => p.title)).toEqual([
        'Calvin Klein CK One',
        'Essence Mascara Lash Princess',
        'Eyeshadow Palette with Mirror',
        'Knoll Saarinen Executive Chair',
      ]);
    });

    it('does not modify the original products array destructively', () => {
      const originalCopy = [...mockProducts];
      const result = sortProducts(mockProducts, 'price-asc');

      expect(mockProducts).toEqual(originalCopy);
      expect(result).not.toBe(mockProducts);
    });
  });

  describe('extractCategories', () => {
    it('extracts unique categories in alphabetical order', () => {
      const categories = extractCategories(mockProducts);
      expect(categories).toEqual(['beauty', 'fragrances', 'furniture']);
    });

    it('returns empty array when dataset is empty', () => {
      const categories = extractCategories([]);
      expect(categories).toEqual([]);
    });
  });
});

