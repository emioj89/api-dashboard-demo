import React from 'react';
import type { SortOption } from '../types/product';

interface FiltersBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  categories: string[];
  onCategoryChange: (category: string) => void;
  sortBy: SortOption;
  onSortChange: (sortBy: SortOption) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export const FiltersBar: React.FC<FiltersBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  categories,
  onCategoryChange,
  sortBy,
  onSortChange,
  onResetFilters,
  hasActiveFilters,
}) => {
  return (
    <div className="filters-bar" role="search" aria-label="Product search and filter controls">
      <div className="filter-group filter-group--search">
        <label htmlFor="search-input" className="filter-label">
          Search Products
        </label>
        <div className="search-input-wrapper">
          <span className="search-icon" aria-hidden="true">
            🔍
          </span>
          <input
            id="search-input"
            type="search"
            className="search-input"
            placeholder="Search by title, brand, category..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search products by title, brand, or category"
          />
        </div>
      </div>

      <div className="filter-group">
        <label htmlFor="category-select" className="filter-label">
          Category
        </label>
        <select
          id="category-select"
          className="select-input"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          aria-label="Filter products by category"
        >
          <option value="all">All categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-select" className="filter-label">
          Sort By
        </label>
        <select
          id="sort-select"
          className="select-input"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          aria-label="Sort products by criteria"
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
          <option value="title-asc">Name: A-Z</option>
        </select>
      </div>

      {hasActiveFilters && (
        <div className="filter-group filter-group--reset">
          <label className="filter-label filter-label--hidden" aria-hidden="true">
            Reset
          </label>
          <button
            type="button"
            className="btn btn--secondary btn--reset"
            onClick={onResetFilters}
            aria-label="Clear all active filters"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

