// ==========================================================
// SHASAR SOLAR ADMIN PANEL
// PRICING MANAGEMENT
// DYNAMIC CRUD + API INTEGRATION
// LIGHT + DARK THEME
// BOOTSTRAP + CUSTOM CSS
// ==========================================================
import "./Pricing.css";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  AlertCircle,
  CheckCircle2,
  DollarSign,
  Plus,
  RefreshCw,
  Star,
  ToggleLeft,
  XCircle,
} from "lucide-react";

import PricingForm from "../../components/pricing/PricingForm";
import PricingTable from "../../components/pricing/PricingTable";
import PricingCard from "../../components/pricing/PricingCard";

import "./Pricing.css";

// ==========================================================
// API BASE URL
// ==========================================================

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000";

const PRICING_API_URL =
  `${API_BASE_URL}/api/pricing`;

// ==========================================================
// CATEGORY OPTIONS
// ==========================================================

const CATEGORY_OPTIONS = [
  "Residential",
  "Commercial",
  "Industrial",
  "Battery Storage",
  "Maintenance",
  "Cleaning",
  "EV Charging",
  "Other",
];

// ==========================================================
// INITIAL FILTERS
// ==========================================================

const INITIAL_FILTERS = {
  search: "",
  category: "All",
  status: "All",
  featured: "All",
};

// ==========================================================
// PRICING PAGE
// ==========================================================

const Pricing = () => {
  // ========================================================
  // STATE
  // ========================================================

  const [pricingPlans, setPricingPlans] = useState([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const [actionLoading, setActionLoading] = useState(false);

  const [filters, setFilters] =
    useState(INITIAL_FILTERS);

  const [isFormOpen, setIsFormOpen] =
    useState(false);

  const [editingPricing, setEditingPricing] =
    useState(null);

  // ========================================================
  // HELPERS
  // ========================================================

  const getPricingId = useCallback((pricing) => {
    if (!pricing) {
      return null;
    }

    return pricing._id || pricing.id;
  }, []);

  const getErrorMessage = useCallback(
    async (response, fallbackMessage) => {
      try {
        const data = await response.json();

        return (
          data?.message ||
          data?.error ||
          data?.errors?.[0]?.message ||
          fallbackMessage
        );
      } catch {
        return fallbackMessage;
      }
    },
    []
  );

  // ========================================================
  // CLEAR FEEDBACK
  // ========================================================

  const clearFeedback = useCallback(() => {
    setError("");
    setSuccessMessage("");
  }, []);

  // ========================================================
  // FETCH PRICING
  // ========================================================

  const fetchPricing = useCallback(
    async (showLoader = true) => {
      try {
        if (showLoader) {
          setLoading(true);
        } else {
          setRefreshing(true);
        }

        setError("");

        const response = await fetch(
          PRICING_API_URL,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          const message =
            await getErrorMessage(
              response,
              "Unable to load pricing plans."
            );

          throw new Error(message);
        }

        const data = await response.json();

        // --------------------------------------------------
        // Support common API response formats
        // --------------------------------------------------

        const plans = Array.isArray(data)
          ? data
          : Array.isArray(data?.pricing)
            ? data.pricing
            : Array.isArray(data?.data)
              ? data.data
              : Array.isArray(data?.pricingPlans)
                ? data.pricingPlans
                : [];

        setPricingPlans(plans);
      } catch (fetchError) {
        console.error(
          "Pricing fetch error:",
          fetchError
        );

        setError(
          fetchError?.message ||
            "Unable to load pricing plans."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [getErrorMessage]
  );

  // ========================================================
  // INITIAL LOAD
  // ========================================================

  useEffect(() => {
    fetchPricing();
  }, [fetchPricing]);

  // ========================================================
  // AUTO CLEAR SUCCESS MESSAGE
  // ========================================================

  useEffect(() => {
    if (!successMessage) {
      return undefined;
    }

    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 3500);

    return () => clearTimeout(timer);
  }, [successMessage]);

  // ========================================================
  // UPDATE FILTER
  // ========================================================

  const updateFilter = (name, value) => {
    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ========================================================
  // FILTERED PRICING
  // ========================================================

  const filteredPricingPlans = useMemo(() => {
    const searchValue =
      filters.search
        .trim()
        .toLowerCase();

    return pricingPlans.filter((pricing) => {
      // ----------------------------------------------------
      // SEARCH
      // ----------------------------------------------------

      const matchesSearch =
        !searchValue ||
        String(pricing.title || "")
          .toLowerCase()
          .includes(searchValue) ||
        String(pricing.category || "")
          .toLowerCase()
          .includes(searchValue) ||
        String(pricing.description || "")
          .toLowerCase()
          .includes(searchValue) ||
        String(pricing.slug || "")
          .toLowerCase()
          .includes(searchValue);

      // ----------------------------------------------------
      // CATEGORY
      // ----------------------------------------------------

      const matchesCategory =
        filters.category === "All" ||
        pricing.category === filters.category;

      // ----------------------------------------------------
      // STATUS
      // ----------------------------------------------------

      const isActive =
        pricing.active === true;

      const matchesStatus =
        filters.status === "All" ||
        (filters.status === "Active" &&
          isActive) ||
        (filters.status === "Inactive" &&
          !isActive);

      // ----------------------------------------------------
      // FEATURED
      // ----------------------------------------------------

      const isFeatured =
        pricing.featured === true;

      const matchesFeatured =
        filters.featured === "All" ||
        (filters.featured === "Featured" &&
          isFeatured) ||
        (filters.featured === "Not Featured" &&
          !isFeatured);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesFeatured
      );
    });
  }, [pricingPlans, filters]);

  // ========================================================
  // SUMMARY COUNTS
  // ========================================================

  const summary = useMemo(() => {
    const total = pricingPlans.length;

    const active = pricingPlans.filter(
      (pricing) => pricing.active === true
    ).length;

    const featured = pricingPlans.filter(
      (pricing) => pricing.featured === true
    ).length;

    const inactive =
      total - active;

    return {
      total,
      active,
      featured,
      inactive,
    };
  }, [pricingPlans]);

  // ========================================================
  // OPEN ADD FORM
  // ========================================================

  const handleAddPricing = () => {
    clearFeedback();

    setEditingPricing(null);
    setIsFormOpen(true);
  };

  // ========================================================
  // OPEN EDIT FORM
  // ========================================================

  const handleEditPricing = (pricing) => {
    clearFeedback();

    setEditingPricing(pricing);
    setIsFormOpen(true);
  };

  // ========================================================
  // CLOSE FORM
  // ========================================================

  const handleCloseForm = () => {
    if (actionLoading) {
      return;
    }

    setIsFormOpen(false);
    setEditingPricing(null);
  };

  // ========================================================
  // CREATE / UPDATE PRICING
  // ========================================================

  const handleSavePricing = async (formData) => {
    try {
      setActionLoading(true);

      clearFeedback();

      const pricingId =
        getPricingId(editingPricing);

      const isEditing =
        Boolean(pricingId);

      const url = isEditing
        ? `${PRICING_API_URL}/${pricingId}`
        : PRICING_API_URL;

      const method = isEditing
        ? "PUT"
        : "POST";

      // ----------------------------------------------------
      // Clean payload
      // ----------------------------------------------------

      const payload = {
        title:
          formData.title?.trim() || "",

        slug:
          formData.slug?.trim() || "",

        description:
          formData.description?.trim() || "",

        category:
          formData.category || "Other",

        startingPrice:
          formData.startingPrice === "" ||
          formData.startingPrice === null ||
          formData.startingPrice === undefined
            ? null
            : Number(formData.startingPrice),

        price:
          formData.price === "" ||
          formData.price === null ||
          formData.price === undefined
            ? null
            : Number(formData.price),

        currency:
          formData.currency?.trim() ||
          "AED",

        priceUnit:
          formData.priceUnit || "AED",

        minimumPrice:
          formData.minimumPrice === "" ||
          formData.minimumPrice === null ||
          formData.minimumPrice === undefined
            ? null
            : Number(formData.minimumPrice),

        maximumPrice:
          formData.maximumPrice === "" ||
          formData.maximumPrice === null ||
          formData.maximumPrice === undefined
            ? null
            : Number(formData.maximumPrice),

        systemSize:
          formData.systemSize || "Custom",

        pricingDescription:
          formData.pricingDescription?.trim() ||
          "",

        features:
          Array.isArray(formData.features)
            ? formData.features
                .map((feature) =>
                  String(feature).trim()
                )
                .filter(Boolean)
            : [],

        active:
          formData.active !== false,

        featured:
          formData.featured === true,

        displayOrder:
          formData.displayOrder === "" ||
          formData.displayOrder === null ||
          formData.displayOrder === undefined
            ? 0
            : Number(formData.displayOrder),

        internalNotes:
          formData.internalNotes?.trim() ||
          "",
      };

      // ----------------------------------------------------
      // API REQUEST
      // ----------------------------------------------------

      const response = await fetch(
        url,
        {
          method,
          headers: {
            "Content-Type":
              "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const message =
          await getErrorMessage(
            response,
            isEditing
              ? "Unable to update pricing plan."
              : "Unable to create pricing plan."
          );

        throw new Error(message);
      }

      // ----------------------------------------------------
      // SUCCESS
      // ----------------------------------------------------

      setIsFormOpen(false);
      setEditingPricing(null);

      setSuccessMessage(
        isEditing
          ? "Pricing plan updated successfully."
          : "Pricing plan created successfully."
      );

      await fetchPricing(false);
    } catch (saveError) {
      console.error(
        "Pricing save error:",
        saveError
      );

      setError(
        saveError?.message ||
          "Unable to save pricing plan."
      );

      throw saveError;
    } finally {
      setActionLoading(false);
    }
  };

  // ========================================================
  // DELETE PRICING
  // ========================================================

  const handleDeletePricing = async (pricing) => {
    const pricingId =
      getPricingId(pricing);

    if (!pricingId) {
      setError(
        "Unable to delete pricing plan. Missing pricing ID."
      );

      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${pricing.title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(true);

      clearFeedback();

      const response = await fetch(
        `${PRICING_API_URL}/${pricingId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const message =
          await getErrorMessage(
            response,
            "Unable to delete pricing plan."
          );

        throw new Error(message);
      }

      setSuccessMessage(
        "Pricing plan deleted successfully."
      );

      await fetchPricing(false);
    } catch (deleteError) {
      console.error(
        "Pricing delete error:",
        deleteError
      );

      setError(
        deleteError?.message ||
          "Unable to delete pricing plan."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // ========================================================
  // TOGGLE ACTIVE
  // ========================================================

  const handleToggleActive = async (
    pricing
  ) => {
    const pricingId =
      getPricingId(pricing);

    if (!pricingId) {
      setError(
        "Unable to update pricing status."
      );

      return;
    }

    try {
      setActionLoading(true);

      clearFeedback();

      const response = await fetch(
        `${PRICING_API_URL}/${pricingId}/active`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            active:
              pricing.active !== true,
          }),
        }
      );

      if (!response.ok) {
        const message =
          await getErrorMessage(
            response,
            "Unable to update pricing status."
          );

        throw new Error(message);
      }

      setSuccessMessage(
        pricing.active
          ? "Pricing plan deactivated."
          : "Pricing plan activated."
      );

      await fetchPricing(false);
    } catch (toggleError) {
      console.error(
        "Pricing active toggle error:",
        toggleError
      );

      setError(
        toggleError?.message ||
          "Unable to update pricing status."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // ========================================================
  // TOGGLE FEATURED
  // ========================================================

  const handleToggleFeatured = async (
    pricing
  ) => {
    const pricingId =
      getPricingId(pricing);

    if (!pricingId) {
      setError(
        "Unable to update featured status."
      );

      return;
    }

    try {
      setActionLoading(true);

      clearFeedback();

      const response = await fetch(
        `${PRICING_API_URL}/${pricingId}/featured`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            featured:
              pricing.featured !== true,
          }),
        }
      );

      if (!response.ok) {
        const message =
          await getErrorMessage(
            response,
            "Unable to update featured status."
          );

        throw new Error(message);
      }

      setSuccessMessage(
        pricing.featured
          ? "Pricing plan removed from featured."
          : "Pricing plan marked as featured."
      );

      await fetchPricing(false);
    } catch (toggleError) {
      console.error(
        "Pricing featured toggle error:",
        toggleError
      );

      setError(
        toggleError?.message ||
          "Unable to update featured status."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // ========================================================
  // REFRESH
  // ========================================================

  const handleRefresh = async () => {
    clearFeedback();

    await fetchPricing(false);
  };

  // ========================================================
  // RESET FILTERS
  // ========================================================

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  // ========================================================
  // RENDER
  // ========================================================

  return (
    <div className="pricing-page">
      {/* ====================================================
          PAGE HEADER
      ==================================================== */}

      <div className="pricing-page__header">
        <div className="pricing-page__heading">
          <span className="pricing-page__eyebrow">
            ADMIN MANAGEMENT
          </span>

          <h1 className="pricing-page__title">
            Pricing Management
          </h1>

          <p className="pricing-page__subtitle">
            Manage and organize Shasar Solar
            pricing plans from one place.
          </p>
        </div>

        <div className="pricing-page__header-actions">
          <button
            type="button"
            className="pricing-page__refresh-btn"
            onClick={handleRefresh}
            disabled={
              loading ||
              refreshing ||
              actionLoading
            }
            title="Refresh pricing"
          >
            <RefreshCw
              size={17}
              className={
                refreshing
                  ? "pricing-page__spin"
                  : ""
              }
            />

            <span>
              {refreshing
                ? "Refreshing..."
                : "Refresh"}
            </span>
          </button>

          <button
            type="button"
            className="pricing-page__add-btn"
            onClick={handleAddPricing}
            disabled={actionLoading}
          >
            <Plus size={18} />

            <span>
              Add Pricing
            </span>
          </button>
        </div>
      </div>

      {/* ====================================================
          FEEDBACK
      ==================================================== */}

      {successMessage && (
        <div className="pricing-page__alert pricing-page__alert--success">
          <CheckCircle2 size={19} />

          <span>
            {successMessage}
          </span>

          <button
            type="button"
            onClick={() =>
              setSuccessMessage("")
            }
            aria-label="Dismiss success message"
          >
            <XCircle size={17} />
          </button>
        </div>
      )}

      {error && (
        <div className="pricing-page__alert pricing-page__alert--error">
          <AlertCircle size={19} />

          <span>
            {error}
          </span>

          <button
            type="button"
            onClick={() =>
              setError("")
            }
            aria-label="Dismiss error message"
          >
            <XCircle size={17} />
          </button>
        </div>
      )}

      {/* ====================================================
          SUMMARY CARDS
      ==================================================== */}

      <div className="row g-3 pricing-page__summary">
        {/* TOTAL */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="pricing-summary-card">
            <div className="pricing-summary-card__icon pricing-summary-card__icon--primary">
              <DollarSign size={21} />
            </div>

            <div className="pricing-summary-card__content">
              <span className="pricing-summary-card__label">
                Total Plans
              </span>

              <strong className="pricing-summary-card__value">
                {summary.total}
              </strong>

              <span className="pricing-summary-card__hint">
                All pricing records
              </span>
            </div>
          </div>
        </div>

        {/* ACTIVE */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="pricing-summary-card">
            <div className="pricing-summary-card__icon pricing-summary-card__icon--success">
              <ToggleLeft size={21} />
            </div>

            <div className="pricing-summary-card__content">
              <span className="pricing-summary-card__label">
                Active Plans
              </span>

              <strong className="pricing-summary-card__value">
                {summary.active}
              </strong>

              <span className="pricing-summary-card__hint">
                Currently active
              </span>
            </div>
          </div>
        </div>

        {/* FEATURED */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="pricing-summary-card">
            <div className="pricing-summary-card__icon pricing-summary-card__icon--featured">
              <Star size={21} />
            </div>

            <div className="pricing-summary-card__content">
              <span className="pricing-summary-card__label">
                Featured Plans
              </span>

              <strong className="pricing-summary-card__value">
                {summary.featured}
              </strong>

              <span className="pricing-summary-card__hint">
                Marked as featured
              </span>
            </div>
          </div>
        </div>

        {/* INACTIVE */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="pricing-summary-card">
            <div className="pricing-summary-card__icon pricing-summary-card__icon--danger">
              <XCircle size={21} />
            </div>

            <div className="pricing-summary-card__content">
              <span className="pricing-summary-card__label">
                Inactive Plans
              </span>

              <strong className="pricing-summary-card__value">
                {summary.inactive}
              </strong>

              <span className="pricing-summary-card__hint">
                Currently inactive
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          FILTER TOOLBAR
      ==================================================== */}

      <section className="pricing-page__toolbar">
        <div className="pricing-page__toolbar-top">
          <div className="pricing-page__toolbar-title">
            <h2>
              Pricing Plans
            </h2>

            <span>
              {filteredPricingPlans.length}
              {" "}
              {filteredPricingPlans.length === 1
                ? "plan"
                : "plans"}
            </span>
          </div>

          <button
            type="button"
            className="pricing-page__reset-btn"
            onClick={handleResetFilters}
            disabled={
              !filters.search &&
              filters.category === "All" &&
              filters.status === "All" &&
              filters.featured === "All"
            }
          >
            Reset Filters
          </button>
        </div>

        <div className="pricing-page__filters">
          {/* SEARCH */}
          <div className="pricing-page__search">
            <input
              type="search"
              value={filters.search}
              onChange={(event) =>
                updateFilter(
                  "search",
                  event.target.value
                )
              }
              placeholder="Search pricing..."
              aria-label="Search pricing"
            />
          </div>

          {/* CATEGORY */}
          <div className="pricing-page__filter">
            <select
              value={filters.category}
              onChange={(event) =>
                updateFilter(
                  "category",
                  event.target.value
                )
              }
              aria-label="Filter by category"
            >
              <option value="All">
                All Categories
              </option>

              {CATEGORY_OPTIONS.map(
                (category) => (
                  <option
                    value={category}
                    key={category}
                  >
                    {category}
                  </option>
                )
              )}
            </select>
          </div>

          {/* STATUS */}
          <div className="pricing-page__filter">
            <select
              value={filters.status}
              onChange={(event) =>
                updateFilter(
                  "status",
                  event.target.value
                )
              }
              aria-label="Filter by status"
            >
              <option value="All">
                All Status
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>
          </div>

          {/* FEATURED */}
          <div className="pricing-page__filter">
            <select
              value={filters.featured}
              onChange={(event) =>
                updateFilter(
                  "featured",
                  event.target.value
                )
              }
              aria-label="Filter by featured"
            >
              <option value="All">
                All Featured
              </option>

              <option value="Featured">
                Featured
              </option>

              <option value="Not Featured">
                Not Featured
              </option>
            </select>
          </div>
        </div>
      </section>

      {/* ====================================================
          CONTENT
      ==================================================== */}

      <section className="pricing-page__content">
        {/* LOADING */}
        {loading && (
          <div className="pricing-page__loading">
            <div className="pricing-page__loading-spinner">
              <RefreshCw
                size={25}
                className="pricing-page__spin"
              />
            </div>

            <h3>
              Loading pricing plans
            </h3>

            <p>
              Please wait while pricing
              data is being loaded.
            </p>
          </div>
        )}

        {/* ERROR + NO DATA */}
        {!loading &&
          error &&
          pricingPlans.length === 0 && (
            <div className="pricing-page__error-state">
              <div className="pricing-page__error-icon">
                <AlertCircle size={27} />
              </div>

              <h3>
                Unable to load pricing
              </h3>

              <p>
                {error}
              </p>

              <button
                type="button"
                className="pricing-page__retry-btn"
                onClick={() =>
                  fetchPricing()
                }
              >
                <RefreshCw size={17} />

                <span>
                  Try Again
                </span>
              </button>
            </div>
          )}

        {/* EMPTY DATABASE */}
        {!loading &&
          !error &&
          pricingPlans.length === 0 && (
            <div className="pricing-page__empty-state">
              <div className="pricing-page__empty-icon">
                <DollarSign size={28} />
              </div>

              <h3>
                No pricing plans found
              </h3>

              <p>
                Start by creating your first
                pricing plan.
              </p>

              <button
                type="button"
                className="pricing-page__add-btn"
                onClick={handleAddPricing}
              >
                <Plus size={18} />

                <span>
                  Add Pricing
                </span>
              </button>
            </div>
          )}

        {/* FILTERED EMPTY */}
        {!loading &&
          !error &&
          pricingPlans.length > 0 &&
          filteredPricingPlans.length === 0 && (
            <div className="pricing-page__empty-state pricing-page__empty-state--filtered">
              <div className="pricing-page__empty-icon">
                <AlertCircle size={27} />
              </div>

              <h3>
                No matching pricing plans
              </h3>

              <p>
                Try changing your search or
                filter settings.
              </p>

              <button
                type="button"
                className="pricing-page__reset-btn pricing-page__reset-btn--large"
                onClick={handleResetFilters}
              >
                Reset Filters
              </button>
            </div>
          )}

        {/* DESKTOP TABLE */}
        {!loading &&
          filteredPricingPlans.length > 0 && (
            <div className="pricing-page__desktop">
              <PricingTable
                pricingPlans={
                  filteredPricingPlans
                }
                onEdit={
                  handleEditPricing
                }
                onDelete={
                  handleDeletePricing
                }
                onToggleActive={
                  handleToggleActive
                }
                onToggleFeatured={
                  handleToggleFeatured
                }
              />
            </div>
          )}

        {/* MOBILE CARDS */}
        {!loading &&
          filteredPricingPlans.length > 0 && (
            <div className="pricing-page__mobile">
              <div className="pricing-page__mobile-grid">
                {filteredPricingPlans.map(
                  (pricing) => (
                    <PricingCard
                      key={
                        getPricingId(
                          pricing
                        )
                      }
                      pricing={pricing}
                      onEdit={
                        handleEditPricing
                      }
                      onDelete={
                        handleDeletePricing
                      }
                      onToggleActive={
                        handleToggleActive
                      }
                      onToggleFeatured={
                        handleToggleFeatured
                      }
                    />
                  )
                )}
              </div>
            </div>
          )}
      </section>

      {/* ====================================================
          ADD / EDIT FORM
      ==================================================== */}

      <PricingForm
        isOpen={isFormOpen}
        pricing={editingPricing}
        onClose={handleCloseForm}
        onSave={handleSavePricing}
      />
    </div>
  );
};

export default Pricing;