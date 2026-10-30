import {
  CheckCircle2,
  Clock3,
  Eye,
  LoaderCircle,
  Mail,
  MapPin,
  Pencil,
  Star,
  Trash2,
  UserRound,
  XCircle,
} from "lucide-react";

import "./TestimonialTable.css";

/* ==========================================================
   HELPERS
========================================================== */

const getInitials = (name = "") => {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (!words.length) {
    return "CL";
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
};

const formatDate = (date) => {
  if (!date) {
    return "—";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatusConfig = (status) => {
  switch (status) {
    case "approved":
      return {
        label: "Approved",
        className: "is-approved",
        icon: CheckCircle2,
      };

    case "rejected":
      return {
        label: "Rejected",
        className: "is-rejected",
        icon: XCircle,
      };

    case "pending":
    default:
      return {
        label: "Pending",
        className: "is-pending",
        icon: Clock3,
      };
  }
};

/* ==========================================================
   ACTION ID HELPER
========================================================== */

const getTestimonialId = (testimonial) => {
  if (!testimonial) {
    return "";
  }

  if (typeof testimonial === "object") {
    return String(testimonial._id || testimonial.id || "");
  }

  return String(testimonial);
};

/* ==========================================================
   RATING STARS
========================================================== */

const RatingStars = ({ rating }) => {
  const numericRating = Number(rating) || 0;

  return (
    <div className="testimonial-rating">
      <div className="testimonial-rating-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={13}
            fill={
              star <= numericRating
                ? "currentColor"
                : "none"
            }
          />
        ))}
      </div>

      <span>{numericRating}</span>
    </div>
  );
};

/* ==========================================================
   COMPONENT
========================================================== */

const TestimonialTable = ({
  testimonials = [],
  onView,
  onEdit,
  onApprove,
  onReject,
  onDelete,
  actionId = "",
}) => {
  /* ========================================================
     EMPTY STATE
  ======================================================== */

  if (!testimonials.length) {
    return (
      <div className="testimonial-table-empty">
        <div className="testimonial-empty-icon">
          <UserRound size={26} />
        </div>

        <h3>No testimonials found</h3>

        <p>
          There are no testimonials matching your current
          search or filter criteria.
        </p>
      </div>
    );
  }

  /* ========================================================
     TABLE
  ======================================================== */

  return (
    <div className="testimonial-table-container">
      <table className="testimonial-table">
        <thead>
          <tr>
            <th className="testimonial-th-client">
              Client
            </th>

            <th className="testimonial-th-service">
              Service
            </th>

            <th className="testimonial-th-location">
              Location
            </th>

            <th className="testimonial-th-rating">
              Rating
            </th>

            <th className="testimonial-th-status">
              Status
            </th>

            <th className="testimonial-th-date">
              Date
            </th>

            <th className="testimonial-th-actions">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {testimonials.map((testimonial) => {
            const testimonialId =
              getTestimonialId(testimonial);

            const isActionLoading =
              actionId &&
              testimonialId === String(actionId);

            const statusConfig = getStatusConfig(
              testimonial.status
            );

            const StatusIcon = statusConfig.icon;

            const initials = getInitials(
              testimonial.clientName
            );

            return (
              <tr
                key={
                  testimonialId ||
                  `${testimonial.clientName}-${testimonial.createdAt}`
                }
                className={
                  isActionLoading
                    ? "testimonial-row-loading"
                    : ""
                }
              >
                {/* ==================================================
                    CLIENT
                ================================================== */}

                <td className="testimonial-client-cell">
                  <div className="testimonial-client">
                    <div className="testimonial-client-avatar">
                      {testimonial.imageUrl ? (
                        <img
                          src={testimonial.imageUrl}
                          alt={
                            testimonial.clientName ||
                            "Client"
                          }
                          onError={(event) => {
                            event.currentTarget.style.display =
                              "none";

                            const fallback =
                              event.currentTarget
                                .nextElementSibling;

                            if (fallback) {
                              fallback.style.display =
                                "flex";
                            }
                          }}
                        />
                      ) : null}

                      <span
                        className={
                          testimonial.imageUrl
                            ? "testimonial-avatar-fallback has-image"
                            : "testimonial-avatar-fallback"
                        }
                      >
                        {initials}
                      </span>
                    </div>

                    <div className="testimonial-client-info">
                      <div className="testimonial-client-name-row">
                        <button
                          type="button"
                          className="testimonial-client-name"
                          onClick={() =>
                            onView?.(testimonial)
                          }
                          disabled={Boolean(isActionLoading)}
                        >
                          {testimonial.clientName ||
                            "Unnamed Client"}
                        </button>

                        {testimonial.isFeatured && (
                          <span className="testimonial-featured-badge">
                            Featured
                          </span>
                        )}
                      </div>

                      {testimonial.designation && (
                        <span className="testimonial-client-designation">
                          {testimonial.designation}
                        </span>
                      )}

                      {testimonial.email && (
                        <span className="testimonial-client-email">
                          <Mail size={12} />
                          {testimonial.email}
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                {/* ==================================================
                    SERVICE
                ================================================== */}

                <td className="testimonial-service-cell">
                  <span className="testimonial-service-badge">
                    {testimonial.serviceType ||
                      "Not specified"}
                  </span>
                </td>

                {/* ==================================================
                    LOCATION
                ================================================== */}

                <td className="testimonial-location-cell">
                  <div className="testimonial-location">
                    <MapPin size={14} />

                    <span>
                      {testimonial.location ||
                        "Not specified"}
                    </span>
                  </div>
                </td>

                {/* ==================================================
                    RATING
                ================================================== */}

                <td className="testimonial-rating-cell">
                  <RatingStars
                    rating={testimonial.rating}
                  />
                </td>

                {/* ==================================================
                    STATUS
                ================================================== */}

                <td className="testimonial-status-cell">
                  <span
                    className={`testimonial-status-badge ${statusConfig.className}`}
                  >
                    <StatusIcon size={13} />

                    {statusConfig.label}
                  </span>

                  {testimonial.consentToPublish && (
                    <span className="testimonial-publish-status">
                      <CheckCircle2 size={11} />
                      Publish enabled
                    </span>
                  )}
                </td>

                {/* ==================================================
                    DATE
                ================================================== */}

                <td className="testimonial-date-cell">
                  <span>
                    {formatDate(
                      testimonial.createdAt
                    )}
                  </span>
                </td>

                {/* ==================================================
                    ACTIONS
                ================================================== */}

                <td className="testimonial-actions-cell">
                  <div className="testimonial-actions">
                    {/* VIEW */}

                    <button
                      type="button"
                      className="testimonial-action-btn action-view"
                      onClick={() =>
                        onView?.(testimonial)
                      }
                      title="View testimonial"
                      aria-label={`View testimonial from ${
                        testimonial.clientName ||
                        "client"
                      }`}
                      disabled={Boolean(isActionLoading)}
                    >
                      <Eye size={15} />
                    </button>

                    {/* EDIT */}

                    <button
                      type="button"
                      className="testimonial-action-btn action-edit"
                      onClick={() =>
                        onEdit?.(testimonial)
                      }
                      title="Edit testimonial"
                      aria-label={`Edit testimonial from ${
                        testimonial.clientName ||
                        "client"
                      }`}
                      disabled={Boolean(isActionLoading)}
                    >
                      <Pencil size={15} />
                    </button>

                    {/* APPROVE */}

                    {testimonial.status !==
                      "approved" && (
                      <button
                        type="button"
                        className="testimonial-action-btn action-approve"
                        onClick={() =>
                          onApprove?.(testimonial)
                        }
                        title="Approve testimonial"
                        aria-label={`Approve testimonial from ${
                          testimonial.clientName ||
                          "client"
                        }`}
                        disabled={Boolean(
                          isActionLoading
                        )}
                      >
                        {isActionLoading ? (
                          <LoaderCircle
                            size={15}
                            className="testimonial-action-spinner"
                          />
                        ) : (
                          <CheckCircle2 size={15} />
                        )}
                      </button>
                    )}

                    {/* REJECT */}

                    {testimonial.status !==
                      "rejected" && (
                      <button
                        type="button"
                        className="testimonial-action-btn action-reject"
                        onClick={() =>
                          onReject?.(testimonial)
                        }
                        title="Reject testimonial"
                        aria-label={`Reject testimonial from ${
                          testimonial.clientName ||
                          "client"
                        }`}
                        disabled={Boolean(
                          isActionLoading
                        )}
                      >
                        {isActionLoading ? (
                          <LoaderCircle
                            size={15}
                            className="testimonial-action-spinner"
                          />
                        ) : (
                          <XCircle size={15} />
                        )}
                      </button>
                    )}

                    {/* DELETE */}

                    <button
                      type="button"
                      className="testimonial-action-btn action-delete"
                      onClick={() =>
                        onDelete?.(testimonial)
                      }
                      title="Delete testimonial"
                      aria-label={`Delete testimonial from ${
                        testimonial.clientName ||
                        "client"
                      }`}
                      disabled={Boolean(
                        isActionLoading
                      )}
                    >
                      {isActionLoading ? (
                        <LoaderCircle
                          size={15}
                          className="testimonial-action-spinner"
                        />
                      ) : (
                        <Trash2 size={15} />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TestimonialTable;