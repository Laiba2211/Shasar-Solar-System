// ==========================================================
// SHASAR SOLAR ADMIN PANEL
// PRICING TABLE
// LIGHT + DARK MODE
// BOOTSTRAP + CUSTOM CSS
// ==========================================================

import React from "react";
import {
  Pencil,
  Trash2,
  Star,
  DollarSign,
  Database,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import "./PricingTable.css";

// ==========================================================
// PRICING TABLE COMPONENT
// ==========================================================

const PricingTable = ({
  pricingPlans = [],
  plans = [],
  loading = false,
  onEdit,
  onDelete,
}) => {
  // --------------------------------------------------------
  // Support both pricingPlans and plans props
  // --------------------------------------------------------

  const pricingData = Array.isArray(pricingPlans)
    ? pricingPlans
    : Array.isArray(plans)
      ? plans
      : [];

  // --------------------------------------------------------
  // Format currency
  // --------------------------------------------------------

  const formatPrice = (plan) => {
    const price = plan?.price;

    if (
      price === undefined ||
      price === null ||
      price === ""
    ) {
      return "Custom Quote";
    }

    const numericPrice = Number(price);

    if (Number.isNaN(numericPrice)) {
      return price;
    }

    return `${plan?.currency || "AED"} ${numericPrice.toLocaleString()}`;
  };

  // --------------------------------------------------------
  // Format price unit
  // --------------------------------------------------------

  const formatPriceUnit = (unit) => {
    if (!unit) return "";

    const unitMap = {
      "AED": "",
      "AED / kW": "/ kW",
      "AED / month": "/ month",
      "AED / project": "/ project",
      "Custom Quote": "",
    };

    return unitMap[unit] ?? unit;
  };

  // --------------------------------------------------------
  // Format system size
  // --------------------------------------------------------

  const formatSystemSize = (size) => {
    if (!size) {
      return "—";
    }

    return size;
  };

  // --------------------------------------------------------
  // Handle Edit
  // --------------------------------------------------------

  const handleEdit = (plan) => {
    if (typeof onEdit === "function") {
      onEdit(plan);
    }
  };

  // --------------------------------------------------------
  // Handle Delete
  // --------------------------------------------------------

  const handleDelete = (plan) => {
    if (typeof onDelete === "function") {
      onDelete(plan);
    }
  };

  // --------------------------------------------------------
  // Loading State
  // --------------------------------------------------------

  if (loading) {
    return (
      <div className="pricing-table-card">
        <div className="pricing-table-loading">
          <div
            className="spinner-border pricing-loading-spinner"
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>

          <p>Loading pricing plans...</p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------
  // Empty State
  // --------------------------------------------------------

  if (pricingData.length === 0) {
    return (
      <div className="pricing-table-card">
        <div className="pricing-table-empty">
          <div className="pricing-empty-icon">
            <Database size={30} strokeWidth={1.7} />
          </div>

          <h5>No Pricing Plans Found</h5>

          <p>
            There are currently no pricing plans to display.
            Add your first pricing plan to get started.
          </p>
        </div>
      </div>
    );
  }

  // ========================================================
  // TABLE
  // ========================================================

  return (
    <div className="pricing-table-card">

      {/* ====================================================
          TABLE HEADER
          ==================================================== */}

      <div className="pricing-table-header">

        <div className="pricing-table-heading">
          <div className="pricing-table-heading-icon">
            <DollarSign
              size={18}
              strokeWidth={2}
            />
          </div>

          <div>
            <h5>Pricing Plans</h5>

            <span>
              {pricingData.length}{" "}
              {pricingData.length === 1
                ? "plan"
                : "plans"}
            </span>
          </div>
        </div>

      </div>

      {/* ====================================================
          TABLE WRAPPER
          ==================================================== */}

      <div className="pricing-table-scroll">

        <table className="table pricing-table">

          {/* ==================================================
              TABLE HEAD
              ================================================== */}

          <thead>
            <tr>

              <th className="pricing-column-plan">
                PLAN
              </th>

              <th className="pricing-column-category">
                CATEGORY
              </th>

              <th className="pricing-column-price">
                PRICE
              </th>

              <th className="pricing-column-system">
                SYSTEM SIZE
              </th>

              <th className="pricing-column-status">
                STATUS
              </th>

              <th className="pricing-column-featured">
                FEATURED
              </th>

              <th className="pricing-column-order">
                DISPLAY ORDER
              </th>

              <th className="pricing-column-actions">
                ACTIONS
              </th>

            </tr>
          </thead>

          {/* ==================================================
              TABLE BODY
              ================================================== */}

          <tbody>

            {pricingData.map((plan, index) => {

              const planId =
                plan?._id ||
                plan?.id ||
                index;

              const isActive =
                plan?.isActive ??
                plan?.active ??
                false;

              const isFeatured =
                plan?.isFeatured ??
                plan?.featured ??
                false;

              return (
                <tr
                  key={planId}
                  className="pricing-table-row"
                >

                  {/* ==========================================
                      PLAN
                      ========================================== */}

                  <td className="pricing-plan-cell">

                    <div className="pricing-plan-info">

                      <div className="pricing-plan-title">
                        {plan?.title ||
                          plan?.pricingTitle ||
                          "Untitled Pricing"}
                      </div>

                      {/* 
                        Slug is intentionally shown as
                        secondary text instead of being
                        attached directly to the title.
                      */}

                      {plan?.slug && (
                        <div className="pricing-plan-slug">
                          {plan.slug}
                        </div>
                      )}

                    </div>

                  </td>

                  {/* ==========================================
                      CATEGORY
                      ========================================== */}

                  <td className="pricing-category-cell">

                    <span className="pricing-category-badge">
                      {plan?.category || "Other"}
                    </span>

                  </td>

                  {/* ==========================================
                      PRICE
                      ========================================== */}

                  <td className="pricing-price-cell">

                    <div className="pricing-price-wrapper">

                      <span className="pricing-price">
                        {formatPrice(plan)}
                      </span>

                      {plan?.priceUnit && (
                        <span className="pricing-price-unit">
                          {formatPriceUnit(
                            plan.priceUnit
                          )}
                        </span>
                      )}

                    </div>

                  </td>

                  {/* ==========================================
                      SYSTEM SIZE
                      ========================================== */}

                  <td className="pricing-system-cell">

                    <span className="pricing-system-size">
                      {formatSystemSize(
                        plan?.systemSize
                      )}
                    </span>

                  </td>

                  {/* ==========================================
                      STATUS
                      ========================================== */}

                  <td className="pricing-status-cell">

                    {isActive ? (
                      <span className="pricing-status-badge pricing-status-active">

                        <CheckCircle2
                          size={13}
                          strokeWidth={2}
                        />

                        <span>Active</span>

                      </span>
                    ) : (
                      <span className="pricing-status-badge pricing-status-inactive">

                        <XCircle
                          size={13}
                          strokeWidth={2}
                        />

                        <span>Inactive</span>

                      </span>
                    )}

                  </td>

                  {/* ==========================================
                      FEATURED
                      ========================================== */}

                  <td className="pricing-featured-cell">

                    {isFeatured ? (
                      <span className="pricing-featured-badge">

                        <Star
                          size={13}
                          fill="currentColor"
                          strokeWidth={1.8}
                        />

                        <span>Featured</span>

                      </span>
                    ) : (
                      <span className="pricing-not-featured">
                        —
                      </span>
                    )}

                  </td>

                  {/* ==========================================
                      DISPLAY ORDER
                      ========================================== */}

                  <td className="pricing-order-cell">

                    <span className="pricing-order-number">
                      {plan?.displayOrder ??
                        plan?.order ??
                        index + 1}
                    </span>

                  </td>

                  {/* ==========================================
                      ACTIONS
                      ========================================== */}

                  <td className="pricing-actions-cell">

                    <div className="pricing-actions">

                      {/* EDIT */}

                      <button
                        type="button"
                        className="pricing-action-btn pricing-edit-btn"
                        onClick={() =>
                          handleEdit(plan)
                        }
                        title="Edit Pricing"
                        aria-label={`Edit ${
                          plan?.title ||
                          "pricing plan"
                        }`}
                      >
                        <Pencil
                          size={16}
                          strokeWidth={2}
                        />
                      </button>

                      {/* DELETE */}

                      <button
                        type="button"
                        className="pricing-action-btn pricing-delete-btn"
                        onClick={() =>
                          handleDelete(plan)
                        }
                        title="Delete Pricing"
                        aria-label={`Delete ${
                          plan?.title ||
                          "pricing plan"
                        }`}
                      >
                        <Trash2
                          size={16}
                          strokeWidth={2}
                        />
                      </button>

                    </div>

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default PricingTable;