import React from 'react';

interface EmptyStateProps {
  onResetFilters: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onResetFilters }) => {
  return (
    <div className="state-container empty-state">
      <div className="state-icon empty-icon" aria-hidden="true">
        🔍
      </div>
      <h2 className="state-title">No Products Found</h2>
      <p className="state-description">
        No products match your current search query or filter criteria. Try adjusting your filters or search terms.
      </p>
      <button
        type="button"
        className="btn btn--secondary"
        onClick={onResetFilters}
        aria-label="Reset all search filters"
      >
        Clear All Filters
      </button>
    </div>
  );
};

