import React from 'react';

export const DashboardHeader: React.FC = () => {
  return (
    <header className="dashboard-header">
      <div className="header-brand">
        <div className="brand-icon" aria-hidden="true">
          ⚡
        </div>
        <div>
          <h1 className="header-title">Product Analytics Dashboard</h1>
          <p className="header-subtitle">
            Real-time catalog monitoring, inventory control & market performance
          </p>
        </div>
      </div>
      <div className="header-status">
        <span className="status-badge" aria-label="API System Status: Live Data">
          <span className="status-dot" aria-hidden="true" /> Live REST API
        </span>
      </div>
    </header>
  );
};

