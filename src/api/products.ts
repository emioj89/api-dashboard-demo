import type { ProductsApiResponse } from '../types/product';

const API_BASE_URL = 'https://dummyjson.com/products';

export async function fetchProducts(signal?: AbortSignal): Promise<ProductsApiResponse> {
  const response = await fetch(`${API_BASE_URL}?limit=0`, { signal });

  if (!response.ok) {
    throw new Error(`Server returned status code ${response.status}`);
  }

  const data: ProductsApiResponse = await response.json();
  return data;
}

