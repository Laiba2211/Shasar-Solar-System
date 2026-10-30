// ==========================================================
// SHASAR SOLAR ADMIN PANEL
// PRICING MANAGEMENT
// MOBILE PRICING CARD
// ==========================================================
import "./PricingCard.css";
import React from "react";
import {
  Edit3,
  Trash2,
  CheckCircle2,
  XCircle,
  Star,
  Circle,
  ArrowUpDown,
  Tag,
} from "lucide-react";

// ==========================================================
// PRICING CARD
// ==========================================================

const PricingCard = ({
  pricing,
  onEdit,
  onDelete,
  onToggleActive,
  onToggleFeatured,
}) => {
  // --------------------------------------------------------
  // SAFETY
  // --------------------------------------------------------

  if (!pricing) {
    return null;
  }

  // --------------------------------------------------------
  // ID
  // --------------------------------------------------------

  const pricingId =
    pricing._id ||
    pricing.id ||
    `pricing-${pricing.title || "item"}`;

  // --------------------------------------------------------
  // PRICE FORMATTER
  // --------------------------------------------------------

  const formatPrice = (price) => {
    if (
      price === null ||
      price === undefined ||
      price === ""
    ) {
      return "—";
    }

    const numericPrice = Number(price);

    if (Number.isNaN(numericPrice)) {
      return price;
    }

    return numericPrice.toLocaleString();
  };

  // --------------------------------------------------------
  // PRICE UNIT
  // --------------------------------------------------------

  const getPriceUnit = () => {
    if (!pricing.priceUnit) {
      return "";
    }

    return pricing.priceUnit;
  };

  // --------------------------------------------------------
  // VALUES
  // --------------------------------------------------------

  const isActive =
    pricing.active === true ||
    pricing.active === "true";

  const isFeatured =
    pricing.featured === true ||
    pricing.featured === "true";

  const category =
    pricing.category || "Other";

  const systemSize =
    pricing.systemSize || "Not specified";

  const displayOrder =
    pricing.displayOrder !== undefined &&
    pricing.displayOrder !== null &&
    pricing.displayOrder !== ""
      ? pricing.displayOrder
      : "—";

  // --------------------------------------------------------
  // HANDLERS
  // --------------------------------------------------------

  const handleEdit = () => {
    onEdit?.(pricing);
  };

  const handleDelete = () => {
    onDelete?.(pricing);
  };

  const handleToggleActive = () => {
    onToggleActive?.(pricing);
  };

  const handleToggleFeatured = () => {
    onToggleFeatured?.(pricing);
  };

  // --------------------------------------------------------
  // RENDER
  // --------------------------------------------------------

  return (
    <article
      className="pricing-mobile-card"
      data-pricing-id={pricingId}
    >
      {/* ==================================================
          CARD HEADER
          ================================================== */}

      <div className="pricing-mobile-card__header">
        <div className="pricing-mobile-card__title-group">
          <div className="pricing-mobile-card__icon">
            <Tag size={18} strokeWidth={2} />
          </div>

          <div>
            <h3 className="pricing-mobile-card__title">
              {pricing.title || "Untitled Pricing"}
            </h3>

            <span className="pricing-category">
              {category}
            </span>
          </div>
        </div>

        <div className="pricing-mobile-card__order">
          <ArrowUpDown size={14} />
          <span>{displayOrder}</span>
        </div>
      </div>

      {/* ==================================================
          PRICE
          ================================================== */}

      <div className="pricing-mobile-card__price">
        <span className="pricing-mobile-card__currency">
          {pricing.currency || "AED"}
        </span>

        <strong>
          {formatPrice(
            pricing.startingPrice ??
              pricing.price
          )}
        </strong>

        {getPriceUnit() && (
          <span className="pricing-mobile-card__unit">
            {getPriceUnit()}
          </span>
        )}
      </div>

      {/* ==================================================
          DETAILS
          ================================================== */}

      <div className="pricing-mobile-card__details">
        <div className="pricing-mobile-card__detail">
          <span className="pricing-mobile-card__detail-label">
            System Size
          </span>

          <span className="pricing-mobile-card__detail-value">
            {systemSize}
          </span>
        </div>

        <div className="pricing-mobile-card__detail">
          <span className="pricing-mobile-card__detail-label">
            Status
          </span>

          <span
            className={`pricing-status ${
              isActive
                ? "pricing-status--active"
                : "pricing-status--inactive"
            }`}
          >
            {isActive ? (
              <>
                <CheckCircle2 size={14} />
                Active
              </>
            ) : (
              <>
                <XCircle size={14} />
                Inactive
              </>
            )}
          </span>
        </div>

        <div className="pricing-mobile-card__detail">
          <span className="pricing-mobile-card__detail-label">
            Featured
          </span>

          <span
            className={`pricing-featured ${
              isFeatured
                ? "pricing-featured--yes"
                : "pricing-featured--no"
            }`}
          >
            {isFeatured ? (
              <>
                <Star size={14} fill="currentColor" />
                Featured
              </>
            ) : (
              <>
                <Circle size={14} />
                Standard
              </>
            )}
          </span>
        </div>

        <div className="pricing-mobile-card__detail">
          <span className="pricing-mobile-card__detail-label">
            Display Order
          </span>

          <span className="pricing-mobile-card__detail-value">
            {displayOrder}
          </span>
        </div>
      </div>

      {/* ==================================================
          DESCRIPTION
          ================================================== */}

      {pricing.description && (
        <div className="pricing-mobile-card__description">
          {pricing.description}
        </div>
      )}

      {/* ==================================================
          QUICK CONTROLS
          ================================================== */}

      <div className="pricing-mobile-card__quick-actions">
        <button
          type="button"
          className={`pricing-mobile-card__quick-btn ${
            isActive
              ? "pricing-mobile-card__quick-btn--active"
              : ""
          }`}
          onClick={handleToggleActive}
          title={
            isActive
              ? "Set pricing inactive"
              : "Set pricing active"
          }
          aria-label={
            isActive
              ? "Set pricing inactive"
              : "Set pricing active"
          }
        >
          {isActive ? (
            <CheckCircle2 size={16} />
          ) : (
            <XCircle size={16} />
          )}

          <span>
            {isActive ? "Active" : "Inactive"}
          </span>
        </button>

        <button
          type="button"
          className={`pricing-mobile-card__quick-btn ${
            isFeatured
              ? "pricing-mobile-card__quick-btn--featured"
              : ""
          }`}
          onClick={handleToggleFeatured}
          title={
            isFeatured
              ? "Remove featured status"
              : "Mark as featured"
          }
          aria-label={
            isFeatured
              ? "Remove featured status"
              : "Mark as featured"
          }
        >
          <Star
            size={16}
            fill={
              isFeatured
                ? "currentColor"
                : "none"
            }
          />

          <span>
            {isFeatured
              ? "Featured"
              : "Feature"}
          </span>
        </button>
      </div>

      {/* ==================================================
          CARD ACTIONS
          ================================================== */}

      <div className="pricing-mobile-card__actions">
        <button
          type="button"
          className="pricing-mobile-card__edit-btn"
          onClick={handleEdit}
        >
          <Edit3 size={16} />
          <span>Edit Pricing</span>
        </button>

        <button
          type="button"
          className="pricing-mobile-card__delete-btn"
          onClick={handleDelete}
          aria-label={`Delete ${
            pricing.title || "pricing plan"
          }`}
          title="Delete pricing"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </article>
  );
};

export default PricingCard;