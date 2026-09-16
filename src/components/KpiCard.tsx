import React from 'react';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: string;
  subtext?: string;
  badgeType?: 'default' | 'warning' | 'success';
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  icon,
  subtext,
  badgeType = 'default',
}) => {
  return (
    <div className={`kpi-card kpi-card--${badgeType}`}>
      <div className="kpi-header">
        <span className="kpi-title">{title}</span>
        <span className="kpi-icon" aria-hidden="true">
          {icon}
        </span>
      </div>
      <div className="kpi-value">{value}</div>
      {subtext && <div className="kpi-subtext">{subtext}</div>}
    </div>
  );
};

