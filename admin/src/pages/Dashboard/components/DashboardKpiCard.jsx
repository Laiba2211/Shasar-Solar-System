import React from "react";

const DashboardKpiCard = ({
  title,
  value,
  description,
  icon: Icon,
  iconClass = "",
  loading = false,
}) => {
  return (
    <article className="dashboard-kpi-card">
      <div className="dashboard-kpi-card-top">
        <div className={`dashboard-kpi-icon ${iconClass}`}>
          {Icon ? (
            <Icon size={21} strokeWidth={2} />
          ) : null}
        </div>
      </div>

      <div className="dashboard-kpi-content">
        <p className="dashboard-kpi-title">
          {title}
        </p>

        {loading ? (
          <div className="dashboard-kpi-skeleton-value" />
        ) : (
          <h2 className="dashboard-kpi-value">
            {value ?? 0}
          </h2>
        )}

        {description && (
          <p className="dashboard-kpi-description">
            {description}
          </p>
        )}
      </div>
    </article>
  );
};

export default DashboardKpiCard;