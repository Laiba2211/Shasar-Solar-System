import React from "react";
import {
  CalendarDays,
  ChevronDown,
  RefreshCw,
} from "lucide-react";

const DashboardHeader = ({
  dateFilter,
  onDateFilterChange,
  onRefresh,
  loading,
}) => {
  const dateOptions = [
    {
      value: "today",
      label: "Today",
    },
    {
      value: "yesterday",
      label: "Yesterday",
    },
    {
      value: "last_7_days",
      label: "Last 7 Days",
    },
    {
      value: "last_30_days",
      label: "Last 30 Days",
    },
    {
      value: "this_month",
      label: "This Month",
    },
    {
      value: "last_month",
      label: "Last Month",
    },
    {
      value: "this_year",
      label: "This Year",
    },
    {
      value: "all_time",
      label: "All Time",
    },
    {
      value: "custom",
      label: "Custom Range",
    },
  ];

  const selectedOption =
    dateOptions.find((option) => option.value === dateFilter) ||
    dateOptions[3];

  return (
    <header className="dashboard-header">
      <div className="dashboard-header-content">
        <div className="dashboard-header-left">
          <div className="dashboard-header-title-row">
            <div className="dashboard-header-icon">
              <CalendarDays size={22} strokeWidth={2} />
            </div>

            <div>
              <h1 className="dashboard-title">
                Dashboard
              </h1>

              <p className="dashboard-subtitle">
                Overview of your solar business performance
              </p>
            </div>
          </div>
        </div>

        <div className="dashboard-header-actions">
          <div className="dashboard-date-filter">
            <CalendarDays
              className="dashboard-filter-icon"
              size={17}
              strokeWidth={2}
            />

            <select
              value={dateFilter}
              onChange={(event) =>
                onDateFilterChange(event.target.value)
              }
              className="dashboard-date-select"
              aria-label="Dashboard date filter"
            >
              {dateOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>

            <ChevronDown
              className="dashboard-select-chevron"
              size={16}
              strokeWidth={2}
            />
          </div>

          <button
            type="button"
            className="dashboard-refresh-btn"
            onClick={onRefresh}
            disabled={loading}
            aria-label="Refresh dashboard"
            title="Refresh dashboard"
          >
            <RefreshCw
              size={17}
              strokeWidth={2}
              className={
                loading
                  ? "dashboard-refresh-icon spinning"
                  : "dashboard-refresh-icon"
              }
            />

            <span>
              {loading ? "Refreshing..." : "Refresh"}
            </span>
          </button>
        </div>
      </div>

      <div className="dashboard-header-meta">
        <span className="dashboard-current-filter">
          <span className="dashboard-meta-dot" />
          Showing: {selectedOption.label}
        </span>
      </div>
    </header>
  );
};

export default DashboardHeader;