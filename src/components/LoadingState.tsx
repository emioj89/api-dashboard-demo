import React from 'react';

export const LoadingState: React.FC = () => {
  return (
    <div className="state-container loading-state" role="status" aria-label="Loading products">
      <div className="skeleton-grid">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="skeleton-card">
            <div className="skeleton-image" />
            <div className="skeleton-body">
              <div className="skeleton-line skeleton-line--short" />
              <div className="skeleton-line skeleton-line--title" />
              <div className="skeleton-line skeleton-line--medium" />
              <div className="skeleton-footer">
                <div className="skeleton-line skeleton-line--price" />
                <div className="skeleton-line skeleton-line--badge" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="loading-text">Fetching product catalog from REST API...</p>
    </div>
  );
};

