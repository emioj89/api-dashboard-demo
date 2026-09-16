import { useCallback, useEffect, useState } from 'react';
import { fetchProducts } from '../api/products';
import type { Product } from '../types/product';

interface UseProductsResult {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchIndex, setFetchIndex] = useState<number>(0);

  const refetch = useCallback(() => {
    setFetchIndex((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    let isSubscribed = true;

    async function loadData() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchProducts(controller.signal);
        if (isSubscribed) {
          setProducts(response.products);
          setIsLoading(false);
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        if (isSubscribed) {
          const userMessage = err instanceof Error
            ? 'Failed to connect to the product service. Please check your internet connection and try again.'
            : 'An unexpected error occurred while fetching products.';
          setError(userMessage);
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isSubscribed = false;
      controller.abort();
    };
  }, [fetchIndex]);

  return { products, isLoading, error, refetch };
}

