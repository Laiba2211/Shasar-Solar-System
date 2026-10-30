import React from "react";
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

import "./TestimonialCard.css";

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

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getStatusConfig = (status) => {
  switch (status) {
    case "approved":
      return {
        label: "Approved",
        className: "status-approved",
        icon: CheckCircle2,
      };

    case "rejected":
      return {
        label: "Rejected",
        className: "status-rejected",
        icon: XCircle,
      };

    case "pending":
    default:
      return {
        label: "Pending",
        className: "status-pending",
        icon: Clock3,
      };
  }
};

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
   STAR RATING
========================================================== */

const RatingStars = ({ rating = 0 }) => {
  const normalizedRating = Math.min(
    5,
    Math.max(0, Number(rating) || 0)
  );

  return (
    <div
      className="testimonial-card-rating"
      aria-label={`${normalizedRating} out of 5 stars`}
    >
      <div className="testimonial-card-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={15}
            strokeWidth={1.8}
            className={
              star <= normalizedRating
                ? "testimonial-star testimonial-star-filled"
                : "testimonial-star testimonial-star-empty"
            }
            fill={
              star <= normalizedRating
                ? "currentColor"
                : "none"
            }
          />
        ))}
      </div>

      <span className="testimonial-card-rating-value">
        {normalizedRating.toFixed(1)}
      </span>
    </div>
  );
};

/* ==========================================================
   STATUS BADGE
========================================================== */

const StatusBadge = ({ status }) => {
  const config = getStatusConfig(status);
  const StatusIcon = config.icon;

  return (
    <span
      className={`testimonial-card-status ${config.className}`}
    >
      <StatusIcon size={14} strokeWidth={2} />

      <span>{config.label}</span>
    </span>
  );
};

/* ==========================================================
   MAIN COMPONENT
========================================================== */

const TestimonialCard = ({
  testimonial,
  onView,
  onEdit,
  onApprove,
  onReject,
  onDelete,
  actionId = "",
}) => {
  if (!testimonial) {
    return null;
  }

  const {
    _id,
    clientName,
    email,
    designation,
    location,
    serviceType,
    rating,
    comment,
    imageUrl,
    status,
    consentToPublish,
    isFeatured,
    createdAt,
  } = testimonial;

  const testimonialId = getTestimonialId(testimonial);

  const isActionLoading =
    actionId &&
    testimonialId === String(actionId);

  const initials = getInitials(clientName);

  return (
    <article
      className={`testimonial-card ${
        isActionLoading
          ? "testimonial-card-is-loading"
          : ""
      }`}
    >
      {/* ======================================================
          TOP
      ====================================================== */}

      <div className="testimonial-card-top">
        <div className="testimonial-card-client">
          {/* Avatar */}

          <div className="testimonial-card-avatar">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={clientName || "Client"}
                onError={(event) => {
                  event.currentTarget.style.display = "none";

                  const fallback =
                    event.currentTarget.parentElement?.querySelector(
                      ".testimonial-card-avatar-fallback"
                    );

                  if (fallback) {
                    fallback.style.display = "flex";
                  }
                }}
              />
            ) : null}

            <span
              className="testimonial-card-avatar-fallback"
              style={{
                display: imageUrl ? "none" : "flex",
              }}
            >
              {imageUrl ? (
                <UserRound
                  size={19}
                  strokeWidth={1.8}
                />
              ) : (
                initials
              )}
            </span>
          </div>

          {/* Client information */}

          <div className="testimonial-card-client-info">
            <div className="testimonial-card-name-row">
              <button
                type="button"
                className="testimonial-card-client-name"
                onClick={() => onView?.(testimonial)}
                disabled={Boolean(isActionLoading)}
              >
                {clientName || "Unnamed Client"}
              </button>

              {isFeatured && (
                <span className="testimonial-card-featured">
                  Featured
                </span>
              )}
            </div>

            {designation && (
              <span className="testimonial-card-designation">
                {designation}
              </span>
            )}
          </div>
        </div>

        {/* Status */}

        <StatusBadge status={status} />
      </div>

      {/* ======================================================
          CLIENT CONTACT
      ====================================================== */}

      {(email || location) && (
        <div className="testimonial-card-contact">
          {email && (
            <div className="testimonial-card-contact-item">
              <Mail
                size={14}
                strokeWidth={1.8}
              />

              <span>{email}</span>
            </div>
          )}

          {location && (
            <div className="testimonial-card-contact-item">
              <MapPin
                size={14}
                strokeWidth={1.8}
              />

              <span>{location}</span>
            </div>
          )}
        </div>
      )}

      {/* ======================================================
          SERVICE + RATING
      ====================================================== */}

      <div className="testimonial-card-meta">
        <div className="testimonial-card-service">
          <span className="testimonial-card-meta-label">
            Service
          </span>

          <span className="testimonial-card-service-badge">
            {serviceType || "General Experience"}
          </span>
        </div>

        <div className="testimonial-card-rating-wrapper">
          <span className="testimonial-card-meta-label">
            Rating
          </span>

          <RatingStars rating={rating} />
        </div>
      </div>

      {/* ======================================================
          REVIEW
      ====================================================== */}

      <div className="testimonial-card-review">
        <span
          className="testimonial-card-review-mark"
          aria-hidden="true"
        >
          “
        </span>

        <p>
          {comment ||
            "No client feedback has been added yet."}
        </p>
      </div>

      {/* ======================================================
          PUBLISH STATUS + DATE
      ====================================================== */}

      <div className="testimonial-card-footer-meta">
        <div className="testimonial-card-publish">
          <span
            className={`testimonial-card-publish-dot ${
              consentToPublish
                ? "publish-enabled"
                : "publish-disabled"
            }`}
          />

          <span>
            {consentToPublish
              ? "Publishing enabled"
              : "Publishing disabled"}
          </span>
        </div>

        <time
          className="testimonial-card-date"
          dateTime={createdAt || undefined}
        >
          {formatDate(createdAt)}
        </time>
      </div>

      {/* ======================================================
          ACTIONS
      ====================================================== */}

      <div className="testimonial-card-actions">
        {/* VIEW */}

        <button
          type="button"
          className="testimonial-card-action testimonial-card-action-view"
          onClick={() => onView?.(testimonial)}
          disabled={Boolean(isActionLoading)}
          aria-label={`View testimonial from ${
            clientName || "client"
          }`}
          title="View testimonial"
        >
          <Eye
            size={16}
            strokeWidth={1.9}
          />

          <span>View</span>
        </button>

        {/* EDIT */}

        <button
          type="button"
          className="testimonial-card-action testimonial-card-action-edit"
          onClick={() => onEdit?.(testimonial)}
          disabled={Boolean(isActionLoading)}
          aria-label={`Edit testimonial from ${
            clientName || "client"
          }`}
          title="Edit testimonial"
        >
          <Pencil
            size={16}
            strokeWidth={1.9}
          />

          <span>Edit</span>
        </button>

        {/* APPROVE */}

        {status !== "approved" && (
          <button
            type="button"
            className="testimonial-card-action testimonial-card-action-approve"
            onClick={() => onApprove?.(testimonial)}
            disabled={Boolean(isActionLoading)}
            aria-label={`Approve testimonial from ${
              clientName || "client"
            }`}
            title="Approve testimonial"
          >
            {isActionLoading ? (
              <LoaderCircle
                size={16}
                strokeWidth={1.9}
                className="testimonial-card-action-spinner"
              />
            ) : (
              <CheckCircle2
                size={16}
                strokeWidth={1.9}
              />
            )}

            <span>Approve</span>
          </button>
        )}

        {/* REJECT */}

        {status !== "rejected" && (
          <button
            type="button"
            className="testimonial-card-action testimonial-card-action-reject"
            onClick={() => onReject?.(testimonial)}
            disabled={Boolean(isActionLoading)}
            aria-label={`Reject testimonial from ${
              clientName || "client"
            }`}
            title="Reject testimonial"
          >
            {isActionLoading ? (
              <LoaderCircle
                size={16}
                strokeWidth={1.9}
                className="testimonial-card-action-spinner"
              />
            ) : (
              <XCircle
                size={16}
                strokeWidth={1.9}
              />
            )}

            <span>Reject</span>
          </button>
        )}

        {/* DELETE */}

        <button
          type="button"
          className="testimonial-card-action testimonial-card-action-delete"
          onClick={() => onDelete?.(testimonial)}
          disabled={Boolean(isActionLoading)}
          aria-label={`Delete testimonial from ${
            clientName || "client"
          }`}
          title="Delete testimonial"
        >
          {isActionLoading ? (
            <LoaderCircle
              size={16}
              strokeWidth={1.9}
              className="testimonial-card-action-spinner"
            />
          ) : (
            <Trash2
              size={16}
              strokeWidth={1.9}
            />
          )}

          <span>Delete</span>
        </button>
      </div>
    </article>
  );
};

export default TestimonialCard;