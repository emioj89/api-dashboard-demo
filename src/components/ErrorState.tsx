import React from 'react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="state-container error-state" role="alert">
      <div className="state-icon error-icon" aria-hidden="true">
        ⚠️
      </div>
      <h2 className="state-title">Unable to Load Products</h2>
      <p className="state-description">{message}</p>
      <button
        type="button"
        className="btn btn--primary"
        onClick={onRetry}
        aria-label="Retry loading products"
      >
        Retry Fetching
      </button>
    </div>
  );
};

