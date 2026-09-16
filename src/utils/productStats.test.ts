import { describe, it, expect } from 'vitest';
import { calculateProductStats } from './productStats';
import type { Product } from '../types/product';

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Item 1',
    description: 'Desc 1',
    category: 'beauty',
    price: 10,
    rating: 4.0,
    stock: 5, // low stock (<= 10)
    thumbnail: '',
  },
  {
    id: 2,
    title: 'Item 2',
    description: 'Desc 2',
    category: 'beauty',
    price: 20,
    rating: 5.0,
    stock: 10, // low stock (<= 10)
    thumbnail: '',
  },
  {
    id: 3,
    title: 'Item 3',
    description: 'Desc 3',
    category: 'fragrances',
    price: 30,
    rating: 3.0,
    stock: 15, // normal stock (> 10)
    thumbnail: '',
  },
];

describe('productStats', () => {
  describe('calculateProductStats', () => {
    it('calculates stats correctly for a full dataset', () => {
      const stats = calculateProductStats(mockProducts);

      expect(stats.totalProducts).toBe(3);
      expect(stats.avgPrice).toBe(20); // (10 + 20 + 30) / 3 = 20.00
      expect(stats.avgRating).toBe(4); // (4.0 + 5.0 + 3.0) / 3 = 4.0
      expect(stats.lowStockCount).toBe(2); // stocks 5 and 10
    });

    it('returns zero values when dataset is empty or undefined', () => {
      const emptyStats = calculateProductStats([]);
      expect(emptyStats).toEqual({
        totalProducts: 0,
        avgPrice: 0,
        avgRating: 0,
        lowStockCount: 0,
      });

      // @ts-expect-error testing defensive check against null/undefined
      const nullStats = calculateProductStats(null);
      expect(nullStats).toEqual({
        totalProducts: 0,
        avgPrice: 0,
        avgRating: 0,
        lowStockCount: 0,
      });
    });

    it('calculates stats accurately for a filtered subset', () => {
      const subset = mockProducts.filter((p) => p.category === 'beauty');
      const stats = calculateProductStats(subset);

      expect(stats.totalProducts).toBe(2);
      expect(stats.avgPrice).toBe(15); // (10 + 20) / 2 = 15
      expect(stats.avgRating).toBe(4.5); // (4.0 + 5.0) / 2 = 4.5
      expect(stats.lowStockCount).toBe(2);
    });

    it('counts stock accurately when low stock threshold is exactly 10', () => {
      const edgeCaseProducts: Product[] = [
        { id: 1, title: 'A', description: '', category: '', price: 10, rating: 5, stock: 10, thumbnail: '' },
        { id: 2, title: 'B', description: '', category: '', price: 10, rating: 5, stock: 11, thumbnail: '' },
      ];
      const stats = calculateProductStats(edgeCaseProducts);
      expect(stats.lowStockCount).toBe(1);
    });
  });
});

