// ==========================================================
// SHASAR SOLAR ADMIN PANEL
// PRICING FORM
// ADD + EDIT PRICING
// LIGHT + DARK THEME
// BOOTSTRAP + CUSTOM CSS
// ==========================================================

import { useEffect, useState } from "react";

import {
  Plus,
  Trash2,
  X,
  Save,
  FileText,
  DollarSign,
  Settings2,
  ShieldCheck,
} from "lucide-react";

import "./PricingForm.css";

// ==========================================================
// DEFAULT FORM
// ==========================================================

const DEFAULT_FORM = {
  title: "",
  slug: "",
  description: "",

  category: "Residential",

  startingPrice: "",
  price: "",

  currency: "AED",

  priceUnit: "AED",

  minimumPrice: "",
  maximumPrice: "",

  systemSize: "Custom",

  pricingDescription: "",

  features: [""],

  active: true,
  featured: false,

  displayOrder: 0,

  internalNotes: "",
};

// ==========================================================
// OPTIONS
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

const PRICE_UNIT_OPTIONS = [
  "AED",
  "AED / kW",
  "AED / month",
  "AED / project",
  "Custom Quote",
];

const SYSTEM_SIZE_OPTIONS = [
  "1–5 kW",
  "5–10 kW",
  "10–50 kW",
  "50–100 kW",
  "100+ kW",
  "Custom",
];

// ==========================================================
// SLUG GENERATOR
// ==========================================================

const generateSlug = (value) => {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

// ==========================================================
// NORMALIZE FORM
// ==========================================================

const normalizePricing = (pricing) => {
  if (!pricing) {
    return DEFAULT_FORM;
  }

  return {
    title: pricing.title || "",

    slug:
      pricing.slug ||
      generateSlug(pricing.title),

    description:
      pricing.description || "",

    category:
      pricing.category || "Residential",

    startingPrice:
      pricing.startingPrice ??
      "",

    price:
      pricing.price ??
      "",

    currency:
      pricing.currency || "AED",

    priceUnit:
      pricing.priceUnit || "AED",

    minimumPrice:
      pricing.minimumPrice ??
      "",

    maximumPrice:
      pricing.maximumPrice ??
      "",

    systemSize:
      pricing.systemSize || "Custom",

    pricingDescription:
      pricing.pricingDescription || "",

    features:
      Array.isArray(pricing.features) &&
      pricing.features.length > 0
        ? pricing.features
        : [""],

    active:
      pricing.active !== false,

    featured:
      pricing.featured === true,

    displayOrder:
      pricing.displayOrder ?? 0,

    internalNotes:
      pricing.internalNotes || "",
  };
};

// ==========================================================
// COMPONENT
// ==========================================================

const PricingForm = ({
  isOpen,
  pricing,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] =
    useState(DEFAULT_FORM);

  const [errors, setErrors] =
    useState({});

  const [saving, setSaving] =
    useState(false);

  const [slugManuallyEdited, setSlugManuallyEdited] =
    useState(false);

  // ========================================================
  // INITIALIZE FORM
  // ========================================================

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const normalized =
      normalizePricing(pricing);

    setFormData(normalized);

    setErrors({});

    setSaving(false);

    setSlugManuallyEdited(
      Boolean(pricing?.slug)
    );
  }, [isOpen, pricing]);

  // ========================================================
  // BODY SCROLL LOCK
  // ========================================================

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [isOpen]);

  // ========================================================
  // ESCAPE KEY
  // ========================================================

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !saving) {
        onClose?.();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen, onClose, saving]);

  // ========================================================
  // DON'T RENDER
  // ========================================================

  if (!isOpen) {
    return null;
  }

  // ========================================================
  // CHANGE FIELD
  // ========================================================

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData((previous) => ({
      ...previous,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    // ------------------------------------------------------
    // AUTO SLUG
    // ------------------------------------------------------

    if (
      name === "title" &&
      !slugManuallyEdited
    ) {
      setFormData((previous) => ({
        ...previous,
        slug: generateSlug(value),
      }));
    }
  };

  // ========================================================
  // SLUG CHANGE
  // ========================================================

  const handleSlugChange = (event) => {
    setSlugManuallyEdited(true);

    setFormData((previous) => ({
      ...previous,
      slug: generateSlug(
        event.target.value
      ),
    }));

    setErrors((previous) => ({
      ...previous,
      slug: "",
    }));
  };

  // ========================================================
  // FEATURE CHANGE
  // ========================================================

  const handleFeatureChange = (
    index,
    value
  ) => {
    setFormData((previous) => {
      const features = [
        ...previous.features,
      ];

      features[index] = value;

      return {
        ...previous,
        features,
      };
    });
  };

  // ========================================================
  // ADD FEATURE
  // ========================================================

  const handleAddFeature = () => {
    setFormData((previous) => ({
      ...previous,

      features: [
        ...previous.features,
        "",
      ],
    }));
  };

  // ========================================================
  // REMOVE FEATURE
  // ========================================================

  const handleRemoveFeature = (
    index
  ) => {
    setFormData((previous) => {
      const features = previous.features.filter(
        (_, featureIndex) =>
          featureIndex !== index
      );

      return {
        ...previous,

        features:
          features.length > 0
            ? features
            : [""],
      };
    });
  };

  // ========================================================
  // VALIDATION
  // ========================================================

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title =
        "Pricing title is required.";
    }

    if (!formData.slug.trim()) {
      newErrors.slug =
        "Pricing slug is required.";
    }

    if (!formData.description.trim()) {
      newErrors.description =
        "Short description is required.";
    }

    if (
      formData.minimumPrice !== "" &&
      formData.maximumPrice !== "" &&
      Number(formData.minimumPrice) >
        Number(formData.maximumPrice)
    ) {
      newErrors.maximumPrice =
        "Maximum price must be greater than minimum price.";
    }

    if (
      formData.startingPrice !== "" &&
      Number(formData.startingPrice) < 0
    ) {
      newErrors.startingPrice =
        "Starting price cannot be negative.";
    }

    if (
      formData.price !== "" &&
      Number(formData.price) < 0
    ) {
      newErrors.price =
        "Price cannot be negative.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  // ========================================================
  // SUBMIT
  // ========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const payload = {
      ...formData,

      title:
        formData.title.trim(),

      slug:
        formData.slug.trim(),

      description:
        formData.description.trim(),

      currency:
        formData.currency
          .trim()
          .toUpperCase(),

      features:
        formData.features
          .map((feature) =>
            feature.trim()
          )
          .filter(Boolean),

      startingPrice:
        formData.startingPrice === ""
          ? null
          : Number(
              formData.startingPrice
            ),

      price:
        formData.price === ""
          ? null
          : Number(formData.price),

      minimumPrice:
        formData.minimumPrice === ""
          ? null
          : Number(
              formData.minimumPrice
            ),

      maximumPrice:
        formData.maximumPrice === ""
          ? null
          : Number(
              formData.maximumPrice
            ),

      displayOrder:
        formData.displayOrder === ""
          ? 0
          : Number(
              formData.displayOrder
            ),
    };

    try {
      setSaving(true);

      await onSave(payload);
    } catch (error) {
      console.error(
        "Pricing form error:",
        error
      );

      setSaving(false);
    }
  };

  // ========================================================
  // EDIT MODE
  // ========================================================

  const isEditing =
    Boolean(
      pricing?._id ||
      pricing?.id
    );

  // ========================================================
  // RENDER
  // ========================================================

  return (
    <div
      className="pricing-form-overlay"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !saving
        ) {
          onClose?.();
        }
      }}
    >
      <div
        className="pricing-form-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pricing-form-title"
      >
        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="pricing-form-header">
          <div className="pricing-form-header__content">
            <div className="pricing-form-header__icon">
              {isEditing ? (
                <Settings2 size={21} />
              ) : (
                <Plus size={21} />
              )}
            </div>

            <div>
              <span className="pricing-form-header__eyebrow">
                PRICING MANAGEMENT
              </span>

              <h2
                id="pricing-form-title"
                className="pricing-form-header__title"
              >
                {isEditing
                  ? "Edit Pricing Plan"
                  : "Add Pricing Plan"}
              </h2>

              <p className="pricing-form-header__subtitle">
                {isEditing
                  ? "Update pricing information and management settings."
                  : "Create a new pricing plan for internal administration."}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="pricing-form-close"
            onClick={onClose}
            disabled={saving}
            aria-label="Close pricing form"
          >
            <X size={20} />
          </button>
        </div>

        {/* ==================================================
            FORM
        ================================================== */}

        <form
          className="pricing-form"
          onSubmit={handleSubmit}
        >
          <div className="pricing-form-body">
            {/* ==================================================
                BASIC INFORMATION
            ================================================== */}

            <section className="pricing-form-section">
              <div className="pricing-form-section__header">
                <div className="pricing-form-section__icon">
                  <FileText size={18} />
                </div>

                <div>
                  <h3 className="pricing-form-section__title">
                    Basic Information
                  </h3>

                  <p className="pricing-form-section__description">
                    Define the basic identity of
                    this pricing plan.
                  </p>
                </div>
              </div>

              <div className="pricing-form-grid">
                {/* TITLE */}
                <div className="pricing-form-field pricing-form-field--full">
                  <label
                    htmlFor="pricing-title"
                    className="pricing-form-label"
                  >
                    Pricing Title
                    <span className="pricing-form-required">
                      *
                    </span>
                  </label>

                  <input
                    id="pricing-title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`pricing-form-input ${
                      errors.title
                        ? "pricing-form-input--error"
                        : ""
                    }`}
                    placeholder="e.g. Residential Solar Plan"
                    maxLength={150}
                  />

                  {errors.title && (
                    <span className="pricing-form-error">
                      {errors.title}
                    </span>
                  )}
                </div>

                {/* SLUG */}
                <div className="pricing-form-field">
                  <label
                    htmlFor="pricing-slug"
                    className="pricing-form-label"
                  >
                    Slug
                    <span className="pricing-form-required">
                      *
                    </span>
                  </label>

                  <input
                    id="pricing-slug"
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={
                      handleSlugChange
                    }
                    className={`pricing-form-input ${
                      errors.slug
                        ? "pricing-form-input--error"
                        : ""
                    }`}
                    placeholder="residential-solar-plan"
                    maxLength={180}
                  />

                  <span className="pricing-form-help">
                    Used internally as a unique
                    pricing identifier.
                  </span>

                  {errors.slug && (
                    <span className="pricing-form-error">
                      {errors.slug}
                    </span>
                  )}
                </div>

                {/* CATEGORY */}
                <div className="pricing-form-field">
                  <label
                    htmlFor="pricing-category"
                    className="pricing-form-label"
                  >
                    Category
                    <span className="pricing-form-required">
                      *
                    </span>
                  </label>

                  <select
                    id="pricing-category"
                    name="category"
                    value={
                      formData.category
                    }
                    onChange={handleChange}
                    className="pricing-form-select"
                  >
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

                {/* DESCRIPTION */}
                <div className="pricing-form-field pricing-form-field--full">
                  <label
                    htmlFor="pricing-description"
                    className="pricing-form-label"
                  >
                    Short Description
                    <span className="pricing-form-required">
                      *
                    </span>
                  </label>

                  <textarea
                    id="pricing-description"
                    name="description"
                    value={
                      formData.description
                    }
                    onChange={handleChange}
                    className={`pricing-form-textarea ${
                      errors.description
                        ? "pricing-form-input--error"
                        : ""
                    }`}
                    placeholder="Briefly describe this pricing plan..."
                    rows="3"
                    maxLength={500}
                  />

                  <div className="pricing-form-help-row">
                    <span className="pricing-form-help">
                      Keep this description short
                      and clear.
                    </span>

                    <span className="pricing-form-counter">
                      {
                        formData.description
                          .length
                      }
                      /500
                    </span>
                  </div>

                  {errors.description && (
                    <span className="pricing-form-error">
                      {errors.description}
                    </span>
                  )}
                </div>
              </div>
            </section>

            {/* ==================================================
                PRICING DETAILS
            ================================================== */}

            <section className="pricing-form-section">
              <div className="pricing-form-section__header">
                <div className="pricing-form-section__icon">
                  <DollarSign size={18} />
                </div>

                <div>
                  <h3 className="pricing-form-section__title">
                    Pricing Details
                  </h3>

                  <p className="pricing-form-section__description">
                    Configure the commercial pricing
                    information.
                  </p>
                </div>
              </div>

              <div className="pricing-form-grid">
                {/* STARTING PRICE */}
                <div className="pricing-form-field">
                  <label
                    htmlFor="pricing-starting-price"
                    className="pricing-form-label"
                  >
                    Starting Price
                  </label>

                  <input
                    id="pricing-starting-price"
                    type="number"
                    min="0"
                    step="0.01"
                    name="startingPrice"
                    value={
                      formData.startingPrice
                    }
                    onChange={handleChange}
                    className={`pricing-form-input ${
                      errors.startingPrice
                        ? "pricing-form-input--error"
                        : ""
                    }`}
                    placeholder="5000"
                  />

                  {errors.startingPrice && (
                    <span className="pricing-form-error">
                      {
                        errors.startingPrice
                      }
                    </span>
                  )}
                </div>

                {/* PRICE */}
                <div className="pricing-form-field">
                  <label
                    htmlFor="pricing-price"
                    className="pricing-form-label"
                  >
                    Price
                  </label>

                  <input
                    id="pricing-price"
                    type="number"
                    min="0"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={`pricing-form-input ${
                      errors.price
                        ? "pricing-form-input--error"
                        : ""
                    }`}
                    placeholder="7500"
                  />

                  {errors.price && (
                    <span className="pricing-form-error">
                      {errors.price}
                    </span>
                  )}
                </div>

                {/* CURRENCY */}
                <div className="pricing-form-field">
                  <label
                    htmlFor="pricing-currency"
                    className="pricing-form-label"
                  >
                    Currency
                  </label>

                  <input
                    id="pricing-currency"
                    type="text"
                    name="currency"
                    value={
                      formData.currency
                    }
                    onChange={handleChange}
                    className="pricing-form-input"
                    placeholder="AED"
                    maxLength={10}
                  />
                </div>

                {/* PRICE UNIT */}
                <div className="pricing-form-field">
                  <label
                    htmlFor="pricing-price-unit"
                    className="pricing-form-label"
                  >
                    Price Unit
                  </label>

                  <select
                    id="pricing-price-unit"
                    name="priceUnit"
                    value={
                      formData.priceUnit
                    }
                    onChange={handleChange}
                    className="pricing-form-select"
                  >
                    {PRICE_UNIT_OPTIONS.map(
                      (unit) => (
                        <option
                          value={unit}
                          key={unit}
                        >
                          {unit}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* MIN PRICE */}
                <div className="pricing-form-field">
                  <label
                    htmlFor="pricing-minimum-price"
                    className="pricing-form-label"
                  >
                    Minimum Price
                  </label>

                  <input
                    id="pricing-minimum-price"
                    type="number"
                    min="0"
                    step="0.01"
                    name="minimumPrice"
                    value={
                      formData.minimumPrice
                    }
                    onChange={handleChange}
                    className="pricing-form-input"
                    placeholder="Optional"
                  />
                </div>

                {/* MAX PRICE */}
                <div className="pricing-form-field">
                  <label
                    htmlFor="pricing-maximum-price"
                    className="pricing-form-label"
                  >
                    Maximum Price
                  </label>

                  <input
                    id="pricing-maximum-price"
                    type="number"
                    min="0"
                    step="0.01"
                    name="maximumPrice"
                    value={
                      formData.maximumPrice
                    }
                    onChange={handleChange}
                    className={`pricing-form-input ${
                      errors.maximumPrice
                        ? "pricing-form-input--error"
                        : ""
                    }`}
                    placeholder="Optional"
                  />

                  {errors.maximumPrice && (
                    <span className="pricing-form-error">
                      {
                        errors.maximumPrice
                      }
                    </span>
                  )}
                </div>

                {/* SYSTEM SIZE */}
                <div className="pricing-form-field">
                  <label
                    htmlFor="pricing-system-size"
                    className="pricing-form-label"
                  >
                    System Size
                  </label>

                  <select
                    id="pricing-system-size"
                    name="systemSize"
                    value={
                      formData.systemSize
                    }
                    onChange={handleChange}
                    className="pricing-form-select"
                  >
                    {SYSTEM_SIZE_OPTIONS.map(
                      (size) => (
                        <option
                          value={size}
                          key={size}
                        >
                          {size}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* DISPLAY ORDER */}
                <div className="pricing-form-field">
                  <label
                    htmlFor="pricing-display-order"
                    className="pricing-form-label"
                  >
                    Display Order
                  </label>

                  <input
                    id="pricing-display-order"
                    type="number"
                    min="0"
                    name="displayOrder"
                    value={
                      formData.displayOrder
                    }
                    onChange={handleChange}
                    className="pricing-form-input"
                    placeholder="0"
                  />
                </div>

                {/* PRICING DESCRIPTION */}
                <div className="pricing-form-field pricing-form-field--full">
                  <label
                    htmlFor="pricing-description-detail"
                    className="pricing-form-label"
                  >
                    Pricing Description
                  </label>

                  <textarea
                    id="pricing-description-detail"
                    name="pricingDescription"
                    value={
                      formData.pricingDescription
                    }
                    onChange={handleChange}
                    className="pricing-form-textarea"
                    placeholder="Explain pricing structure, inclusions, quotation conditions, etc."
                    rows="4"
                    maxLength={1000}
                  />
                </div>
              </div>
            </section>

            {/* ==================================================
                FEATURES
            ================================================== */}

            <section className="pricing-form-section">
              <div className="pricing-form-section__header">
                <div className="pricing-form-section__icon">
                  <ShieldCheck size={18} />
                </div>

                <div>
                  <h3 className="pricing-form-section__title">
                    Plan Features
                  </h3>

                  <p className="pricing-form-section__description">
                    Add the features included in
                    this pricing plan.
                  </p>
                </div>
              </div>

              <div className="pricing-form-features">
                {formData.features.map(
                  (feature, index) => (
                    <div
                      className="pricing-form-feature"
                      key={`feature-${index}`}
                    >
                      <div className="pricing-form-feature__number">
                        {index + 1}
                      </div>

                      <input
                        type="text"
                        value={feature}
                        onChange={(event) =>
                          handleFeatureChange(
                            index,
                            event.target.value
                          )
                        }
                        className="pricing-form-feature__input"
                        placeholder={`Feature ${
                          index + 1
                        }`}
                        maxLength={250}
                      />

                      <button
                        type="button"
                        className="pricing-form-feature__remove"
                        onClick={() =>
                          handleRemoveFeature(
                            index
                          )
                        }
                        disabled={
                          formData.features
                            .length === 1
                        }
                        aria-label={`Remove feature ${
                          index + 1
                        }`}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  )
                )}

                <button
                  type="button"
                  className="pricing-form-add-feature"
                  onClick={
                    handleAddFeature
                  }
                >
                  <Plus size={17} />

                  <span>
                    Add Feature
                  </span>
                </button>
              </div>
            </section>

            {/* ==================================================
                STATUS
            ================================================== */}

            <section className="pricing-form-section">
              <div className="pricing-form-section__header">
                <div className="pricing-form-section__icon">
                  <Settings2 size={18} />
                </div>

                <div>
                  <h3 className="pricing-form-section__title">
                    Management Settings
                  </h3>

                  <p className="pricing-form-section__description">
                    Control how this pricing plan
                    is managed in the admin panel.
                  </p>
                </div>
              </div>

              <div className="pricing-form-status-grid">
                {/* ACTIVE */}
                <label
                  className={`pricing-form-status-box ${
                    formData.active
                      ? "pricing-form-status-box--active"
                      : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    name="active"
                    checked={
                      formData.active
                    }
                    onChange={handleChange}
                  />

                  <span className="pricing-form-checkbox">
                    {formData.active && (
                      <span />
                    )}
                  </span>

                  <span className="pricing-form-status-box__content">
                    <strong>
                      Active Plan
                    </strong>

                    <small>
                      This pricing plan is
                      currently active.
                    </small>
                  </span>
                </label>

                {/* FEATURED */}
                <label
                  className={`pricing-form-status-box ${
                    formData.featured
                      ? "pricing-form-status-box--featured"
                      : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    name="featured"
                    checked={
                      formData.featured
                    }
                    onChange={handleChange}
                  />

                  <span className="pricing-form-checkbox">
                    {formData.featured && (
                      <span />
                    )}
                  </span>

                  <span className="pricing-form-status-box__content">
                    <strong>
                      Featured Plan
                    </strong>

                    <small>
                      Mark this plan as
                      featured internally.
                    </small>
                  </span>
                </label>
              </div>
            </section>

            {/* ==================================================
                INTERNAL NOTES
            ================================================== */}

            <section className="pricing-form-section">
              <div className="pricing-form-field">
                <label
                  htmlFor="pricing-internal-notes"
                  className="pricing-form-label"
                >
                  Internal Notes
                  <span className="pricing-form-private">
                    ADMIN ONLY
                  </span>
                </label>

                <textarea
                  id="pricing-internal-notes"
                  name="internalNotes"
                  value={
                    formData.internalNotes
                  }
                  onChange={handleChange}
                  className="pricing-form-textarea"
                  placeholder="Add private notes for admin users..."
                  rows="4"
                  maxLength={2000}
                />

                <span className="pricing-form-help">
                  These notes are stored for admin
                  use and are not intended for the
                  public website.
                </span>
              </div>
            </section>
          </div>

          {/* ==================================================
              FOOTER
          ================================================== */}

          <div className="pricing-form-footer">
            <button
              type="button"
              className="pricing-form-cancel"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="pricing-form-submit"
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="pricing-form-spinner" />

                  <span>
                    Saving...
                  </span>
                </>
              ) : (
                <>
                  <Save size={17} />

                  <span>
                    {isEditing
                      ? "Update Pricing"
                      : "Create Pricing"}
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PricingForm;