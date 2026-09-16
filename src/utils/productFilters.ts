import type { Product, SortOption } from '../types/product';

export function filterProducts(
  products: Product[],
  searchQuery: string,
  category: string
): Product[] {
  const query = searchQuery.trim().toLowerCase();

  return products.filter((product) => {
    // 1. Category filter
    if (category && category !== 'all' && product.category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }

    // 2. Search query filter (title, brand, category)
    if (query) {
      const matchTitle = product.title.toLowerCase().includes(query);
      const matchBrand = product.brand ? product.brand.toLowerCase().includes(query) : false;
      const matchCategory = product.category.toLowerCase().includes(query);

      if (!matchTitle && !matchBrand && !matchCategory) {
        return false;
      }
    }

    return true;
  });
}

export function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating-desc':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sorted;
  }
}

export function extractCategories(products: Product[]): string[] {
  const categories = new Set<string>();
  for (const product of products) {
    if (product.category) {
      categories.add(product.category);
    }
  }
  return Array.from(categories).sort();
}

