import { useMemo, useState } from 'react';
import { useProducts } from './hooks/useProducts';
import type { SortOption } from './types/product';
import { extractCategories, filterProducts, sortProducts } from './utils/productFilters';
import { calculateProductStats } from './utils/productStats';

import { DashboardHeader } from './components/DashboardHeader';
import { EmptyState } from './components/EmptyState';
import { ErrorState } from './components/ErrorState';
import { FiltersBar } from './components/FiltersBar';
import { KpiCard } from './components/KpiCard';
import { LoadingState } from './components/LoadingState';
import { ProductGrid } from './components/ProductGrid';

import './App.css';

export function App() {
  const { products, isLoading, error, refetch } = useProducts();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('price-asc');

  // Categories extracted from original dataset
  const categories = useMemo(() => {
    return extractCategories(products);
  }, [products]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    const filtered = filterProducts(products, searchQuery, selectedCategory);
    return sortProducts(filtered, sortBy);
  }, [products, searchQuery, selectedCategory, sortBy]);

  // KPI Statistics computed over currently visible/filtered products
  const stats = useMemo(() => {
    return calculateProductStats(filteredProducts);
  }, [filteredProducts]);

  const hasActiveFilters = Boolean(searchQuery.trim() || selectedCategory !== 'all' || sortBy !== 'price-asc');

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('price-asc');
  };

  return (
    <div className="dashboard-layout">
      <DashboardHeader />

      <main className="dashboard-main">
        {/* KPI Section */}
        {!isLoading && !error && (
          <section className="kpi-section" aria-label="Key Performance Indicators">
            <KpiCard
              title="Total Products"
              value={stats.totalProducts}
              icon="📦"
              subtext={`Filtered out of ${products.length} total items`}
            />
            <KpiCard
              title="Average Price"
              value={`$${stats.avgPrice.toFixed(2)}`}
              icon="💵"
              subtext="Mean price of visible items"
            />
            <KpiCard
              title="Average Rating"
              value={`${stats.avgRating.toFixed(1)} / 5`}
              icon="⭐"
              subtext="Customer satisfaction score"
            />
            <KpiCard
              title="Low Stock Items"
              value={stats.lowStockCount}
              icon="⚠️"
              subtext="Stock level ≤ 10 items"
              badgeType={stats.lowStockCount > 0 ? 'warning' : 'default'}
            />
          </section>
        )}

        {/* Controls Section */}
        {!isLoading && !error && (
          <FiltersBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            categories={categories}
            onCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onResetFilters={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
          />
        )}

        {/* Main Content States */}
        {isLoading && <LoadingState />}

        {!isLoading && error && (
          <ErrorState message={error} onRetry={refetch} />
        )}

        {!isLoading && !error && filteredProducts.length === 0 && (
          <EmptyState onResetFilters={handleResetFilters} />
        )}

        {!isLoading && !error && filteredProducts.length > 0 && (
          <ProductGrid products={filteredProducts} />
        )}
      </main>

      <footer className="dashboard-footer">
        <p>
          Product Analytics Dashboard Portfolio Demo • Built with React 19, TypeScript, Vite & CSS.
          Data source:{' '}
          <a
            href="https://dummyjson.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            DummyJSON API
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
