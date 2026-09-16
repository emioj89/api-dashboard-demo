import type { Product, ProductStats } from '../types/product';

export function calculateProductStats(products: Product[]): ProductStats {
  if (!products || products.length === 0) {
    return {
      totalProducts: 0,
      avgPrice: 0,
      avgRating: 0,
      lowStockCount: 0,
    };
  }

  const totalProducts = products.length;
  let totalPrice = 0;
  let totalRating = 0;
  let lowStockCount = 0;

  for (const product of products) {
    totalPrice += product.price;
    totalRating += product.rating;
    if (product.stock <= 10) {
      lowStockCount += 1;
    }
  }

  return {
    totalProducts,
    avgPrice: Number((totalPrice / totalProducts).toFixed(2)),
    avgRating: Number((totalRating / totalProducts).toFixed(1)),
    lowStockCount,
  };
}

