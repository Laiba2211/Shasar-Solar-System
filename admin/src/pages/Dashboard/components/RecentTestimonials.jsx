import React from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  MapPin,
  MessageSquare,
  Star,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    className: "testimonial-status-pending",
    icon: Clock3,
  },
  approved: {
    label: "Approved",
    className: "testimonial-status-approved",
    icon: CheckCircle2,
  },
  rejected: {
    label: "Rejected",
    className: "testimonial-status-rejected",
    icon: XCircle,
  },
};

const RecentTestimonials = ({
  data = [],
  loading = false,
}) => {
  const navigate = useNavigate();

  const testimonials = Array.isArray(data)
    ? data.slice(0, 5)
    : [];

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
        ? status.toLowerCase().trim()
        : "pending";

    return (
      STATUS_CONFIG[normalizedStatus] || {
        label: status || "Unknown",
        className: "testimonial-status-default",
        icon: Clock3,
      }
    );
  };

  const renderStars = (rating) => {
    const numericRating = Math.min(
      5,
      Math.max(0, Number(rating) || 0)
    );

    return (
      <div
        className="dashboard-testimonial-rating"
        aria-label={`${numericRating} out of 5 stars`}
      >
        {Array.from({ length: 5 }).map(
          (_, index) => (
            <Star
              key={index}
              size={13}
              strokeWidth={1.8}
              fill={
                index < numericRating
                  ? "currentColor"
                  : "none"
                }
            />
          )
        )}
      </div>
    );
  };

  const truncateComment = (comment) => {
    if (!comment || typeof comment !== "string") {
      return "No comment provided.";
    }

    const cleanComment = comment.trim();

    if (cleanComment.length <= 105) {
      return cleanComment;
    }

    return `${cleanComment.slice(0, 105)}...`;
  };

  return (
    <section className="dashboard-panel recent-testimonials-panel">
      <div className="dashboard-panel-header">
        <div className="dashboard-panel-heading">
          <div className="dashboard-panel-icon recent-testimonials-icon">
            <Star
              size={19}
              strokeWidth={2}
            />
          </div>

          <div>
            <h2 className="dashboard-panel-title">
              Recent Testimonials
            </h2>

            <p className="dashboard-panel-subtitle">
              Latest customer reviews and feedback
            </p>
          </div>
        </div>

        <button
          type="button"
          className="dashboard-view-all-btn"
          onClick={() =>
            navigate("/admin/testimonials")
          }
        >
          View All
          <ArrowRight
            size={15}
            strokeWidth={2}
          />
        </button>
      </div>

      <div className="dashboard-testimonial-list">
        {loading ? (
          Array.from({ length: 4 }).map(
            (_, index) => (
              <div
                className="dashboard-testimonial-item dashboard-testimonial-loading"
                key={index}
              >
                <div className="dashboard-skeleton dashboard-testimonial-avatar-skeleton" />

                <div className="dashboard-testimonial-content-skeleton">
                  <div className="dashboard-skeleton dashboard-testimonial-name-skeleton" />
                  <div className="dashboard-skeleton dashboard-testimonial-rating-skeleton" />
                  <div className="dashboard-skeleton dashboard-testimonial-comment-skeleton" />
                </div>

                <div className="dashboard-skeleton dashboard-testimonial-status-skeleton" />
              </div>
            )
          )
        ) : testimonials.length === 0 ? (
          <div className="dashboard-empty-state">
            <MessageSquare
              size={30}
              strokeWidth={1.7}
            />

            <h3>No recent testimonials</h3>

            <p>
              Customer reviews will appear here when submitted.
            </p>
          </div>
        ) : (
          testimonials.map(
            (testimonial, index) => {
              const clientName =
                testimonial.clientName ||
                testimonial.name ||
                "Anonymous Client";

              const designation =
                testimonial.designation || "";

              const serviceType =
                testimonial.serviceType ||
                "Service not specified";

              const location =
                testimonial.location ||
                "";

              const rating =
                Number(testimonial.rating) || 0;

              const status =
                getStatus(testimonial.status);

              const StatusIcon = status.icon;

              const isFeatured =
                Boolean(testimonial.isFeatured);

              return (
                <article
                  className="dashboard-testimonial-item"
                  key={
                    testimonial._id ||
                    testimonial.id ||
                    `${clientName}-${index}`
                  }
                >
                  <div className="dashboard-testimonial-avatar">
                    {testimonial.imageUrl ? (
                      <img
                        src={
                          testimonial.imageUrl.startsWith(
                            "http"
                          )
                            ? testimonial.imageUrl
                            : `${
                                import.meta.env
                                  .VITE_API_URL ||
                                "http://localhost:5000"
                              }${testimonial.imageUrl.startsWith("/") ? "" : "/"}${
                                testimonial.imageUrl
                              }`
                        }
                        alt={clientName}
                        loading="lazy"
                      />
                    ) : (
                      getInitials(clientName)
                    )}
                  </div>

                  <div className="dashboard-testimonial-content">
                    <div className="dashboard-testimonial-top-row">
                      <div className="dashboard-testimonial-client">
                        <h3 className="dashboard-testimonial-name">
                          {clientName}
                        </h3>

                        {designation && (
                          <span className="dashboard-testimonial-designation">
                            {designation}
                          </span>
                        )}
                      </div>

                      <div className="dashboard-testimonial-badges">
                        <span
                          className={`dashboard-testimonial-status ${status.className}`}
                        >
                          <StatusIcon
                            size={12}
                            strokeWidth={2}
                          />
                          {status.label}
                        </span>

                        {isFeatured && (
                          <span className="dashboard-testimonial-featured">
                            <Star
                              size={11}
                              fill="currentColor"
                              strokeWidth={1.8}
                            />
                            Featured
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="dashboard-testimonial-meta">
                      {renderStars(rating)}

                      <span className="dashboard-testimonial-service">
                        {serviceType}
                      </span>

                      {location && (
                        <span className="dashboard-testimonial-location">
                          <MapPin
                            size={12}
                            strokeWidth={2}
                          />
                          {location}
                        </span>
                      )}
                    </div>

                    <p className="dashboard-testimonial-comment">
                      “{truncateComment(
                        testimonial.comment
                      )}”
                    </p>
                  </div>

                  <button
                    type="button"
                    className="dashboard-row-action dashboard-testimonial-action"
                    onClick={() =>
                      navigate(
                        "/admin/testimonials"
                      )
                    }
                    aria-label={`Open testimonial from ${clientName}`}
                    title="Open testimonial"
                  >
                    <ArrowRight
                      size={16}
                      strokeWidth={2}
                    />
                  </button>
                </article>
              );
            }
          )
        )}
      </div>
    </section>
  );
};

export default RecentTestimonials;