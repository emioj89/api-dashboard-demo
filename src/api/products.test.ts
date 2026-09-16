import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchProducts } from './products';

describe('fetchProducts API', () => {
  const mockProductsResponse = {
    products: [
      {
        id: 1,
        title: 'Test Product',
        description: 'Test Description',
        category: 'beauty',
        price: 10,
        rating: 4.5,
        stock: 5,
        thumbnail: 'https://example.com/thumb.png',
      },
    ],
    total: 1,
    skip: 0,
    limit: 0,
  };

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns ProductsApiResponse when fetch succeeds (response OK)', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProductsResponse,
    } as Response);

    const data = await fetchProducts();

    expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/products?limit=0', { signal: undefined });
    expect(data).toEqual(mockProductsResponse);
  });

  it('throws error when response is not OK', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response);

    await expect(fetchProducts()).rejects.toThrow('Server returned status code 500');
  });

  it('passes AbortSignal correctly to fetch request', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProductsResponse,
    } as Response);

    const controller = new AbortController();
    await fetchProducts(controller.signal);

    expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/products?limit=0', { signal: controller.signal });
  });
});

