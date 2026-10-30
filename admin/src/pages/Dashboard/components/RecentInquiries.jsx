import React from "react";
import {
  ArrowRight,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const STATUS_CONFIG = {
  new: {
    label: "New",
    className: "inquiry-status-new",
  },
  contacted: {
    label: "Contacted",
    className: "inquiry-status-contacted",
  },
  qualified: {
    label: "Qualified",
    className: "inquiry-status-qualified",
  },
  converted: {
    label: "Converted",
    className: "inquiry-status-converted",
  },
  closed: {
    label: "Closed",
    className: "inquiry-status-closed",
  },
};

const RecentInquiries = ({
  data = [],
  loading = false,
}) => {
  const navigate = useNavigate();

  const inquiries = Array.isArray(data)
    ? data.slice(0, 5)
    : [];

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "—";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getInitials = (name) => {
    if (!name || typeof name !== "string") {
      return "—";
    }

    const parts = name
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (!parts.length) {
      return "—";
    }

    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }

    return (
      parts[0][0] +
      parts[parts.length - 1][0]
    ).toUpperCase();
  };

  const getStatus = (status) => {
    const normalizedStatus =
      typeof status === "string"
        ? status.toLowerCase()
        : "new";

    return (
      STATUS_CONFIG[normalizedStatus] || {
        label: status || "Unknown",
        className: "inquiry-status-default",
      }
    );
  };

  return (
    <section className="dashboard-panel recent-inquiries-panel">
      <div className="dashboard-panel-header">
        <div className="dashboard-panel-heading">
          <div className="dashboard-panel-icon recent-inquiries-icon">
            <MessageSquare
              size={19}
              strokeWidth={2}
            />
          </div>

          <div>
            <h2 className="dashboard-panel-title">
              Recent Inquiries
            </h2>

            <p className="dashboard-panel-subtitle">
              Latest customer inquiries
            </p>
          </div>
        </div>

        <button
          type="button"
          className="dashboard-view-all-btn"
          onClick={() => navigate("/admin/inquiries")}
        >
          View All
          <ArrowRight
            size={15}
            strokeWidth={2}
          />
        </button>
      </div>

      <div className="dashboard-table-wrapper">
        {loading ? (
          <div className="dashboard-table-loading">
            {Array.from({ length: 5 }).map(
              (_, index) => (
                <div
                  className="dashboard-inquiry-skeleton-row"
                  key={index}
                >
                  <div className="dashboard-skeleton dashboard-skeleton-avatar" />

                  <div className="dashboard-skeleton dashboard-skeleton-wide" />

                  <div className="dashboard-skeleton dashboard-skeleton-medium" />

                  <div className="dashboard-skeleton dashboard-skeleton-small" />

                  <div className="dashboard-skeleton dashboard-skeleton-status" />
                </div>
              )
            )}
          </div>
        ) : inquiries.length === 0 ? (
          <div className="dashboard-empty-state">
            <MessageSquare
              size={30}
              strokeWidth={1.7}
            />

            <h3>No recent inquiries</h3>

            <p>
              New customer inquiries will appear here.
            </p>
          </div>
        ) : (
          <div className="dashboard-responsive-table">
            <table className="dashboard-inquiries-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Project Type</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>

              <tbody>
                {inquiries.map((inquiry, index) => {
                  const status = getStatus(
                    inquiry.status
                  );

                  const customerName =
                    inquiry.fullName ||
                    inquiry.name ||
                    "Unknown Customer";

                  const projectType =
                    inquiry.projectType ||
                    "—";

                  const location =
                    inquiry.location ||
                    "—";

                  const email =
                    inquiry.email || "";

                  const phone =
                    inquiry.phone || "";

                  return (
                    <tr
                      key={
                        inquiry._id ||
                        inquiry.id ||
                        `${customerName}-${index}`
                      }
                    >
                      <td>
                        <div className="dashboard-inquiry-customer">
                          <div className="dashboard-inquiry-avatar">
                            {getInitials(
                              customerName
                            )}
                          </div>

                          <div className="dashboard-inquiry-customer-info">
                            <span className="dashboard-inquiry-name">
                              {customerName}
                            </span>

                            {email && (
                              <span className="dashboard-inquiry-contact">
                                <Mail
                                  size={12}
                                  strokeWidth={2}
                                />
                                {email}
                              </span>
                            )}

                            {!email && phone && (
                              <span className="dashboard-inquiry-contact">
                                <Phone
                                  size={12}
                                  strokeWidth={2}
                                />
                                {phone}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="dashboard-inquiry-project-type">
                          {projectType}
                        </span>
                      </td>

                      <td>
                        <span className="dashboard-inquiry-location">
                          <MapPin
                            size={14}
                            strokeWidth={2}
                          />
                          {location}
                        </span>
                      </td>

                      <td>
                        <span className="dashboard-inquiry-date">
                          {formatDate(
                            inquiry.createdAt
                          )}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`dashboard-inquiry-status ${status.className}`}
                        >
                          <span className="dashboard-status-dot" />
                          {status.label}
                        </span>
                      </td>

                      <td>
                        <button
                          type="button"
                          className="dashboard-row-action"
                          onClick={() =>
                            navigate(
                              "/admin/inquiries"
                            )
                          }
                          aria-label={`Open inquiry from ${customerName}`}
                          title="Open inquiry"
                        >
                          <ArrowRight
                            size={16}
                            strokeWidth={2}
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentInquiries;