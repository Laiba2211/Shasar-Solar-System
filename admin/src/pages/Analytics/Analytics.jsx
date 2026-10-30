import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Activity,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Clock3,
  Eye,
  FileText,
  Filter,
  FolderKanban,
  Inbox,
  Layers3,
  MessageSquare,
  RefreshCw,
  Search,
  Settings2,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";

import "./Analytics.css";

// ==========================================================
// API CONFIG
// ==========================================================

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

// ==========================================================
// HELPERS
// ==========================================================

const getAdminToken = () => {
  return (
    localStorage.getItem("adminToken") ||
    sessionStorage.getItem("adminToken") ||
    localStorage.getItem("token") ||
    sessionStorage.getItem("token") ||
    ""
  );
};

const formatNumber = (value) => {
  return new Intl.NumberFormat(
    "en-US"
  ).format(Number(value) || 0);
};

const formatDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString(
    "en-US",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

const formatDateTime = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleString(
    "en-US",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
};

const capitalize = (value) => {
  if (!value) return "";

  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );
};

// ==========================================================
// KPI CARD
// ==========================================================

const KpiCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className = "",
}) => {
  return (
    <div
      className={`analytics-kpi-card ${className}`}
    >
      <div className="analytics-kpi-top">
        <div className="analytics-kpi-icon">
          <Icon size={21} />
        </div>

        {trend && (
          <span className="analytics-kpi-trend">
            {trend}
          </span>
        )}
      </div>

      <div className="analytics-kpi-value">
        {formatNumber(value)}
      </div>

      <div className="analytics-kpi-title">
        {title}
      </div>

      {subtitle && (
        <div className="analytics-kpi-subtitle">
          {subtitle}
        </div>
      )}
    </div>
  );
};

// ==========================================================
// SECTION CARD
// ==========================================================

const SectionCard = ({
  title,
  subtitle,
  icon: Icon,
  children,
  className = "",
  actions,
}) => {
  return (
    <section
      className={`analytics-section-card ${className}`}
    >
      <div className="analytics-section-header">
        <div className="analytics-section-heading">
          {Icon && (
            <div className="analytics-section-icon">
              <Icon size={18} />
            </div>
          )}

          <div>
            <h3>{title}</h3>

            {subtitle && (
              <p>{subtitle}</p>
            )}
          </div>
        </div>

        {actions && (
          <div className="analytics-section-actions">
            {actions}
          </div>
        )}
      </div>

      <div className="analytics-section-body">
        {children}
      </div>
    </section>
  );
};

// ==========================================================
// STATUS ROW
// ==========================================================

const StatusRow = ({
  label,
  value,
  total,
  status,
}) => {
  const safeTotal =
    Number(total) || 0;

  const safeValue =
    Number(value) || 0;

  const percentage =
    safeTotal > 0
      ? Math.round(
          (safeValue / safeTotal) *
            100
        )
      : 0;

  return (
    <div className="analytics-status-row">
      <div className="analytics-status-info">
        <div
          className={`analytics-status-dot status-${status}`}
        />

        <span>
          {label}
        </span>

        <strong>
          {formatNumber(value)}
        </strong>
      </div>

      <div className="analytics-status-progress">
        <div className="analytics-status-track">
          <div
            className={`analytics-status-fill status-${status}`}
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>

        <span>
          {percentage}%
        </span>
      </div>
    </div>
  );
};

// ==========================================================
// TREND BAR
// ==========================================================

const TrendBar = ({
  label,
  value,
  max,
}) => {
  const safeValue =
    Number(value) || 0;

  const safeMax =
    Number(max) || 0;

  const percentage =
    safeMax > 0
      ? Math.max(
          4,
          (safeValue / safeMax) *
            100
        )
      : 4;

  return (
    <div className="analytics-trend-item">
      <div className="analytics-trend-label">
        {label}
      </div>

      <div className="analytics-trend-bar-wrapper">
        <div className="analytics-trend-track">
          <div
            className="analytics-trend-fill"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>

        <strong>
          {formatNumber(value)}
        </strong>
      </div>
    </div>
  );
};

// ==========================================================
// BREAKDOWN ROW
// ==========================================================

const BreakdownRow = ({
  label,
  value,
  total,
}) => {
  const safeValue =
    Number(value) || 0;

  const safeTotal =
    Number(total) || 0;

  const percentage =
    safeTotal > 0
      ? Math.round(
          (safeValue / safeTotal) *
            100
        )
      : 0;

  return (
    <div className="analytics-breakdown-row">
      <div className="analytics-breakdown-top">
        <span>{label}</span>

        <strong>
          {formatNumber(value)}
        </strong>
      </div>

      <div className="analytics-breakdown-track">
        <div
          className="analytics-breakdown-fill"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
};

// ==========================================================
// MAIN COMPONENT
// ==========================================================

const Analytics = () => {
  // ========================================================
  // STATE
  // ========================================================

  const [analytics, setAnalytics] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  const [dateFilter, setDateFilter] =
    useState("30d");

  const [customFrom, setCustomFrom] =
    useState("");

  const [customTo, setCustomTo] =
    useState("");

  // ========================================================
  // FETCH ANALYTICS
  // ========================================================

  const fetchAnalytics = async (
    showRefreshing = false
  ) => {
    try {
      if (showRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const params =
        new URLSearchParams();

      params.set(
        "date",
        dateFilter
      );

      if (dateFilter === "custom") {
        if (
          customFrom &&
          customTo
        ) {
          params.set(
            "from",
            customFrom
          );

          params.set(
            "to",
            customTo
          );
        }
      }

      const token =
        getAdminToken();

      const headers = {
        "Content-Type":
          "application/json",
      };

      if (token) {
        headers.Authorization =
          `Bearer ${token}`;
      }

      const response =
        await fetch(
          `${API_BASE_URL}/api/analytics/overview?${params.toString()}`,
          {
            method: "GET",
            headers,
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to load analytics."
        );
      }

      if (!result.success) {
        throw new Error(
          result.message ||
            "Analytics request failed."
        );
      }

      setAnalytics(
        result.data
      );
    } catch (err) {
      console.error(
        "Analytics fetch error:",
        err
      );

      setError(
        err.message ||
          "Failed to load analytics."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ========================================================
  // INITIAL / FILTER FETCH
  // ========================================================

  useEffect(() => {
    if (
      dateFilter === "custom" &&
      (!customFrom || !customTo)
    ) {
      return;
    }

    fetchAnalytics();
  }, [
    dateFilter,
    customFrom,
    customTo,
  ]);

  // ========================================================
  // SAFE DATA
  // ========================================================

  const inquiries =
    analytics?.inquiries || {};

  const projects =
    analytics?.projects || {};

  const services =
    analytics?.services || {};

  const statusDistribution =
    inquiries.statusDistribution ||
    [];

  const inquiryTrend =
    inquiries.trend || [];

  const recentInquiries =
    inquiries.recent || [];

  const projectByType =
    projects.byType || [];

  const projectByYear =
    projects.byYear || [];

  const serviceByCategory =
    services.byCategory || [];

  // ========================================================
  // TREND MAX
  // ========================================================

  const trendMax = useMemo(() => {
    if (!inquiryTrend.length) {
      return 0;
    }

    return Math.max(
      ...inquiryTrend.map(
        (item) =>
          Number(item.count) || 0
      )
    );
  }, [inquiryTrend]);

  // ========================================================
  // TOTALS
  // ========================================================

  const inquiryTotal =
    Number(inquiries.total) ||
    0;

  const projectTotal =
    Number(projects.total) ||
    0;

  const serviceTotal =
    Number(services.total) ||
    0;

  // ========================================================
  // LOADING
  // ========================================================

  if (loading && !analytics) {
    return (
      <div className="analytics-page">
        <div className="analytics-loading">
          <div className="analytics-loading-spinner">
            <RefreshCw
              size={26}
              className="spin"
            />
          </div>

          <h3>
            Loading analytics
          </h3>

          <p>
            Fetching live data from
            your Shasar Solar System
            database...
          </p>
        </div>
      </div>
    );
  }

  // ========================================================
  // ERROR
  // ========================================================

  if (error && !analytics) {
    return (
      <div className="analytics-page">
        <div className="analytics-error">
          <div className="analytics-error-icon">
            <CircleAlert
              size={28}
            />
          </div>

          <h3>
            Analytics could not
            be loaded
          </h3>

          <p>{error}</p>

          <button
            type="button"
            className="analytics-primary-btn"
            onClick={() =>
              fetchAnalytics(
                true
              )
            }
          >
            <RefreshCw
              size={17}
            />

            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ========================================================
  // RENDER
  // ========================================================

  return (
    <div className="analytics-page">
      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="analytics-page-header">
        <div>
          <div className="analytics-eyebrow">
            <Activity
              size={15}
            />

            BUSINESS INTELLIGENCE
          </div>

          <h1>
            Analytics
          </h1>

          <p>
            Monitor inquiries,
            projects and services
            using live MongoDB data.
          </p>
        </div>

        <div className="analytics-header-actions">
          <button
            type="button"
            className="analytics-refresh-btn"
            onClick={() =>
              fetchAnalytics(
                true
              )
            }
            disabled={refreshing}
          >
            <RefreshCw
              size={17}
              className={
                refreshing
                  ? "spin"
                  : ""
              }
            />

            {refreshing
              ? "Refreshing..."
              : "Refresh"}
          </button>
        </div>
      </div>

      {/* ==================================================
          FILTER BAR
      ================================================== */}

      <div className="analytics-filter-bar">
        <div className="analytics-filter-label">
          <Filter
            size={16}
          />

          <span>
            Reporting period
          </span>
        </div>

        <div className="analytics-filter-controls">
          <div className="analytics-select-wrapper">
            <CalendarDays
              size={16}
            />

            <select
              value={dateFilter}
              onChange={(event) =>
                setDateFilter(
                  event.target.value
                )
              }
            >
              <option value="today">
                Today
              </option>

              <option value="yesterday">
                Yesterday
              </option>

              <option value="7d">
                Last 7 Days
              </option>

              <option value="30d">
                Last 30 Days
              </option>

              <option value="this_month">
                This Month
              </option>

              <option value="last_month">
                Last Month
              </option>

              <option value="this_year">
                This Year
              </option>

              <option value="all">
                All Time
              </option>

              <option value="custom">
                Custom Range
              </option>
            </select>

            <ChevronDown
              size={15}
            />
          </div>

          {dateFilter ===
            "custom" && (
            <>
              <input
                type="date"
                value={
                  customFrom
                }
                onChange={(event) =>
                  setCustomFrom(
                    event.target
                      .value
                  )
                }
              />

              <span className="analytics-date-separator">
                to
              </span>

              <input
                type="date"
                value={
                  customTo
                }
                onChange={(event) =>
                  setCustomTo(
                    event.target
                      .value
                  )
                }
              />
            </>
          )}
        </div>
      </div>

      {/* ==================================================
          ERROR BANNER
      ================================================== */}

      {error && (
        <div className="analytics-error-banner">
          <CircleAlert
            size={18}
          />

          <span>{error}</span>

          <button
            type="button"
            onClick={() =>
              fetchAnalytics(
                true
              )
            }
          >
            Retry
          </button>
        </div>
      )}

      {/* ==================================================
          KPI CARDS
      ================================================== */}

      <div className="analytics-kpi-grid">
        <KpiCard
          title="Total Inquiries"
          value={
            inquiries.total
          }
          subtitle="Contact submissions"
          icon={Inbox}
        />

        <KpiCard
          title="Unread Inquiries"
          value={
            inquiries.unread
          }
          subtitle="Awaiting review"
          icon={MessageSquare}
        />

        <KpiCard
          title="Total Projects"
          value={
            projects.total
          }
          subtitle="Projects in database"
          icon={FolderKanban}
        />

        <KpiCard
          title="Total Services"
          value={
            services.total
          }
          subtitle="Services in database"
          icon={Layers3}
        />
      </div>

      {/* ==================================================
          INQUIRY ANALYTICS
      ================================================== */}

      <div className="analytics-grid analytics-grid-two">
        {/* STATUS DISTRIBUTION */}

        <SectionCard
          title="Inquiry Status"
          subtitle="Current status distribution"
          icon={BarChart3}
        >
          <div className="analytics-summary-number">
            {formatNumber(
              inquiryTotal
            )}

            <span>
              total inquiries
            </span>
          </div>

          <div className="analytics-status-list">
            {statusDistribution.length >
            0 ? (
              statusDistribution.map(
                (item) => (
                  <StatusRow
                    key={
                      item.status
                    }
                    label={capitalize(
                      item.status
                    )}
                    status={
                      item.status
                    }

                    /*
                      IMPORTANT FIX:
                      Backend returns `count`,
                      NOT `total`.
                    */

                    value={
                      item.count
                    }

                    total={
                      inquiryTotal
                    }
                  />
                )
              )
            ) : (
              <div className="analytics-empty">
                No inquiry status
                data available.
              </div>
            )}
          </div>
        </SectionCard>

        {/* INQUIRY TREND */}

        <SectionCard
          title="Inquiry Trend"
          subtitle={
            analytics?.reporting
              ?.timezone
              ? `Timezone: ${analytics.reporting.timezone}`
              : "Daily inquiry volume"
          }
          icon={TrendingUp}
        >
          <div className="analytics-summary-number">
            {formatNumber(
              inquiryTotal
            )}

            <span>
              inquiries in period
            </span>
          </div>

          <div className="analytics-trend-list">
            {inquiryTrend.length >
            0 ? (
              inquiryTrend.map(
                (item) => (
                  <TrendBar
                    key={
                      item.date
                    }
                    label={formatDate(
                      item.date
                    )}

                    /*
                      IMPORTANT FIX:
                      Backend returns `count`.
                    */

                    value={
                      item.count
                    }

                    max={
                      trendMax
                    }
                  />
                )
              )
            ) : (
              <div className="analytics-empty">
                No trend data
                available for this
                period.
              </div>
            )}
          </div>
        </SectionCard>
      </div>

      {/* ==================================================
          PROJECT + SERVICE OVERVIEW
      ================================================== */}

      <div className="analytics-grid analytics-grid-two">
        {/* PROJECTS */}

        <SectionCard
          title="Projects Overview"
          subtitle="Live project database breakdown"
          icon={FolderKanban}
        >
          <div className="analytics-mini-stats">
            <div>
              <span>
                Total
              </span>

              <strong>
                {formatNumber(
                  projects.total
                )}
              </strong>
            </div>

            <div>
              <span>
                Active
              </span>

              <strong>
                {formatNumber(
                  projects.active
                )}
              </strong>
            </div>

            <div>
              <span>
                Featured
              </span>

              <strong>
                {formatNumber(
                  projects.featured
                )}
              </strong>
            </div>
          </div>

          <div className="analytics-subsection">
            <div className="analytics-subsection-title">
              By Project Type
            </div>

            {projectByType.length >
            0 ? (
              projectByType.map(
                (item) => (
                  <BreakdownRow
                    key={
                      item.type
                    }
                    label={
                      item.type ||
                      "Uncategorized"
                    }

                    /*
                      IMPORTANT FIX:
                      Backend returns `count`.
                    */

                    value={
                      item.count
                    }

                    total={
                      projectTotal
                    }
                  />
                )
              )
            ) : (
              <div className="analytics-empty">
                No project type
                data available.
              </div>
            )}
          </div>
        </SectionCard>

        {/* SERVICES */}

        <SectionCard
          title="Services Overview"
          subtitle="Live service database breakdown"
          icon={Settings2}
        >
          <div className="analytics-mini-stats">
            <div>
              <span>
                Total
              </span>

              <strong>
                {formatNumber(
                  services.total
                )}
              </strong>
            </div>

            <div>
              <span>
                Active
              </span>

              <strong>
                {formatNumber(
                  services.active
                )}
              </strong>
            </div>

            <div>
              <span>
                Featured
              </span>

              <strong>
                {formatNumber(
                  services.featured
                )}
              </strong>
            </div>
          </div>

          <div className="analytics-subsection">
            <div className="analytics-subsection-title">
              By Category
            </div>

            {serviceByCategory.length >
            0 ? (
              serviceByCategory.map(
                (item) => (
                  <BreakdownRow
                    key={
                      item.category
                    }
                    label={
                      item.category ||
                      "Uncategorized"
                    }

                    /*
                      IMPORTANT FIX:
                      Backend returns `count`.
                    */

                    value={
                      item.count
                    }

                    total={
                      serviceTotal
                    }
                  />
                )
              )
            ) : (
              <div className="analytics-empty">
                No service category
                data available.
              </div>
            )}
          </div>
        </SectionCard>
      </div>

      {/* ==================================================
          PROJECT YEAR BREAKDOWN
      ================================================== */}

      <SectionCard
        title="Projects by Year"
        subtitle="Project distribution across recorded years"
        icon={CalendarDays}
      >
        {projectByYear.length >
        0 ? (
          <div className="analytics-year-grid">
            {projectByYear.map(
              (item) => (
                <div
                  className="analytics-year-card"
                  key={
                    item.year
                  }
                >
                  <span>
                    {item.year}
                  </span>

                  <strong>
                    {formatNumber(
                      item.count
                    )}
                  </strong>

                  <small>
                    projects
                  </small>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="analytics-empty">
            No project year data
            available.
          </div>
        )}
      </SectionCard>

      {/* ==================================================
          RECENT INQUIRIES
      ================================================== */}

      <SectionCard
        title="Recent Inquiries"
        subtitle="Latest contact submissions from the database"
        icon={Inbox}
        actions={
          <span className="analytics-live-badge">
            <span />
            Live
          </span>
        }
      >
        {recentInquiries.length >
        0 ? (
          <div className="analytics-table-wrapper">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>
                    Client
                  </th>

                  <th>
                    Company
                  </th>

                  <th>
                    Project Type
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Read
                  </th>

                  <th>
                    Created
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentInquiries.map(
                  (inquiry) => (
                    <tr
                      key={
                        inquiry._id
                      }
                    >
                      <td>
                        <div className="analytics-client-cell">
                          <div className="analytics-client-avatar">
                            {(
                              inquiry.fullName ||
                              "?"
                            )
                              .charAt(
                                0
                              )
                              .toUpperCase()}
                          </div>

                          <div>
                            <strong>
                              {inquiry.fullName ||
                                "Unknown Client"}
                            </strong>

                            <span>
                              {inquiry.email ||
                                "No email"}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>
                        {inquiry.companyName ||
                          "—"}
                      </td>

                      <td>
                        {inquiry.projectType ||
                          "—"}
                      </td>

                      <td>
                        <span
                          className={`analytics-table-status status-${
                            (
                              inquiry.status ||
                              "new"
                            )
                              .toLowerCase()
                              .trim()
                          }`}
                        >
                          {capitalize(
                            inquiry.status ||
                              "new"
                          )}
                        </span>
                      </td>

                      <td>
                        {inquiry.isRead ? (
                          <span className="analytics-read-state read">
                            <Eye
                              size={14}
                            />
                            Read
                          </span>
                        ) : (
                          <span className="analytics-read-state unread">
                            <span />
                            Unread
                          </span>
                        )}
                      </td>

                      <td>
                        <div className="analytics-created-cell">
                          <strong>
                            {formatDate(
                              inquiry.createdAt
                            )}
                          </strong>

                          <span>
                            {formatDateTime(
                              inquiry.createdAt
                            )}
                          </span>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="analytics-empty analytics-empty-large">
            <Inbox
              size={30}
            />

            <h4>
              No inquiries found
            </h4>

            <p>
              There are no inquiries
              inside the selected
              reporting period.
            </p>
          </div>
        )}
      </SectionCard>

      {/* ==================================================
          DATA SOURCE FOOTER
      ================================================== */}

      <div className="analytics-footer">
        <div>
          <CheckCircle2
            size={16}
          />

          <span>
            Analytics connected to
            live MongoDB data
          </span>
        </div>

        <div>
          <Clock3
            size={15}
          />

          <span>
            {analytics?.reporting
              ?.from
              ? `${formatDate(
                  analytics.reporting
                    .from
                )} — ${formatDate(
                  analytics.reporting
                    .to
                )}`
              : "All available records"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Analytics;