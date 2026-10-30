import React, { useMemo } from "react";
import {
  CheckCircle2,
  CircleDot,
  Clock3,
  MessageSquare,
  PhoneCall,
} from "lucide-react";

const STATUS_CONFIG = {
  new: {
    label: "New",
    icon: CircleDot,
    className: "status-new",
  },
  contacted: {
    label: "Contacted",
    icon: PhoneCall,
    className: "status-contacted",
  },
  qualified: {
    label: "Qualified",
    icon: CheckCircle2,
    className: "status-qualified",
  },
  converted: {
    label: "Converted",
    icon: CheckCircle2,
    className: "status-converted",
  },
  closed: {
    label: "Closed",
    icon: Clock3,
    className: "status-closed",
  },
};

const DEFAULT_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "converted",
  "closed",
];

const InquiryStatus = ({
  data = [],
  loading = false,
}) => {
  const normalizedData = useMemo(() => {
    const source = Array.isArray(data) ? data : [];

    const statusMap = new Map();

    source.forEach((item) => {
      if (!item || typeof item.status !== "string") {
        return;
      }

      const status = item.status.toLowerCase();

      statusMap.set(status, Number(item.count) || 0);
    });

    return DEFAULT_STATUSES.map((status) => ({
      status,
      count: statusMap.get(status) || 0,
    }));
  }, [data]);

  const total = useMemo(() => {
    return normalizedData.reduce(
      (sum, item) => sum + item.count,
      0
    );
  }, [normalizedData]);

  const getPercentage = (count) => {
    if (!total) {
      return 0;
    }

    return Math.round((count / total) * 100);
  };

  return (
    <section className="dashboard-panel inquiry-status-panel">
      <div className="dashboard-panel-header">
        <div className="dashboard-panel-heading">
          <div className="dashboard-panel-icon inquiry-status-icon">
            <MessageSquare
              size={19}
              strokeWidth={2}
            />
          </div>

          <div>
            <h2 className="dashboard-panel-title">
              Inquiry Status
            </h2>

            <p className="dashboard-panel-subtitle">
              Current inquiry pipeline breakdown
            </p>
          </div>
        </div>

        <div className="dashboard-panel-summary">
          <span className="dashboard-panel-summary-label">
            Total
          </span>

          <strong className="dashboard-panel-summary-value">
            {loading ? "—" : total}
          </strong>
        </div>
      </div>

      <div className="dashboard-status-list">
        {loading ? (
          DEFAULT_STATUSES.map((status) => (
            <div
              className="dashboard-status-item dashboard-status-loading"
              key={status}
            >
              <div className="dashboard-status-left">
                <div className="dashboard-status-icon-skeleton" />

                <div className="dashboard-status-text-skeleton">
                  <span />
                  <span />
                </div>
              </div>

              <div className="dashboard-status-value-skeleton" />
            </div>
          ))
        ) : (
          normalizedData.map((item) => {
            const config =
              STATUS_CONFIG[item.status] ||
              STATUS_CONFIG.new;

            const Icon = config.icon;

            const percentage = getPercentage(
              item.count
            );

            return (
              <div
                className="dashboard-status-item"
                key={item.status}
              >
                <div className="dashboard-status-left">
                  <div
                    className={`dashboard-status-icon ${config.className}`}
                  >
                    <Icon
                      size={17}
                      strokeWidth={2}
                    />
                  </div>

                  <div className="dashboard-status-info">
                    <div className="dashboard-status-title-row">
                      <span className="dashboard-status-name">
                        {config.label}
                      </span>

                      <span className="dashboard-status-count">
                        {item.count}
                      </span>
                    </div>

                    <div className="dashboard-status-progress">
                      <div
                        className={`dashboard-status-progress-bar ${config.className}`}
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <span className="dashboard-status-percentage">
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

export default InquiryStatus;