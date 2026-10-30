import React, { useMemo } from "react";
import {
  BarChart3,
  BatteryCharging,
  Building2,
  Car,
  CircleHelp,
  Factory,
  Home,
  Settings2,
  Sparkles,
  Sun,
  Wrench,
} from "lucide-react";

const DEMAND_CONFIG = {
  "Residential Solar": {
    label: "Residential Solar",
    icon: Home,
    className: "demand-residential",
  },
  "Commercial Solar": {
    label: "Commercial Solar",
    icon: Building2,
    className: "demand-commercial",
  },
  "Industrial Solar": {
    label: "Industrial Solar",
    icon: Factory,
    className: "demand-industrial",
  },
  "Solar Battery Storage": {
    label: "Battery Storage",
    icon: BatteryCharging,
    className: "demand-battery",
  },
  "Solar Maintenance": {
    label: "Solar Maintenance",
    icon: Wrench,
    className: "demand-maintenance",
  },
  "Solar Cleaning": {
    label: "Solar Cleaning",
    icon: Sparkles,
    className: "demand-cleaning",
  },
  "EV Charging": {
    label: "EV Charging",
    icon: Car,
    className: "demand-ev",
  },
  "Solar Consultation": {
    label: "Solar Consultation",
    icon: Sun,
    className: "demand-consultation",
  },
  Other: {
    label: "Other",
    icon: CircleHelp,
    className: "demand-other",
  },
};

const DEFAULT_ORDER = [
  "Residential Solar",
  "Commercial Solar",
  "Industrial Solar",
  "Solar Battery Storage",
  "Solar Maintenance",
  "Solar Cleaning",
  "EV Charging",
  "Solar Consultation",
  "Other",
];

const CustomerDemand = ({
  data = [],
  loading = false,
}) => {
  const normalizedData = useMemo(() => {
    const source = Array.isArray(data) ? data : [];

    const demandMap = new Map();

    source.forEach((item) => {
      if (!item || typeof item.projectType !== "string") {
        return;
      }

      const projectType = item.projectType.trim();

      if (!projectType) {
        return;
      }

      demandMap.set(
        projectType,
        (demandMap.get(projectType) || 0) +
          (Number(item.count) || 0)
      );
    });

    return DEFAULT_ORDER.map((projectType) => ({
      projectType,
      count: demandMap.get(projectType) || 0,
    })).filter((item) => {
      return (
        item.count > 0 ||
        demandMap.has(item.projectType)
      );
    });
  }, [data]);

  const totalDemand = useMemo(() => {
    return normalizedData.reduce(
      (total, item) => total + item.count,
      0
    );
  }, [normalizedData]);

  const maxDemand = useMemo(() => {
    if (!normalizedData.length) {
      return 0;
    }

    return Math.max(
      ...normalizedData.map((item) => item.count)
    );
  }, [normalizedData]);

  const getPercentage = (count) => {
    if (!totalDemand) {
      return 0;
    }

    return Math.round(
      (count / totalDemand) * 100
    );
  };

  return (
    <section className="dashboard-panel customer-demand-panel">
      <div className="dashboard-panel-header">
        <div className="dashboard-panel-heading">
          <div className="dashboard-panel-icon customer-demand-icon">
            <BarChart3
              size={19}
              strokeWidth={2}
            />
          </div>

          <div>
            <h2 className="dashboard-panel-title">
              Customer Demand
            </h2>

            <p className="dashboard-panel-subtitle">
              Service interests from customer inquiries
            </p>
          </div>
        </div>

        <div className="dashboard-panel-summary">
          <span className="dashboard-panel-summary-label">
            Requests
          </span>

          <strong className="dashboard-panel-summary-value">
            {loading ? "—" : totalDemand}
          </strong>
        </div>
      </div>

      <div className="dashboard-demand-list">
        {loading ? (
          DEFAULT_ORDER.slice(0, 6).map(
            (projectType) => (
              <div
                className="dashboard-demand-item dashboard-demand-loading"
                key={projectType}
              >
                <div className="dashboard-demand-left">
                  <div className="dashboard-demand-icon-skeleton" />

                  <div className="dashboard-demand-text-skeleton">
                    <span />
                    <span />
                  </div>
                </div>

                <div className="dashboard-demand-value-skeleton" />
              </div>
            )
          )
        ) : normalizedData.length === 0 ? (
          <div className="dashboard-empty-state dashboard-demand-empty">
            <BarChart3
              size={30}
              strokeWidth={1.7}
            />

            <h3>No demand data</h3>

            <p>
              No customer service requests were found
              for the selected period.
            </p>
          </div>
        ) : (
          normalizedData.map((item) => {
            const config =
              DEMAND_CONFIG[item.projectType] || {
                label: item.projectType,
                icon: Settings2,
                className: "demand-other",
              };

            const Icon = config.icon;

            const percentage = getPercentage(
              item.count
            );

            const barPercentage =
              maxDemand > 0
                ? Math.round(
                    (item.count / maxDemand) * 100
                  )
                : 0;

            return (
              <div
                className="dashboard-demand-item"
                key={item.projectType}
              >
                <div className="dashboard-demand-left">
                  <div
                    className={`dashboard-demand-icon ${config.className}`}
                  >
                    <Icon
                      size={17}
                      strokeWidth={2}
                    />
                  </div>

                  <div className="dashboard-demand-info">
                    <div className="dashboard-demand-title-row">
                      <span className="dashboard-demand-name">
                        {config.label}
                      </span>

                      <span className="dashboard-demand-count">
                        {item.count}
                      </span>
                    </div>

                    <div className="dashboard-demand-progress">
                      <div
                        className={`dashboard-demand-progress-bar ${config.className}`}
                        style={{
                          width: `${barPercentage}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <span className="dashboard-demand-percentage">
                  {percentage}%
                </span>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default CustomerDemand;