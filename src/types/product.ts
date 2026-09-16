export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  brand?: string;
  thumbnail: string;
  images?: string[];
}

export interface ProductsApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export type SortOption = 'price-asc' | 'price-desc' | 'rating-desc' | 'title-asc';

export interface FilterState {
  searchQuery: string;
  category: string;
  sortBy: SortOption;
}

export interface ProductStats {
  totalProducts: number;
  avgPrice: number;
  avgRating: number;
  lowStockCount: number;
}

